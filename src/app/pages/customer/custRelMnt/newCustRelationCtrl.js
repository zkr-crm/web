(function () {
    'use strict';

    angular.module('BlurAdmin.pages.profile')
        .controller('NewCustRelationCtrl', NewCustRelationCtrl);

    /** @ngInject */
    function NewCustRelationCtrl($scope, $http, HttpService,$uibModalInstance,EnumType, $uibModal, Alert) {

        $scope.Cust = {};
        $scope.blacklistDts = {};
        $scope.blacklistDts.custNo = $scope.custNo;
        $scope.blacklistDts.reason = "";
        $scope.blacklistDts.custName = $scope.custName;
        $scope.blacklistDts.blacklistSts = "0";

        $scope.searchRelObj = {
            'custNo' : '',
            'custName' : ''

        };
        $scope.custRel = {};
        $scope.custRel.custNo = "";
        $scope.custRel.Relation = "";
        $scope.custRel.custName = "";
        $scope.custRel.refCustNo = "";
        $scope.custRel.relationDesc = "";

        // 查询事件
        $scope.searchUser = function() {

            HttpService.linkHttp({
                url: 'crm/ecif/cust/mng/perCustInfo',
                method: 'GET',
                params: {'custNo': $scope.custRel.custNo}
            }).then(function (response) {
                $scope.custRel.custNam = response.data.custName;
            });
        }

        //选择操作
        $scope.link = 'abc';
        $scope.ok = function () {
            Alert.error("ok");
            $uibModalInstance.close("dfd");
            /*if($scope.radioRptOptions.select ==""){
                Alert.error('请选择模板！');
                return ;
            }
          $uibModalInstance.close($scope.sendTemDts);*/
        };



        $scope.Relation = EnumType.Relation;

        $scope.selectRelationTyp = function(selectRelationTyp) {
            $scope.custRel.relationTyp = selectRelationTyp;
        }

        // 选择客户
        $scope.selectCust = function() {
            var modalInstance = $uibModal.open({
                animation : true,
                backdrop : 'static',
                templateUrl : 'app/pages/customer/custMnt/popupPages/selectCustDlg.html',
                size : 'midle-900',
                controller : 'selectCustDlgCtrl',
                scope : $scope,
                resolve : {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
            modalInstance.result.then(function (result) {
                if (result == undefined) {
                	return;
                }
                if (!(result.sex == 1 || result.sex == 2)) {
                    Alert.error('当前用户性别未知，不能添加关系');
                    return;
                }
                $scope.custRel.custNo = result.custNo;
                $scope.custRel.custNam = result.custName;
            }, function (reason) {
            });
        }

        // 选择关联客户
        $scope.selectRelCust = function() {
            var modalInstance = $uibModal.open({
                animation : true,
                backdrop : 'static',
                templateUrl : 'app/pages/customer/custMnt/popupPages/selectCustDlg.html',
                size : 'midle-900',
                controller : 'selectCustDlgCtrl',
                resolve : {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
            modalInstance.result.then(function (result) {
                if (result == undefined) {
                	return;
                }
                if (!(result.sex == 1 || result.sex == 2)) {
                    Alert.error('当前用户性别未知，不能添加关系');
                    return;
                }
                $scope.custRel.refCustNo = result.custNo;
                $scope.custRel.refCustNam = result.custName;
            }, function (reason) {
            });
        }
        //-------------新增开始--------------
        $scope.saveRel = function() {
            var custRelObj = angular.copy($scope.custRel);
            if (custRelObj == undefined) {
                Alert.error("关系信息不能为空");
                return;
            }

            if ($scope.custRel.custNo == undefined || $scope.custRel.custNo == '') {
                Alert.error("客户号不能为空");
                return;
            }
            // $scope.custRel.custNo = $scope.searchObj.custNo;

            if ($scope.custRel.custNam == undefined || $scope.custRel.custNam == '') {
                Alert.error("录入的客户号未查询到对应的客户信息");
                return;
            }
            if (custRelObj.refCustNo == undefined || custRelObj.refCustNo == '') {
                Alert.error("关联客户号不能为空");
                return;
            }
            if (custRelObj.relationTyp == undefined || custRelObj.relationTyp == '') {
                Alert.error("关系类型不能为空");
                return;
            }
            if (custRelObj.relationTyp.value==99) {
                Alert.error("关系类型不能选择未知，请重新选择!");
                return;
            }
            custRelObj.relationTyp = $scope.custRel.relationTyp.value;
            HttpService.linkHttp({
                url: 'crm/ecif/cust/addCustRel',
                method: 'PUT',
                params: custRelObj
            }).then(function (response) {
                $uibModalInstance.close();
            });
        }
        //-------------新增结束--------------

    }

})();