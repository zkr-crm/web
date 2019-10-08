(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.tagMgr').controller(
			'updTagCtrl', updTagCtrl);
	/** @ngInject */
	function updTagCtrl($scope, $filter, $uibModal, $timeout, HttpService,
			toastr, EnumType, Alert) {

		
		$scope.saveValue = function(isValid) {

			if (!isValid) {
				return;
			}
			var opts = {};
			opts.url = '/crm/manage/tagmng/tagDetial';
			opts.method = 'PUT';
			opts.params = $scope.updTag;
			HttpService.linkHttp(opts).then(function(response) {
				$scope.updTag = {};
				// 执行查询
				$scope.searchTag();
				$scope.$parent.$dismiss();
			});
		}

	}

})();
