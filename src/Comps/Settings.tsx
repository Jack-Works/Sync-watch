import React, { useState, useRef, useEffect } from 'react'
import Typography from './Typography'
import { Input, clipboard, showToast } from './utils'
import Button from 'react-uwp/Button'

export function ChooseVideo(props: { onNext(url: string): void; session: string }) {
    const input = React.useRef<HTMLInputElement>(null)
    const dialog = React.useRef<HTMLDivElement>(null)
    let url = ''
    const store = getStore(props.session).get('onlineVideo')
    store.once(onNext)
    function onNext(url?: string) {
        if (!url) return
        if (url.startsWith('https://') || url.startsWith('http://')) store.put(url)
        props.onNext(url)
    }
    function getBlob(event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) {
        URL.revokeObjectURL(url)
        const files = (
            (event as React.DragEvent).dataTransfer || (event as React.ChangeEvent<HTMLInputElement>).currentTarget
        ).files
        if (!files) return
        const file = files.item(0)
        if (!file) return
        url = URL.createObjectURL(file)
        return url
    }

    function onEnter(e: React.DragEvent) {
        if (!dialog.current) return
        e.preventDefault()
        dialog.current.style.transform = 'scale(0.95)'
        dialog.current.style.opacity = '0.8'
    }
    function onLeave() {
        if (!dialog.current) return
        dialog.current.style.transform = ''
        dialog.current.style.opacity = '1'
    }
    return (
        <main>
            <form hidden>
                <input type="file" ref={input} accept="video/*" onChange={e => onNext(getBlob(e))} />
            </form>
            <div
                ref={dialog}
                className="dialog"
                onDragEnterCapture={onEnter}
                onDragLeaveCapture={onLeave}
                onDropCapture={e => {
                    e.preventDefault()
                    setTimeout(onLeave, 200)
                    setTimeout(() => onNext(getBlob(e)), 600)
                }}
                onDragOverCapture={onEnter}>
                <Typography withSpan>{ty => <h1 style={ty.subHeader}>想看什么？</h1>}</Typography>
                <Typography withSpan>{ty => <h1 style={ty.subTitleAlt}>本地视频</h1>}</Typography>
                <Typography withSpan>
                    {ty => (
                        <span style={ty.body}>
                            <Button tabIndex={1} onClick={() => input.current && input.current.click()}>
                                选择视频
                            </Button>
                            <div style={{ display: 'inline-block', marginLeft: 6, transform: 'translateY(1px)' }}>
                                或者将视频拖放到这里。
                            </div>
                        </span>
                    )}
                </Typography>
                <Typography withSpan>{ty => <h1 style={ty.subTitleAlt}>网络视频</h1>}</Typography>
                <Typography withSpan>
                    {ty => (
                        <Input
                            autoFocus
                            onCommit={onNext}
                            type="url"
                            icon="Link"
                            placeholder="视频文件地址，或 Youtube 链接"
                        />
                    )}
                </Typography>
            </div>
        </main>
    )
}

import uuid from 'uuid'
export function AskName(props: { onNext(name: string): void }) {
    return (
        <main>
            <div className="dialog">
                <Typography withSpan>{ty => <h1 style={ty.subHeader}>怎么称呼您？</h1>}</Typography>
                <Typography withSpan>{ty => <span style={ty.body}>这会向其他人展示。</span>}</Typography>
                <Typography withSpan>
                    {() => (
                        <Input
                            onCommit={props.onNext}
                            autoComplete="name"
                            autoFocus
                            icon="CheckMark"
                            placeholder="您的名称"
                        />
                    )}
                </Typography>
                <Typography>
                    {ty => (
                        <div>
                            懒得打，给我随便{' '}
                            <Button onClick={() => props.onNext(uuid().match(/[a-z0-9]{5}/)![0])} tabIndex={1}>
                                整一个
                            </Button>
                        </div>
                    )}
                </Typography>
            </div>
        </main>
    )
}

import { getStore } from './Network'
const uuidRegex = /^([a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12})$/g
export function AskSession(props: { onNext(name: string): void }) {
    const [shareCode, setShareCode] = useState('')
    const ref = useRef<typeof setShareCode>(null)

    useEffect(() => {
        const val = location.hash.slice(1)
        if (shareCode !== val && val.match(uuidRegex)) {
            // Mystery, we need a timer
            return (x => () => clearTimeout(x))(
                setTimeout(() => {
                    if (shareCode) return
                    setShareCode(val)
                    ref.current!(val)
                }, 400),
            )
        }
    }, [location.hash])

    return (
        <main>
            <div className="dialog">
                <Typography withSpan>
                    {ty => <h1 style={ty.subHeader}>欢迎使用 Sync Watch，您的共享码是？</h1>}
                </Typography>
                <Typography withSpan>
                    {() => (
                        <Input
                            onCommit={props.onNext}
                            icon="Forward"
                            autoFocus
                            pattern={uuidRegex}
                            placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                            ref={ref}
                            spellCheck={false}
                            style={{ width: 350 }}
                        />
                    )}
                </Typography>
                <Typography withSpan>
                    {ty => <p style={ty.body}>如果是其他人邀请您前来，他们会向你提供一个共享码。</p>}
                </Typography>
                <Typography withSpan>
                    {ty => (
                        <p style={ty.body}>
                            如果您希望邀请其他人，请点击这里{' ' /** 别删除这个空格。排版用。 */}
                            <Button
                                onClick={() => {
                                    const u = uuid()
                                    setShareCode(u)
                                    ref.current && ref.current(u)
                                    location.hash = u
                                    clipboard.writeText(location.href).then(
                                        () => {
                                            showToast('分享码已经复制到剪贴板')
                                            props.onNext(u)
                                        },
                                        () => showToast('复制到剪贴板失败'),
                                    )
                                }}>
                                获取共享码
                            </Button>
                        </p>
                    )}
                </Typography>
                <Typography withSpan>
                    {ty => (
                        <span style={{ ...ty.caption, color: 'yellow', opacity: 0.7 }}>
                            使用不同共享码的人不会加入同一个房间，但共享码不是密码，其他人仍然有可能获知房间内的聊天内容。
                            请注意保护个人隐私。
                        </span>
                    )}
                </Typography>
            </div>
        </main>
    )
}
