(function() {
	'use strict';

	angular.module('BlurAdmin.pages.customer.custLifeCycleDef').controller(
			'updCustLifeCycleDefCtrl', updCustLifeCycleDefCtrl);
	/** @ngInject */
	function updCustLifeCycleDefCtrl($scope, $filter, toastr, HttpService, EnumType,$uibModal) {
		
        $scope.init = function(){
    			var opts = {};
    			opts.url = '/crm/ocrm/CustLifeCycleDefmng/getCustLifeCycleDefs';
    			opts.method = 'GET';
    			opts.params = {'stageId':$scope.custLifeCycleDef.stageId};
    			HttpService.linkHttp(opts).then(function(response) {
    				$scope.custLifeCycleDef = response.data;
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
		// 保存用户信息
		$scope.saveValue = function(isValid) {

			if (!isValid) {
				return;
			}			
			var opts = {};
			opts.url = '/crm/ocrm/CustLifeCycleDefmng/CustLifeCycleDef';
			opts.method = 'PUT';
			opts.params = $scope.custLifeCycleDef;
			HttpService.linkHttp(opts).then(function(response) {
				$scope.custLifeCycleDef = {};
				// 执行查询
				$scope.$dismiss();
				$scope.search();
			});
		}
		// 关闭新增页面
		$scope.closePage = function() {

			$scope.$dismiss();
		}
	}
})();
