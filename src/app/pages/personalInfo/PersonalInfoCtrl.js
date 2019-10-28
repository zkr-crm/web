(function() {
	'use strict';

	angular.module('BlurAdmin.pages.personalInfo').controller(
			'PersonalInfoCtrl', PersonalInfoCtrl);
	/** @ngInject */
	function PersonalInfoCtrl($scope, $filter, $uibModal, $timeout, HttpService,
			toastr, EnumType, Alert,$stateParams,$rootScope) {
		// 用户对象
		$scope.userInfo = {
			'userId' : '',
			'userName' : '',
			'sex' : '',
			'password' : '',
			'password1' : '',
			'password2' : '',
			'userStat' : '',
			'enterCode' : '',
			'enterName' : '',
			'deptCode' : '',
			'deptName' : '',
			'posiCode' : '',
			'posiName' : '',
			'roleCode' : '',
			'roleName' : '',
			'telphone' : '',
			'email' : ''
		};
		// 性别下拉框初始化
		$scope.genders = EnumType.Sex;
		$scope.selected = {
			value : ''
		};
//		// 性别下拉框显示
//		$scope.ShowGender = function(item) {
//			var selected = [];
//			if (item.sex) {
//				selected = $filter('filter')($scope.genders, {
//					value : item.sex
//				});
//			}
//			return selected.length ? selected[0].label : '';
//		};

		$scope.userInfo=global.user;
		// 查询数据
		$scope.searchUser = function() {
			var opts = {};
			opts.url = '/crm/manage/usermng/user';
			opts.method = 'GET';
			opts.params = {'userID':$rootScope.global.user};
			console.log($rootScope.global.user);
			HttpService.linkHttp(opts).then(function(response) {
				$scope.userInfo = response.data;
				// 性别下拉框
				console.log(response.data.sex);
				$scope.selected = {
						value : $filter('filter')($scope.genders, {
							value : response.data.sex
						})[0]
				};
				//$scope.selected.value=response.data.sex;
				
//				$scope.userInfo.password = '';
			});
		}
		// 页面初始化查询
		$scope.searchUser();
		
		
		$scope.saveValue = function(isValid) {

			if (!isValid) {
				return;
			}
			// 获取性别下拉框的选中值
			$scope.userInfo.sex = $scope.selected.value.value;
			
			var opts = {};
			opts.url = '/crm/manage/usermng/user';
			opts.method = 'PUT';
			opts.params = $scope.userInfo;
			HttpService.linkHttp(opts).then(function(response) {
				console.log("请求成功");
				console.log(response);
				
				Alert.success("修改个人信息成功！");
				
				$scope.userInfo = {};
				// 执行查询
				$scope.searchUser();
			});
		}
		
		
		$scope.modifyPassword = function(isValid) {

			if (!isValid) {
				Alert.error('请完善密码信息！')
				return;
			}
			var opts = {};

			opts.url = '/crm/manage/usermng/modPassword';
			opts.method = 'PUT';
			opts.params = {
					'userId':$rootScope.global.user,
					'password3':$scope.userInfo.password3,
					'password1':$scope.userInfo.password1,
					'password2':$scope.userInfo.password2
					};
			HttpService.linkHttp(opts).then(function(response) {
				console.log("请求成功");
				console.log(response);
//				alert(response.message)
				Alert.success("修改密码成功！");
			});
		}
		
		$scope.back = function() {
			window.history.go(-1);
		}

	}
})();
