(function() {
	'use strict';

	angular.module('BlurAdmin.pages.market.marketDetil').controller('entryFeedBackCtrl', entryFeedBackCtrl);

	/** @ngInject */
	function entryFeedBackCtrl($scope, $state, $stateParams) {

		$scope.sendTarget = {};
		$scope.sendTarget.name="";
		for (var i = 0; i < $scope.checkedRow.length; i++) {
			if (i == $scope.checkedRow.length - 1) {
				$scope.sendTarget.name = $scope.sendTarget.name + $scope.checkedRow[i].name;
			} else {
				$scope.sendTarget.name = $scope.sendTarget.name + $scope.checkedRow[i].name + ",";
			}
		}

		// 关闭新增页面
		$scope.closePage = function() {
			$scope.$parent.$dismiss();
		}
	}

})();
