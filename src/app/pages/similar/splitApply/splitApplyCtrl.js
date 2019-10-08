(function() {
	'use strict';

	angular.module('BlurAdmin.pages.similar.splitApply').controller(
			'splitApplyCtrl', splitApplyCtrl);
	/** @ngInject */
	function splitApplyCtrl($scope, $filter, $compile, $uibModal, $rootScope,
			Alert, $state, HttpService, EnumType) {
        $scope.pagination = {
            pageSize:'10',
            pageIndex:1,
            maxText:5
        }
		// 查询当前登录用户的任务列表
		$scope.search = function(page) {

			$scope.queryOptions.params = $scope.searchObj;
			// var page = page||'1';
			// $scope.queryOptions.pageSize = $scope.pagination.pageSize;
			this.queryPage(page);
		};

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

		

		// 查看详情页面跳转
		$scope.showDetail = function(item) {
			$state.go('similar.splitDetail', {
				'taskId' : item.taskId
			});
		};

		//初始化
		var init = function () {
			// $scope.pagination = {
   //              pageSize:'10',
   //              pageIndex:1,
   //              maxText:5
   //          }
            $scope.SimTaskState = EnumType.SimTaskState;

			// 任务列表集合对象
			$scope.rowCollection = [];
			// 查询条件对象
			$scope.searchObj = {};
			// 已合并过用户的任务
			$scope.searchObj.taskState = EnumType.SimTaskState.merged.value + ","
					+ EnumType.SimTaskState.split_send_back.value;
			$scope.searchObj.dealUser = $rootScope.global.employeeId;
			// 分页查询所有任务
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
		}
		init()

	}
})();
