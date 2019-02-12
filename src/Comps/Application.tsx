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
    const [video, setVideo] = useState('https://www.youtube.com/watch?v=MOrwW6avyGU')
    const [name, setName] = useState(Math.random().toString())
    const [session, setSession] = useState('test-session' + new Date().getDate() + new Date().getHours())

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
