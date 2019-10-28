/*人工营销活动模板*/
(function() {
	'use strict';

	angular.module('BlurAdmin.pages.market.autoActivCreat').controller('autoActivCreatCtrl', autoActivCreatCtrl);

	/** @ngInject */
	function autoActivCreatCtrl($scope, $state, $stateParams, $uibModal, HttpService) {

		// 信息选项卡
		$scope.information_a = 0;
		$scope.index_ = function() {
			$scope.information_a++;
		}
		$scope.information = [ '基本信息','高级设置' ];
		$scope.fan_information = function(e) {
			$scope.information_a = e;
		}
		
		// 关闭新增页面
		$scope.closePage = function() {
			$scope.$parent.$dismiss();
		}
	}

})();
