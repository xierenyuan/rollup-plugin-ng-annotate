import { createFilter } from 'rollup-pluginutils'
import ngAnnotate from 'ng-annotate'
import assign from 'lodash.assign'
const DEFAULT_CONFIG = {
  // ngAnnotate 配置 see https://github.com/olov/ng-annotate
  ngConfig: {
    add: true
  }
}
export default function ng1Annotate(options = DEFAULT_CONFIG) {
  options = assign(DEFAULT_CONFIG, options)
  const filter = createFilter(options.include || '**/*.js', options.exclude)

  return {
    name: 'ngAnnotate',
    transform(code, id) {
      if(!filter(id)){
        return
      }
      console.log(code)
      const { src, map } = ngAnnotate(code, { add: true })
      return {
        code: src,
        map: { mappings: '' }
      }
    }
  }
}
