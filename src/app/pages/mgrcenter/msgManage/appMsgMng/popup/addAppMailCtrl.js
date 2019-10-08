(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.msgManage.appMsgMng').controller(
			'addAppMailCtrl', addAppMailCtrl);
	/** @ngInject */
	function addAppMailCtrl($scope, $state, $filter, $uibModal, $rootScope,
			HttpService, EnumType, Alert) {

		$scope.sysMail = {};

		$scope.receiveUsers = "";
		// 保存用户信息
		$scope.sendValue = function(isValid) {

			$scope.sysMail.receivUsers = $scope.receiveUsers;

			if(!$scope.receiveUsers){
				Alert.error('发送对象不能为空');
				return
			}
			if(!$scope.sysMail.mailAttr){
				Alert.error('信息类型不能为空');
				return
			}
			if(!$scope.sysMail.mailTitle){
				Alert.error('信息标题不能为空');
				return
			}
			if(!$scope.sysMail.mailContent){
				Alert.error('信息内容不能为空');
				return
			}

			var opts = {};
			opts.url = '/crm/manage/msgmng/addAppMailList';
			opts.method = 'POST';
			opts.params = {};
			opts.data = $scope.sysMail;
			HttpService.linkHttp(opts).then(function(response) {
				Alert.success("发送成功");
				$scope.$parent.$dismiss();
			});
		}

		// 关闭新增页面
		$scope.closePage = function() {

			$scope.$parent.$dismiss();
		}

		// 发送渠道
		$scope.getSendChannel = function() {

			// 删除站内提醒渠道
			var sendChann = [];
			angular.forEach(EnumType.sendChannel, function(i) {
				if (EnumType.sendChannel.remind.value !== i.value) {
					sendChann.push(i);
				}
			});
			return sendChann;
		}
		$scope.sendChannels = $scope.getSendChannel();

		// 获取员工ID
		$scope.getEmployee = function() {

			$scope.receiveUsers = "";

			var modalInstance = $uibModal
					.open({
						animation : true,
						backdrop : 'static',
						templateUrl : 'app/pages/mgrcenter/usermanagement/popupPages/getuserlist.html',
						size : 'lg',
						controller : 'getuserlistCtrl',
						scope : $scope,
						resolve : {
							items : function() {
								return $scope.items;
							}
						}
					});
			modalInstance.result.then(function(result) {

				angular.forEach(result, function(i) {
					$scope.receiveUsers = $scope.receiveUsers + ","
							+ i.employeeId;
				});

				if ($scope.receiveUsers !== "") {
					$scope.receiveUsers = $scope.receiveUsers.substring(1,
							$scope.receiveUsers.length);
				}

				console.log(result); // result关闭是回传的值
			}, function(reason) {
				console.log(reason);// 点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel

			});
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

				// 获取发送方员工ID
				$scope.sysMail.sendUser = userInfo.employeeId;
			});
		};
		$scope.getEmployeeId();

		// 站内信类型下拉列表初始化
		$scope.mailType = EnumType.mailType;
		// 选择站内信类型
		$scope.selectMailType = function(selectedMailType) {
			$scope.sysMail.mailAttr = selectedMailType.value;
		}
	}

})();
