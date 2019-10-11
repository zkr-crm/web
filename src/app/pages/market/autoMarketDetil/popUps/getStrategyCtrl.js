(function() {
	'use strict';

	angular.module('BlurAdmin.pages.market.autoMarketDetil').controller('getStrategyCtrl', getStrategyCtrl);
	/** @ngInject */
	function getStrategyCtrl($scope, $filter, $uibModal, $timeout, $uibModalInstance, HttpService, toastr, EnumType, Alert) {

		$scope.searchStarObj = {};

		// 查询基本策略信息
		$scope.searchStar = function() {
			$scope.searchStarObj.channel = 'POBS01';// 场景编码：动态客群场景
			var opts = {};
			opts.url = '/crm/manage/engine/getAllStraByEntity';
			opts.method = 'GET';
			opts.params = $scope.searchStarObj;
			HttpService.linkHttp(opts).then(function(response) {

				$scope.StratRowCollection = response.data;
				$scope.total = response.data.length;
			});
		};
		$scope.searchStar();

		//选中的策略对象
		$scope.returnObj ={};
		$scope.radioOptions={};
		// 单个选中
		$scope.selectOne = function(item) {
			$scope.returnObj.strategyId = item.strategyId; // 策略ID
			$scope.returnObj.strategyName = item.strategyName; // 策略名称
			$scope.returnObj.remark = item.remark; // 策略说明
		}

		// 选中返回
		$scope.ok = function() {
			if ($scope.radioOptions.select == undefined || $scope.radioOptions.select == "") {
				Alert.error('请选择静态客群！');
				return;
			}
			$uibModalInstance.close($scope.returnObj);
		};
	}

})();
