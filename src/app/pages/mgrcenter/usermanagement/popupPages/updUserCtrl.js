(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.usermanagement').controller(
			'updUserCtrl', updUserCtrl);
	/** @ngInject */
	function updUserCtrl($scope, $filter, $uibModal, $timeout, HttpService,
			toastr, EnumType, Alert) {

		// 性别列表
		$scope.sexList = EnumType.Sex;

		// 性别选中事件
		$scope.selectSex = function(selectedSex) {
			$scope.userInfo.sex = selectedSex.value;
		}

		// 用户状态列表
		$scope.userStateList = EnumType.UserStat;
		// 初始化用户状态下拉列表的值
		$scope.initUserState = function() {
			angular.forEach(EnumType.UserStat, function(i) {
				if ($scope.userInfo.userStat === i.value) {
					$scope.selectedUserState = i;
				}
			});
		}
		$scope.initUserState();

		// 用户状态选中事件
		$scope.selectUserState = function(initUserState) {
			$scope.userInfo.userStat = initUserState.value;
		}

		// 机构列表对象
		$scope.enterList = [];
		// 部门列表对象
		$scope.deptList = [];
		// 岗位列表对象
		$scope.posiList = [];

		// 机构选中事件
		$scope.selectEnter = function(selected) {

			$scope.userInfo.enterCode = selected.enterCode;
			$scope.userInfo.enterName = selected.enterName;

			var opts = {};
			opts.url = '/crm/manage/getDeptsByEnter';
			opts.method = 'GET';
			opts.params = {
				enterCode : selected.enterCode
			};
			HttpService.linkHttp(opts).then(function(response) {

				console.log(response);

				if (response.data !== undefined) {

					$scope.deptList = [];
					$scope.posiList = [];

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

			$scope.userInfo.deptCode = selected.deptCode;
			$scope.userInfo.deptName = selected.deptName;

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

			$scope.userInfo.posiCode = selected.posiCode;
			$scope.userInfo.posiName = selected.posiName;
		}

		// 初始化机构列表
		$scope.initEnterList = function() {

			var opts = {};

			opts.url = '/crm/manage/getAllEntersOnOrder';
			opts.method = 'GET';
			opts.params = {};
			HttpService.linkHttp(opts).then(function(response) {
				console.log(response);

				if (response.data !== undefined) {
					// 机构列表临时变量
					angular.forEach(response.data, function(i) {
						var temp = {};
						temp = i;
						temp.show = i.enterCode + '|' + i.enterName
						$scope.enterList.push(temp);
					});

					// 机构下拉列表初始化
					angular.forEach($scope.enterList, function(i) {
						if ($scope.userInfo.enterCode === i.enterCode) {
							$scope.selectedEnter = i;
						}
					});

					// 调用部门列表初始化方法
					$scope.initDeptList($scope.selectedEnter);
				}
			});
		}

		// 初始化部门列表
		$scope.initDeptList = function(selected) {

			if (selected.enterCode !== undefined) {
				var opts = {};
				opts.url = '/crm/manage/getDeptsByEnter';
				opts.method = 'GET';
				opts.params = {
					enterCode : selected.enterCode
				};
				HttpService.linkHttp(opts).then(function(response) {
					console.log(response);

					if (response.data !== undefined) {
						$scope.deptList = [];
						$scope.posiList = [];

						angular.forEach(response.data, function(i) {
							var temp = {};
							temp = i;
							temp.show = i.deptCode + '|' + i.deptName
							$scope.deptList.push(temp);
						});

						// 部门下拉列表初始化
						angular.forEach($scope.deptList, function(i) {
							if ($scope.userInfo.deptCode === i.deptCode) {
								$scope.selectedDept = i;
							}
						});

						// 调用岗位列表初始化方法
						$scope.initPosiList($scope.selectedDept);
					}
				});
			}
		}

		// 初始化岗位列表
		$scope.initPosiList = function(selected) {

			if (selected.deptCode !== undefined) {
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
						angular.forEach(response.data, function(i) {
							var temp = {};
							temp = i;
							temp.show = i.posiCode + '|' + i.posiName
							$scope.posiList.push(temp);
						});

						// 岗位下拉列表初始化
						angular.forEach($scope.posiList, function(i) {
							if ($scope.userInfo.posiCode === i.posiCode) {
								$scope.selectedPosi = i;
							}
						});
					}
				});
			}
		}

		// 初始化下拉列表的值
		$scope.init = function() {

			// 性别下拉列表初始化
			angular.forEach(EnumType.Sex, function(i) {
				if ($scope.userInfo.sex === i.value) {
					$scope.selectedSex = i;
				}
			});

			// 初始化机构、部门、岗位列表
			$scope.initEnterList();
		}
		$scope.init();

		// 保存
		$scope.saveValue = function(isValid) {
			var opts = {};
			opts.url = '/crm/manage/usermng/user';
			opts.method = 'PUT';
			opts.data = $scope.userInfo;
			HttpService.linkHttp(opts).then(function(response) {
				console.log("请求成功");
				console.log(response);
				$scope.userInfo = {};
				// 执行查询
				$scope.searchUser();
				$scope.$parent.$dismiss();
			});
		}

	}

})();
