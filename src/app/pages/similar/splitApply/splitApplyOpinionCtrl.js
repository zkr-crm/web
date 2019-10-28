(function() {
	'use strict';

	angular.module('BlurAdmin.pages.similar').controller(
			'splitApplyOpinionCtrl', splitApplyOpinionCtrl);
	/** @ngInject */
	function splitApplyOpinionCtrl($scope, $filter, $uibModal, $timeout,$state,
			HttpService, toastr, EnumType, Alert) {

		$scope.custSplitApply.applyOpinion = '';

		// 提交页面
		$scope.submit = function() {

			$scope.splitApply();
		}

		// 关闭页面
		$scope.closePage = function() {
			// $scope.searchObj = {};
			$scope.$parent.$dismiss();
		}

		// 已合并客户拆分
		$scope.splitApply = function() {

			if ($scope.custSplitApply.applyOpinion == undefined
					|| $scope.custSplitApply.applyOpinion == null
					|| $scope.custSplitApply.applyOpinion === "") {
				Alert.error('请填写申请理由！');
			} else {
				$scope.postdata = {};
				$scope.postdata.taskId = $scope.taskId;
				$scope.postdata.custSplitApply = $scope.custSplitApply;

				var opts = {};
				opts.url = '/crm/ecif/similar/splitApply';
				opts.method = 'POST';
				opts.params = {};
				opts.data = $scope.postdata;
				HttpService.linkHttp(opts).then(function(response) {
					if (response.status === "1") {
						Alert.success('拆分申请已提交！');
						$state.go('similar.splitApply');
						// window.history.go(-1);
					}
				});
			}
		}
	}
})();
