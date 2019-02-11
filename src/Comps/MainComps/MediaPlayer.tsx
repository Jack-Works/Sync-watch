import React, { useEffect } from 'react'
import MediaPlayer from 'react-uwp/MediaPlayer'
import { getStore, getChatroom } from '../Network'
import { messages } from '../utils'
import { AbstractVideoElement } from './AbstractHTMLVideoElement'

const orig = document.exitFullscreen
document.exitFullscreen = async () => {
    try {
        await orig.bind(document)()
    } catch (e) {
        if ((e as Error).message !== 'Document not active') throw e
    }
}

interface Props {
    src: string
    session: string
    name: string
}

let firstLoad = true
export default function Composed(props: Props) {
    const store = getStore(props.session)
    const chatRoom = getChatroom(props.session, props.name)
    const ref = React.useRef<MediaPlayer>(null)

    if (firstLoad && props.src.match('youtube.')) {
        chatRoom.broadcastLocal('Youtube 视频如果黑屏，请尝试刷新重新进入')
    }

    let timer: NodeJS.Timer
    useEffect(() => {
        if (!ref.current) return
        const video = new AbstractVideoElement(ref.current)
        let node = store.get('currentTime')
        let node2 = store.get('isPlaying')
        video.untilReady.then(() => {
            // 同步远程的进度
            node = node.on(time => {
                console.info(`远程进度=${time} 本地进度=${video.currentTime}`)
                if (Math.abs(time - video.currentTime) < 2) return
                if (time === 0) return
                console.info(`与远程同步进度 ${time}`)
                video.currentTime = time
            })
            // 同步播放状态
            node2 = node2.on(data => {
                if (data === undefined) return false
                console.info(`播放状态 远程=${data}, 本地=${!video.paused}`)
                if (!video.paused !== data) data ? video.play() : video.pause()
            })
            // 广播本地事件
            video.addEventListener('seeked', event => {
                if (!event.isTrusted) return
                const time = video.currentTime
                store.get('currentTime').put(time)
                chatRoom.broadcast(messages.JUMPED(time))
            })
            const playingStatus = (event: Parameters<Parameters<typeof video.addEventListener>[1]>[0]) => {
                console.log(event)

                if (!event.isTrusted) return
                store.get('isPlaying').put(!video.paused)
                getChatroom(props.session, props.name).broadcast(!video.paused ? messages.RESUMED : messages.PAUSED)
                console.info('同步播放状态', !video.paused)
            }
            video.addEventListener('play', playingStatus)
            video.addEventListener('pause', playingStatus)
            // 发布本地进度
            timer = setInterval(() => {
                console.info(`发布进度到远程 ${video.currentTime}`)
                store.get('currentTime').put(video.currentTime)
            }, 5000)
        })
        return () => {
            video.destory()
            node.off()
            node2.off()
            clearInterval(timer)
        }
    })
    return (
        <div style={{ flex: 7 }}>
            <MediaPlayer ref={ref} width={'100%' as any} height={'100vh' as any} url={props.src} />
        </div>
    )
}
