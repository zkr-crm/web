(function () {
    'use strict';

    angular.module('BlurAdmin.pages.profile')
        .controller('blackListCtrl', blackListCtrl);
    /** @ngInject */
    function blackListCtrl($scope, $http, HttpService,$uibModalInstance,EnumType, Alert,$rootScope ) {
    	$scope.blacklistDts = {};
        $scope.blacklistDts.custNo ="" ;
        $scope.blacklistDts.reason = "";
        $scope.blacklistDts.blacklistType  = "";
        $scope.blacklistTypes  = EnumType.BlacklistType;
       /* $scope.smartTablePageSize = 5;
        $scope.blacklistDts = {};
        $scope.blacklistDts.custNo ="" ;
        $scope.blacklistDts.reason = "";
        $scope.blacklistDts.blacklistSts = "0";
        $scope.blacklistDts.blacklistType  = "";

        
*/
//        HttpService.linkHttp({
//            url: 'crm/ecif/cust/NotBlackperCustList',
//            method: 'GET',
//        }).then(function (response) {
//            $scope.custCollection = response.data.map(function (item) {
//                item.custTyp = EnumType.CustType.getLabelByValue(item.custTyp);
//                item.custSource = EnumType.DataSource.getLabelByValue(item.custSource);
//                item.certTyp = EnumType.IdType.getLabelByValue(item.certTyp);
//                return item;
//            });
//            $scope.total = response.data.length;
//        });
        //弹出界面的撤销
        $scope.saveValue = function() {
            if($scope.blacklistDts.reason == null || $scope.blacklistDts.reason == ""){
                Alert.error('请录入登记原因！');
                return;
            }
            var opts = {};
            opts.url = '/crm/ecif/cust/importantCustomer/setkey';
            opts.method = 'PUT';
            opts.params = $scope.blacklistDts;
            HttpService.linkHttp(opts).then(function(response) {
                // 执行查询
                $scope.searchUser();
                $uibModalInstance.close();
            });
        }
        
        $scope.closePage = function() {
            $uibModalInstance.close();
        }

        // 查询事件
//        $scope.searchUser = function() {
//            var opts = {};
//            opts.url = 'crm/ecif/cust/NotBlackperCustList';
//            opts.method = 'GET';
//            opts.params = $scope.searchObj;
//            HttpService.linkHttp(opts).then(function(response) {
//                console.log("请求成功");
//                console.log(response);
//                $scope.custCollection = response.data;
//                $scope.custCollection = response.data.map(function (item) {
//                    return item;
//                });
//                $scope.total = response.data.length;
//            });
//        }
//        // 新增事件
        
        $scope.checkedRow = $rootScope.checkedRow;
        $scope.addUser = function(/*custNo*/){
            if ($scope.count == 0) {
                Alert.error('请选择要新增的行！');
            } else {
                if($scope.blacklistDts.reason == null || $scope.blacklistDts.reason == ""){
                    Alert.error('请录入登记原因！');
                    return;
                }
                if($scope.blacklistDts.blacklistType == null || $scope.blacklistDts.blacklistType == ""){
                    Alert.error('请录入黑名单类型！');
                    return;
                }
                if($scope.checkedRow.length <= 0 ){
                    Alert.error('请选择登记人员！');
                    return ;
                }
                Alert.confirm("确定新增？").then(function() {
                    /* var opts = {};
                     opts.url = '/crm/manage/usermng/delUsersByKey';
                     opts.method = 'DELETE';
                     opts.params = {};
                     opts.data = $scope.checkedRow;
                     HttpService.linkHttp(opts).then(function(response) {
                         console.log("请求成功");
                         console.log(response);
                         // 执行查询
                         $scope.searchUser();
                     });
                     $scope.checkedRow = [];*/
                    $scope.checkedRow[0].regiReason = $scope.blacklistDts.reason;
                    $scope.checkedRow[0].blacklistFlg = $scope.blacklistDts.blacklistType.value;
                    var opts = {};
                    opts.url = '/crm/ecif/cust/setBlacklist';
                    opts.method = 'PUT';
                    opts.params = {};
                    opts.data = $scope.checkedRow;
                    HttpService.linkHttp(opts).then(function(response) {

                        $scope.userInfo = {};
                        // 执行查询
                        $scope.searchUser_black();
                        $scope.searchUser()
                        //  $scope.$parent.$dismiss();
                        $uibModalInstance.close();
                    });
                    $scope.checkedRow = [];
                });
            }
        };


        //选择操作
        /*$scope.link = 'abc';
        $scope.ok = function () {
            $uibModalInstance.close($scope.sendTemDts);
            if($scope.radioRptOptions.select ==""){
                Alert.error('请选择模板！');
                return ;
            }
          $uibModalInstance.close($scope.sendTemDts);
        };
        $scope.checkedRow = [];*/
        // 全选
/*        $scope.selectAll = function() {
            if ($scope.select_all) {
                $scope.checkedRow = [];
                var count = 0;
                angular.forEach($scope.custCollection, function(i) {
                    i.checked = true;

                    // 条件对象
                    $scope.delObj = {
                        'custNo' : '',
                        'custName' : '',
                        'regiReason' : '',
                        'blacklistType' : ''

                    };
                    $scope.delObj.custNo = i.custNo;
                    $scope.delObj.regiReason =  $scope.blacklistDts.reason;


                    $scope.checkedRow.push($scope.delObj);
                })
                $scope.select_all = true;
            } else {
                angular.forEach($scope.custCollection, function(i) {
                    i.checked = false;
                    $scope.checkedRow = [];
                })
                $scope.select_all = false;
            }
            console.log($scope.checkedRow);
        };
        // 单个选中
        $scope.selectOne = function() {

            angular.forEach($scope.custCollection, function (i) {
                var index = $scope.checkedRow.indexOf()
                if (i.checked && index === -1) {

                    // 条件对象
                    $scope.delObj = {
                        'custNo' : '',
                        'custName' : '',
                        'regiReason' : ''
                    };
                    $scope.delObj.custNo = i.custNo;
                    $scope.delObj.regiReason =  $scope.blacklistDts.reason;
                    $scope.checkedRow.push($scope.delObj);
                } else if (!i.checked && index !== -1) {
                    $scope.checkedRow.splice(index, 1);
                }
            });

            if ($scope.custCollection.length === $scope.checkedRow.length) {
                $scope.select_all = true;
            } else {
                $scope.select_all = false;
            }
            console.log($scope.checkedRow);
        }*/

    }

})();