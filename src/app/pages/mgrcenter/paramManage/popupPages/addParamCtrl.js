(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.paramManage').controller(
			'addSysParamCtrl', addParamCtrl);
	/** @ngInject */
	function addParamCtrl($scope, $filter, $uibModal, $timeout, toastr, Alert, HttpService) {
		//用户信息对象
		$scope.sysParam = {};
		
		$scope.saveSysParam = function() {
			var opts = {};
			opts.url = '/crm/manage/params/saveParam';
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
