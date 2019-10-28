(function() {
	'use strict';

	angular.module('BlurAdmin.pages.similar.mergeApprove').controller(
			'mergeApproveCtrl', mergeApproveCtrl);
	/** @ngInject */
	function mergeApproveCtrl($scope, $filter, $compile, $uibModal, $rootScope,
			Alert, $state, HttpService, EnumType) {
        $scope.pagination = {
            pageSize:'10',
            pageIndex:1,
            maxText:5
        }
        $scope.$on('refreshPage',function(event,refreshPage){
        	$scope.refreshPage = refreshPage
        })

		$scope.SimTaskState = EnumType.SimTaskState;

		// 任务列表集合对象
		$scope.rowCollection = [];
		// 查询条件对象
		$scope.searchObj = {};
		$scope.idTypes = EnumType.IdType;
		// 分页查询所有我的待审批任务
		var obj = {};
		var taskStat = EnumType.SimTaskState.merge_apply.value + ","
				+ EnumType.SimTaskState.close_apply.value;
		obj.approveUser = $rootScope.global.employeeId;
		obj.taskState = taskStat;

		// 查询所有的未分配的任务列表
		$scope.getTask = function() {

			$scope.queryOptions.params = $scope.searchObj;
			$scope.queryOptions.params.certTyp = $scope.searchObj.idType?$scope.searchObj.idType.value:"";
			//this.queryPage(1);
			$scope.refreshPage(1,$scope.queryOptions);
			$scope.refreshPage(1,$scope.myQueryOptions);
		};

		// 查询当前登录用户的任务列表
		$scope.getMyTask = function() {

			$scope.myQueryOptions.data = obj;

			this.queryPage(1);
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

		// 认领审批任务
		$scope.receiveTask = function(item) {
			Alert.confirm("确定申领当前任务？ [" + item.taskId + "]").then(function() {
				var opts = {};
				opts.url = '/crm/ecif/similar/receiveMergeTask';
				opts.method = 'POST';
				opts.params = {
					'taskId' : item.taskId,
					'taskState' : item.taskState
				};
				HttpService.linkHttp(opts).then(function(response) {
					// TODO 调用成功后页面应该刷新，但是现在没有
					$scope.getTask();
				});
			});
		}
		// 获取我的待审批任务
		$scope.myQueryOptions = {};
		$scope.myQueryOptions.url = '/crm/ecif/similar/getTaskByEntity';
		$scope.myQueryOptions.method = 'POST';
		$scope.myQueryOptions.params = {};
		$scope.myQueryOptions.data = obj;
		$scope.myQueryOptions.success = function successCallback(response) {
			$scope.myRowCollection = response.data.list;
		};

		// 所有待审批任务
		$scope.searchObj.taskState = EnumType.SimTaskState.merge_apply.value
				+ "," + EnumType.SimTaskState.close_apply.value;

		// 分页查询所有待审批任务
		$scope.queryOptions = {};
		$scope.queryOptions.url = '/crm/ecif/similar/selectAllNoApproveUser';
		$scope.queryOptions.method = 'POST';
		$scope.queryOptions.params = {};
		$scope.queryOptions.data = $scope.searchObj;
		$scope.queryOptions.success = function successCallback(response) {
			$scope.rowCollection = response.data.list;
		};
		// 查看详情页面跳转
		$scope.showDetail = function(item) {
			$state.go('similar.mergeDetail', {
				'taskId' : item.taskId
			});
		};
		$scope.search = function(page){
            $scope.queryList[this.optsType](page)
		}
		$scope.queryList= []
		var init = function () {
			$scope.$on('queryPage',function(event,queryPage){
	            var optsType=event.targetScope.optsType
	            $scope.queryList[optsType]=queryPage;
	        });
			$scope.queryOptions.pagination = {
                pageSize:'10',
                pageIndex:1,
                maxText:5
            }
            $scope.myQueryOptions.pagination = {
                pageSize:'10',
                pageIndex:1,
                maxText:5
            }
		}
		init()

	}
})();
