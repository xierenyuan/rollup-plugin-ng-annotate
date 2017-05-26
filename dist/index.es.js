import { createFilter } from 'rollup-pluginutils';
import assign from 'lodash.assign';
import ngAnnotate from 'ng-annotate';

function Parse(code) {
  var source = code;
  try {
    var ref = ngAnnotate(code, { add: true });
    var src = ref.src;
    var map = ref.map;
    if (src) {
       source = src;
    }
  } catch (error) {
    console.error(error);
  }
  return source
}

var DEFAULT_CONFIG = {
  // ngAnnotate 配置 see https://github.com/olov/ng-annotate
  ngConfig: {
    add: true
  }
};
function ng1(options) {
  if ( options === void 0 ) options = DEFAULT_CONFIG;

  options = assign(DEFAULT_CONFIG, options);
  var filter = createFilter(options.include || '**/*.js', options.exclude);

  return {
    name: 'ngAnnotate',
    transformBundle: function transformBundle(source){
      return {
        code: Parse(source),
        map: { mappings: '' }
      }
    }
  }
}

export default ng1;
