(function() {
	'use strict';

	angular.module('BlurAdmin.theme.components').controller(
			'mailDtlCtrl', mailDtlCtrl);
	/** @ngInject */
	function mailDtlCtrl($scope, $uibModal, $filter, $timeout, $http,$state,
			HttpService, EnumType, Alert) {

		// 是否已读
		if ($scope.mailDetail.isRead === '0') {
			$scope.isReadLabel = "未读";
		} else {
			$scope.isReadLabel = "已读";
		}

		// 显示站内信类型
		angular.forEach(EnumType.mailType, function(i) {
			if ($scope.mailDetail.mailAttr === i.value) {
				$scope.mailDetail.mailAttr = i.label;
			}
		});

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
		
		//页面跳转
		$scope.pageJump=function(){
			$state.go('mgrcenter.msgManage.appMsgMng',{'activeTab':0});
			$scope.$dismiss();
		}
		
		// 关闭按钮
		$scope.closePage = function() {
			$scope.getUnReadMail();
			$scope.$dismiss();
		}
	}

})();
