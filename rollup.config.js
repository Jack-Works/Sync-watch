import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import replace from 'rollup-plugin-replace'

/** @type{import("rollup").RollupOptions} */
const config = {
    input: './src/extension.tsx',
    output: {
        file: './extension/out.js',
        format: 'es',
    },
    plugins: [
        nodeResolve({
            browser: true,
            preferBuiltins: false,
        }), //
        postcss(),
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'document.head.appendChild':
                '(() => window.shadowRoot || {appendChild: () => {}, removeChild: () => {}})().appendChild',
            'document.head.removeChild':
                '(() => window.shadowRoot || {appendChild: () => {}, removeChild: () => {}})().removeChild',
            "var head = document.head || document.getElementsByTagName('head')[0];\n  var style": `
            if (!window.shadowRoot) { return setTimeout(() => styleInject(css, ref), 200) }
            var head = window.shadowRoot
            var style`,
        }),
        typescript({ tsconfigOverride: { compilerOptions: { jsx: 'react', isolatedModules: false, allowJs: true } } }),
        commonjs({
            extensions: ['.js', '.ts', '.tsx'],
            namedExports: {
                react: ['useState', 'useRef', 'useImperativeHandle', 'forwardRef', 'useEffect'],
                events: ['EventEmitter'],
            },
        }),
    ],
}

export default config
