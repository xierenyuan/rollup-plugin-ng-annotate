'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var rollupPluginutils = require('rollup-pluginutils');
var ngAnnotate = _interopDefault(require('ng-annotate'));
var assign = _interopDefault(require('lodash.assign'));

var DEFAULT_CONFIG = {
  // ngAnnotate 配置 see https://github.com/olov/ng-annotate
  ngConfig: {
    add: true
  }
};
function ng1(options) {
  if ( options === void 0 ) options = DEFAULT_CONFIG;

  options = assign(DEFAULT_CONFIG, options);
  var filter = rollupPluginutils.createFilter(options.include || '**/*.js', options.exclude);

  return {
    name: 'ngAnnotate',
    transform: function transform(code, id) {
      if(!filter(id)){
        return
      }
      console.log('sourece ...................................', code);
      var ref = ngAnnotate(code, { add: true });
      var src = ref.src;
      var map = ref.map;
      var a = src || '失败';
      console.log(("ngAnnotate .................................. " + a));
      return {
        code: src || code,
        map: { mappings: '' }
      }
    }
  }
}

module.exports = ng1;
