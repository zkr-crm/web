(function() {
	'use strict';

	angular.module('BlurAdmin.pages.market.autoMarketDetil').controller('autoMarketListCtrl', autoMarketListCtrl);

	/** @ngInject */
	function autoMarketListCtrl($scope, $state, $stateParams, $uibModal) {

		$scope.activeRows = [ {
			"activName" : "新客户优惠",// 活动名称
			"startDate" : "2018-05-01 00:00:00",// 活动开始时间
			"endDate" : "2019-05-01 00:00:00",// 活动结束时间
			"address" : "京城82号",// 活动地点
			"activDesc" : "活动说明1XXXXXXXXXXXXXXXX",// 活动说明
			"activRule" : "",// 活动规则
			"activStat" : "执行中",// 活动状态
			"signPerson" : "",// 报名人数
			"chargePerson" : "",// 负责人
			"phoneNo" : "",// 联系电话
			"activeType" : "自动",// 活动类型
			"creatTime" : "2018-04-01 09:30:00",// 创建时间
			"QRCode" : false,// 二维码
			"QRCodeUrl" : ""// 二维码图片地址
		} ];

		// 展示二维码
		$scope.showQRCode = function(item) {
			if (!item.QRCode) {
				item.QRCode = true;
			} else {
				item.QRCode = false;
			}
		}

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
			activeObj.QRCode = false;
			activeObj.QRCodeUrl = "";// 二维码图片地址

			$scope.activeRows.push(activeObj);
		}

		// 显示详情
		$scope.showDetil = function(item) {
			$state.go('market.autoMarketDetil', {
				'activInfo' : item
			});
		};

		// 创建活动
		$scope.createActiv = function() {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'app/pages/market/autoActivCreat/autoActivCreat.html',
				controller : 'autoActivCreatCtrl',
				size : 'midle-900',
				backdrop : 'static',
				scope : $scope,
				resolve : {}
			});
		};

		// 创建活动
		$scope.createActiv2 = function() {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'app/pages/market/autoActivCreat/autoActivCreat2.html',
				controller : 'autoActivCreat2Ctrl',
				size : 'midle-900',
				backdrop : 'static',
				scope : $scope,
				resolve : {}
			});
		};

		// 打开修改窗口
		$scope.openEditView = function() {
			$uibModal.open({
				animation : true,
				backdrop : 'static',
				templateUrl : 'app/pages/market/autoMarketDetil/popUps/editAutoMarketInfo.html',
				size : 'midle-900',
				controller : 'editAutoMarketInfoCtrl',
				scope : $scope,
				resolve : {

				}
			});
		}
	}

})();
