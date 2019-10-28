(function() {
	'use strict';

	angular.module('BlurAdmin.pages.similar').controller('queryUserListCtrl',
			queryUserListCtrl);
	/** @ngInject */
	function queryUserListCtrl($scope, $filter, $uibModal, $timeout,
			HttpService, toastr, EnumType, Alert) {

		// 机构列表对象
		$scope.enterList = [];
		var enterInfo = {
			enterCode : null,
			enterName : '默认',
			show : '-选择机构-'
		}
		$scope.enterList.push(enterInfo);
		// 部门列表对象
		$scope.deptList = [];
		var deptInfo = {
			deptCode : null,
			deptName : '默认',
			show : '-选择部门-'
		}
		$scope.deptList.push(deptInfo);
		// 岗位列表对象
		$scope.posiList = [];
		var posiInfo = {
			posiCode : null,
			posiName : '默认',
			show : '-选择岗位-'
		}
		$scope.posiList.push(posiInfo);

		// 查询对象
		$scope.searchObj = {};

		// 获取机构列表
		$scope.getEnterList = function() {

			var opts = {};

			opts.url = '/crm/manage/getAllEntersOnOrder';
			opts.method = 'GET';
			opts.params = {};
			HttpService.linkHttp(opts).then(function(response) {


				if (response.data !== undefined) {

					// 机构列表临时变量

					angular.forEach(response.data, function(i) {
						var temp = {};
						temp = i;
						temp.show = i.enterCode + '|' + i.enterName
						$scope.enterList.push(temp);
					});
				}
			});
		}
		$scope.getEnterList();
		// 机构选中事件
		$scope.selectEnter = function(selected) {

			$scope.searchObj.enterCode = selected.enterCode;

			var opts = {};
			opts.url = '/crm/manage/getDeptsByEnter';
			opts.method = 'GET';
			opts.params = {
				enterCode : selected.enterCode
			};
			HttpService.linkHttp(opts).then(function(response) {
				if (response.data !== undefined) {

					$scope.deptList = [];
					$scope.posiList = [];

					$scope.deptList.push(deptInfo);
					$scope.posiList.push(posiInfo);
					angular.forEach(response.data, function(i) {
						var temp = {};
						temp = i;
						temp.show = i.deptCode + '|' + i.deptName
						$scope.deptList.push(temp);
					});
				}
			});
		}

		// 部门选中事件
		$scope.selectDept = function(selected) {

			$scope.searchObj.deptCode = selected.deptCode;

			var opts = {};
			opts.url = '/crm/manage/getPosiByDept';
			opts.method = 'GET';
			opts.params = {
				deptCode : selected.deptCode
			};
			HttpService.linkHttp(opts).then(function(response) {

				console.log(response);

				if (response.data !== undefined) {

					$scope.posiList = [];
					$scope.posiList.push(posiInfo);
					angular.forEach(response.data, function(i) {
						var temp = {};
						temp = i;
						temp.show = i.posiCode + '|' + i.posiName
						$scope.posiList.push(temp);
					});
				}
			});
		}

		// 岗位选中事件
		$scope.selectPosi = function(selected) {

			$scope.searchObj.posiCode = selected.posiCode;
		}

		// 查询事件
		$scope.searchUser = function() {

			$scope.searchObj.employeeId = $scope.employeeId; // 员工ID

			var opts = {};
			opts.url = '/crm/manage/usermng/usersByEntity';
			opts.method = 'GET';
			opts.params = $scope.searchObj;
			HttpService.linkHttp(opts).then(function(response) {
				console.log("请求成功");
				console.log(response);
				$scope.UserRowCollection = response.data;
				$scope.total = response.data.length;
			});
		}
		// 页面初始化查询
		$scope.searchUser();

		// 选择用户
		$scope.changeCurrents = function(row) {

			if ($scope.flg == "1") {
				Alert.confirm("确定选择当前用户？ [" + row.userName + "]").then(
						function() {

							var param = {};
							var taskIds = [];

							// 获取所有任务ID
							taskIds.push($scope.editTaskId);
							param.userId = row.userId;
							param.taskIds = taskIds;
							param.employeeId = row.employeeId;

							var opts = {};
							opts.url = '/crm/ecif/similar/distributeTask';
							opts.method = 'POST';
							opts.params = {};
							opts.data = param;
							HttpService.linkHttp(opts).then(function(response) {
								$scope.$parent.$dismiss();

							});
						});
			} else if ($scope.flg == "0") {
				Alert.confirm("确定选择当前用户？ [" + row.userName + "]").then(
						function() {

							var param = {};
							var taskIds = [];

							// 获取所有任务ID
							angular.forEach($scope.checkedRow, function(i) {
								taskIds.push(i.taskId);
							});
							param.userId = row.userId;
							param.employeeId = row.employeeId;
							param.taskIds = taskIds;
							var opts = {};
							opts.url = '/crm/ecif/similar/distributeTask';
							opts.method = 'POST';
							opts.params = {};
							opts.data = param;
							HttpService.linkHttp(opts).then(function(response) {
								$scope.$parent.$dismiss();
							});
						});
			}
		}

		// ----------------选择客户开始--------------------
		$scope.radioRptOptions = {};
		$scope.radioRptOptions.select = "";
		// 单个选中
		$scope.selectOne = function(i) {
			angular.forEach($scope.UserRowCollection, function(i) {
				if ($scope.radioRptOptions.select == i.employeeId) {
					$scope.userInfo = i;
					return;
				}
			});
		}

		$scope.ok = function() {
			Alert.confirm("确定选择当前用户？ [" + $scope.userInfo.userName + "]").then(
					function() {
						// $uibModalInstance.close($scope.userInfo);
						$scope.$parent.$dismiss();
					});
		}

		// 关闭页面
		$scope.closePage = function() {
			$scope.searchObj = {};
			$scope.$parent.$dismiss();
		}

	}

})();
