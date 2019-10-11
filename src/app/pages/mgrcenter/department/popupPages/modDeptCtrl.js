(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.department').controller(
			'modDeptCtrl', modDeptCtrl);
	/** @ngInject */
	function modDeptCtrl($scope, $filter, $uibModal, $timeout, toastr, Alert,
			HttpService) {

		$scope.modDept = {};
		$scope.modDept.deptCode = $scope.modObj.deptCode;
		$scope.modDept.deptName = $scope.modObj.deptName;
		$scope.modDept.enterName = $scope.modObj.enterName;
		$scope.modDept.enterCode = $scope.modObj.enterCode;
		$scope.modDept.superDept = $scope.modObj.superDept;
		$scope.modDept.deptMgr = $scope.modObj.deptMgr;
		$scope.modDept.superDeptCode = $scope.modObj.superDeptCode;
		$scope.modDept.deptDesc = $scope.modObj.deptDesc;

		// 机构列表对象
		$scope.enterList = [];
		// 上级部门列表对象
		$scope.superDeptList = [];
		// 获取机构列表
		$scope.getEnterList = function() {

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

					// 机构列表数据初始化
					angular.forEach($scope.enterList, function(i) {
						if ($scope.modDept.enterCode === i.enterCode) {
							$scope.selectedEnter = i;

							// 初始化上级部门列表
							$scope.initSuperDept(i);
						}
					});
				}
			});
		}
		$scope.getEnterList();

		// 上级部门初始化
		$scope.initSuperDept = function(selectedEnter) {
			// 获取上级部门下拉列表数据
			var opts = {};
			opts.url = '/crm/manage/getDeptsByEnter';
			opts.method = 'GET';
			opts.params = {
				enterCode : selectedEnter.enterCode
			};
			HttpService.linkHttp(opts).then(function(response) {

				console.log(response);

				if (response.data !== undefined) {

					$scope.superDeptList = [];
					angular.forEach(response.data, function(i) {
						var temp = {};
						temp = i;
						temp.show = i.superDeptCode + '|' + i.superDept
						$scope.superDeptList.push(temp);
					});

					// 选中上级部门
					angular.forEach($scope.superDeptList, function(i) {
						if ($scope.modDept.deptCode === i.deptCode) {
							$scope.selectedDept = i;
						}
					});
				}
			});
		}

		// 机构选中事件
		$scope.selectEnter = function(selected) {

			$scope.modDept.enterName = selected.enterName;
			$scope.modDept.enterCode = selected.enterCode;

			// 清空部门列表
			$scope.superDeptList = [];

			// 获取上级部门下拉列表数据
			var opts = {};
			opts.url = '/crm/manage/getDeptsByEnter';
			opts.method = 'GET';
			opts.params = {
				enterCode : selected.enterCode
			};
			HttpService.linkHttp(opts).then(function(response) {

				console.log(response);

				if (response.data !== undefined) {

					angular.forEach(response.data, function(i) {
						var temp = {};
						temp = i;
						temp.show = i.superDeptCode + '|' + i.superDept
						$scope.superDeptList.push(temp);
					});
				}
			});
		}

		// 上级部门选中事件
		$scope.selectSuperDept = function(selected) {

			if (selected !== null && selected !== undefined) {
				$scope.modDept.superDept = selected.deptName;
				$scope.modDept.superDeptCode = selected.deptCode;
			}
		}

		// 修改保存
		$scope.modValue = function(isValid) {

			if (!isValid) {
				return;
			}

			var opts = {};
			opts.url = '/crm/manage/dept';
			opts.method = 'PUT';
			opts.params = $scope.modDept;
			HttpService.linkHttp(opts).then(function(response) {
				$scope.searchDepts();
				Alert.success('提交完成!');
				console.log("请求成功");
				console.log(response);
				console.log(response.data);
			});

			$scope.searchDepts();

		}

	}

})();
