(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.usermanagement').controller(
			'roleAuthCtrl', roleAuthCtrl);
	/** @ngInject */
	function roleAuthCtrl($scope, $filter, $uibModal, $timeout, toastr,
			HttpService, Alert) {

		$scope.ignoreChanges = false;

		$scope.basicConfig = {
			'core' : {
				'multiple' : true,
				'check_callback' : true,
				'worker' : false
			},
			'types' : {
				'folder' : {
					'icon' : 'ion-ios-folder'
				},
				'default' : {
					'icon' : 'ion-document-text'
				}
			},
			'plugins' : [ 'types', 'checkbox' ],
			'version' : 1
		};

		$scope.treeData = [];

		// 获取所有角色
		$scope.getAllRole = function() {

			$scope.ignoreChanges = true;

			$scope.treeData = [];

			var opts = {};

			opts.url = '/crm/manage/getAllRoles';
			opts.method = 'GET';
			opts.params = {};
			HttpService.linkHttp(opts).then(function(response) {
				// 请求获取所有角色数据

				console.log("请求成功");
				console.log(response);

				response.data.forEach(function(item) {

					// 定义节点对象
					$scope.treeNode = {
						"id" : "",
						"parent" : "#",
						"type" : "folder",
						"text" : "",
						"state" : {
							"disabled" : false,
							"loaded" : true,
							"opened" : true,
							"selected" : false
						}
					};

					// 获取节点数据
					$scope.treeNode.id = item.roleCode;
					$scope.treeNode.text = item.roleName;

					// 初始化树
					$scope.treeData.push($scope.treeNode);

					if($scope.userInfo.roleCode===undefined){
						var roleCodes =[];
					}else{
						var roleCodes = $scope.userInfo.roleCode.split(",");
					}

					// 初始化用户已有角色
					$scope.treeData.forEach(function(item) {
						roleCodes.forEach(function(code) {
							if (item.id == code) {
								item.state.selected = true;
							}
						});
					});

					$scope.basicConfig.version++;
				});

			});
		};

		// 调用获取所有角色方法
		$scope.getAllRole();

		// 保存角色授权信息
		$scope.saveValue = function() {

			// 获取选中的node
			var nodes = this.basicTree.jstree(true).get_selected();

			var roleCode = "";
			nodes.forEach(function(item) {
				roleCode = roleCode + item;
				roleCode = roleCode + ",";
			});

			$scope.userInfo.roleCode = roleCode;

			var opts = {};
			opts.url = '/crm/manage/usermng/modUserRole';
			opts.method = 'POST';
			opts.data = $scope.userInfo;
			HttpService.linkHttp(opts).then(function(response) {
				// 主页面执行查询
				//$scope.searchUser();
				// 关闭当前页面
				$scope.$parent.$dismiss();
			});
		}

		$scope.expand = function() {
			$scope.treeData.forEach(function(n) {
				n.state.opened = true;
			});
			$scope.basicConfig.version++;
		};

		$scope.collapse = function() {
			$scope.treeData.forEach(function(n) {
				n.state.opened = false;
			});
			$scope.basicConfig.version++;
		};

		$scope.applyModelChanges = function() {
			return !$scope.ignoreChanges;
		};

		$scope.readyCB = function() {
			$timeout(function() {
				$scope.ignoreChanges = false;
			});
		};
	}

})();
