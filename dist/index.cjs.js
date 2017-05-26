'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var rollupPluginutils = require('rollup-pluginutils');
var assign = _interopDefault(require('lodash.assign'));
var ngAnnotate = _interopDefault(require('ng-annotate'));

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
  var filter = rollupPluginutils.createFilter(options.include || '**/*.js', options.exclude);

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

module.exports = ng1;
