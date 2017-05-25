import ng from '../src/index.js'
import babel from 'rollup-plugin-babel'
import {resolve} from 'path'
export default {
  entry: resolve(__dirname, './test.es6.js'),
  dest: resolve(__dirname, './dist/index.js'),
  plugins: [
    babel(),
    ng()
  ]
}

