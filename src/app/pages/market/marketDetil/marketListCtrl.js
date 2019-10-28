(function() {
	'use strict';

	angular.module('BlurAdmin.pages.market.marketDetil').controller('marketListCtrl', marketListCtrl);

	/** @ngInject */
	function marketListCtrl($scope, $state, $stateParams, $uibModal) {

		$scope.activeRows = [ {
			"activName" : "新品推介会",// 活动名称
			"startDate" : "2018-05-13 09:30:00",// 活动开始时间
			"endDate" : "2018-05-13 11:30:00",// 活动结束时间
			"address" : "京城81号",// 活动地点
			"activDesc" : "活动说明1XXXXXXXXXXX",// 活动说明
			"activRule" : "1、规则一 2、规则2 XXXXXXXXXXX",// 活动规则
			"activStat" : "启动",// 活动状态
			"signPerson" : "129",// 报名人数
			"chargePerson" : "刘杰",// 负责人
			"phoneNo" : "15204698585",// 联系电话
			"activeType" : "人工",// 活动类型
			"creatTime" : "2018-05-11 09:30:00",// 创建时间
			"QRCode" : ""// 二维码
		} ];

		$scope.activeInfo = {};

		for (var i = 0; i < 12; i++) {
			var activeObj = {};

			activeObj.activName = "活动名称" + i;
			activeObj.startDate = "活动开始时间" + i;
			activeObj.endDate = "活动结束时间" + i;
			activeObj.address = "活动地点" + i;
			activeObj.activDesc = "活动说明" + i;
			activeObj.activRule = "活动规则" + i;
			activeObj.activStat = "活动状态" + i;
			activeObj.signPerson = "报名人数" + i;
			activeObj.chargePerson = "负责人" + i;
			activeObj.phoneNo = "联系电话" + i;
			activeObj.activeType = "活动类型" + i;
			activeObj.creatTime = "创建时间" + i;
			activeObj.QRCode = "二维码" + i;

			$scope.activeRows.push(activeObj);
		}

		// 显示详情
		$scope.showDetil = function(item) {
			$state.go('market.marketDetil', {
				'activInfo' : item
			});
		};

		// 创建活动
		$scope.createActiv = function() {
			$uibModal.open({
				animation : true,
				backdrop : 'static',
				templateUrl : 'app/pages/market/activCreat/templat/artificialActiv.html',
				size : 'midle-900',
				controller : 'artificialActivCtrl',
				scope : $scope,
				resolve : {

				}
			});
		}

		// 打开编辑页面
		$scope.openEditMarketInfo = function() {
			$uibModal.open({
				animation : true,
				backdrop : 'static',
				templateUrl : 'app/pages/market/marketDetil/popUps/editMarketInfo.html',
				size : 'midle-900',
				controller : 'editMarketInfoCtrl',
				scope : $scope,
				resolve : {

				}
			});
		}
	}

})();
