'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var A = function A($scope) {
  'ngInject';

  classCallCheck(this, A);
  $scope.a = '111';
};
A.$inject = ["$scope"];

var HelloCtrl = function () {
  HelloCtrl.$inject = ["$scope", "HelloAccount", "$rcTableDelegate", "$rcModal"];
  function HelloCtrl($scope, HelloAccount, $rcTableDelegate, $rcModal) {
    'ngInject';

    classCallCheck(this, HelloCtrl);
    $scope.a = '';
  }

  createClass(HelloCtrl, [{
    key: 'updateDate',
    value: function updateDate() {
      this.search.date = {
        startDate: moment(),
        endDate: moment().add(1, 'months')
      };
    }
  }, {
    key: 'init',
    value: function init() {
      var _this = this;

      this._HelloAccount.getInfo().then(function (res) {
        var code = res.code,
            data = res.data;

        if (code === 0) {
          _this.arrAccounts = data || [];
        }
      });
    }
  }, {
    key: 'onSearch',
    value: function onSearch() {
      console.log(this.search);
      this._$rcTableDelegate.$getByHandle('helloTable').refresh('search');
    }
  }]);
  return HelloCtrl;
}();

angular.module('rrc.page.helloWorld.hello', []).controller('HelloCtrl', HelloCtrl).controller('ACtrl', A).name;

angular.module('starter.directives', []).directive('htmlString', function () {
  return function (scope, el, attr) {
    if (attr.htmlString) {
      scope.$watch(attr.htmlString, function (html) {
        el.html(html || '');
      });
    }
  };
}).directive('goCloud', ["$state", "$http", "loading", function ($state, $http, loading) {
  return {
    link: function link(scope, elem, attrs) {
      $(elem).click(function () {
        loading.show();

        $http.get(domain_cloud + 'has/auth' + '?storeId=' + localStorage.getItem('store_id'), {}).then(function (res) {
          if (res.data.code == 0 && res.data.data.hasAuth == 1) {
            window.location.href = 'cloud/www/index_app.html?' + localStorage.getItem('store_id') + '/' + localStorage.getItem('user_name');
          } else {
            $state.go('auth/cloud-buyer');
          }
        }, function (err) {}).finally(function () {
          loading.hide();
        });
      });
    }
  };
}]);
//# sourceMappingURL=index.js.map
