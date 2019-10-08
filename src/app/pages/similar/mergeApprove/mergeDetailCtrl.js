(function() {
	'use strict';

	angular.module('BlurAdmin.pages.similar.mergeApprove').controller(
			'mergeDetailCtrl', mergeDetailCtrl);
	/** @ngInject */
	function mergeDetailCtrl($scope, $stateParams, $state, $uibModal,
			HttpService, Alert, EnumType) {

		// 任务编号
		$scope.taskId = $stateParams.taskId;
		if($scope.taskId ==null || $scope.taskId ==""){
			window.history.go(-1);
			return;
		}
		// 相似客户合并申请
		$scope.custmergeApply = {};

		// 任务状态枚举值转换为文字显示
		$scope.showTaskStat = function(taskState) {
			var xxx = "";
			angular.forEach(EnumType.SimTaskState, function(i) {
				if (taskState === i.value) {
					xxx = i.label;
				}
			});
			return xxx;
		}

		// 历史动作枚举值转换为汉字显示
		$scope.showTaskTrace = function(item) {
			var xxx = "";
			angular.forEach(EnumType.MergeSplitAction, function(i) {
				if (item.mergeSplitAction === i.value) {
					xxx = i.label;
				}
			});
			return xxx;
		}

		// 性别枚举值转换为汉字显示
		$scope.ShowGender = function(item) {

			var sexLabel = "";
			angular.forEach(EnumType.Sex, function(i) {
				if (item.sex === i.value) {
					sexLabel = i.label;
				}
			});
			return sexLabel;
		};

		// 证件类型枚举值转换为汉字显示
		$scope.ShowCertTyp = function(item) {

			var certTyp = "";
			angular.forEach(EnumType.IdType, function(i) {
				if (item.certTyp === i.value) {
					certTyp = i.label;
				}
			});
			return certTyp;
		};

		// 申请类型枚举值转换为汉字
		$scope.ShowTaskApplyTyp = function(item) {

			var applyTyp = "";
			angular.forEach(EnumType.TaskApplyTyp, function(i) {
				if (item.applyTyp === i.value) {
					applyTyp = i.label;
				}
			});
			return applyTyp;
		};

		// 证件类型枚举值转换为汉字显示
		$scope.ShowCertTyp = function(item) {

			var certTyp = "";
			angular.forEach(EnumType.IdType, function(i) {
				if (item.certTyp === i.value) {
					certTyp = i.label;
				}
			});
			return certTyp;
		};

		// 小数转换为百分比
		$scope.toPercent = function(point) {
			var str = Number(point * 100).toFixed(0);
			str += "%";
			return str;
		}

		$scope.writCount = 200;
		// 输入字数限定200字
		$scope.tolCount = function() {
			if ($scope.custmergeApply.applyOpinion.length > 200) {
				Alert.error('字数不能超过200字！');
			} else {
				$scope.writCount = 200 - $scope.custmergeApply.applyOpinion.length;
			}
		};

		// 打开客户详情页面
		$scope.openCustDetail = function(custNo) {
			$state.go('portrayal.perCusPortrayal', {
				'custNo' : custNo
			});
		}

		$scope.init = function() {
			var opts = {};
			opts.url = '/crm/ecif/similar/getTaskByTaskId';
			opts.method = 'GET';
			opts.params = {
				'taskId' : $scope.taskId
			};
			HttpService
					.linkHttp(opts)
					.then(
							function(response) {

								var data = response.data;

								// 详细任务数据初始化
								$scope.taskId = data.taskId;
								$scope.taskState = data.simTask.taskState;
								$scope.judgeRuleDesc = data.simCustRule.judgeDesc;
								$scope.similarPercent = data.simTask.similarPercent;

								// 相似客户信息获取
								$scope.rowCollection = data.simCustDetilList;
								// 出生日期截取年月日
								angular.forEach($scope.rowCollection, function(
										i) {
									if(i.birthDate!=null && i.birthDate.length>=10){
                                        i.birthDate = i.birthDate.substring(0, 10);
									}
								});

								// 获取相似客户信息表记录，判断行checkbox是否选中
								angular.forEach(data.simCustList,function(i) {
									if (i.simCustState === EnumType.SimCustState.wait_for_merge.value) {
										angular.forEach($scope.rowCollection,function(item) {
											if (i.similarCustNo === item.custNo) {
												item.isChecked = true;
											}
										});
									}
								});

								// 相似任务处理轨迹信息获取
								$scope.timelineCollection = data.mergeSplitTraceList;
								// 相似任务合并申请表信息获取
								$scope.custMergeApplyList = data.custMergeApplyList;
								$scope.custmergeApply = $scope.custMergeApplyList[0];

							});
		}
		$scope.init();

		// 返回任务列表
		$scope.backToList = function() {
			// $state.go('myHome',{'tabOpen':'cust'});
			window.history.go(-1);
		};

		// 合并任务审批通过
		$scope.doMergePass = function() {

			$scope.flg = 0;
			$uibModal
					.open({
						animation : true,
						backdrop : 'static',
						templateUrl : 'app/pages/similar/mergeApprove/mergeApproveOpinion.html',
						size : 'midle-900',
						controller : 'mergeApproveOpinionCtrl',
						scope : $scope,
						resolve : {}
					});
		}

		// 合并任务审批退回
		$scope.doSendBack = function() {

			$scope.flg = 1;
			$uibModal
					.open({
						animation : true,
						backdrop : 'static',
						templateUrl : 'app/pages/similar/mergeApprove/mergeApproveOpinion.html',
						size : 'midle-900',
						controller : 'mergeApproveOpinionCtrl',
						scope : $scope,
						resolve : {}
					});
		}
	}
})();
