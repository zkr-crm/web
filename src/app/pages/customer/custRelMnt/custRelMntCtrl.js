(function() {
    'use strict';

    angular.module('BlurAdmin.pages.customer').controller('custRelMntCtrl', custRelMntCtrl);
    /** @ngInject */
    function custRelMntCtrl($scope, $uibModal, $filter, $timeout, $http,
                         HttpService, EnumType, Alert) {
        $scope.$on('queryPage',function(event,queryPage){
            $scope.queryPage = queryPage
        })
        // 重置
        $scope.clearCustRelationSearch = function() {
            $scope.searchRelObj = {
                'relationTyp' : '',
                'custNo' : '',
                'custNam' : ''
            };
        }

        //登记重点客户
        $scope.regImportantCust = function(custNo,custNam) {
            $scope.custNo = custNo;
            $scope.custNam = custNam;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/customer/keyCust/setKeyCust/setKeyCustomer.html',
                size: 'lg',
                controller:'SetKeyCustomerCtrl',
                scope:$scope,
                resolve: {
                    'custNo': function () {
                        return custNo;
                    }
                }
            });
            modalInstance.result.then(function(){
                $scope.search();
            });
        };

        // 查询事件
        $scope.search = function(page) {
            $scope.queryOptions.params ={
                'custNo': $scope.searchRelObj.custNo,
                'relationTyp': $scope.searchRelObj.relationTyp.value,
                'custNam': $scope.searchRelObj.custNam
            };
            // $scope.queryOptions.pageSize = $scope.pagination.pageSize;
            // var page = page||'1';
            $scope.queryPage(page);

        }

        //-------------客户关系开始--------------
        /** 查询客户事件（单条） */
        $scope.getCustRelation = function(custNo, relationTyp, refCustNo){

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/portrayal/popupPages/uptCustRelation.html',
                controller: 'uptCustRelationCtrl',
                size: 'midle-900', //
                backdrop:'static',
                resolve: {
                    'custNo': function () {
                        return custNo;
                    }, 'relationTyp': function () {
                        return relationTyp;
                    }, 'refCustNo': function () {
                        return refCustNo;
                    }
                }
            });
            modalInstance.result.then(function(){
                $scope.search();
            });
        };

        // 新增客户事件
        $scope.addCustRelation = function(){
            $scope.custNo = $scope.searchRelObj.custNo;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/customer/custRelMnt/newCustRelation.html',
                controller: 'NewCustRelationCtrl',
                size: 'midle-900', 
                backdrop:'static',
                resolve: {
                    'custNo': function () {
                        return $scope.searchRelObj.custNo;
                    }
                }
            });
            modalInstance.result.then(function(){
                $scope.search();
            });
        };

        // 逻辑删除事件（单行删除）
        $scope.delCustRelation = function(custNo, relationTyp, refCustNo) {

            Alert.confirm("确定删除？").then(function() {
                var opts = {};
                opts.url = '/crm/ecif/cust/delCustRel';
                opts.method = 'PUT';
                opts.params = {
                    custNo : custNo,
                    relationTyp : relationTyp,
                    refCustNo : refCustNo,
                };
                HttpService.linkHttp(opts).then(function(response) {
                    // 执行查询
                    $scope.search();
                });
            });
        };

        // 查看关系图谱
        $scope.viewRelGraph = function(custNo) {
        	if (custNo == undefined) {
        		Alert.error("客户号不能为空");
        		return;
        	}
        	$scope.custNo = custNo;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl : 'app/pages/portrayal/popupPages/openRelGraph.html',
                controller: 'openRelGraphCtrl',
                size: 'midle-1200',
                backdrop:'static',
                scope:$scope,
                resolve: {
                    'custNo': function () {
                        return custNo;
                    }
                }
            });
            modalInstance.result.then(function(){
            	
            });
        };

        //-------------客户关系结束--------------
        
        // 初始化方法
        var init = function () {
            $scope.relList = EnumType.Relation;
            $scope.pagination = {
                pageSize:'10',
                pageIndex:1,
                maxText:5
            }
            $scope.searchRelObj = {
                'relationTyp' : '',
                'custNo' : '',
                'custNam' : ''
            };
            $scope.queryOptions = {};
            $scope.queryOptions.pagination = {
                pageSize:'10',
                pageIndex:1,
                maxText:5
            }
            $scope.queryOptions.url = 'crm/ecif/cust/custRelList';
            $scope.queryOptions.method = 'GET';
            $scope.queryOptions.success = function (response) {
                $scope.custRelCollection = response.data.list.map(function (item) {
                    item.relationTypNam = EnumType.Relation.getLabelByValue(item.relationTyp);
                    return item;
                });
            }
        }
        init()
    }
})();
