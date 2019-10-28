(function() {
	'use strict';

	angular.module('BlurAdmin.pages.similar').controller('TaskListCtrl',
			TaskListCtrl);
	/** @ngInject */
	function TaskListCtrl($scope, $filter, $compile, $uibModal, $rootScope,
			$http, Alert, $state, HttpService, EnumType) {
		// 获取任务状态列表
		$scope.getTaskStates = function() {
			$scope.taskStateList.push($scope.initTaskState);
			if (!!EnumType.SimTaskState) {
				$scope.taskStateList.push(EnumType.SimTaskState.pending);
				$scope.taskStateList.push(EnumType.SimTaskState.merge_send_back);
				$scope.taskStateList.push(EnumType.SimTaskState.close_send_back);
			}
		}
		$scope.idTypes = EnumType.IdType;
		// 小数转换为百分比
		$scope.toPercent = function(point) {
			var str = Number(point * 100).toFixed(0);
			str += "%";
			return str;
		}

		// 任务状态枚举值转换为文字显示
		$scope.showTaskStat = function(item) {
			var xxx = "";
			angular.forEach(EnumType.SimTaskState, function(i) {
				if (item.taskState === i.value) {
					xxx = i.label;
				}
			});
			return xxx;
		}

		// 查询当前登录用户的任务列表
		$scope.getTask = function() {

			$scope.queryOptions.params = $scope.searchObj;
			$scope.queryOptions.params.certTyp = $scope.searchObj.idType?$scope.searchObj.idType.value:'';
			this.queryPage(1);
		};

		// 任务状态下拉列表事件
		$scope.selectTaskState = function(selectedTaskState) {
			$scope.searchObj.taskState = selectedTaskState.value;
		}

		//查询
		$scope.search = function(page) {
			// var page = page || '1';
			// $scope.queryOptions.pageSize = $scope.pagination.pageSize;
			this.queryPage(page)
		}

		// 查看详情页面跳转
		$scope.showDetail = function(item) {
			$state.go('similarDetail', {
				'taskId' : item.taskId
			});
		};

		// 初始化
		var init = function () {
			//分页对象
			// $scope.pagination = {
   //              pageSize:'10',
   //              pageIndex:1,
   //              maxText:5
   //          }
            // 任务列表集合对象
			$scope.rowCollection = [];
			// 查询条件对象
			$scope.searchObj = {};
			//下拉集合
			$scope.taskStateList = [];
			// 初始化的所有状态的对象
			$scope.initTaskState = {
				code_name : "allState",
				code_type : "SimTaskState",
				label : "全部状态",
				value : "1,4,12"
			}
			// 待处理任务
			$scope.searchObj.taskState = $scope.initTaskState.value;
			$scope.searchObj.dealUser = $rootScope.global.employeeId;
            // 分页查询所有合并处理相关的任务
			$scope.queryOptions = {};
			$scope.queryOptions.pagination = {
				pageSize:'10',
                pageIndex:1,
                maxText:5
			}
			$scope.queryOptions.url = '/crm/ecif/similar/getTaskByEntity';
			$scope.queryOptions.method = 'POST';
			$scope.queryOptions.params = {};
			$scope.queryOptions.data = $scope.searchObj;
			$scope.queryOptions.success = function successCallback(response) {
				$scope.rowCollection = response.data.list;
			};
			$scope.getTaskStates();

		}
		init()
	}
})();
