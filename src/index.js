import { createFilter } from 'rollup-pluginutils'
import assign from 'lodash.assign'
import parse from './parse'
const DEFAULT_CONFIG = {
  // ngAnnotate 配置 see https://github.com/olov/ng-annotate
  ngConfig: {
    add: true
  }
}
export default function ng1(options = DEFAULT_CONFIG) {
  options = assign(DEFAULT_CONFIG, options)
  const filter = createFilter(options.include || '**/*.js', options.exclude)

  return {
    name: 'ngAnnotate',
    transformBundle(source){
      return {
        code: parse(source),
        map: { mappings: '' }
      }
    }
  }
}

