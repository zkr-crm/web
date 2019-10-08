(function() {
	'use strict';

		angular.module('BlurAdmin.pages.customer').controller('keyCustCtrl', keyCustCtrl);
		/** @ngInject */
		function keyCustCtrl($scope, $uibModal, $filter, $timeout, $http,
                             HttpService, EnumType, Alert, $state) {
            /*$scope.smartTablePageSize = 10;
            $scope.impsmartTabPgSize = 10;
            //默认显示所有客户人员 //todo update
            HttpService.linkHttp({
                url: '/crm/ecif/cust/notImportantCustList',
                method: 'GET',
            }).then(function (response) {
                $scope.custCollection = response.data.list.map(function (item) {
                    item.custTyp = EnumType.CustType.getLabelByValue(item.custTyp);
                    item.custSource = EnumType.DataSource.getLabelByValue(item.custSource);
                    item.certTyp = EnumType.IdType.getLabelByValue(item.certTyp);
                    return item;
                });
            });
			//查询显示重点客户todo zce_cust_key
            HttpService.linkHttp({
                url: '/crm/ecif/cust/importantCustList',
                method: 'GET',
            }).then(function (response) {
                $scope.keyUserCollection = response.data.list.map(function (item) {
                    item.custTyp = EnumType.CustType.getLabelByValue(item.custTyp);
                    item.custSource = EnumType.DataSource.getLabelByValue(item.custSource);
                    item.certTyp = EnumType.IdType.getLabelByValue(item.certTyp);
                    return item;
                });
            });*/
            //取消重点客户
            $scope.cancelImportantCust = function(custNo,custName) {

                $scope.custNo = custNo;
                $scope.custName = custName;
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'app/pages/customer/keyCust/canKeyCust/cancelKeyCustomer.html',
                    size: 'lg',
                    controller:'CancelKeyCustomerCtrl',
                    scope:$scope,
                    resolve: {
                        'custNo': function () {
                            return custNo;
                        }
                    }
                });
                modalInstance.result.then(function(){
                    $scope.queryImpUser();
                    $scope.searchUser()
                });
            };

			//登记重点客户
            $scope.regImportantCust = function(custNo,custName) {

                $scope.custNo = custNo;
                $scope.custName = custName;
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'app/pages/customer/keyCust/setKeyCust/setKeyCustomer.html',
                    size: 'midle-900',
                    controller:'SetKeyCustomerCtrl',
                    scope:$scope,
                    resolve: {
                        'custNo': function () {
                            return custNo;
                        }
                    }
                });
                modalInstance.result.then(function(){
                    $scope.queryImpUser();
                    $scope.searchUser()
                });
            };


            // 查询条件对象
            $scope.searchObj = {
                'custNo' : '',
                'custName' : '',
                'custTagCd' : ''
            };
            // 查询事件
            $scope.search = function(page) {
                if($scope.pageFlag=='impUserOpts'){
                    $scope[$scope.pageFlag].params = $scope.srhImpObj;
                }else{
                    $scope[$scope.pageFlag].params = $scope.searchObj;
                }
                this.queryPage(page)
            }
            // 重置重点
            $scope.clearNorSearch = function() {
                $scope.searchObj = {
                        'custNo' : '',
                        'custName' : '',
                        'custTagCd' : ''
                    };
            }

            //查询重点客户条件对象
            $scope.srhImpObj = {
                'custNo' : '',
                'custName' : ''
            };
            // 查询事件
            $scope.queryImpUser = function() {
                var opts = {};
                opts.url = '/crm/ecif/cust/importantCustList';
                opts.method = 'GET';
                opts.params = $scope.srhImpObj;
                HttpService.linkHttp(opts).then(function(response) {
                    $scope.keyUserCollection = response.data.list;
                    $scope.keyUserCollection = response.data.list.map(function (item) {
                        item.custTyp = EnumType.CustType.getLabelByValue(item.custTyp);
                        item.custSource = EnumType.DataSource.getLabelByValue(item.custSource);
                        item.certTyp = EnumType.IdType.getLabelByValue(item.certTyp);

                        return item;
                    });
                });
            }
            //查询
            $scope.searchUser = function () {
                var opts = {};
                opts.url = '/crm/ecif/cust/notImportantCustList';
                opts.method = 'GET';
                opts.params = $scope.searchObj;
                HttpService.linkHttp(opts).then(function(response) {
                    $scope.custCollection = response.data.list;
                    $scope.custCollection = response.data.list.map(function (item) {
                        item.custTyp = EnumType.CustType.getLabelByValue(item.custTyp);
                        item.custSource = EnumType.DataSource.getLabelByValue(item.custSource);
                        item.certTyp = EnumType.IdType.getLabelByValue(item.certTyp);
                        return item;
                    });
                });
            }
            // 重置重点
            $scope.clearImpSearch = function() {
                $scope.srhImpObj = {
                        'custNo' : '',
                        'custName' : ''
                    };
            }

			$scope.setKeyCust = function() {
				 $uibModal.open({
					 animation: true,
					 templateUrl: 'app/pages/customer/keyCust/setKeyCust/setKeyCust.html',
					 size: 'lg',
					 controller:'setKeyCustCtrl',
					 scope:$scope,
					 resolve: {
					 }
				 });

			};
			$scope.canKeyCust = function() {
				 $uibModal.open({
					 animation: true,
					 templateUrl: 'app/pages/customer/keyCust/canKeyCust/canKeyCust.html',
					 size: 'lg',
					 controller:'canKeyCustCtrl',
					 scope:$scope,
					 resolve: {
					 }
				 });
			};
            $scope.changeFlag = function (pageFlag) {
                $scope.pageFlag = pageFlag;
                // $scope.pagination.pageSize = $scope[$scope.pageFlag].pageSize || '10';
                // $scope.pagination.totalItems = $scope[$scope.pageFlag].totalItems;
                // $scope.pagination.pageIndex = $scope[$scope.pageFlag].pageIndex || '1';
            }

            // 客户画像查询
            $scope.openDetail = function (custNo) {
                $state.go('portrayal.perCusPortrayal',{'custNo':custNo});
               // $location.path('/portrayal/perCusPortrayal').search({'custNo':custNo});
            }

            var init = function () {
                $scope.pageFlag = 'custUserOpts'
                
                $scope.impUserOpts = {}
                $scope.custUserOpts = {}
                $scope.impUserOpts.pagination = {
                    pageSize:'10',
                    pageIndex:1,
                    maxText:5
                }
                $scope.custUserOpts.pagination = {
                    pageSize:'10',
                    pageIndex:1,
                    maxText:5
                }
                //查询显示重点客户todo zce_cust_key
                $scope.impUserOpts.url = '/crm/ecif/cust/importantCustList';
                $scope.impUserOpts.method = 'GET';
                $scope.impUserOpts.success = function successCallback (response) {
                    $scope.keyUserCollection = response.data.list.map(function (item) {
                        item.custTyp = EnumType.CustType.getLabelByValue(item.custTyp);
                        item.custSource = EnumType.DataSource.getLabelByValue(item.custSource);
                        item.certTyp = EnumType.IdType.getLabelByValue(item.certTyp);
                        item.regiDate = item.regiDate.substr(0,4)+'-'+item.regiDate.substr(4,2)+'-'+item.regiDate.substr(6,2);
                        return item;
                    });
                }
                //默认显示所有客户人员 //todo update
                $scope.custUserOpts.url = '/crm/ecif/cust/notImportantCustList';
                $scope.custUserOpts.method = 'GET';
                $scope.custUserOpts.success = function successCallback (response) {
                    $scope.custCollection = response.data.list.map(function (item) {
                        item.custTyp = EnumType.CustType.getLabelByValue(item.custTyp);
                        item.custSource = EnumType.DataSource.getLabelByValue(item.custSource);
                        item.certTyp = EnumType.IdType.getLabelByValue(item.certTyp);
                        return item;
                    });
                };
               
            }
            init()

		}
	})();
