(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.msgManage.appMsgMng').controller('remindDetailCtrl', remindDetailCtrl);
	/** @ngInject */
	function remindDetailCtrl($scope, $uibModal, $filter, $timeout, $http, HttpService, EnumType, Alert) {

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

		// 删除按钮
		$scope.closePage = function() {
			$scope.$dismiss();
			if ($scope.remindDetail.source === 'myHome') {
				if ($scope.remindDetail.type === 'renewal') {//续保
					$scope.myRenewalOptions();
				} else if ($scope.remindDetail.type === 'event') {// 事件提醒列表
					$scope.myEventOptions();
				} 
			} else {
				$scope.searchRemind();
			}
		}
	}

})();
