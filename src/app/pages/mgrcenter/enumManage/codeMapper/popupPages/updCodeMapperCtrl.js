(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.enumManage.codeMapper').controller(
			'updCodeMapperCtrl', updCodeMapperCtrl);
	/** @ngInject */
	function updCodeMapperCtrl($scope, $filter, toastr, HttpService, EnumType) {
		// 保存用户信息
		$scope.saveValue = function(isValid) {

			if (!isValid) {
				return;
			}			
			var opts = {};
			opts.url = ' /crm/manage/codemappermng/modCodeMapper';
			opts.method = 'PUT';
			opts.params = $scope.codeMapper;
			HttpService.linkHttp(opts).then(function(response) {
				console.log("请求成功");
				console.log(response);
				$scope.codeMapper = {};
				// 执行查询
				$scope.search();
				$scope.$parent.$dismiss();
			});
		}
		// 关闭新增页面
		$scope.closePage = function() {

			$scope.$parent.$dismiss();
		}
	}
})();
