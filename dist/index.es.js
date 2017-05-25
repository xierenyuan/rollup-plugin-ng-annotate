import { createFilter } from 'rollup-pluginutils';
import ngAnnotate from 'ng-annotate';
import assign from 'lodash.assign';

var DEFAULT_CONFIG = {
  // ngAnnotate 配置 see https://github.com/olov/ng-annotate
  ngConfig: {
    add: true
  }
};
function ngAnnotate$1(options) {
  if ( options === void 0 ) options = DEFAULT_CONFIG;

  options = assign(DEFAULT_CONFIG, options);
  var filter = createFilter(options.include || '**/*.vue', options.exclude);

  return {
    name: 'ngAnnotate',
    transform: function transform(code, id) {
      if(!filter(id)){
        return
      }
      var ref = ngAnnotate$1(code, { add: true });
      var src = ref.src;
      var map = ref.map;
      return {
        code: src,
        map: { mappings: '' }
      }
    }
  }
}

export default ngAnnotate$1;
