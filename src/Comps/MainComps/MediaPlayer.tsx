import React, { useEffect, useState } from 'react'
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
    workWith?: HTMLVideoElement
}

let firstLoad = true

function useVideo(session: string, name: string, ref: { current: any }) {
    const store = getStore(session)
    const chatRoom = getChatroom(session, name)
    useEffect(() => {
        if (!ref.current) return
        const video = new AbstractVideoElement(ref.current)
        let node = store.get('currentTime')
        let node2 = store.get('isPlaying')

        const PublishProgressToRemote = () => {
            store.get('currentTime').put(video.currentTime)
        }
        video.untilReady.then(() => {
            // 同步远程的进度
            node = node.on(time => {
                console.info(`远程进度=${time} 本地进度=${video.currentTime}`)
                if (Math.abs(time - video.currentTime) < 2) return
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
                if (!event.isTrusted) return
                store.get('isPlaying').put(!video.paused)
                getChatroom(session, name).broadcast(!video.paused ? messages.RESUMED : messages.PAUSED)
                console.info('同步播放状态', !video.paused)
            }
            video.addEventListener('play', playingStatus)
            video.addEventListener('pause', playingStatus)
            addEventListener('sync-progress', PublishProgressToRemote)
        })
        return () => {
            video.destory()
            node.off()
            node2.off()
            removeEventListener('sync-progress', PublishProgressToRemote)
        }
    })
}

function Site(props: Props) {
    const chatRoom = getChatroom(props.session, props.name)
    const ref = React.useRef<MediaPlayer>(null)

    if (firstLoad && props.src.match('youtube.')) {
        chatRoom.broadcastLocal('Youtube 视频如果黑屏，请尝试刷新重新进入')
        firstLoad = false
    }
    useVideo(props.session, props.name, ref)

    const media = matchMedia('(max-width: 850px)')
    const [height, setHeight] = useState(media.matches ? '50vh' : '100vh')
    useEffect(() => {
        const l = () => setHeight(media.matches ? '50vh' : '100vh')
        media.addListener(l)
        return () => media.removeListener(l)
    })
    return (
        <div style={{ flex: 7 }} className="videoPlayer">
            <MediaPlayer ref={ref} width={'100%' as any} height={height as any} url={props.src} />
        </div>
    )
}
function Extension(props: Props) {
    useVideo(props.session, props.name, { current: props.workWith })
    return <> </>
}

export default function(props: Props) {
    if (props.workWith) return <Extension {...props} />
    else return <Site {...props} />
}
