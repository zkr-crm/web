(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.engineManage.factorValueListManage').controller(
			'addParamCtrl', addParamCtrl);
	/** @ngInject */
	function addParamCtrl($scope, $filter, $uibModal, $timeout, toastr, Alert, HttpService) {
		$scope.sysParam = {};
		
		$scope.saveValue = function(isValid) {

			if (!isValid) {
				return;
			}
			var opts = {};
			opts.url = '/crm/manage/saveParam';
			opts.method = 'POST';
			opts.params = $scope.sysParam;
			HttpService.linkHttp(opts).then(function(response) {
				toastr.success('提交完成!');
				$scope.searchParam();
				// 执行查询
				$scope.$parent.$dismiss();
			});
		}
		
		// 关闭页面
		$scope.closePage = function() {
			$scope.$parent.$dismiss();
		}

	}

})();
