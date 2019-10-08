(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.usermanagement').controller(
			'UsermanagementCtrl', UsermanagementCtrl);
	/** @ngInject */
	function UsermanagementCtrl($scope, $uibModal, $filter, $timeout, $http,
			HttpService, EnumType, Alert) {

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
			
			var sexLabel="";
			angular.forEach(EnumType.Sex, function(i) {
				if (item.sex === i.value) {
					sexLabel=i.label;
				}
			});

			return sexLabel;
		};

		// 授权窗口弹出
		$scope.roleAuth = function(item) {

			$scope.userInfo = item;
			$uibModal
					.open({
						animation : true,
						backdrop : 'static',
						templateUrl : 'app/pages/mgrcenter/usermanagement/popupPages/roleAuth.html',
						size : 'midle-900',
						controller : 'roleAuthCtrl',
						scope : $scope,
						resolve : {

						}
					});
		}

		// 查询事件
		$scope.searchUser = function () {
			$scope.search()
		}
		

		// 新增事件
		$scope.addUser = function() {
            if( this.queryPage && ! $scope.queryPage){
                $scope.queryPage=this.queryPage;
            }
			$scope.userInfo = {};
			$scope.selected = {};

			$uibModal
					.open({
						animation : true,
						backdrop : 'static',
						templateUrl : 'app/pages/mgrcenter/usermanagement/popupPages/addUser.html',
						size : 'midle-900',
						controller : 'addUserCtrl',
						scope : $scope,
						resolve : {

						}
					});
		}

		// 修改事件
		$scope.updUser = function(item) {
            if( this.queryPage && ! $scope.queryPage){
                $scope.queryPage=this.queryPage;
            }
			$scope.userInfo = angular.copy(item);//修改时不影响原页面

			$uibModal
					.open({
						animation : true,
						backdrop : 'static',
						templateUrl : 'app/pages/mgrcenter/usermanagement/popupPages/updUser.html',
						size : 'midle-900',
						controller : 'updUserCtrl',
						scope : $scope,
						resolve : {

						}
					});
		}

		// 物理删除事件（单行删除）
		$scope.removeUser = function(item) {
            if( this.queryPage && ! $scope.queryPage){
                $scope.queryPage=this.queryPage;
            }
			Alert.confirm("确定删除？").then(function() {
				var opts = {};
				opts.url = '/crm/manage/usermng/deluser';
				opts.method = 'PUT';
				opts.params = {
					userId : item.userId
				};
				HttpService.linkHttp(opts).then(function(response) {
					// 执行查询
                    $scope.search();
				});
			});
		};

		// 物理删除事件（多行删除）
		$scope.batchRemoveUser = function() {
            if( this.queryPage && ! $scope.queryPage){
                $scope.queryPage=this.queryPage;
            }
			if ($scope.checkedRow.length == 0) {
				Alert.error('请选择要删除的行！');
			} else {

				Alert.confirm("确定删除？").then(function() {
					var opts = {};
					opts.url = '/crm/manage/usermng/delUsersByKey';
					opts.method = 'POST';
					opts.params = {};
					opts.data = $scope.checkedRow;
					HttpService.linkHttp(opts).then(function(response) {
						// 执行查询
                        $scope.search();
					});
					$scope.checkedRow = [];
				});
			}
		};

		$scope.checkedRow = [];
		// 全选
		$scope.selectAll = function() {
			if (!$scope.select_all) {
				$scope.checkedRow = [];
				var count = 0;
				angular.forEach($scope.UserRowCollection, function(i) {
					i.checked = true;

					// 删除条件对象
					$scope.delObj = {
						'userId' : '',
						'userName' : ''
					};
					$scope.delObj.userId = i.userId;

					$scope.checkedRow.push($scope.delObj);
				})
				$scope.select_all = true;
			} else {
				angular.forEach($scope.UserRowCollection, function(i) {
					i.checked = false;
					$scope.checkedRow = [];
				})
				$scope.select_all = false;
			}
		};

		// 单个选中
		$scope.selectOne = function() {
			angular.forEach($scope.UserRowCollection, function(i) {
				var index = $scope.checkedRow.indexOf(i);
				if (i.checked && index === -1) {

					// 删除条件对象
					$scope.delObj = {
						'userId' : '',
						'userName' : ''
					};
					$scope.delObj.userId = i.userId;

					$scope.checkedRow.push($scope.delObj);
				} else if (!i.checked && index !== -1) {
					$scope.checkedRow.splice(index, 1);
				}
			});

			if ($scope.UserRowCollection.length === $scope.checkedRow.length) {
				$scope.select_all = true;
			} else {
				$scope.select_all = false;
			}
		}
        $scope.search = function(page) {
        	console.log(this)
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
