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
//返回上一页
.directive('goBack',['$ionicHistory',
  function($ionicHistory){
    return {
      restrict:'AE',
      template:'<button class="button button-icon icon ion-ios-arrow-back" ng-click="goBack()"></button>',
      controller:function($scope,$element){
        $scope.goBack = function(){
          $ionicHistory.goBack();
        }
      },
      replace:true,
    }
  }
])
//呼叫客服
.directive('callbq',['$window',
  function($window){
    return{
      restrict:'AE',
      template:'<p class="question" ng-click = "call()">操作遇到问题？请联系 <span class="callbq">倍全客服</span></p>',
      controller:function($scope,$element){
          $scope.call = function(){
            $window.location.href="tel:" + '400-070-0707';
          }
      },
      replace:true,
    };
  }
])


.directive('goodsimg', function() {
  return {
    restrict: 'A',
    scope:{
      bqSrc:'='
    },
    link: function(scope, elem, attrs) {
     if(scope.bqSrc && scope.bqSrc.indexOf("http://static.bqmart.cn/")==-1){
       if(scope.bqSrc.indexOf("http://img.bqmart.cn/")==-1){
          //scope.bqSrc="http://img.bqmart.cn/" + scope.bqSrc;
          scope.bqSrc="http://static.bqmart.cn/" + scope.bqSrc + "@";
        //http://static.bqmart.cn/data/files/store/355bfd662c3d156e4f7c490ef80a1415.jpg@2000w_8Q
        }
        else
        {
          scope.bqSrc = scope.bqSrc.replace("img","static") + "@";
        }
        var ratio = (typeof (window.devicePixelRatio) == 'number') ? 2 : 1;
        var dim = [elem.width(), elem.height()];
        if ( dim[0] >= dim[1] ) {
          scope.bqSrc += dim[0]>0 ? dim[0]*ratio+'w_': '';
        } else {
          scope.bqSrc += dim[1]>0 ? dim[1]*ratio+'h_': '';
        }
        scope.bqSrc += '90Q.jpg';
      }
        elem.bind('error', function() {
          if (attrs.src != './img/product.jpg') {
            attrs.$set('src', './img/product.jpg');
          }
        });
    }
  };
})
.directive('errSrc',function() {
  return {
    link: function(scope,element,attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  }
})
.directive('qrcodeimg', function() {
  return {
    restrict: 'A',
    scope:{
      sku:'='
    },
    link: function(scope, elem, attrs) {
      elem.qrcode({
        render: "table", //table方式
        width: 200, //宽度
        height:200, //高度
        text: scope.$parent.$parent.sku //任意内容
    });
    }
  };
})
.directive('keepScroll', ['$state','$timeout','ScrollPositions','$ionicScrollDelegate',

  function($state, $timeout, ScrollPositions, $ionicScrollDelegate){
    return{
      restrict: 'A',
      link:function(scope, element, attrs){
        scope.$on('$stateChangeStart',function(){
          ScrollPositions[$state.current.name] = $ionicScrollDelegate.getScrollPosition();
        });
        $timeout(function(){
          offset = ScrollPositions[$state.current.name];
          $ionicScrollDelegate.scrollTo(offset.left, offset.top,false);
        },0)
       }
    }
  }])
.factory('ScrollPositions', [

 {}

])
.directive('autofocusme', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    link : function($scope, $element) {
      $timeout(function() {
        $element[0].focus();
      });
    }
  }
}])
.directive('autoFocus', function() {
  return {
    restrict: 'A',
    require: '^^ionNavView',
    link: function(scope, el, attrs, ctrl) {
      ctrl.scope.$on('$ionicView.afterEnter', function() {
        el[0].focus();
      });
    }
  };
})
.directive('dateFormat', ['$filter',function($filter) {
    var dateFilter = $filter('date');
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {

            function formatter(value) {
                return dateFilter(value, 'yyyy-MM-dd'); //format
            }

            function parser() {
                return ctrl.$modelValue;
            }

            ctrl.$formatters.push(formatter);
            ctrl.$parsers.unshift(parser);

        }
    };
}])
.directive('moneyFormart', function($filter) {
    var dateFilter = $filter('date');
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {

            function formatter(value) {
                return dateFilter(value, 'yyyy-MM-dd'); //format
            }

            function parser() {
                return ctrl.$modelValue;
            }

            ctrl.$formatters.push(formatter);
            ctrl.$parsers.unshift(parser);

        }
    };
})

.directive('myp', function($compile, $parse) {
  return {
    restrict: 'E',
    link: function(scope, element, attr) {
      scope.$watch(attr.content, function() {
        element.html($parse(attr.content)(scope));
        $compile(element.contents())(scope);
      }, true);
    }
  }
})
.directive('autoListDivider', function($timeout) {
  var lastDivideKey = "";

  return {
    link: function(scope, element, attrs) {
      var key = attrs.autoListDividerValue;

      var defaultDivideFunction = function(k){
        return k.slice( 0, 1 ).toUpperCase();
      }

      var doDivide = function(){
        var divideFunction = scope.$apply(attrs.autoListDividerFunction) || defaultDivideFunction;
        var divideKey = divideFunction(key);

        if(divideKey != lastDivideKey) {
          var contentTr = angular.element("<div class='item item-divider'>"+divideKey+"</div>");
          element[0].parentNode.insertBefore(contentTr[0], element[0]);
        }

        lastDivideKey = divideKey;
      }

      $timeout(doDivide,0)
    }
  }
})

.directive('ionicCatePicker', ['$ionicPopup', '$timeout','$ionicScrollDelegate','$ionicModal','bqcatelist', function ($ionicPopup, $timeout, $ionicScrollDelegate,$ionicModal,bqcatelist) {
  return {
    restrict: 'AE',
    template:  '<input type="text"  placeholder={{vm.placeholder}} ng-model="catedata"  class={{vm.cssClass}} readonly>',
    scope: {
      catedata: '=',
      backdrop:'@',
      backdropClickToClose:'@',
      buttonClicked: '&',
      bqCateId:'=',
    },
    link: function (scope, element, attrs) {
        var vm=scope.vm={},catepickerModel=null;
        //根据城市数据来 设置Handle。
        vm.cate1Handle="cate1Handle"+attrs.catedata;
        vm.cate2Handle="cate2Handle"+attrs.catedata;
        vm.cate3Handle="cate3Handle"+attrs.catedata;
        vm.placeholder=attrs.placeholder || "请选择分类";
        vm.okText=attrs.okText || "确定";
        vm.title = attrs.title || "商品分类";
        vm.cssClass=attrs.cssClass;
        vm.barCssClass=attrs.barCssClass || "bar-dark";
        vm.backdrop=scope.$eval(scope.backdrop) || false;
        vm.backdropClickToClose=scope.$eval(scope.backdropClickToClose) || false;
        vm.cateData=bqcatelist.allcateList;//scope.allcateList;//CatePickerService.cateList;
        vm.tag=attrs.tag || "-";
        vm.returnOk=function(){
          catepickerModel && catepickerModel.hide();
          scope.buttonClicked && scope.buttonClicked();
        }
        vm.clickToClose=function(){
          vm.backdropClickToClose && catepickerModel && catepickerModel.hide();
        }
        vm.getData=function(name){
          $timeout.cancel(vm.scrolling);//取消之前的scrollTo.让位置一次性过渡到最新
          $timeout.cancel(vm.dataing);//取消之前的数据绑定.让数据一次性过渡到最新
          switch(name)
          {
            case 'cate1':
              if (!vm.cateData) return false;
              var cate1=true,length=vm.cateData.length,Handle=vm.cate1Handle,HandleChild=vm.cate2Handle;
            break;
            case 'cate2':
              if (!vm.cate1.sub) return false;
              var cate2=true,length=vm.cate1.sub.length,Handle=vm.cate2Handle,HandleChild=vm.cate3Handle;
            break;
            case 'cate3':
              if (!vm.cate2.sub) return false;
              var cate3=true,Handle=vm.cate3Handle,length=vm.cate2.sub.length;
            break;
          }
          var top= $ionicScrollDelegate.$getByHandle(Handle).getScrollPosition().top;//当前滚动位置
          var index = Math.round(top / 36);
          if (index < 0 ) index =0;//iOS bouncing超出头
          if (index >length-1 ) index =length-1;//iOS bouncing超出尾
          if (top===index*36 ) {
            vm.dataing=$timeout(function () {
                cate1 && (vm.cate1=vm.cateData[index],vm.cate2={},(vm.cate1.sub && (vm.cate2=vm.cate1.sub[0])),vm.cate3={},(vm.cate2 && vm.cate2.sub && (vm.cate3=vm.cate2.sub[0])));//处理省市乡联动数据
                cate2 &&  (vm.cate2=vm.cate1.sub[index],vm.cate3={},(vm.cate2 && vm.cate2.sub && (vm.cate3=vm.cate2.sub[0])));//处理市乡联动数据
                cate3 &&  (vm.cate3=vm.cate2.sub[index]);//处理乡数据
                HandleChild && $ionicScrollDelegate.$getByHandle(HandleChild).scrollTop();//初始化子scroll top位
                //数据同步
                (vm.cate2&&vm.cate2.sub && vm.cate2.sub.length>0) ? (scope.catedata=vm.cate1.cate_name +vm.tag+  vm.cate2.cate_name+vm.tag+vm.cate3.cate_name ) : (vm.cate1.sub && vm.cate1.sub.length>0) ? (scope.catedata=vm.cate1.cate_name +vm.tag+  vm.cate2.cate_name) : (scope.catedata=vm.cate1.cate_name)
                scope.bqCateId.cate1_id = vm.cate1 ? vm.cate1.cate_id : 0;
                scope.bqCateId.cate2_id = vm.cate2 ? vm.cate2.cate_id : 0;
                scope.bqCateId.cate3_id = vm.cate3 ? vm.cate3.cate_id : 0;
            },150)
          }else{
            vm.scrolling=$timeout(function () {
             $ionicScrollDelegate.$getByHandle(Handle).scrollTo(0,index*36,true);
            },150)
          }

        }

        element.on("click", function () {
            //零时处理 点击过之后直接显示不再创建
            if (!attrs.checked) {
              catepickerModel && catepickerModel.remove();
            }else{
              catepickerModel && catepickerModel.show();
              return
            }
            attrs.checked=true;
            $ionicModal.fromTemplateUrl('./templates/cate-picker-modal.html', {
              scope: scope,
              animation: 'slide-in-up',
              backdropClickToClose:vm.backdropClickToClose
            }).then(function(modal) {
              catepickerModel = modal;
              //初始化 先获取数据后展示
              $timeout(function () {
                vm.getData('cate1');
                catepickerModel.show();
              },100)
            })
        })
        //销毁模型
        scope.$on('$destroy', function() {
          catepickerModel && catepickerModel.remove();
        });
    }
  }
}])
.directive('fly', function() {
  return {
    restrict: 'AC',
    scope:{
      bqSrc:'=',
      bqSeller:'='
    },
    link: function(scope, elem, attrs) {
      var offset = $("#end").offset();
      var flyimg = (scope.bqSrc == "") ? "./img/product.jpg" : scope.bqSrc;
      //elem.on('cclick', function (event) {
      scope.$on('cclick', function (event,data) {
        if(scope.bqSeller == data.seller){
          var flyer = $('<img class="u-flyer"src="' + flyimg + '"/>');
          var dd = data;
          flyer.fly({
            start: {
              left: data.x,//event.pageX,
              top: data.y,//event.pageY
            },
            end: {
              left: offset.left,
              top: offset.top,
              width: 20,
              height: 20
            },
            autoPlay: true, //是否直接运动,默认true
            speed: 1.2, //越大越快，默认1.2
            vertex_Rtop:100, //运动轨迹最高点top值，默认20
            onEnd:function(){
              this.destroy();
            } //结束回调
          });
        }
      });
    }
  };
})
.directive('stockisempty',function(){
  return {
    restrict: 'AC',
    scope:{
      saller:'=',
    },
    link:function(scope,elem,attrs){
      for(var i=0,j=0;i<scope.saller.length;i++){
        if(scope.saller[i].stock < scope.saller[i].good_para + scope.saller[i].added_quantity){
          j++;
        }
      }
      if(j==i){
        elem.append('<img src="img/outstock_tag.png" style="width: 80px;position: absolute;top: 24px;left: 8px;" />');
      }
      scope.$on('outstock', function (event,data) {
        for(var i=0,j=0;i<scope.saller.length;i++){
          if(scope.saller[i].stock < scope.saller[i].good_para + scope.saller[i].added_quantity){
            j++;
          }
        }
        if(j==i){
          elem.append('<img src="img/outstock_tag.png" style="width: 80px;position: absolute;top: 24px;left: 8px;" />');
        }
      })
    }
  };
})
.directive('stockisemptyG',function(){
  return {
    restrict: 'AC',
    scope:{
      bqGoods:'=',
    },
    link:function(scope,elem,attrs){
        if(scope.bqGoods.stock < scope.bqGoods.good_para + scope.bqGoods.added_quantity){
          elem.append('<img src="img/outstock_tag.png" style="width: 80px;position: absolute;top: 24px;left: 8px;" />');
        }
        scope.$on('outstockg', function (event,data) {
          if(scope.bqGoods == data.goods)
            elem.append('<img src="img/outstock_tag.png" style="width: 80px;position: absolute;top: 24px;left: 8px;" />');
        })
    }
  };
})
.directive('flyG', function() {
  return {
    restrict: 'AC',
    scope:{
      bqSrc:'=',
      bqGoods:'='
    },
    link: function(scope, elem, attrs) {
      var offset = $("#endG").offset();
      var flyimg = (scope.bqSrc == "") ? "./img/product.jpg" : scope.bqSrc;
      //elem.on('cclick', function (event) {
      scope.$on('ccclick', function (event,data) {
        if(scope.bqGoods == data.goods){
          var flyer = $('<img class="u-flyer"src="' + flyimg + '"/>');
          var dd = data;
          flyer.fly({
            start: {
              left: data.x,//event.pageX,
              top: data.y,//event.pageY
            },
            end: {
              left: offset.left,
              top: offset.top,
              width: 20,
              height: 20
            },
            autoPlay: true, //是否直接运动,默认true
            speed: 1.2, //越大越快，默认1.2
            vertex_Rtop:100, //运动轨迹最高点top值，默认20
            onEnd:function(){
              this.destroy();
            } //结束回调
          });
        }
      });
    }
  };
})
.directive('imgauto', function($timeout) {
  return {
    restrict: 'AC',
    scope:{},
    link: function(scope, elem, attrs) {
      var width = elem.width();
      elem.css("height",width+'px' );
      scope.$on('showcate', function (event,data) {
        if(data.showcate){
          var width = elem.width() * 3/4 - 4;
          elem.css("height",width+'px' );
        }else{
          var width = elem.width() * 4/3 + 5;
          elem.css("height",width+'px' );
        }
        elem.addClass("dinghuoheight");
      })
      // var width = elem.width();
      // var height = elem.height();
      // if(width > height){
      //   //elem.css("height",width+'px' );
      // }
      // else{
      //   elem.css("height",width+'px' );
      //   elem.css("width", width*width/height +'px');
      // }
    }
  }
})
//线下收银记录列表
.directive('cashOrderList',function(){
	return{
		restrict:'AE',
		templateUrl:'',
		scope:{
			orderList: '='
		},

	}
});
