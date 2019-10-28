(function() {
	'use strict';

	angular.module('BlurAdmin.theme.components').controller('MsgCenterCtrl',
		MsgCenterCtrl);

	/** @ngInject */
	function MsgCenterCtrl($scope, $sce, $rootScope, $uibModal, $state,
						   HttpService) {

		// 站内提醒查询条件对象
		$scope.RemindSearch = {};
		$scope.RemindSearch.isRead = '0';// 未读

		// 所有当前用户的未读站内提醒
		$scope.UnReadRemind = [];
		$scope.UnReadRemindTop10 = [];

		// // 获取当前用户的所有未读站内提醒的总条数和前10条未读信息
		// $scope.getUnReadRemindTop10 = function() {
		// var opts = {};
		// opts.url = '/crm/manage/msgmng/selectTop10ByEntity';
		// opts.method = 'GET';
		// opts.params = $scope.RemindSearch;
		// HttpService.linkHttp(opts).then(function(response) {
		// $scope.UnReadRemind = response.data;
		// $scope.totle = response.data.length;
		// });
		// }

		// 获取当前用户的所有未读站内提醒
		$scope.getUnReadRemind = function() {
			var opts = {};
			opts.url = '/crm/manage/msgmng/getAppRemindByEntity';
			opts.method = 'GET';
			$scope.RemindSearch.isRead = '0';
			opts.params = $scope.RemindSearch;
            opts.params.sys={
            	pageNum:1,
				pageSize:10
			}
			HttpService.linkHttp(opts).then(function(response) {
				$scope.UnReadRemind = response.data.list;
				$scope.remindTotle = response.data.total;

				for (var i = 0; i < 10; i++) {
					$scope.UnReadRemindTop10.push($scope.UnReadRemind[i]); }

			});
		}

		// 下拉菜单显示所有未读消息
		$scope.getAllRemind = function() {

			$state.go('mgrcenter.msgManage.appMsgMng', {
				'activeTab' : 1,
				'selected' : 0
			});

			$scope.UnReadRemindTop10 = $scope.UnReadRemind; // 站内提醒下拉菜单弹出
			$scope.isOpenRemind = true; $scope.isOpenMsg = false;

		}

		// 获取当前用户的员工ID
		$scope.getEmployeeId = function() {

			var opts = {};
			opts.url = '/crm/manage/usermng/user';
			opts.method = 'GET';
			opts.params = {
				userID : $rootScope.global.user
			};
			HttpService.linkHttp(opts).then(function(response) {
				var userInfo = response.data;
				// 获取登录用户的员工ID
				$scope.RemindSearch.receivUser = userInfo.employeeId;
				// 获取当前用户的所有未读站内提醒
				$scope.getUnReadRemind();

				// 获取登录用户的员工ID
				$scope.MailSearch.receivUser = userInfo.employeeId;
				// 获取当前用户的所有未读站内提醒
				$scope.getUnReadMail();
			});
		};
		$scope.getEmployeeId();

		// 查看详情
		$scope.openRemindDetail = function(item) {

			$scope.remindDetail = item
			$uibModal
				.open({
					animation : true,
					backdrop : 'static',
					templateUrl : 'app/theme/components/msgCenter/popup/remindDetail.html',
					size : 'midle-900',
					controller : 'remindDtlCtrl',
					scope : $scope,
					resolve : {}
				});
		}

		// 站内提醒下拉菜单默认关闭
		$scope.isOpenRemind = false;
		// 获取显示消息内容
		$scope.getRemindMessage = function(msg) {
			var text = '';
			if (msg.sendUser || msg.sendUser === 0) {
				var temp = msg.remindContent.substring(0, 40);
				temp = temp + '...';
				text = msg.remindTitle + ' | ' + temp;
			}
			return $sce.trustAsHtml(text);
		};

		// 全部站内提醒标记为已读
		$scope.markAllRemindIsRead = function() {

			// $scope.remindIdList=[];
			// angular.forEach($scope.UnReadRemind, function(i) {
			// 	$scope.remindIdList.push(i.remindId);
			// });

			var opts = {};
			opts.url = '/crm/manage/msgmng/modAllIsReadStat';
			opts.method = 'POST';
			opts.params = {};
			opts.data = {employeeId:$rootScope.global.employeeId};
			HttpService.linkHttp(opts).then(function(response) {
				$scope.UnReadRemind = [];
				$scope.remindTotle = 0;
			});
		}

		/** ***************站内信的分隔线**************************************************************************** */

			// 站内信查询条件对象
		$scope.MailSearch = {};
		$scope.MailSearch.isRead = '0';// 未读

		// 所有当前用户的未读站内信
		$scope.UnReadMail = [];
		$scope.UnReadMailTop10 = [];

		// 获取当前用户的所有未读站内信
		$scope.getUnReadMail = function() {
			var opts = {};
			opts.url = '/crm/manage/msgmng/getAppMailByEntity';
			opts.method = 'GET';
			$scope.MailSearch.isRead = '0';
			opts.params = $scope.MailSearch;
			HttpService.linkHttp(opts).then(function(response) {
				$scope.UnReadMail = response.data.list;
				$scope.mailTotle = response.data.total;

				for (var i = 0; i < 10; i++) {
					$scope.UnReadMailTop10.push($scope.UnReadMail[i]);
				}
			});
		}

		// 获取显示消息内容
		$scope.getMailMessage = function(msg) {
			var text = '';
			if (msg.sendUser || msg.sendUser === 0) {
				var temp = msg.mailContent.substring(0, 40);
				temp = temp + '...';
				text = msg.mailTitle + ' | ' + temp;
			}
			return $sce.trustAsHtml(text);
		};

		// 查看详情
		$scope.openMailDetail = function(item) {

			$scope.mailDetail = item
			$uibModal
				.open({
					animation : true,
					backdrop : 'static',
					templateUrl : 'app/theme/components/msgCenter/popup/mailDetail.html',
					size : 'midle-900',
					controller : 'mailDtlCtrl',
					scope : $scope,
					resolve : {}
				});
		}

		// 下拉菜单显示所有未读消息
		$scope.getAllMail = function() {

			$state.go('mgrcenter.msgManage.appMsgMng', {
				'activeTab' : 0,
				'selected' : 0
			});
			$scope.isRead = '0'; 
			$scope.UnReadRemindTop10 = $scope.UnReadRemind; // 站内提醒下拉菜单弹出
			$scope.isOpenRemind = true; $scope.isOpenMsg = false;

		}

		// 全部站内信标记为已读
		$scope.markAllMailIsRead = function() {

			// $scope.mailIdList=[];
			// angular.forEach($scope.UnReadMail, function(i) {
			// 	$scope.mailIdList.push(i.mailId);
			// });

			var opts = {};
			opts.url = '/crm/manage/msgmng/modAllMailIsReadStat';
			opts.method = 'POST';
			opts.params = {};
			opts.data ={employeeId:$rootScope.global.employeeId};
			HttpService.linkHttp(opts).then(function(response) {
				$scope.UnReadMail = [];
				$scope.mailTotle = 0;
			});
		}
	}
})();