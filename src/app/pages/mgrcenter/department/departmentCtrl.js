(function () {
    'use strict';

    angular.module('BlurAdmin.pages.mgrcenter.department').controller(
        'DepartmentCtrl', DepartmentCtrl);

    /** @ngInject */
    function DepartmentCtrl($scope, $uibModal, $timeout, HttpService, Alert) {

        /* 联动查询 */

        // HttpService.linkHttp(enters).then(function(response) {
        // 	console.log(response.data);

        // 	console.log($scope.enterForShow);
        // });


        // HttpService.linkHttp(depts).then(function(response) {
        // 	console.log(response.data);
        // 	console.log($scope.deptsForShow);
        // });

        // var posis = {};
        // posis.url = '/crm/manage/posisByEntity';
        // posis.method = 'GET';
        // HttpService.linkHttp(posis).then(function(response) {
        // console.log(response.data);
        // $scope.posisForShow=response.data;
        // console.log($scope.posisForShow);
        // });

        /* 以下为页面列表查询方法 */
        /* 机构查询 */
        $scope.searchEnter = {};
        $scope.searchEnter.enterCode = "";
        $scope.searchEnter.enterName = "";
        $scope.searchEnter.enterHead = "";
        $scope.searchEnter.superEnter = "";
        $scope.searchEnter.superEnterCode = "";
        $scope.searchEnter.enterAddr = "";
        $scope.searchEnter.enterTel = "";
        $scope.searchEnter.enterWeb = "";
        $scope.searchEnter.enterEmail = "";
        $scope.searchEnter.busiSumm = "";

        $scope.getChangeECode = function () {
            $scope.getEnterCode = $('#enterCode').find('option:selected')
                .text().split("|")[0];
            $scope.searchEnter.enterCode = $scope.getEnterCode;
        }

        $scope.getChangeDCode = function () {
            $scope.getDeptCode = $('#deptCode').find('option:selected').text()
                .split("|")[0];
            $scope.searchDept.deptCode = $scope.getDeptCode;
        }

        // $scope.getChangePCode = function(){
        // $scope.getPosiCode =
        // $('#posiCode').find('option:selected').text().split("|")[0];
        // $scope.searchPosi.posiCode = $scope.getPosiCode;
        // }
        /*$scope.searchEnters = function(page) {
            var opts = {};
            opts.url = '/crm/manage/entersByEntity';
            opts.method = 'GET';
            opts.params = $scope.searchEnter;
            console.log($scope.searchEnter);
            HttpService.linkHttp(opts).then(function(response) {
                console.log("请求成功");
                console.log(response);
                console.log(response.data);
                $scope.EnterRowCollection = response.data;
                $scope.entertotal = response.data.length;

            });
        }*/

        /* 部门查询 */
        $scope.searchDept = {};
        $scope.searchDept.deptCode = "";
        $scope.searchDept.deptName = "";
        $scope.searchDept.enterName = "";
        $scope.searchDept.enterCode = "";
        $scope.searchDept.superDept = "";
        $scope.searchDept.superDeptCode = "";
        $scope.searchDept.enterName = "";
        $scope.searchDept.deptMgr = "";

        $scope.search = function (page) {
            var page = page || '1';
            // var opts = {};
            // opts.url = '/crm/manage/deptsByEntity';
            // opts.method = 'GET';
            if ($scope.pageFlag === 'enters') {
                $scope.queryOptions = $scope.searchEnter
            } else if ($scope.pageFlag === 'depts') {
                $scope.queryOptions = $scope.searchDept
            }
            $scope[$scope.pageFlag].pageSize = $scope.pagination.pageSize;
            $scope[$scope.pageFlag].params = $scope.queryOptions;
            // if(this.queryPage){
                // this.queryPage(page);
                $scope.queryPage(page)
            // }else{
            //     this.$$childHead.$$childHead.queryPage(page);
            // }

        }

        /* 岗位查询 */
        /*
         * $scope.searchPosi = {}; $scope.searchPosi.posiCode = "";
         * $scope.searchPosi.posiName = ""; $scope.searchPosi.deptName = "";
         * $scope.searchPosi.superPosi = ""; $scope.searchPosi.posiDesc = "";
         *
         * $scope.searchPosis = function(){ var opts = {}; opts.url =
         * '/crm/manage/posisByEntity'; opts.method = 'GET'; opts.params =
         * $scope.searchPosi; console.log($scope.searchPosi);
         * HttpService.linkHttp(opts).then(function(response) {
         * console.log("请求成功"); console.log(response);
         * console.log(response.data); $scope.PosiRowCollection=response.data;
         *
         * console.log($scope.PosiRowCollection); });
         *  }
         */

        /* 页面初始化 */
        // $scope.searchEnters();
        // $scope.searchDepts();
        // $scope.searchPosis();

        /* 以下为信息新增方法区 */
        /* 新增机构 */
        $scope.addEnter = function () {
            if( this.queryPage && ! $scope.queryPage){
                $scope.queryPage=this.queryPage;
            }
            $uibModal
                .open({
                    animation: true,
                    backdrop: 'static',
                    templateUrl: 'app/pages/mgrcenter/department/popupPages/addEnter.html',
                    size: 'midle-900',
                    controller: 'addEnterCtrl',
                    scope: $scope,
                    resolve: {}
                }).result.then(function (result) {
                    $scope.search();
                },function(reason){
                    $scope.search();
                });
        }

        /* 新增部门 */
        $scope.addDept = function () {

            $uibModal
                .open({
                    animation: true,
                    backdrop: 'static',
                    templateUrl: 'app/pages/mgrcenter/department/popupPages/addDept.html',
                    size: 'midle-900',
                    controller: 'addDeptCtrl',
                    scope: $scope,
                    resolve: {}
                }).result.then(function (result) {

            },function(reason){

            });
        }

        /* 设置岗位 */
        $scope.setPosi = function (item) {

            $scope.deptCode = item.deptCode;

            $uibModal
                .open({
                    animation: true,
                    backdrop: 'static',
                    templateUrl: 'app/pages/mgrcenter/department/popupPages/setPosi.html',
                    size: 'midle-900',
                    controller: 'setPosiCtrl',
                    scope: $scope,
                    resolve: {}
                });
        }

        /* 新增岗位 */
        $scope.addPosi = function () {

            $uibModal
                .open({
                    animation: true,
                    backdrop: 'static',
                    templateUrl: 'app/pages/mgrcenter/department/popupPages/addPosi.html',
                    size: 'midle-1200',
                    controller: 'addPosiCtrl',
                    scope: $scope,
                    resolve: {}
                });
        }

        /* 以下为信息删除方法区 */
        /* 机构删除 */
        $scope.removeEnter = function (item) {
            if( this.queryPage && ! $scope.queryPage){
                $scope.queryPage=this.queryPage;
            }
            Alert.confirm("确定删除？").then(function () {
                var opts = {};
                opts.url = '/crm/manage/enter';
                opts.method = 'DELETE';
                opts.params = {
                    enterCode: item.enterCode
                };
                HttpService.linkHttp(opts).then(function (response) {
                    $scope.search();
                });
            });
        };

        /* 部门删除 */
        $scope.removeDept = function (item) {

            Alert.confirm("确定删除？").then(function () {
                var opts = {};
                opts.url = '/crm/manage/dept';
                opts.method = 'DELETE';
                opts.params = {
                    deptCode: item.deptCode,
                };
                HttpService.linkHttp(opts).then(function (response) {
                    $scope.search();
                });
            });
        };

        /* 岗位删除 */
        // $scope.removePosi = function(index) {
        //
        // Alert.confirm("确定删除？").then(function() {
        // var opts = {};
        // opts.url = '/crm/manage/delposi';
        // opts.method = 'PUT';
        // opts.params = {
        // posiCode : $scope.PosiRowCollection[index].posiCode,
        // posiName : $scope.PosiRowCollection[index].posiName
        // };
        // HttpService.linkHttp(opts).then(function(response) {
        // console.log("请求成功");
        // console.log(response);
        // //$scope.PosiRowCollection=$scope.searchPosis();
        // });
        // });
        // };

        /* 以下为复选删除方法区 */
        // 机构复选删除
        $scope.checked = [];
        $scope.selectAll = function () {
            if ($scope.select_all) {
                $scope.checked = [];
                angular.forEach($scope.EnterRowCollection, function (item) {
                    item.checked = false;
                    $scope.checked = [];
                })
                $scope.select_all = false;
            } else {
                angular.forEach($scope.EnterRowCollection, function (item) {
                    if (!item.checked) {
                        item.checked = true;

                        $scope.checked.push(item.enterCode);
                    }
                })
                $scope.select_all = true;
            }
            console.log($scope.checked);
            console.log($scope.select_all);
        };

        $scope.selectOne = function () {
            angular.forEach($scope.EnterRowCollection, function (item) {
                var index = $scope.checked.indexOf(item.enterCode);
                if (item.checked && index == -1) {
                    $scope.checked.push(item.enterCode);
                } else if (!item.checked && index != -1) {
                    $scope.checked.splice(index, 1);
                }
                ;
            })

            $scope.select_all = false;
            if ($scope.EnterRowCollection.length == $scope.checked.length) {
                $scope.select_all = true;
                $('#flag').attr('checked',true)
            }else{
                $scope.select_all = false;
                $('#flag').attr('checked',false)
            }
            /*
                            * else { $scope.select_all = {}; }
                            */
            console.log($scope.checked);
            console.log($scope.select_all);
        }

        /* 以下为信息修改方法区 */
        // 机构修改
        $scope.modEnter = function (item) {
            $scope.modObj = item;
            if(this.queryPage &&!$scope.queryPage){
                $scope.queryPage=this.queryPage;
            }
            $uibModal
                .open({
                    animation: true,
                    backdrop: 'static',
                    templateUrl: 'app/pages/mgrcenter/department/popupPages/modEnter.html',
                    size: 'midle-900',
                    controller: 'modEnterCtrl',
                    scope: $scope,
                    /* scope:$scope, */
                    resolve: {}
                }).result.then(function (result) {
                    $scope.search();
                },function(reason){
                    $scope.search();
                });
        }

        // 部门修改
        $scope.modDept = function (item) {
            $scope.modObj = item;
            $uibModal
                .open({
                    animation: true,
                    backdrop: 'static',
                    templateUrl: 'app/pages/mgrcenter/department/popupPages/modDept.html',
                    size: 'midle-900',
                    controller: 'modDeptCtrl',
                    scope: $scope,
                    /* scope:$scope, */
                    resolve: {}
                });
        }

        // 岗位修改
        $scope.modPosi = function (item) {
            $scope.modObj = item;
            $uibModal
                .open({
                    animation: true,
                    backdrop: 'static',
                    templateUrl: 'app/pages/mgrcenter/department/popupPages/modPosi.html',
                    size: 'midle-1200',
                    controller: 'modPosiCtrl',
                    scope: $scope,
                    /* scope:$scope, */
                    resolve: {}
                });
        }
        $scope.changeFlag = function (pageFlag) {
            $scope.pageFlag = pageFlag;
            $scope.pagination.pageSize = $scope[$scope.pageFlag].pageSize || '10'
        }
        var init = function () {
             $scope.$on('queryPage',function(event,queryPage){
                // var optsType=event.targetScope.optsType
                $scope.queryPage=queryPage;
            });
            $scope.pageFlag = 'enters'
            $scope.pagination = {
                pageSize: '10',
                pageIndex: 1,
                maxText: 5
            }
            // 机构查询
            $scope.enters = angular.copy($scope.pagination);
            $scope.enters.url = '/crm/manage/entersByEntity';
            $scope.enters.method = 'GET';
            $scope.enters.params = $scope.searchEnter;
            $scope.enters.success = function successCallBack(response) {
                var r = 0;
                if (r === 0) {
                    $scope.enterForShow = response.data.list;
                    ++r
                }
                $scope.EnterRowCollection = response.data.list;
                    }
            // 部门查询
            /*$scope.depts = {};
            $scope.depts.url = '/crm/manage/deptsByEntity';
            $scope.depts.method = 'GET';
            $scope.depts.success = function successCallBack(response) {
                var i = 0;
                if (i === 0) {
                    $scope.deptsForShow = response.data;
                    ++i
                }
                $scope.DeptRowCollection = response.data;
            }
            console.log($scope.deptsForShow)*/
        }
        init()

    }

})();
