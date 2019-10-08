(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.enumManage.codeMapper').controller(
			'addCodeMapperCtrl', addCodeMapperCtrl);
	/** @ngInject */
	function addCodeMapperCtrl($scope, $filter, toastr, HttpService, EnumType) {
		
		$scope.codeMapper={};
		// 保存码值映射参数信息
		$scope.saveValue = function(isValid) {

			if (!isValid) {
				return;
			}			
			var opts = {};
			opts.url = '/crm/manage/codemappermng/addCodeMapper';
			opts.method = 'POST';
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
