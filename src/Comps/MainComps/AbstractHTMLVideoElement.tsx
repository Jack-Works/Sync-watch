import { EventEmitter } from 'events'
import { MediaPlayer } from 'react-uwp'

type EventsAbstractVideoElement = 'seeked' | 'play' | 'pause'
type FakeEvent = { currentTarget: AbstractVideoElement; isTrusted: boolean; type: EventsAbstractVideoElement }
type YoutubeProperties = YT.Player
interface ReactPlayerInner extends React.Component {
    isReady: boolean
    player: YoutubeProperties | HTMLVideoElement
}
export interface ReactPlayer extends React.Component {
    getCurrentTime(): number
    player: ReactPlayerInner
    seekTo(x: number): void
}
/* 将 Youtube 播放器和本地播放器抽象为 Partial<HTMLVideoElement> */
export class AbstractVideoElement extends EventEmitter
// implements Partial<HTMLVideoElement>
{
    private registeredEvents = new Map<EventsAbstractVideoElement, ((...args: any[]) => void)[]>()
    private UnknownState = new Error('Unknown Video Player State')
    private destroyed = false
    private timers: any[] = []
    private ready: any
    private readyFail: any
    public untilReady = new Promise(
        (resolve, reject) => ((this.ready = () => (resolve(), this.onReady())), (this.readyFail = reject)),
    )
    private get rawPlayer() {
        if (this.ref instanceof HTMLVideoElement) return this.ref
        if (this.player!.player && this.player!.player.player) {
            if (this.player!.player.player instanceof HTMLVideoElement) return this.player!.player.player
            else if (this.player!.player.player.getPlayerState) return this.player!.player.player
        }
    }
    constructor(
        private ref: MediaPlayer | HTMLVideoElement,
        private url = ref instanceof HTMLVideoElement ? ref.src : ref.props.url!,
        private player: ReactPlayer | null = ref instanceof HTMLVideoElement ? null : ref.reactPlayer,
    ) {
        super()
        let timer: any
        this.timers.push(
            (timer = setInterval(() => {
                if (this.rawPlayer) {
                    clearInterval(timer)
                    this.destroyed ? this.readyFail() : this.ready()
                }
            }, 200)),
        )
    }
    private onReady() {
        const player = this.rawPlayer
        //#region Seeked Event
        if (this.isPlayerNative(player)) {
            player.addEventListener('seeked', event => {
                if (this.destroyed) return
                this.emitComposedEvent('seeked')
                this.isTrustedSeek = true
            })
        } else if (this.isPlayerYoutube(player)) {
            let lastTime = this.currentTime
            this.timers.push(
                setInterval(() => {
                    if (this.destroyed) return
                    if (Math.abs(this.currentTime - lastTime) > 2) {
                        this.emitComposedEvent('seeked')
                    }
                    this.isTrustedSeek = true
                    lastTime = this.currentTime
                }, 1000),
            )
        }
        //#endregion
        //#region Play Event
        if (this.isPlayerNative(player)) {
            player.addEventListener('play', event => {
                if (this.destroyed) return
                this.emitComposedEvent('play')
                this.isTrustedStatus = true
            })
            player.addEventListener('pause', event => {
                if (this.destroyed) return
                this.emitComposedEvent('pause')
                this.isTrustedStatus = true
            })
        } else if (this.isPlayerYoutube(player)) {
            player.addEventListener('onStateChange', event => {
                if (this.destroyed) return
                if (player.getPlayerState() !== 1 && player.getPlayerState() !== 2) return
                if (this.paused) this.emitComposedEvent('pause')
                else this.emitComposedEvent('play')
            })
        }
        //#endregion
    }
    private emitComposedEvent(type: EventsAbstractVideoElement) {
        this.emit(type, {
            currentTarget: this,
            type: type,
            isTrusted: type === 'seeked' ? this.isTrustedSeek : this.isTrustedStatus,
        })
    }
    isPlayerNative(player: any): player is HTMLVideoElement {
        return player instanceof HTMLVideoElement
    }
    isPlayerYoutube(player: any): player is YoutubeProperties {
        return !!this.url.match('youtube.')
    }
    private isTrustedSeek = true
    private isTrustedStatus = true
    get currentTime() {
        if (this.isPlayerNative(this.rawPlayer)) return this.rawPlayer.currentTime
        else if (this.isPlayerYoutube(this.rawPlayer)) return this.player!.getCurrentTime()
        throw this.UnknownState
    }
    set currentTime(time: number) {
        this.isTrustedSeek = false
        if (this.isPlayerNative(this.rawPlayer)) this.rawPlayer.currentTime = time
        else if (this.isPlayerYoutube(this.rawPlayer)) this.player!.seekTo(time)
    }
    get paused() {
        if (this.isPlayerNative(this.rawPlayer)) return this.rawPlayer.paused
        else if (this.isPlayerYoutube(this.rawPlayer)) {
            const state = this.rawPlayer.getPlayerState()
            this.isTrustedStatus = state === 1 || state === 2
            return state === 2
        }
        throw this.UnknownState
    }
    pause() {
        this.isTrustedStatus = false
        if (this.isPlayerNative(this.rawPlayer)) this.rawPlayer.pause()
        else if (this.isPlayerYoutube(this.rawPlayer)) this.rawPlayer.pauseVideo()
    }
    async play() {
        this.isTrustedStatus = false
        if (this.isPlayerNative(this.rawPlayer)) this.rawPlayer.play()
        else if (this.isPlayerYoutube(this.rawPlayer)) this.rawPlayer.playVideo()
    }

    //#region Events
    addEventListener(
        type: EventsAbstractVideoElement,
        listener: (this: EventsAbstractVideoElement, ev: FakeEvent) => void,
    ): void {
        const current = this.registeredEvents.get(type) || []
        this.registeredEvents.set(type, current.concat(listener))
        this.addListener(type, listener)
    }
    destory() {
        for (const [event, listeners] of this.registeredEvents.entries()) {
            for (const x of listeners) {
                this.removeListener(event, x)
            }
        }
        for (const i of this.timers) clearInterval(i)
        this.timers = []
        this.destroyed = true
    }
    //#endregion
}
