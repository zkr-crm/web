(function() {
	'use strict';

	angular.module('BlurAdmin.pages.similar.splitApprove').controller(
			'splitApproveCtrl', splitApproveCtrl);
	/** @ngInject */
	function splitApproveCtrl($scope, $filter, $compile, $uibModal, $rootScope,
			Alert, $state, HttpService, EnumType) {
		// $scope.smartTablePageSize = 5;
        $scope.pagination = {
            pageSize:'10',
            pageIndex:1,
            maxText:5
        }
		$scope.SimTaskState = EnumType.SimTaskState;
		$scope.$on('refreshPage',function(event,refreshPage){
        	$scope.refreshPage = refreshPage
        })
		// 任务列表集合对象
		$scope.rowCollection = [];
		// 查询条件对象
		$scope.searchObj = {};
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

		// 认领审批任务
		$scope.receiveTask = function(item) {
			Alert.confirm("确定申领当前任务？ [" + item.taskId + "]").then(function() {
				var opts = {};
				opts.url = '/crm/ecif/similar/receiveMergeTask';
				opts.method = 'POST';
				opts.params = {
					'taskId' : item.taskId,
					'taskState':item.taskState
				};
				HttpService.linkHttp(opts).then(function(response) {
					// TODO 调用成功后页面应该刷新，但是现在没有
					$scope.getTask();
				});
			});
		}
		
		// 查询所有的未分配的任务列表
		$scope.getTask = function() {
			$scope.queryOptions.params.certTyp = $scope.searchObj.certTyp?$scope.searchObj.certTyp.value:"";
			$scope.refreshPage(1,$scope.myQueryOptions);
			$scope.refreshPage(1,$scope.queryOptions);
		};

		// 未分配的待审批拆分任务
		$scope.searchObj.taskState = EnumType.SimTaskState.split_apply.value;
		// 分页查询所有任务
		$scope.queryOptions = {};
		$scope.queryOptions.url = '/crm/ecif/similar/selectAllNoApproveSplitTask';
		$scope.queryOptions.method = 'GET';
		$scope.queryOptions.params = $scope.searchObj;
		$scope.queryOptions.success = function successCallback(response) {
			$scope.rowCollection = response.data.list;
		};

		// 我的待审批拆分任务
		var param = {};
		// 分页查询所有任务
		$scope.myQueryOptions = {};
		$scope.myQueryOptions.url = '/crm/ecif/similar/getMySplitTaskByEntity';
		$scope.myQueryOptions.method = 'GET';
		$scope.myQueryOptions.params = {
				"employeeId":$rootScope.global.employeeId,
				"taskState":EnumType.SimTaskState.split_apply.value
		};
		$scope.myQueryOptions.success = function successCallback(response) {
			$scope.myRowCollection = response.data.list;
		};

		// 查看详情页面跳转
		$scope.showDetail = function(item) {
			$state.go('similar.splitApproveDetail', {
				'taskId' : item.taskId
			});
		};
		$scope.search = function (page) {
			this.queryList[this.optsType](page)
		}
		$scope.queryList = []
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
