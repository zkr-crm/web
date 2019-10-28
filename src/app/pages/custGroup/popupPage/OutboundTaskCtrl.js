(function() {
	'use strict';

	angular.module('BlurAdmin.pages.custGroup').controller('OutboundTaskCtrl',
			OutboundTaskCtrl);
	/** @ngInject */
	function OutboundTaskCtrl($scope, $filter, $uibModal, $timeout,
			HttpService, toastr, EnumType, Alert) {

		$scope.taskInfo = {};

		$scope.taskStatu = {};

		$scope.groupTaskStatus = EnumType.GroupTaskStat;
		// 群组运营任务状态
		$scope.showEstablishType = function(value) {
			var xxx = "";
			angular.forEach(EnumType.EstablishType, function(i) {
				if (value === i.value) {
					xxx = i.label;
				}
			});
			return xxx;
		}

		// 获取员工ID
		$scope.getEmployee = function() {

			$scope.taskInfo.custAgent = "";

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
					$scope.taskInfo.custAgent = $scope.taskInfo.custAgent + ","
							+ i.employeeId;
				});

				if ($scope.taskInfo.custAgent !== "") {
					$scope.taskInfo.custAgent = $scope.taskInfo.custAgent
							.substring(1, $scope.taskInfo.custAgent.length);
				}
			}, function(reason) {
			});
		}

		// 提交对象
		$scope.custGroupInfoJson = {};

		// 保存用户信息
		$scope.doSave = function() {

			// 数据初始化
			$scope.custGroupInfoJson.groupId = $scope.groupId;// 客户群组ID
			$scope.custGroupInfoJson.employeeId = $scope.taskInfo.custAgent;// 员工编号

			// 群组运营任务对象
			var groupOperObj = {};
			groupOperObj.groupOperName = $scope.taskInfo.groupOperName;
			groupOperObj.groupOperType = EnumType.GroupTaskType.OutBound.value;
			groupOperObj.operNum = $scope.checkedRow.length;
			groupOperObj.groupId = $scope.groupId;
			groupOperObj.groupType = $scope.custGrop.groupType;
//			groupOperObj.groupTaskStatus = $scope.taskStatu.selected.value;
			groupOperObj.endTime = $scope.taskInfo.endTime;
			groupOperObj.groupTaskDesc = $scope.taskInfo.groupTaskDesc;

			$scope.custGroupInfoJson.groupOper = groupOperObj;// 群组运营任务对象

			// 群组快照对象
			var dynamSnapshotObj = {};
			dynamSnapshotObj.snapshotName = $scope.taskInfo.groupOperName;
			dynamSnapshotObj.snapshotDesc = $scope.taskInfo.groupTaskDesc;
			dynamSnapshotObj.snapshotType = "";// TODO
			dynamSnapshotObj.custNum = $scope.checkedRow.length;
			dynamSnapshotObj.orginGroupId = $scope.groupId;
			dynamSnapshotObj.orginGroupType = $scope.custGrop.groupType;
			dynamSnapshotObj.newGroupId = "";// TODO
			dynamSnapshotObj.groupOperId = "";
			dynamSnapshotObj.groupOperType = "";
			dynamSnapshotObj.establishUser = "";
			dynamSnapshotObj.establishTime = "";

			$scope.custGroupInfoJson.custGrp = $scope.custGrop;// 原群组信息
			$scope.custGroupInfoJson.dynamSnapshot = dynamSnapshotObj;// 群组快照对象
			$scope.custGroupInfoJson.custGrpMemberList = $scope.checkedRow;// 群组成员列表

			var opts = {};
			opts.url = '/crm/ocrm/CustGroupMng/assignOutBoundTask';
			opts.method = 'POST';
			opts.params = {};
			opts.data = $scope.custGroupInfoJson;
			HttpService.linkHttp(opts).then(function(response) {

				Alert.success("分派外呼任务成功！");
				$scope.$parent.$dismiss();
			});
		}

		// 关闭页面
		$scope.closePage = function() {
			$scope.$parent.$dismiss();
		}

		// 日期控件
		$scope.open1 = open1;
		$scope.opened1 = false;
		// 打开日期控件
		function open1() {
			$scope.opened1 = true;
		}
	}

})();
