(function() {
	'use strict';

	angular.module('BlurAdmin.pages.similar.splitApply').controller(
			'splitDetailCtrl', splitDetailCtrl);
	/** @ngInject */
	function splitDetailCtrl($scope, $stateParams, $state, $uibModal,
			HttpService, Alert, EnumType) {

		// 任务编号
		$scope.taskId = $stateParams.taskId;
		if($scope.taskId==null ||$scope.taskId==""){
            window.history.go(-1);
		}
		$scope.timelineCollection = [];
		// 相似客户合并申请
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
		$scope.ShowDealConclusion = function(item) {

			var dealConclusion = "";
			angular.forEach(EnumType.ApprovConclusion, function(i) {
				if (item.dealConclusion === i.value) {
					dealConclusion = i.label;
				}
			});
			return dealConclusion;
		};

		// 小数转换为百分比
		$scope.toPercent = function(point) {
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
			if ($scope.custSplitApply.applyOpinion.length > 200) {
				Alert.error('字数不能超过200字！');
			} else {
				$scope.writCount = 200 - $scope.custSplitApply.applyOpinion.length;
			}
		};

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
								if($scope.mergedCust.birthDate && $scope.mergedCust.birthDate.length>=10){
									$scope.mergedCust.birthDate = $scope.mergedCust.birthDate.substring(0, 10);
								}
								// angular.forEach($scope.mergedCust, function(
								// 	i) {
								// 	if(i.birthDate && i.birthDate.length>=10){
								// 		i.birthDate = i.birthDate.substring(0, 10);
								// 	}
								// });
								// $scope.mergedCust.birthDate = $scope.mergedCust.birthDate?$scope.mergedCust.birthDate
								// 		.substring(0, 10):'';
							});
		}

		// 打开客户详情页面
		$scope.openCustDetail = function(custNo) {
			$state.go('portrayal.perCusPortrayal', {
				'custNo' : custNo
			});
		}

		// 获取任务详情，初始化详情页面
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

								// 审批人意见div是否显示控制
								if (EnumType.SimTaskState.split_send_back.value == $scope.taskState) {
									$scope.isShow = false;
								} else {
									$scope.isShow = true;
								}

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

								if (data.custSplitApplyList != null
										&& data.custSplitApplyList[0] != null) {
									$scope.custSplitApply.approveSugges = data.custSplitApplyList[0].approveOpinion;
								}
							});
		}
		$scope.init();

		// 关闭任务
		$scope.splitApply = function() {
			$uibModal
					.open({
						animation : true,
						backdrop : 'static',
						templateUrl : 'app/pages/similar/splitApply/splitApplyOpinion.html',
						size : 'midle-900',
						controller : 'splitApplyOpinionCtrl',
						scope : $scope,
						resolve : {}
					});
		}

		// 返回任务列表
		$scope.backToList = function() {
			 $state.go('similar.splitApply');
			//window.history.go(-1);
		};
	}
})();
