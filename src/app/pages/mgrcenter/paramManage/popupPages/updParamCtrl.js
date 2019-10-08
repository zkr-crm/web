(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.usermanagement').controller(
			'updSysParamCtrl', updSysParamCtrl);
	/** @ngInject */
	function updSysParamCtrl($scope, $filter, $uibModal, $timeout, HttpService,
			toastr, EnumType, Alert) {

		
		$scope.saveValue = function(isValid) {

			if (!isValid) {
				return;
			}
			var opts = {};
			opts.url = '/crm/manage/paramng/param';
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
