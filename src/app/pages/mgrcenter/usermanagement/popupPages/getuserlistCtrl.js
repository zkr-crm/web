(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.usermanagement').controller(
			'getuserlistCtrl', getuserlistCtrl);
	/** @ngInject */
	function getuserlistCtrl($scope, $uibModalInstance, $filter, $timeout,
			$http, HttpService, EnumType, Alert) {

		// 用户对象
		$scope.userInfo = {};
		// 查询条件对象
		$scope.searchObj = {};

		// 用户对象数据集
		$scope.UserRowCollection = [];

		// 性别下拉框初始化
		$scope.genders = EnumType.Sex;

		// 性别下拉框显示
		$scope.ShowGender = function(item) {

			var sexLabel = "";
			angular.forEach(EnumType.Sex, function(i) {
				if (item.sex === i.value) {
					sexLabel = i.label;
				}
			});

			return sexLabel;
		};

		// 用户状态下拉框初始化
		$scope.userStates = EnumType.UserStat;
		// 用户状态下拉框显示
		$scope.ShowUserStat = function(item) {

			var userStatLabel = "";
			angular.forEach(EnumType.UserStat, function(i) {
				if (item.userStat === i.value) {
					userStatLabel = i.label;
				}
			});

			return userStatLabel;
		};


		$scope.checkedRow = [];
		// 全选
		$scope.selectAll = function() {
			if (!$scope.select_all) {
				$scope.checkedRow = [];
				var count = 0;
				angular.forEach($scope.UserRowCollection, function(i) {
					i.checked = true;
					$scope.checkedRow.push(i);
				})
				$scope.select_all = true;
			} else {
				angular.forEach($scope.UserRowCollection, function(i) {
					i.checked = false;
					$scope.checkedRow = [];
				})
				$scope.select_all = false;
			}
			console.log($scope.checkedRow);
		};

		// 单个选中
		$scope.selectOne = function() {
			angular.forEach($scope.UserRowCollection, function(i) {
				var index = $scope.checkedRow.indexOf(i);
				if (i.checked && index === -1) {

					$scope.checkedRow.push(i);
				} else if (!i.checked && index !== -1) {
					$scope.checkedRow.splice(index, 1);
				}
			});

			if ($scope.UserRowCollection.length === $scope.checkedRow.length) {
				$scope.select_all = true;
			} else {
				$scope.select_all = false;
			}
			angular.forEach($scope.checkedRow, function(i) {
				if (i.userStat != '0') {
	                Alert.error('选择用户状态必须为[正常]。用户编码：' + i.userName);
	                return;
				}
			});
			console.log($scope.checkedRow);
		}

		// 确定按钮事件
		$scope.doConfirm = function() {
			if ($scope.checkedRow.length == 0) {
				Alert.error('请选择用户！');
				return;
			}
			$uibModalInstance.close($scope.checkedRow);
		}
        $scope.search = function(page) {
            var page = page||'1';
            $scope.searchUsersOpts.params = $scope.searchObj;
            if (this.queryPage) {
                this.queryPage(page)
            }else{
                this.$$childHead.$$childHead.queryPage(page)
            }
        }
        $scope.init=function(){
            $scope.pagination = {
                pageSize:'10',
                pageIndex:1,
                maxText:5
            }
            // 机构查询
            $scope.searchUsersOpts = {}
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
