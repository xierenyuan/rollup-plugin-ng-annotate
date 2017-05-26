import MagicString from 'magic-string'
import ngAnnotate from 'ng-annotate'

class NgAnnotate {
  constructor(options = {}) {
    this.options = options
    this.sourceMap = false
  }

  enableSourceMap() {
    this.sourceMap = true
  }

  parse(code) {
    const magicString = new MagicString(code)
    let source = {
      code: code
    }
    try {
      const { src, map } = ngAnnotate(code, this.options.ngConfig)
      if (src) {
        source.code = src
      }
      if (this.sourceMap) {
        source.map = magicString.generateMap({
          hires: true
        })
      }
    } catch (error) {
      console.error(error)
    }
    return source
  }

}

export default NgAnnotate
