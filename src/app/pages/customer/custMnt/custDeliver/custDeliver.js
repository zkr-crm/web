(function() {
	'use strict';

	angular.module('BlurAdmin.pages.customer.custMnt').controller(
			'custDeliverCtrl', custDeliverCtrl);
	/** @ngInject */
	function custDeliverCtrl($scope, $filter, toastr, HttpService, EnumType,$uibModal,$rootScope, Alert) {
		$scope.custSaleChgTrace={};
		$scope.custSaleChgTrace.dealUser=$rootScope.global.user;

		$scope.custList = $scope.checkedRow;
		        
        $scope.chgReasonItems = EnumType.chgReason;
		
		// 保存轨迹&修改客户信息
		$scope.saveValue = function(isValid) {
			if (!isValid) {
				return;
			}
			
			$scope.custSaleChgTrace.chgReason = $scope.custSaleChgTrace.chgReason.value;
			var opts = {};
			opts.url = '/crm/ecif/cust/custDeliver';
			opts.method = 'PUT';
			opts.params = $scope.custSaleChgTrace;
			opts.data = $scope.custList;
			HttpService.linkHttp(opts).then(function(response) {
				$scope.custSaleChgTrace = {};
				// 执行查询
				$scope.$dismiss();
				$scope.searchUser();
			})			
		}

        
		// 关闭新增页面
		$scope.closePage = function() {

			$scope.$dismiss();
		}

			
		
		
		
	}
})();
