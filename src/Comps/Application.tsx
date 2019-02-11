import React, { useState } from 'react'
import { ChooseVideo, AskName, AskSession } from './Settings'
import { Main } from './Main'

enum AppState {
    ChooseVideo,
    SetName,
    SetSessionID,
    Main,
}
export default function Application() {
    const [state, setState] = useState(AppState.SetSessionID)
    const [video, setVideo] = useState('')
    const [name, setName] = useState('')
    const [session, setSession] = useState('')

    switch (state) {
        case AppState.SetSessionID:
            return <AskSession onNext={val => (setSession(val), setState(AppState.ChooseVideo))} />
        case AppState.ChooseVideo:
            return <ChooseVideo session={session} onNext={val => (setVideo(val), setState(AppState.SetName))} />
        case AppState.SetName:
            return <AskName onNext={val => (setName(val), setState(AppState.Main))} />
        case AppState.Main:
            return <Main name={name} src={video} session={session} />
        default:
            throw new TypeError('Invalid application state')
    }
}
