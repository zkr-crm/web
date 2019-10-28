(function() {
	'use strict';

	angular.module('BlurAdmin.pages.market.activCreat').controller('autoActivCtrl', autoActivCtrl);

	/** @ngInject */
	function autoActivCtrl($scope, $state, $stateParams, $uibModal, HttpService) {

		// 信息选项卡
		$scope.information_a = 0;
		$scope.index_ = function() {
			$scope.information_a++;
		}
		$scope.information = [ '基本信息', '高级设置' ];
		$scope.fan_information = function(e) {
			$scope.information_a = e;
		}
	}

})();
