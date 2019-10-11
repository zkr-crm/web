(function() {
	'use strict';

	angular.module('BlurAdmin.pages.similar').controller(
			'mergeApplyOpinionCtrl', mergeApplyOpinionCtrl);
	/** @ngInject */
	function mergeApplyOpinionCtrl($scope, $filter, $uibModal, $timeout,
			HttpService, toastr, EnumType, Alert) {

		$scope.custmergeApply.applyOpinion = "";

		// 提交页面
		$scope.submit = function() {
			if ($scope.flg == 0) {
				$scope.custMerge();
			} else if ($scope.flg == 1) {
				$scope.closeTask();
			}
		}

		// 关闭页面
		$scope.closePage = function() {
			// $scope.searchObj = {};
			$scope.$parent.$dismiss();
		}

		// 关闭任务申请
		$scope.closeTask = function() {
			if ($scope.custmergeApply.applyOpinion == undefined
					|| $scope.custmergeApply.applyOpinion == null
					|| $scope.custmergeApply.applyOpinion === "") {
				Alert.error('请填写关闭理由！');
			} else {
				$scope.postdata = {};
				$scope.postdata.taskId = $scope.taskId;
				$scope.postdata.simCustList = $scope.rowCollection;
				$scope.postdata.custMergeApply = $scope.custmergeApply;

				var opts = {};
				opts.url = '/crm/ecif/similar/doCloseTaskApply';
				opts.method = 'POST';
				opts.data = $scope.postdata;
				HttpService.linkHttp(opts).then(function(response) {
					if (response.status === "1") {
						Alert.success('申请成功！');
						// window.history.go(-1);
						// $scope.$parent.$dismiss();
					}
				});
			}
		}

		// 执行选中的客户合并
		$scope.custMerge = function() {

			if ($scope.custmergeApply.applyOpinion == undefined
					|| $scope.custmergeApply.applyOpinion == null
					|| $scope.custmergeApply.applyOpinion === "") {
				Alert.error('请填写申请理由！');
			} else {

				$scope.checkedRow;
				$scope.postdata = {};
				$scope.postdata.taskId = $scope.taskId;
				var simCustList = [];
				
				angular.forEach($scope.rowCollection,function(item) {
					if (item.isChecked) {
						simCustList.push(item);
					}
				});
				$scope.postdata.simCustList = simCustList
//				$scope.postdata.simCustList = $scope.rowCollection;
				$scope.postdata.custMergeApply = $scope.custmergeApply;

				// 任务详细信息对象
				var SimCustTask = {};
				SimCustTask.taskId = $scope.taskId;

				var opts = {};
				opts.url = '/crm/ecif/similar/doCustMergeApply';
				opts.method = 'POST';
				opts.data = $scope.postdata;
				HttpService.linkHttp(opts).then(function(response) {
					if (response.status === "1") {
						Alert.success('申请成功！');
						// window.history.go(-1);
						// $scope.$parent.$dismiss();
					}
				});
			}
		}

	}

})();
