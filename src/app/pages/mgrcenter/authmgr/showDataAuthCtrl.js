(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.authMgr').controller(
			'showDataAuthCtrl', showDataAuthCtrl);
	/** @ngInject */
	function showDataAuthCtrl($scope, $uibModal, $filter, $timeout, $http,
			HttpService, EnumType, Alert) {
		
		// 对象数据集
		$scope.RowCollection = [];

		// 查询操作日志
		$scope.init = function() {
			var opts = {};
			opts.url = '/crm/manage/auth/getRoleDataDetail';
			opts.method = 'GET';
			opts.params = $scope.showDataAuthParam;
			HttpService.linkHttp(opts).then(function(response) {
				$scope.RowCollection = response.data;
			});
		}

		$scope.init();
		// 关闭弹出页面
		$scope.closePage = function() {

			$scope.$parent.$dismiss();
		}
		
	}
})();
