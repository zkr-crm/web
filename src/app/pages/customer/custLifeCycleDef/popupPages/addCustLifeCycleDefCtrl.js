(function() {
	'use strict';

	angular.module('BlurAdmin.pages.customer.custLifeCycleDef').controller(
			'addCustLifeCycleDefCtrl', addCustLifeCycleDefCtrl);
	/** @ngInject */
	function addCustLifeCycleDefCtrl($scope, $filter, toastr, HttpService, EnumType,$uibModal) {
		
		$scope.custLifeCycleDef={};
		// 保存用户信息
		$scope.saveValue = function(isValid) {
			if (!isValid) {
				return;
			}			
			var opts = {};
			opts.url = '/crm/ocrm/CustLifeCycleDefmng/addCustLifeCycleDef';
			opts.method = 'POST';
			opts.params = $scope.custLifeCycleDef;
			HttpService.linkHttp(opts).then(function(response) {
				$scope.custLifeCycleDef = {};
				// 执行查询
				$scope.$dismiss();
				$scope.search();
			});
		}
		//选择
        $scope.selectRule = function() {
            var modalInstance = $uibModal.open({
                animation : true,
                backdrop : 'static',
                templateUrl : 'app/pages/customer/custLifeCycleDef/popupPages/selectRule.html',
                size : 'midle-1200',
                controller : 'selectRuleCtrl',
                scope : $scope,
                resolve : {
                }
            });
        }
        

    		
        
		// 关闭新增页面
		$scope.closePage = function() {

			$scope.$dismiss();
		}
		
	}
})();
