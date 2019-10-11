(function() {
	'use strict';

	angular.module('BlurAdmin.pages.custGroup').controller('msgGroupSendCtrl',
			msgGroupSendCtrl);
	/** @ngInject */
	function msgGroupSendCtrl($scope, $filter, $uibModal, $timeout,
			HttpService, toastr, EnumType, Alert) {

		$scope.msgSendInfo = {};
		$scope.readFlg = true;

		// 日期控件
		$scope.open2 = open2;
		$scope.opened2 = false;
		// 打开日期控件
		function open2() {
			$scope.opened2 = true;
		}

		// 获取员工ID
		$scope.getEmployee = function() {

			$scope.msgSendInfo.ccUsers = "";

			var modalInstance = $uibModal
					.open({
						animation : true,
						backdrop : 'static',
						templateUrl : 'app/pages/mgrcenter/usermanagement/popupPages/getuserlist.html',
						size : 'midle-900',
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
					$scope.msgSendInfo.ccUsers = $scope.msgSendInfo.ccUsers
							+ "," + i.employeeId;
				});

				if ($scope.msgSendInfo.ccUsers !== "") {
					$scope.msgSendInfo.ccUsers = $scope.msgSendInfo.ccUsers
							.substring(1, $scope.msgSendInfo.ccUsers.length);
				}
			}, function(reason) {
			});
		}

		// 模板选择
		$scope.selectTemplate = function() {
			var modalInstance = $uibModal
					.open({
						animation : true,
						backdrop : 'static',
						templateUrl : 'app/pages/mgrcenter/msgManage/msgSendAdd/selectOneMsgTmpt.html',
						size : 'midle-900',
						controller : 'ProfileModalCtrl',
						scope : $scope,
						resolve : {
							items : function() {
								return $scope.items;
							}
						}
					});
			modalInstance.result.then(function(result) {
				$scope.msgSendInfo.templateCode = result.tplNo; // 模板代码
				$scope.msgSendInfo.templateContent = result.tplCont; // 模板内容
				$scope.readFlg = false;
			}, function(reason) {
			});
		}

		$scope.isShow = true;
		// radio button 变更事件
		$scope.radioOptions = {};
		$scope.radioChecked = function() {
			// radio 发送方式 直接、定时
			if ($scope.radioOptions.select == "direct") {
				// 直接发送
				$scope.isShow = true;
			}
			if ($scope.radioOptions.select == "frequency") {
				// 定时发送
				$scope.isShow = false;
			}
		}

		// 保存用户信息
		$scope.doSend = function() {

			$scope.sendMsgInfo = {};
			var index = 0;
			angular.forEach($scope.checkedRow, function(i) {
				if (index == 0) {
					$scope.sendMsgInfo.custNo = i.custNo;
				} else {
					$scope.sendMsgInfo.custNo = $scope.sendMsgInfo.custNo + ","
							+ i.custNo;
				}
				index = index + 1;
			});

			$scope.sendMsgInfo.groupId = $scope.groupId;

			$scope.sendMsgInfo.employeeId = $scope.msgSendInfo.ccUsers;
			$scope.sendMsgInfo.msgTopic = $scope.msgSendInfo.msgTopic;
			$scope.sendMsgInfo.templateContent = $scope.msgSendInfo.templateContent;
			$scope.sendMsgInfo.sendWay = $scope.radioOptions.select;
			$scope.sendMsgInfo.fixTime = $scope.msgSendInfo.fixTime;

			var opts = {};

			opts.url = '/crm/ocrm/CustGroupMng/batchSendMsg';
			opts.method = 'POST';
			opts.params = {};
			opts.data = $scope.sendMsgInfo;
			HttpService.linkHttp(opts).then(function(response) {
				Alert.success("短信群发任务成功！");
				$scope.$parent.$dismiss();
			});
		}

		// 关闭新增页面
		$scope.closePage = function() {
			$scope.$parent.$dismiss();
		}
	}

})();
