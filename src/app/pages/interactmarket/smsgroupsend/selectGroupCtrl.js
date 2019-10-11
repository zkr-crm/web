(function() {
	'use strict';

	angular.module('BlurAdmin.pages.interactmarket.smsgroupsend')
		.controller('selectGroupCtrl', function($scope, EnumType, $location, $uibModal, $state, HttpService, Alert,$uibModalInstance,$rootScope,$filter) {
		
			$scope.search = function (page) {
				$scope.queryGroupOpts.params = $scope.searchObj;
				this.queryPage(page)
			}

			// 单个选中
            $scope.selectOne = function(item) {
                $scope.checkedRow = []
                angular.forEach($scope.rowCollection, function (i) {
                    var index = $scope.checkedRow.indexOf(i);
                    if (i.checked) {
                        $scope.checkedRow.push(i);
                    }
                });
            }

            //点击行选中
            $scope.selectRow = function(item) {
             //    $scope.radioRptOptions.select = i.tplNo;
            	// $scope.selectCustInfo = i;
            	item.checked = !item.checked;
                $scope.selectOne(item)
            }

            //确定
            $scope.ok = function () {
              $uibModalInstance.close($scope.checkedRow);
            };

            //全选
            $scope.selectAll1 = function(e) {
                
                if (e) {
                    $scope.checkedRow = [];
                    var count = 0;
                    angular.forEach($scope.rowCollection, function(i) {
                        i.checked = true;

                        // // 条件对象
                        // $scope.delObj = {
                        //     'custNo' : '',
                        // };
                        // $scope.delObj.custNo = i.custNo;
                        $scope.checkedRow.push(i);
                    })
                    $scope.select_all = true;
                } else {
                    angular.forEach($scope.rowCollection, function(i) {
                        i.checked = false;
                        $scope.checkedRow = [];
                    })
                    $scope.select_all = false;
                }
            };

            // 群组创建类型
			$scope.showEstablishType = function(item) {
				var xxx = "";
				angular.forEach(EnumType.EstablishType, function(i) {
					if (item.establishType === i.value) {
						xxx = i.label;
					}
				});
				return xxx;
			}
			$scope.dateFormate=function(dateStr,dateType){
			    if(dateStr==null){
			        return "";
                }
                return $filter('date')(new Date(dateStr),dateType);
            }
            //初始化
			var init  = function () {
				$scope.radioRptOptions = {};
                $scope.radioRptOptions.select="";
				$scope.rowCollection = [];
				$scope.searchObj = {
                    createUser:$rootScope.global.user
                } 
				$scope.queryGroupOpts = {
					pagination:{
						pageSize:'10',
                        pageIndex:1,
                        maxText:5
					},
                    params:$scope.searchObj,
					url : '/crm/ocrm/CustGroupMng/getCustGrpByEntity',
					method:'GET',
					success:function(response){
						$scope.rowCollection = response.data.list;
					}
				}
			}
			init()

	});
})();