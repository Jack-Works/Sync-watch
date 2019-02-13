import './index.css'
import '../public/servers'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Theme as UWPThemeProvider, getTheme } from 'react-uwp/Theme'
import { ThemeConfig } from 'react-uwp/styles/getTheme'
import Application from './Comps/Application'
import { GlobalToast } from './Comps/utils'
import Button from 'react-uwp/Button'

function App(props: { video: HTMLVideoElement }) {
    return (
        <UWPThemeProvider
            theme={{
                ...getTheme({
                    themeName: 'dark',
                    useFluentDesign: true,
                } as ThemeConfig),
                fonts: {
                    sansSerifFonts:
                        'NO-Segoe UI, Microsoft YaHei, Open Sans, sans-serif, Hiragino Sans GB, Arial, Lantinghei SC, STHeiti, WenQuanYi Micro Hei, SimSun',
                    segoeMDL2Assets: 'Segoe MDL2 Assets',
                },
            }}>
            <Application workWith={props.video} />
            <GlobalToast />
        </UWPThemeProvider>
    )
}

const container = document.createElement('div')
container.style.position = 'absolute'
container.style.bottom = '0'
container.style.right = '0'
document.body.append(container)
const shadowRoot = container.attachShadow({ mode: 'open' })
;(window as any).shadowRoot = shadowRoot

function Switch() {
    const [video, setVideo] = useState<HTMLVideoElement>(null as any)
    if (video) return <App video={video} />
    return (
        <UWPThemeProvider
            theme={getTheme({
                themeName: 'light',
                desktopBackgroundImage: 'https://sync-watch.vola.xyz/abstract-3205415_1920.jpg',
            } as ThemeConfig)}>
            <Button
                onClick={() => {
                    const video = document.querySelector('video') as HTMLVideoElement
                    container.style.width = '30vw'
                    container.style.height = '100vh'
                    container.style.zIndex = '1000'
                    container.style.background = 'black'
                    container.dataset.syncWatch = 'extension'
                    const player = document.querySelector('.player') as HTMLDivElement
                    player.style.position = 'absolute'
                    player.style.width = '70vw'
                    player.style.left = '0'
                    player.style.top = '0'
                    player.style.zIndex = '1000000'
                    document.body.style.overflow = 'hidden'
                    ;(document.querySelector('.bilibili-player-video-btn-widescreen') as HTMLDivElement).style.display =
                        'none'
                    ;(document.querySelector('.bilibili-player-video-web-fullscreen') as HTMLDivElement).style.display =
                        'none'
                    setVideo(video)

                    // setTimeout(() => {
                    //     const styles = [...document.querySelectorAll('style')]
                    //         .filter(
                    //             x =>
                    //                 x &&
                    //                 x.innerText &&
                    //                 (x.innerText.match('theme-root') || x.innerText.match('text-box-input')),
                    //         )
                    //         .map(x => x.innerText)
                    //         .reduce((x, y) => x + y)
                    //     setStyle(styles)
                    // }, 200)
                }}>
                打开 Sync watch
            </Button>
        </UWPThemeProvider>
    )
}
ReactDOM.render(<Switch />, shadowRoot as any)
