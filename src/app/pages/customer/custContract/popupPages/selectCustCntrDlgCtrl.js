(function() {
	'use strict';

				angular.module('BlurAdmin.pages.customer').controller('selectCustCntrDlgCtrl', selectCustCntrDlgCtrl);
				/** @ngInject */
                function selectCustCntrDlgCtrl($scope, $state, HttpService,EnumType,Alert,$uibModal,$rootScope,$uibModalInstance, $filter, custNo) {
            		// 对象
            		$scope.custContract = {};
            		// 对象数据集
            		$scope.RowCollection = [];
            		// 查询条件对象
            		$scope.searchObj = {
        	                  'mobile' : '',
          	                  'contractName' : '',
          	                  'blnCustNo' : custNo
            		};

            		$scope.cusDetail = function (item){
            			$scope.custContract.contractNo = item.contractNo;
            			$uibModal
            			.open({
            				animation : true,
            				templateUrl : 'app/pages/customer/custContract/popupPages/selCntrDlg/uptCntr.html',
                            size: 'midle-900', 
                            backdrop:'static',
            				controller : 'uptCntrCtrl',
            				scope : $scope,
            				resolve : {
            	                  'custNo': function () {
            	                      return custNo;
            	                  }
            				}
            			});
            		}

            		$scope.resetCustCntr = function () {
                		$scope.searchObj = {
            	                  'mobile' : '',
            	                  'contractName' : '',
            	                  'blnCustNo' : custNo
                  		};
                		$scope.search();
            		}
            		$scope.search = function(page) {
            		      $scope.queryOptions.params = $scope.searchObj;
                          this.queryPage(page);
            		};

            		      $scope.queryOptions = {};
                          $scope.queryOptions.pagination = {
                                pageSize:'10',
                                pageIndex:1,
                                maxText:5
                          }
            		      $scope.queryOptions.url = '/crm/ocrm/CustContractmng/getAllCustContracts';
            		      $scope.queryOptions.method = 'GET';
            		      $scope.queryOptions.params = {};
            		      $scope.queryOptions.success = function successCallback(response) {
            	                $scope.RowCollection = response.data.map(function (item) {
            	                    item.custRelation = EnumType.Relation.getLabelByValue(item.custRelation);
            	                	return item;
            	                  });
            		      };
            		// 新增
            		$scope.add = function() {
            			$uibModal
            					.open({
            						animation : true,
            						templateUrl : 'app/pages/customer/custContract/popupPages/selCntrDlg/addCntr.html',
                                    size: 'midle-900', 
                                    backdrop:'static',
            						controller : 'addCntrCtrl',
            						scope : $scope,
            						resolve : {
                  	                  'custNo': function () {
                	                      return custNo;
                	                  }
            						}
            					});
            		};

            		$scope.checkedRow = [];
            		// 全选
            		$scope.selectAll = function() {
            			if ($scope.select_all) {
            				$scope.checkedRow = [];
            				var count = 0;
            				angular.forEach($scope.RowCollection, function(i) {
            					i.checked = true;
            					$scope.checkedRow.push(i);
            				})
            				$scope.select_all = true;
            			} else {
            				angular.forEach($scope.RowCollection, function(i) {
            					i.checked = false;
            					$scope.checkedRow = [];
            				})
            				$scope.select_all = false;
            			}
            		};

            		// 单个选中
            		$scope.selectOne = function() {
            			angular.forEach($scope.RowCollection, function(i) {
            				var index = $scope.checkedRow.indexOf(i);
            				if (i.checked && index === -1) {

            					$scope.checkedRow.push(i);
            				} else if (!i.checked && index !== -1) {
            					$scope.checkedRow.splice(index, 1);
            				}
            			});

            			if ($scope.RowCollection.length === $scope.checkedRow.length) {
            				$scope.select_all = true;
            			} else {
            				$scope.select_all = false;
            			}
            		}

            		// 确定按钮事件
            		$scope.doConfirm = function() {
            			if ($scope.checkedRow.length == 0) {
            				Alert.error('请选择客户联系人！');
            				return;
            			}
            			$uibModalInstance.close($scope.checkedRow);
            		}
                }
			})();
