# rollup-pulgin-ng1-annotate

> 解决 angularjs 1 的依赖注入 在 es6 和 普通的代码的可以使用  Add angularjs dependency injection annotations with ng-annotate

## Install

```js
$ npm i rollup-pulgin-ng1-annotate -D
of
$ yarn add rollup-pulgin-ng1-annotate -D
```

## Usage

> 如果是es6 必须写在babel 插件之后【__If it is es6 must after Babel__】
> see demo [examples/test.es6.js or examples/test.js]

``` js
import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import {resolve} from 'path'
export default {
  format: 'cjs',
  entry: resolve(__dirname, './test.es6.js'),
  dest: resolve(__dirname, './dist/index.js'),
  plugins: [
    babel({
       exclude: 'node_modules/**'
    }),
    nodeResolve(),
    commonjs(),
    ng()
  ]
}
```

### 来自 ng-annotate docs

> ng-annotate supports ES5 as input so run it with the output from Babel, Traceur, TypeScript (tsc) and the likes. Use __"ngInject"__ on functions you want annotated. Your transpiler should preserve directive prologues, if not please file a bug on it.

```js
'use strict'
import A from './1.es6.js'
class HelloCtrl {
    constructor($scope, HelloAccount, $rcTableDelegate, $rcModal) {
      'ngInject';
      $scope.hello = ''
      this.b = ''
    }

    init() {
    }
}
```

## Options

You can pass any of the [ng-annotate](https://github.com/olov/ng-annotate/blob/master/OPTIONS.md) options as an object:

```js
  {
    include: '**/*.js',
    exclude: '',
    // see [ng-annotate] options https://github.com/olov/ng-annotate/blob/master/OPTIONS.md
    ngConfig: {
      add: true
    }
  }
```

## 最后ng1 已经是过去式了, 如果可以升级 到ng2 或者换到 vue2
