(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.department').controller(
			'addDeptCtrl', addDeptCtrl);
	/** @ngInject */
	function addDeptCtrl($scope, $filter, $uibModal, $timeout, toastr, Alert,
			HttpService) {

		$scope.saveDept = {};
		$scope.saveDept.deptCode = "";
		$scope.saveDept.deptName = "";
		$scope.saveDept.enterName = "";
		$scope.saveDept.enterCode = "";
		$scope.saveDept.superDept = "";
		$scope.saveDept.deptMgr = "";
		$scope.saveDept.superDeptCode = "";
		$scope.saveDept.deptDesc = "";

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
				}
			});
		}
		$scope.getEnterList();

		// 机构选中事件
		$scope.selectEnter = function(selected) {

			$scope.saveDept.enterName = selected.enterName;
			$scope.saveDept.enterCode = selected.enterCode;

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

					$scope.superDeptList = [];
					angular.forEach(response.data, function(i) {
						var temp = {};
						temp = i;
						temp.show = i.deptCode + '|' + i.deptName
						$scope.superDeptList.push(temp);
					});
				}
			});
		}

		// 上级部门选中事件
		$scope.selectSuperDept = function(selected) {

			$scope.saveDept.superDept = selected.deptName;
			$scope.saveDept.superDeptCode = selected.deptCode;
		}

		// 新增保存
		$scope.saveValue = function(isValid) {
			if (!isValid) {
				return;
			}

			var opts = {};
			opts.url = '/crm/manage/dept';
			opts.method = 'POST';
			opts.params = $scope.saveDept;
			HttpService.linkHttp(opts).then(function(response) {
				console.log("请求成功");
				console.log(response);
				console.log(response.data);
				$scope.searchDepts();
				Alert.success('提交完成!');
			});

		}

	}

})();
