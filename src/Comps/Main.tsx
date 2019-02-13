import React from 'react'
import MediaPlayer from './MainComps/MediaPlayer'
import Chatboard from './MainComps/Chatboard'

interface Props {
    name: string
    src: string
    session: string
    workWith?: HTMLVideoElement
}
export function Main(props: Props) {
    return (
        <main>
            <MediaPlayer session={props.session} name={props.name} src={props.src} workWith={props.workWith} />
            <Chatboard session={props.session} name={props.name} />
        </main>
    )
}
