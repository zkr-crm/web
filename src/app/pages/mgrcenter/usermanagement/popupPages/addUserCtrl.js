(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.usermanagement').controller(
			'addUserCtrl', addUserCtrl);
	/** @ngInject */
	function addUserCtrl($scope, $filter, $uibModal, $timeout, HttpService,
			toastr, EnumType, Alert) {
		
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

		// 性别选中事件
		$scope.selectSex = function(selectedSex) {
			$scope.userInfo.sex = selectedSex.value;
		}

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

		// 保存用户信息
		$scope.saveValue = function(isValid) {

			if (!isValid) {
                Alert.error('请补充完整用户信息！');
				return;
			}

			var opts = {};
			opts.url = '/crm/manage/usermng/user';
			opts.method = 'POST';
			opts.params = $scope.userInfo;
			HttpService.linkHttp(opts).then(function(response) {
				console.log("请求成功");
				console.log(response);

				$scope.userInfo = {};
				// 执行查询
				$scope.searchUser();
				$scope.$parent.$dismiss();
			});
		}

		// 关闭新增页面
		$scope.closePage = function() {

			$scope.$parent.$dismiss();
		}
        /*$scope.changePwd = function(){
        	if($scope.userInfo.password==null){
                $scope.userInfo.password="";
			}
            if($scope.userInfo.pwd==null){
                $scope.userInfo.pwd="";
            }
        	if($scope.userInfo.pwd!=null){
                var tmp="";
                if($scope.userInfo.pwd.length>$scope.userInfo.password.length){
                    $scope.userInfo.pwd=$scope.userInfo.password+""+$scope.userInfo.pwd.substr($scope.userInfo.pwd.length-1,$scope.userInfo.pwd.lenght)
                    $scope.userInfo.password=$scope.userInfo.pwd;
                    for(var i=0;i<$scope.userInfo.pwd.length;i++){
                        tmp+="*";
                    }
                    $scope.userInfo.pwd=tmp;
                }else{
                    $scope.userInfo.password=$scope.userInfo.password.substr(0,$scope.userInfo.pwd.length);
				}
                console.log($scope.userInfo.password);
			}

        }*/
		$scope.init=function(){
        	// 用户信息对象
			$scope.userInfo = {};
			// 性别列表
			$scope.sexList = EnumType.Sex;

			// 机构列表对象
			$scope.enterList = [];
			// 部门列表对象
			$scope.deptList = [];
			// 岗位列表对象
			$scope.posiList = [];
		}
		$scope.init();

	}

})();
