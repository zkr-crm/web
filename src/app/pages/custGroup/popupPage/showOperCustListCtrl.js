(function() {
	'use strict';

	angular.module('BlurAdmin.pages.custGroup').controller('showOperCustCtrl',
			showOperCustCtrl);
	/** @ngInject */
	function showOperCustCtrl($scope, $state, HttpService, EnumType, Alert,
			$uibModal, $rootScope) {

		// 查询条件对象
		$scope.searchObj = {
			'groupOperId' : '',
			'custAgent' : '',
			'custName' : ''
		};
		$scope.searchObj.groupOperId = $scope.groupOperId;
		// 分页查询客群信息列表
		$scope.queryOperCust = {};
		$scope.queryOperCust.url = '/crm/ocrm/CustGroupMng/selectTaskByGrpOperId';
		$scope.queryOperCust.method = 'GET';
		$scope.queryOperCust.params = $scope.searchObj;
		$scope.queryOperCust.success = function successCallback(response) {

			$scope.operCustCollection = response.data;
		};

		// 查询事件
		$scope.searchUser = function() {

			$scope.queryOperCust.params = $scope.searchObj;
			this.queryPage(1);
		}
		// 关闭新增页面
		$scope.closePage = function() {

			$scope.$parent.$dismiss();
		}
		// 客户画像查询
		$scope.openDetail = function(custNo) {
			$state.go('portrayal.perCusPortrayal', {
				'custNo' : custNo
			});
		}
	}

})();
