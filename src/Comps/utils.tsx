import React, { useRef, useImperativeHandle, forwardRef, useEffect, useContext, useState } from 'react'
import TextBox, { TextBoxProps } from 'react-uwp/TextBox'
import Icon from 'react-uwp/Icon'
import { State } from './Network'
import Toast from 'react-uwp/Toast'

interface Props extends Partial<TextBoxProps> {
    onCommit(value: string): void
    clearOnCommit?: boolean
    icon?: string
    ref?: any
    autoFocus?: boolean
    pattern?: RegExp
    autoComplete?: string
}
function _Input(_: Props, ref: React.Ref<(newVal: string) => void>) {
    const [value, setValue] = React.useState('')
    const { onCommit, clearOnCommit, icon, ...origProps } = _
    const localRef = useRef<TextBox>(null)
    useImperativeHandle(ref, () => (val: string) => setValue(val))

    const send = () => {
        if (value) {
            if (_.pattern) {
                const match = value.match(_.pattern)
                if (!match || match[0] !== value)
                    return (localRef.current!.inputElm.parentElement!.style.boxShadow =
                        'rgba(255, 0, 0, 0.7) 0px 0px 0px 1px inset')
                else
                    localRef.current!.inputElm.parentElement!.style.boxShadow =
                        'rgba(0, 120, 215) 0px 0px 0px 2px inset'
            }
            onCommit(value)
            if (clearOnCommit) {
                setValue('')
                localRef.current!.inputElm.focus()
            }
        }
    }

    return (
        <TextBox
            ref={localRef}
            onChangeValue={setValue}
            onKeyPressCapture={event => (event.key === 'Enter' && send()) || event.stopPropagation()}
            rightNode={
                icon ? (
                    <Icon onClick={send} style={{ margin: '0 8px', cursor: 'pointer' }} size={16}>
                        {icon}
                    </Icon>
                ) : (
                    undefined
                )
            }
            {...origProps}
            {...{ value }}
        />
    )
}
export const Input = forwardRef(_Input)

export const messages = {
    JOINED: '__JOINED__',
    PAUSED: '__PAUSED__',
    RESUMED: '__RESUMED__',
    JUMPED(time: number) {
        return '__JUMPED__' + time
    },
    getString(msg: State['chatRoom']): typeof msg | null {
        if (msg.text === this.JOINED) return { text: `${msg.from} 加入了`, type: 'system', from: '' }
        if (msg.text === this.PAUSED) return { text: `${msg.from} 暂停了视频`, type: 'system', from: '' }
        if (msg.text === this.RESUMED) return { text: `${msg.from} 开始了视频`, type: 'system', from: '' }
        if (msg.text.startsWith('__JUMPED__')) {
            const time = parseFloat(msg.text.replace(/^__JUMPED__/g, ''))
            if (isNaN(time)) return null
            const mins = ~~(time / 60)
            const secs = (time % 60).toPrecision(2)
            return { text: `${msg.from} 跳转视频位置到 ${mins}:${secs}`, type: 'system', from: '' }
        }
        return null
    },
}

export const clipboard = (navigator as any).clipboard || {
    writeText: () => Promise.reject(),
}

export let showToast = (name: string) => {}
export function GlobalToast() {
    const [text, setText] = useState('')
    const [show, setShow] = useState<boolean | undefined>(false)
    showToast = text => {
        setText(text)
        setShow(true)
    }
    return <Toast defaultShow={show} showCloseIcon onToggleShowToast={setShow} title={text} closeDelay={3000} />
}
