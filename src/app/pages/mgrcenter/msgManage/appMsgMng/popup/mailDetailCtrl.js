(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.msgManage.appMsgMng').controller(
			'mailDetailCtrl', mailDetailCtrl);
	/** @ngInject */
	function mailDetailCtrl($scope, $uibModal, $filter, $timeout, $http,
			HttpService, EnumType, Alert) {

		// 是否已读
		if ($scope.mailDetail.isRead === '0') {
			$scope.isReadLabel = "未读";
		} else {
			$scope.isReadLabel = "已读";
		}

		// 点开详情页则置为已读
		$scope.updIsReadStat = function() {

			var opts = {};
			opts.url = '/crm/manage/msgmng/modMailIsReadStat';
			opts.method = 'PUT';
			opts.params = {
				mailId : $scope.mailDetail.mailId
			};
			HttpService.linkHttp(opts).then(function(response) {
			});
		};

		// 判断该信息状态是否为未读，若为未读则置为已读
		if ($scope.mailDetail.isRead === '0') {
			$scope.updIsReadStat();
		}

		// 删除按钮
		$scope.closePage = function() {
			$scope.$dismiss();
			$scope.searchAppMail();
		}
	}

})();
