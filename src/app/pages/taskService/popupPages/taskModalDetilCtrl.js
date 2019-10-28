(function() {
	'use strict';

	angular.module('BlurAdmin.pages.taskService.allTask').controller('allTasktaskModalDetilCtrl', allTasktaskModalDetilCtrl);
	/** @ngInject */
	function allTasktaskModalDetilCtrl($scope, $filter, $uibModal, $timeout, HttpService, toastr, EnumType, Alert) {
		$scope.open = open;
		$scope.opened = false;
		// 打开日期控件
		function open() {
			$scope.opened = true;
		}

		$scope.onload = function() {
			$scope.taskStatv = EnumType.TaskStat.getEnumByValue($scope.saveTask.taskStat);
			$scope.saveTask.taskStat = $scope.taskStatv;
			$scope.taskStat = EnumType.TaskStat;
			if ($scope.saveTask.taskEndDate != null) {
				var endTime = $scope.saveTask.taskEndDate;
				var v = new Date(endTime);
				$scope.saveTask.taskEndDate = v;
			}
			$scope.taskTypev = EnumType.TaskType.getEnumByValue($scope.saveTask.taskType);
			$scope.saveTask.taskType = $scope.taskTypev;
			$scope.taskType = EnumType.TaskType;
		}

		$scope.onload();

		$scope.saveValue = function(isValid) {

			if (!isValid) {
				return;
			}

			if ($scope.saveTask.taskType) {
				$scope.v = $scope.saveTask.taskType.value;
				$scope.saveTask.taskType = "";
				$scope.saveTask.taskType = $scope.v;
			}
			if ($scope.saveTask.taskStat) {
				$scope.v2 = $scope.saveTask.taskStat.value;
				$scope.saveTask.taskStat = "";
				$scope.saveTask.taskStat = $scope.v2;
			}

			var opts = {};
			if ($scope.isUpd == "true") {
				opts.url = '/crm/ocrm/task/putOne';
				opts.method = 'PUT';
			} else {
				opts.url = '/crm/ocrm/task/postOne';
				opts.method = 'POST';
			}
			opts.params = $scope.saveTask;
			if ($scope.saveTask.taskEndDate != null) {
				var taskEndDate = new Date($scope.saveTask.taskEndDate);
				opts.params.taskEndDate = $filter('date')(taskEndDate, 'yyyy-MM-dd');
			}

			HttpService.linkHttp(opts).then(function(response) {
				toastr.success('提交完成!');
				$scope.saveTask = {};
				$scope.searchTask();
				$scope.closePage();
			});
		}

		$scope.closePage = function() {
			$scope.$parent.$dismiss();
		}
	}

})();
