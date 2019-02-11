import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Theme as UWPThemeProvider, getTheme } from 'react-uwp/Theme'
import { ThemeConfig } from 'react-uwp/styles/getTheme'
import Application from './Comps/Application'
import { GlobalToast } from './Comps/utils'

function App() {
    return (
        <UWPThemeProvider
            theme={{
                ...getTheme({
                    useFluentDesign: true,
                    desktopBackgroundImage: '/abstract-3205415_1920.jpg',
                    // useInlineStyle: true,
                    themeName: 'dark',
                } as ThemeConfig),
                fonts: {
                    sansSerifFonts:
                        'NO-Segoe UI, Microsoft YaHei, Open Sans, sans-serif, Hiragino Sans GB, Arial, Lantinghei SC, STHeiti, WenQuanYi Micro Hei, SimSun',
                    segoeMDL2Assets: 'Segoe MDL2 Assets',
                },
            }}>
            <Application />
            <GlobalToast />
        </UWPThemeProvider>
    )
}
ReactDOM.render(<App />, document.getElementById('root'))
