import DialogCtrl from './dialog.controller';
import temp from './hello.dailog.html';
class HelloCtrl {
    constructor($scope, HelloAccount, $rcTableDelegate, $rcModal) {
        'ngInject';
        this.name = 'hello word hahaha';
        this._HelloAccount = HelloAccount;
        this._$rcTableDelegate = $rcTableDelegate;
        this._$rcModal = $rcModal;
        this.search = {
            date: { startDate: moment(), endDate: moment() }
        };
        this.init();
        this.dateConfig = {
            locale: {
                format: 'YYYY-MM'
            }
        };
        //helloTable
        $scope.onCloseA = () => {
            console.log('呵呵哒', this.search.account_ids);
        };

        this.pageSize = 10;
        this.list = [];
        this.selected = [];

        this.callServer = (tableState) => {
            let { pagination: { start, number = 10 }, sort: { predicate, reverse }, search: { predicateObject } } = tableState;
            let params = {};
            params.size = number;
            params.page = (start / number) + 1;
            if (predicate) {
                params.column = predicate;
                params.sort = reverse ? 'desc' : 'asc';
            }
            Object.assign(params, this.search);
            delete params.campaign_ids;
            //筛选框值
            if (angular.isObject(params.plan)) {
                params.group_flag = params.plan.flag;
                params.group_name = params.plan.name;
                delete params.plan;
            }
            if (_.isObject(params.account_ids)) {
                params.account_ids = params.account_ids.map(item => {
                    return item.account_id;
                });
            }

            // Unit.getList(params, { isMask: true }).then(res => {
            //     let { code, data } = res;
            //     if (code === 0) {
            //         this.list = data || [];
            //         //分页
            //         Object.assign(params, { total: 1 });
            //         Unit.getList(params, { isMask: false }).then(totalRes => {
            //             let { code: pageCode, data: total } = totalRes;
            //             if (pageCode === 0) {
            //                 tableState.pagination.numberOfPages = Math.ceil(total / number);
            //             }
            //         });
            //     }
            // });
        };
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

    openDialog(item) {
        console.log(item);
        this._$rcModal.open({
            templateUrl: temp,
            controller: DialogCtrl,
            resolve: {
                aiRu: () => {
                    return item;
                }
            }
        }).then(res => {
            console.log(res);
        });
    }

}
angular.module('rrc.page.helloWorld.hello', [])
    .controller('HelloCtrl', HelloCtrl)
    .name;
