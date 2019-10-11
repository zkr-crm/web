(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.engineManage.factorValueManage').controller(
			'addValueCtrl', addValueCtrl);
	/** @ngInject */
	function addValueCtrl($scope, $filter, $uibModal, $timeout, toastr, Alert, HttpService) {
		//用户信息对象
		$scope.addValue = {};
		
		$scope.saveValue = function(isValid) {

			if (!isValid) {
				return;
			}
			var opts = {};
			opts.url = '/crm/manage/saveValue';
			opts.method = 'POST';
			opts.params = $scope.addValue;
			HttpService.linkHttp(opts).then(function(response) {
				toastr.success('提交完成!');
				console.log(response);
				$scope.searchValue();
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
