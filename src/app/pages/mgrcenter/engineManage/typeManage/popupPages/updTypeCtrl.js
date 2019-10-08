(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.engineManage.typeManage').controller(
			'updTypeCtrl', updTypeCtrl);
	/** @ngInject */
	function updTypeCtrl($scope, $filter, $uibModal, $timeout, HttpService,
			toastr, EnumType, Alert) {

		
		$scope.saveValue = function(isValid) {

			if (!isValid) {
				return;
			}
			var opts = {};
			opts.url = '/crm/manage/updateType';
			opts.method = 'PUT';
			opts.params = $scope.updType;
			HttpService.linkHttp(opts).then(function(response) {
				console.log("请求成功");
				console.log(response);
				$scope.updType = {};
				// 执行查询
				$scope.searchType();
				$scope.$parent.$dismiss();
			});
		}

	}

})();
