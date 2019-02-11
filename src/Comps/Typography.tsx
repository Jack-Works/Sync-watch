import React, { ReactNode } from 'react'
import PropTypes from 'prop-types'
import { ThemeType } from 'react-uwp'

export function TypographySpan(props: React.CSSProperties = {}) {
    return <div style={{ margin: 6, ...props }} />
}
export default class Typography extends React.Component<{
    children: (typograpy: Exclude<ThemeType['typographyStyles'], undefined>, theme: ThemeType) => ReactNode
    withSpan?: boolean | number
}> {
    static contextTypes = { theme: PropTypes.object }
    context!: { theme: ThemeType }
    render() {
        const child = this.props.children(this.context.theme.typographyStyles!, this.context.theme)
        if (this.props.withSpan)
            return (
                <>
                    {child}
                    <TypographySpan {...(this.props.withSpan === true ? {} : { margin: this.props.withSpan })} />
                </>
            )
        return child
    }
}
