import React, { useState, useRef, useEffect } from 'react'
import Typography from './Typography'
import { Input, clipboard, showToast } from './utils'
import Button from 'react-uwp/Button'

export function ChooseVideo(props: { onNext(url: string): void; session: string }) {
    const input = React.useRef<HTMLInputElement>(null)
    const dialog = React.useRef<HTMLDivElement>(null)
    const [showOnline, setShowOnline] = useState(true)
    let url = ''
    const store = getStore(props.session).get('onlineVideo')
    store.once(onNext)
    useEffect(() => (store.once(onNext), () => store.off()))
    function onNext(url?: string) {
        if (!url) return
        if (url === 'blob://') return showOnline && setShowOnline(false)
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
        store.put('blob://') // 告诉其他实例不要显示在线选项
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
                <Typography withSpan>{ty => <h2 style={ty.subTitleAlt}>本地视频</h2>}</Typography>
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
                {showOnline ? (
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
                ) : (
                    <Typography withSpan>
                        {ty => <h1 style={ty.body}>不可用，其他实例已经选择了本地视频。</h1>}
                    </Typography>
                )}
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
const demoUuid = uuid()
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
                            style={{ maxWidth: 350, width: '100%' }}
                        />
                    )}
                </Typography>
                <Typography withSpan>
                    {ty => (
                        <p style={ty.body}>
                            如果你是由他人邀请而来的，他们应该会向你提供一个共享码，请将其填写在上面的文本框。
                            <br />
                            共享码看起来像这样：
                            {demoUuid}
                        </p>
                    )}
                </Typography>
                <Typography withSpan>
                    {ty => (
                        <p style={ty.body}>
                            希望邀请他人？请点击以{' ' /** 别删除这个空格。排版用。 */}
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
                            不同的共享码能够区分你和其他陌生人，但它无法确保聊天记录不会外泄，请注意保护隐私。
                            另外，由于本软件协议特性，聊天效果可能略差，建议使用其他聊天软件交流视频内容。
                        </span>
                    )}
                </Typography>
            </div>
        </main>
    )
}
