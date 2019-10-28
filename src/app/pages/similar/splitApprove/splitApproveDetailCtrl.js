(function() {
	'use strict';

	angular.module('BlurAdmin.pages.similar.mergeApprove').controller(
			'splitApproveDetailCtrl', splitApproveDetailCtrl);
	/** @ngInject */
	function splitApproveDetailCtrl($scope, $stateParams, $state, $uibModal,
			HttpService, Alert, EnumType) {

		// 任务编号
		$scope.taskId = $stateParams.taskId;
        if($scope.taskId ==null || $scope.taskId ==""){
            window.history.go(-1);
            return;
        }
		// 相似客户拆分申请
		$scope.custSplitApply = {};

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

		// 小数转换为百分比
		function toPercent(point) {
			var str = Number(point * 100).toFixed(0);
			if(isNaN(str)){
				return null;
			}
			str += "%";
			return str;
		}

		$scope.writCount = 200;
		// 输入字数限定200字
		$scope.tolCount = function() {
			if ($scope.custSplitApply.approveOpinion.length > 200) {
				Alert.error('字数不能超过200字！');
			} else {
				$scope.writCount = 200 - $scope.custSplitApply.approveOpinion.length;
			}
		};

		// 打开客户详情页面
		$scope.openCustDetail = function(custNo) {
			$state.go('portrayal.perCusPortrayal', {
				'custNo' : custNo
			});
		}

		// 获取合并后的客户信息
		$scope.getMergedCust = function(custNo) {
			var opts = {};
			opts.url = '/crm/ecif/cust/mng/perCustInfo';
			opts.method = 'GET';
			opts.params = {
				'custNo' : custNo
			};
			HttpService
					.linkHttp(opts)
					.then(
							function(response) {
								$scope.mergedCust = response.data;
								$scope.mergedCust.birthDate = $scope.mergedCust.birthDate
										.substring(0, 10);
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
									if(i.birthDate!=null && i.birthDate.length>=10) {
										i.birthDate = i.birthDate.substring(0, 10);
									}
								});

								// 获取相似客户信息表记录，判断行checkbox是否选中
								angular
										.forEach(
												data.simCustList,
												function(i) {

													if (i.simCustState === EnumType.CustStat.merged.value) {
														angular
																.forEach(
																		$scope.rowCollection,
																		function(
																				item) {
																			if (i.similarCustNo === item.custNo) {
																				item.isChecked = true;
																			}
																		});
													}
												});

								// 相似任务处理轨迹信息获取
								$scope.timelineCollection = data.mergeSplitTraceList;

								// 客户合并关系表
								var custMergeRelaList = data.custMergeRelaList;
								if (custMergeRelaList != null
										&& custMergeRelaList != undefined
										&& custMergeRelaList.length > 0) {

									angular
											.forEach(
													custMergeRelaList,
													function(i) {
														if (i.newCustNo != null
																&& i.newCustNo != ""
																&& i.newCustNo != undefined) {
															// 获取合并后客户信息
															$scope
																	.getMergedCust(i.newCustNo);
														}

													});
								}

								// 相似任务合并申请表信息获取
								$scope.custSplitApplyList = data.custSplitApplyList;
								$scope.custSplitApply = $scope.custSplitApplyList[0];
							});
		}
		$scope.init();
		// 合并任务审批通过
		$scope.doSplitPass = function() {

			$scope.flg = 0;
			$uibModal
					.open({
						animation : true,
						backdrop : 'static',
						templateUrl : 'app/pages/similar/splitApprove/splitApproveOpinion.html',
						size : 'midle-900',
						controller : 'splitApproveOpinionCtrl',
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
						templateUrl : 'app/pages/similar/splitApprove/splitApproveOpinion.html',
						size : 'midle-900',
						controller : 'splitApproveOpinionCtrl',
						scope : $scope,
						resolve : {}
					});
		}
		// 返回任务列表
		$scope.backToList = function() {
			// $state.go('myHome',{'tabOpen':'cust'});
			window.history.go(-1);
		};
	}
})();
