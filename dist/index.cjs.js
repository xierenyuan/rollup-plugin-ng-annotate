'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var rollupPluginutils = require('rollup-pluginutils');
var assign = _interopDefault(require('lodash.assign'));
var MagicString = _interopDefault(require('magic-string'));
var ngAnnotate = _interopDefault(require('ng-annotate'));

var NgAnnotate = function NgAnnotate(options) {
  if ( options === void 0 ) options = {};

  this.options = options;
  this.sourceMap = false;
};

NgAnnotate.prototype.enableSourceMap = function enableSourceMap () {
  this.sourceMap = true;
};

NgAnnotate.prototype.parse = function parse (code) {
  var magicString = new MagicString(code);
  var source = {
    code: code
  };
  try {
    var ref = ngAnnotate(code, this.options.ngConfig);
      var src = ref.src;
      var map = ref.map;
    if (src) {
      source.code = src;
    }
    if (this.sourceMap) {
      source.map = magicString.generateMap({
        hires: true
      });
    }
  } catch (error) {
    console.error(error);
  }
  return source
};

var DEFAULT_CONFIG = {
  // ngAnnotate 配置 see https://github.com/olov/ng-annotate
  ngConfig: {
    add: true
  }
};
function ng1(options) {
  if ( options === void 0 ) options = DEFAULT_CONFIG;

  options = assign(DEFAULT_CONFIG, options);
  var ng = new NgAnnotate(options);
  var filter = rollupPluginutils.createFilter(options.include || '**/*.js', options.exclude);

  return {
    name: 'ngAnnotate',
    options: function options(opts) {
      if (opts && opts.sourceMap) {
        ng.enableSourceMap();
      }
    },
    transformBundle: function transformBundle(source){
      return ng.parse(source)
    }
  }
}

module.exports = ng1;
