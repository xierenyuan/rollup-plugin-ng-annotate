import { createFilter } from 'rollup-pluginutils'
import assign from 'lodash.assign'
import NgAnnotate from './parse'
const DEFAULT_CONFIG = {
  // ngAnnotate 配置 see https://github.com/olov/ng-annotate
  ngConfig: {
    add: true
  }
}
export default function ng1(options = DEFAULT_CONFIG) {
  options = assign(DEFAULT_CONFIG, options)
  const ng = new NgAnnotate(options)
  const filter = createFilter(options.include || '**/*.js', options.exclude)

  return {
    name: 'ngAnnotate',
    options(opts) {
      if (opts && opts.sourceMap) {
        ng.enableSourceMap()
      }
    },
    transformBundle(source){
      return ng.parse(source)
    }
  }
}

