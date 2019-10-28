(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.engineManage.factorValueListManage').controller(
			'updParamCtrl', updParamCtrl);
	/** @ngInject */
	function updParamCtrl($scope, $filter, $uibModal, $timeout, HttpService,
			toastr, EnumType, Alert) {

		
		$scope.saveValue = function(isValid) {

			if (!isValid) {
				return;
			}
			var opts = {};
			opts.url = '/crm/manage/updateParam';
			opts.method = 'PUT';
			opts.params = $scope.sysParam;
			HttpService.linkHttp(opts).then(function(response) {
				$scope.sysParam = {};
				// 执行查询
				$scope.searchParam();
				$scope.$parent.$dismiss();
			});
		}

	}

})();
