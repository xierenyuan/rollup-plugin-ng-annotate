import ng from '../src/index.js'
import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import {resolve} from 'path'
export default {
  format: 'cjs',
  entry: resolve(__dirname, './test.es6.js'),
  dest: resolve(__dirname, './dist/index.js'),
  sourceMap: true,
  plugins: [
    babel({
       exclude: 'node_modules/**'
    }),
    nodeResolve(),
    commonjs(),
    ng()
  ]
}

