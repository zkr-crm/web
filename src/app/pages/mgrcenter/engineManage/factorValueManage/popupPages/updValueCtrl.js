(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.engineManage.factorValueManage').controller(
			'updValueCtrl', updValueCtrl);
	/** @ngInject */
	function updValueCtrl($scope, $filter, $uibModal, $timeout, HttpService,
			toastr, EnumType, Alert) {

		
		$scope.saveValue = function(isValid) {

			if (!isValid) {
				return;
			}
			var opts = {};
			opts.url = '/crm/manage/updateValue';
			opts.method = 'PUT';
			opts.params = $scope.updValue;
			HttpService.linkHttp(opts).then(function(response) {
				console.log("请求成功");
				console.log(response);
				$scope.updValue = {};
				// 执行查询
				$scope.searchValue();
				$scope.$parent.$dismiss();
			});
		}

	}

})();
