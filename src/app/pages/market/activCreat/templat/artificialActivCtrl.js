/*人工营销活动模板*/
(function() {
	'use strict';

	angular.module('BlurAdmin.pages.market.activCreat').controller('artificialActivCtrl', artificialActivCtrl);

	/** @ngInject */
	function artificialActivCtrl($scope, $state, $stateParams, $uibModal, HttpService) {

		// 添加删除任务按钮是否显示
		$scope.showButton = function(but) {
			$scope.but = but;
		}

		// 任务列表
		$scope.taskList = [];
		for (var i = 0; i < 12; i++) {
			var taskObj = {};

			taskObj.seqNo = "序号" + i;
			taskObj.taskName = "任务名称" + i;
			taskObj.startTime = "开始时间" + i;
			taskObj.endTime = "结束时间" + i;
			taskObj.budget = "预算" + i;
			taskObj.chargePerson = "负责人" + i;
			$scope.taskList.push(taskObj);
		}

		// 关闭新增页面
		$scope.closePage = function() {
			$scope.$parent.$dismiss();
		}

		// 信息选项卡
		$scope.information_a = 0;
		$scope.index_ = function() {
			$scope.information_a++;
		}
		$scope.information = [ '基本信息', '管理信息', '高级设置' ];
		$scope.fan_information = function(e) {
			$scope.information_a = e;
		}
	}

})();
