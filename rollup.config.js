import typescript from 'rollup-plugin-typescript2';
import scss from 'rollup-plugin-scss';
import ejs from 'rollup-plugin-emit-ejs';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

const generateConfig = (name) => ({
    input: `src/${name}/ts/index.ts`,
    output: {
        file: `output/${name}/index.js`,
        format: 'es',
    },
    sourcemap: 'inline',
    plugins: [
        typescript(),
        resolve(),
        commonjs(),
        json(),
        scss({
            output: `output/${name}/index.css`,
            watch: 'src/**/*.scss',
        }),
        ejs({
            src: `src/${name}/`,
            layout: 'src/common/layout.html.ejs',
            data: {
                title: name.toUpperCase(),
                css: [`/${name}/index.css`],
                js: [`/${name}/index.js`],
            },
        }),
    ],
});

export default [generateConfig('list'), generateConfig('project')];
