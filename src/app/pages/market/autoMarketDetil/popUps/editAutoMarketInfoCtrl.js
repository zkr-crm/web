(function() {
	'use strict';

	angular.module('BlurAdmin.pages.market.autoMarketDetil').controller('editAutoMarketInfoCtrl', editAutoMarketInfoCtrl);

	/** @ngInject */
	function editAutoMarketInfoCtrl($scope, $state, $stateParams) {

		// 信息选项卡
		$scope.information_a = 0;
		$scope.index_ = function() {
			$scope.information_a++;
		}
		$scope.information = [ '基本信息', '推送策略配置' ];
		$scope.fan_information = function(e) {
			$scope.information_a = e;
		}

		// 关闭新增页面
		$scope.closePage = function() {
			$scope.$parent.$dismiss();
		}
	}

})();
