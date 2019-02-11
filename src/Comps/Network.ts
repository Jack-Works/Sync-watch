import Gun, { Instance } from 'gun/gun'
import 'gun/lib/time.js'
import { EventEmitter } from 'events'
import takeRight from 'lodash.takeright'
import memo from 'lodash.memoize'
import { messages } from './utils'

export type State = {
    currentTime: number
    isPlaying: boolean
    chat: string[]
    chatRoom: { from: string; text: string; type: 'system' | 'chat' }
    onlineVideo?: string
}

let gunServer = (<any>window).__sync_watch__ || '/gun'
const conn = Gun<Record<string, State>>(gunServer)
// export const conn = Gun<Record<string, State>>()
export const getStore = memo((session: string) => conn.get('sync_watch_' + session))
export type MessageWithTime = { data: State['chatRoom']; time: number }
class Chat extends EventEmitter {
    public readonly MAX = 60
    private _m: MessageWithTime[] = []
    get messages() {
        return takeRight(this._m.sort((a, b) => a.time - b.time), this.MAX)
    }
    constructor(private chat: Instance<State['chatRoom']>, private username: string) {
        super()
        chat.time!((data, key, time) => {
            data = JSON.parse((data as any) as string)
            data.type = 'chat'
            if (data.text === messages.JOINED) dispatchEvent(new Event('sync-progress'))
            this._m.push({ data, time })
            this.emit('new-all', this.messages)
            this.emit('new', this.messages)
        }, this.MAX)
        addEventListener('clear-notification', () => {
            this._m = this._m.filter(x => x.data.type === 'chat' && !messages.getString(x.data))
            this.emit('new-all', this.messages)
            this.emit('new', this.messages)
        })
        this.broadcastLocal(`最多显示 ${this.MAX} 条消息`)
        this.broadcast(messages.JOINED)
    }
    broadcastLocal = (text: string) => {
        this._m.push({ data: { from: '', text: text, type: 'system' }, time: Date.now() })
        this.emit('new-all', this.messages)
        this.emit('new', this.messages)
    }
    broadcast = (text: string) => {
        this.chat.time!(JSON.stringify((({
            text: text,
            type: 'chat',
            from: this.username,
        } as State['chatRoom']) as any) as string) as any)
    }
    addAllMessageChangeListener(cb: (val: MessageWithTime[]) => void) {
        return this.addListener('new-all', cb)
    }
    removeAllMessageChangeListener(cb: (val: MessageWithTime[]) => void) {
        return this.removeListener('new-all', cb)
    }
}

export const getChatroom = memo(
    (session: string, username: string) => new Chat(getStore(session).get('chatRoom'), username),
)

window.onunload = () => localStorage.clear()
