(function() {
	'use strict';

	angular.module('BlurAdmin.pages.customer.custLifeCycleDef').controller(
			'custLifeCycleDefCtrl', custLifeCycleDefCtrl);
	/** @ngInject */
	function custLifeCycleDefCtrl($scope, $uibModal, $filter, $timeout, $http,
			HttpService, EnumType, Alert) {

		// 对象
		$scope.custLifeCycleDef = {};
		// 查询条件对象
		$scope.searchObj = {};

		// 对象数据集
		$scope.RowCollection = [];
		//
		$scope.StratRow = [];

		var opts = {};
		opts.url = '/crm/manage/engine/getAllStraByEntity';
		opts.method = 'GET';
		opts.params = $scope.searchObj;
		HttpService.linkHttp(opts).then(function(response) {				
			$scope.StratRow = response.data;
		});
		
		
		$scope.show = function(item){
			var lable = "";
			angular.forEach($scope.StratRow, function(i) {
				if(i.strategyId == item.ruleId){
					lable =  i.strategyName;
				}
			})
			return lable;
		}
		
		$scope.search = function(page) {
		      $scope.queryOptions.url = 'crm/ocrm/CustLifeCycleDefmng/getAllCustLifeCycleDefs';
		      $scope.queryOptions.method = 'GET';
		      $scope.queryOptions.params = {};
              this.queryPage(page);
		}

		      $scope.queryOptions = {};
		      $scope.queryOptions.pagination = {
		      	pageSize:'10',
                pageIndex:1,
                maxText:5
		      }
		      $scope.queryOptions.url = 'crm/ocrm/CustLifeCycleDefmng/getAllCustLifeCycleDefs';
		      $scope.queryOptions.method = 'GET';
		      $scope.queryOptions.params = {};
		      $scope.queryOptions.success = function successCallback(response) {
		          $scope.RowCollection = response.data;
		      };
	
		
		// 新增
		$scope.add = function() {
			$uibModal
					.open({
						animation : true,
						templateUrl : 'app/pages/customer/custLifeCycleDef/popupPages/addCustLifeCycleDef.html',
						size : 'midle-900',
						controller : 'addCustLifeCycleDefCtrl',
						scope : $scope,
						resolve : {}
					});

		};

		// 修改事件
		$scope.upd = function(item) {

			$scope.custLifeCycleDef = item;
			$scope.custLifeCycleDef.strategyName = $scope.show(item);

			$uibModal
					.open({
						animation : true,
						backdrop : 'static',
						templateUrl : 'app/pages/customer/custLifeCycleDef/popupPages/updCustLifeCycleDef.html',
						size : 'midle-1200',
						controller : 'updCustLifeCycleDefCtrl',
						scope : $scope,
						resolve : {

						}
					});
		}

		// 物理删除事件（单行删除）
		$scope.remove = function(item) {

			Alert.confirm("确定删除？").then(function() {
				var opts = {};
				opts.url = '/crm/ocrm/CustLifeCycleDefmng/delCustLifeCycleDef';
				opts.method = 'DELETE';
				opts.params = {
					'stageId' : item.stageId
				};
				HttpService.linkHttp(opts).then(function(response) {
					// 执行查询
					$scope.search();
				});
			});

		};

		// 逻辑删除事件（多行删除）
		$scope.batchRemove = function() {

			if ($scope.count == 0) {
				Alert.error('请选择要删除的行！');
			} else {

				Alert.confirm("确定删除？").then(function() {
					var opts = {};
					opts.url = '/crm/ocrm/CustLifeCycleDefmng/delCustLifeCycleDefsByKey';
					opts.method = 'DELETE';
					opts.params = {};
					opts.data = $scope.checkedRow;
					HttpService.linkHttp(opts).then(function(response) {
						// 执行查询
						$scope.search();
					});
					$scope.checkedRow = [];
				});
			}
		};

		$scope.checkedRow = [];
		// 全选
		$scope.selectAll = function() {
			if (!$scope.select_all) {
				$scope.checkedRow = [];
				var count = 0;
				angular.forEach($scope.RowCollection, function(i) {
					i.checked = true;

					// 删除条件对象
					$scope.delObj = {
						'stageId' : '',
					};
					$scope.delObj.stageId= i.stageId;

					$scope.checkedRow.push($scope.delObj);
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

					// 删除条件对象
					$scope.delObj = {
						'stageId' : '',
					};
					$scope.delObj.stageId = i.stageId;

					$scope.checkedRow.push($scope.delObj);
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
	}
})();

