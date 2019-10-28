(function() {
	'use strict';

	angular.module('BlurAdmin.pages.similar').controller(
			'mergeApproveOpinionCtrl', mergeApproveOpinionCtrl);
	/** @ngInject */
	function mergeApproveOpinionCtrl($scope, $filter, $uibModal, $timeout,$state,
			HttpService, toastr, EnumType, Alert) {

		$scope.custmergeApply.applyOpinion = '';

		// 提交页面
		$scope.submit = function() {
			if ($scope.flg == 0) {
				$scope.mergePass();
			} else if ($scope.flg == 1) {
				$scope.sendBack();
			}
		}

		// 关闭页面
		$scope.closePage = function() {
			$scope.searchObj = {};
			$scope.$parent.$dismiss();
		}

		// 通过
		$scope.mergePass = function() {

			// 判断申请类型：合并申请 或 关闭申请
			if ($scope.custmergeApply.applyTyp == '0') {// 合并
				// 判断通过意见是否填写
				if ($scope.custmergeApply.approveSugges == undefined
						|| $scope.custmergeApply.approveSugges == null
						|| $scope.custmergeApply.approveSugges === "") {
					Alert.error('请填写审批结论！');
				} else {
					$scope.postdata = {};
					$scope.postdata.taskId = $scope.taskId;
					$scope.postdata.simCustList = $scope.rowCollection;
					$scope.postdata.custMergeApply = $scope.custmergeApply;

					var opts = {};
					opts.url = '/crm/ecif/similar/applyMergePass';
					opts.method = 'POST';
					opts.params = {};
					opts.data = $scope.postdata;
					HttpService.linkHttp(opts).then(
							function(response) {
								if (response.status === "1") {
									var data = response.data;
									if (response.data != null
											&& response.data != "") {
										Alert.success("审批通过，客户合并成功！["
												+ response.data + "]");
									}
									$state.go('similar.mergeApprove');
									// window.history.go(-1);
									// $scope.$parent.$dismiss();
								}
							});
				}
			} else {// 关闭
				// 判断通过意见是否填写
				if ($scope.custmergeApply.approveSugges == undefined
						|| $scope.custmergeApply.approveSugges == null
						|| $scope.custmergeApply.approveSugges === "") {
					Alert.error('请填写审批结论！');
				} else {
					$scope.postdata = {};
					$scope.postdata.taskId = $scope.taskId;
					$scope.postdata.simCustList = $scope.rowCollection;
					$scope.postdata.custMergeApply = $scope.custmergeApply;

					var opts = {};
					opts.url = '/crm/ecif/similar/applyMergePass';
					opts.method = 'POST';
					opts.params = {};
					opts.data = $scope.postdata;
					HttpService.linkHttp(opts).then(function(response) {
						if (response.status === "1") {
							Alert.success('审批通过，任务关闭成功！');
							$state.go('similar.mergeApprove');
							// window.history.go(-1);
							// $scope.$parent.$dismiss();
						}
					});
				}
			}

		}

		// 退回重审
		$scope.sendBack = function() {
			// 判断通过意见是否填写
			if ($scope.custmergeApply.approveSugges == undefined
					|| $scope.custmergeApply.approveSugges == null
					|| $scope.custmergeApply.approveSugges === "") {
				Alert.error('请填写审批结论！');
			} else {
				$scope.postdata = {};
				$scope.postdata.taskId = $scope.taskId;
				$scope.postdata.simCustList = $scope.rowCollection;
				$scope.postdata.custMergeApply = $scope.custmergeApply;

				var opts = {};
				opts.url = '/crm/ecif/similar/applyMergeSendBack';
				opts.method = 'POST';
				opts.params = {};
				opts.data = $scope.postdata;
				HttpService.linkHttp(opts).then(function(response) {
					if (response.status === "1") {
						Alert.success('审批退回成功！');
						$state.go('similar.mergeApprove');
						// window.history.go(-1);
						// $scope.$parent.$dismiss();
					}
				});
			}
		}

		$scope.writCount = 200;
		// 输入字数限定200字
		$scope.tolCount = function() {
			if ($scope.custmergeApply.approveSugges.length > 200) {
				Alert.error('字数不能超过200字！');
			} else {
				$scope.writCount = 200 - $scope.custmergeApply.approveSugges.length;
			}
		};
	}
})();
