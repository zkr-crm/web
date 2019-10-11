(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.engineManage.typeManage').controller(
			'addTypeCtrl', addTypeCtrl);
	/** @ngInject */
	function addTypeCtrl($scope, $filter, $uibModal, $timeout, toastr, Alert, HttpService) {
		//用户信息对象
		$scope.addType = {};
		
		$scope.saveValue = function(isValid) {

			if (!isValid) {
				return;
			}
			var opts = {};
			opts.url = '/crm/manage/saveType';
			opts.method = 'POST';
			opts.params = $scope.addType;
			HttpService.linkHttp(opts).then(function(response) {
				toastr.success('提交完成!');
				console.log(response);
				$scope.searchType();
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
