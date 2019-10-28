(function() {
	'use strict';

	angular.module('BlurAdmin.theme.components').controller(
			'remindDtlCtrl', remindDtlCtrl);
	/** @ngInject */
	function remindDtlCtrl($scope, $uibModal, $filter, $timeout, $http,$state,
			HttpService, EnumType, Alert) {

		// 是否已读
		if ($scope.remindDetail.isRead === '0') {
			$scope.isReadLabel = "未读";
		} else {
			$scope.isReadLabel = "已读";
		}

		// 点开详情页则置为已读
		$scope.updIsReadStat = function() {

			var opts = {};
			opts.url = '/crm/manage/msgmng/modIsReadStat';
			opts.method = 'PUT';
			opts.params = {
				remindId : $scope.remindDetail.remindId
			};
			HttpService.linkHttp(opts).then(function(response) {
			});
		};

		// 判断该信息状态是否为未读，若为未读则置为已读
		if ($scope.remindDetail.isRead === '0') {
			$scope.updIsReadStat();
		}
		
		// 页面跳转
		$scope.pageJump=function(){
			$state.go('mgrcenter.msgManage.appMsgMng',{'activeTab':1});
			$scope.getUnReadRemind();
			$scope.$dismiss();
		}
		
		// 关闭按钮
		$scope.closePage = function() {
			$scope.getUnReadRemind();
			$scope.$dismiss();
		}
	}

})();
