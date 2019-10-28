(function() {
	'use strict';

	angular.module('BlurAdmin.pages.similar').controller(
			'splitApproveOpinionCtrl', splitApproveOpinionCtrl);
	/** @ngInject */
	function splitApproveOpinionCtrl($scope, $filter, $uibModal, $timeout,$state,
			HttpService, toastr, EnumType, Alert) {

		$scope.custSplitApply.approveOpinion = '';

		// 提交页面
		$scope.submit = function() {
			if ($scope.flg == 0) {
				$scope.splitPass();
			} else if ($scope.flg == 1) {
				$scope.sendBack();
			}
		}

		// 关闭页面
		$scope.closePage = function() {
			$scope.$parent.$dismiss();
		}

		// 拆分申请审批通过
		$scope.splitPass = function() {
			if ($scope.custSplitApply.approveOpinion == undefined
					|| $scope.custSplitApply.approveOpinion == null
					|| $scope.custSplitApply.approveOpinion === "") {
				Alert.error('请填写审批意见！');
			} else {
				$scope.postdata = {};
				$scope.postdata.taskId = $scope.taskId;
				$scope.postdata.simCustList = $scope.rowCollection;
				$scope.postdata.custSplitApply = $scope.custSplitApply;

				var opts = {};
				opts.url = '/crm/ecif/similar/splitApplyPass';
				opts.method = 'POST';
				opts.params = {};
				opts.data = $scope.postdata;
				HttpService.linkHttp(opts).then(function(response) {
					if (response.status === "1") {
						Alert.success('审批通过，客户拆分成功！');
						$state.go('similar.splitApprove');
						// window.history.go(-1);
					}
				});
			}
		}

		// 退回重审
		$scope.sendBack = function() {
			if ($scope.custSplitApply.approveOpinion == undefined
					|| $scope.custSplitApply.approveOpinion == null
					|| $scope.custSplitApply.approveOpinion === "") {
				Alert.error('请填写审批意见！');
			} else {
				$scope.postdata = {};
				$scope.postdata.taskId = $scope.taskId;
				$scope.postdata.simCustList = $scope.rowCollection;
				$scope.postdata.custSplitApply = $scope.custSplitApply;

				var opts = {};
				opts.url = '/crm/ecif/similar/splitApplyUnPass';
				opts.method = 'POST';
				opts.params = {};
				opts.data = $scope.postdata;
				HttpService.linkHttp(opts).then(function(response) {
					if (response.status === "1") {
						Alert.success('拆分审批退回成功！');
						$state.go('similar.splitApprove');
						// window.history.go(-1);
					}
				});
			}
		}
	}
})();
