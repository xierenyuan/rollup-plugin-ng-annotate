'use strict'
import A from './1.es6.js'
class HelloCtrl {
    /*@ngInject*/
    constructor($scope, HelloAccount, $rcTableDelegate, $rcModal) {
      'ngInject';
      $scope.a = ''
    }

    updateDate() {
        this.search.date = {
            startDate: moment(),
            endDate: moment().add(1, 'months')
        };
    }

    init() {
        this._HelloAccount.getInfo().then(res => {
            let { code, data } = res;
            if (code === 0) {
                this.arrAccounts = data || [];
            }
        });
    }

    onSearch() {
        console.log(this.search);
        this._$rcTableDelegate.$getByHandle('helloTable').refresh('search');
    }
}
angular.module('rrc.page.helloWorld.hello', [])
    .controller('HelloCtrl', HelloCtrl)
    .controller('ACtrl', A)
    .name;



angular.module('starter.directives', [])


//输出html string
.directive('htmlString' , function(){
  return function(scope , el , attr){
    if(attr.htmlString){
      scope.$watch(attr.htmlString , function(html){
        el.html(html || '');//更新html内容
      });
    }
  };
})

// 云采订货
.directive('goCloud', function($state,$http,loading){
  return {
    link: function(scope, elem, attrs){
      $(elem).click(function(){
        loading.show();
        // 判断是否授权过
        $http.get(domain_cloud+'has/auth'+'?storeId='+localStorage.getItem('store_id'),{
          }).then(function(res) {
            if(res.data.code == 0 && res.data.data.hasAuth==1){
              // 已授权 直接跳转至云采
              window.location.href = 'cloud/www/index_app.html?'
                                    +localStorage.getItem('store_id')+'/'
                                    +localStorage.getItem('user_name');
            }
            else{
              // 未授权 跳转至授权
              $state.go('auth/cloud-buyer');
            }
          },function(err){

          }).finally(function () {
            loading.hide();
          });
        });
      }
    }
  })
