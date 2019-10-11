(function() {
	'use strict';

	angular.module('BlurAdmin.pages.similar').controller(
			'doTaskDistributeCtrl', doTaskDistributeCtrl);
	/** @ngInject */
	function doTaskDistributeCtrl($scope, $filter, $uibModal, $timeout,
			HttpService, toastr, EnumType, Alert, $state) {

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
		//$scope.getEnterList();
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
								$state.go('similar.taskDistribute');

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

		// 关闭页面
		$scope.closePage = function() {
			$scope.searchObj = {};
			$scope.$parent.$dismiss();
		}
        $scope.search = function(page) {
            // var page = page||'1';
            $scope.searchUsersOpts.params = $scope.searchObj;
            this.queryPage(page)
        }
		$scope.init=function(){
            $scope.pagination = {
                pageSize:'10',
                pageIndex:1,
                maxText:5
            }
            // 机构查询
            $scope.searchUsersOpts = $scope.pagination;
            $scope.searchUsersOpts.url = '/crm/manage/usermng/usersWithPage';
            $scope.searchUsersOpts.method = 'GET';
            $scope.searchUsersOpts.params = $scope.searchObj;
            $scope.searchUsersOpts.success = function successCallBack(response) {
                $scope.UserRowCollection = response.data.list;
            }
		}
        $scope.init();

	}

})();
