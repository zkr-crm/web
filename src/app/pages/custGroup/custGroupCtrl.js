(function() {
	'use strict';

	angular.module('BlurAdmin.pages.custGroup').controller('custGroupCtrl',
			custGroupCtrl);
	/** @ngInject */
	function custGroupCtrl($scope, $filter, $compile, $uibModal, $rootScope,
			$http, Alert, $state, HttpService, EnumType) {

		// 查询条件对象
		$scope.searchObj = {
			createUser:$rootScope.global.user
		};

		// 编辑群组类型下拉框
		$scope.custGroupTyp = [];
		var initCustGroupTyp = {
			'value' : '',
			'label' : '-请选择-'
		};
		$scope.custGroupTyp.push(initCustGroupTyp);
		angular.forEach(EnumType.CustGroupTyp, function(i) {
			$scope.custGroupTyp.push(i);
		});
		// 群组类型选择事件
		$scope.selectCustGroupTyp = function(selected) {
			$scope.searchObj.groupType = selected.value;
		}

		// 编辑群组成员类型下拉框
		$scope.memberType = [];
		var initMemberType = {
			'value' : '',
			'label' : '-请选择-'
		};
		$scope.memberType.push(initMemberType);
		angular.forEach(EnumType.GroupMemberType, function(i) {
			$scope.memberType.push(i);
		});
		// 群组类型选择时间
		$scope.selectMemberType = function(selected) {
			$scope.searchObj.groupType = selected.value;
		}

		// 客户组类型
		$scope.showCustGroupTyp = function(item) {
			var xxx = "";
			angular.forEach(EnumType.CustGroupTyp, function(i) {
				if (item.groupType === i.value) {
					xxx = i.label;
				}
			});
			return xxx;
		}
		// 群组创建类型
		$scope.showEstablishType = function(item) {
			var xxx = "";
			angular.forEach(EnumType.EstablishType, function(i) {
				if (item.establishType === i.value) {
					xxx = i.label;
				}
			});
			return xxx;
		}
		// 群成员类型
		$scope.showGroupMemberType = function(item) {
			var xxx = "";
			angular.forEach(EnumType.GroupMemberType, function(i) {
				if (item.memberType === i.value) {
					xxx = i.label;
				}
			});
			return xxx;
		}

		

		// 查询当前登录用户的任务列表
		$scope.search = function(page) {
			$scope.queryGroupList.params = $scope.searchObj;
			var page = page || '1';
			if (this.queryPage) {
				this.queryPage(page)
			}else{
				this.$$childHead.queryPage(page)
			}
			$scope.checkedRow=[];
		};

		// 查看群组详细信息
		$scope.showDetail = function(item) {
			if (item.groupType === EnumType.CustGroupTyp.dynamicGroup.value) {
				// 动态群组
				$state.go('dynamicGroup', {
					'groupId' : item.groupId
				});
			} else if (item.groupType === EnumType.CustGroupTyp.staticGroup.value) {
				// 静态群组
				$state.go('staticGroup', {
					'groupId' : item.groupId
				});
			}
		}

		// 选中行对象
		$scope.checkedRow = [];
		// 全选
		$scope.selectAll = function() {
			if (!$scope.select_all) {
				$scope.checkedRow = [];
				var count = 0;
				angular.forEach($scope.rowCollection, function(i) {
					i.isChecked = true;

					// 选中对象
					$scope.checkedRow.push(i);
				})
				$scope.select_all = true;
			} else {
				angular.forEach($scope.rowCollection, function(i) {
					i.isChecked = false;
					$scope.checkedRow = [];
				})
				$scope.select_all = false;
			}
		};

		// 单个选中
		$scope.selectOne = function() {
			angular.forEach($scope.rowCollection, function(i) {
				var index = $scope.checkedRow.indexOf(i);
				if (i.isChecked && index === -1) {

					// 选中对象
					$scope.checkedRow.push(i);
				} else if (!i.isChecked && index !== -1) {
					$scope.checkedRow.splice(index, 1);
				}
			});

			if ($scope.rowCollection.length === $scope.checkedRow.length) {
				$scope.select_all = true;
			} else {
				$scope.select_all = false;
			}
		}

		// 打开新增群组弹窗
		$scope.openAddCustGroup = function() {
			$uibModal.open({
				animation : true,
				backdrop : 'static',
				templateUrl : 'app/pages/custGroup/popupPage/addGroup.html',
				size : 'midle-900',
				controller : 'addGroupCtrl',
				scope : $scope,
				resolve : {

				}
			});
		}

		// 删除群组
		$scope.deleteGroup = function(item) {
			Alert.confirm("确定删除？").then(
					function() {
						var opts = {};
						opts.url = '/crm/ocrm/CustGroupMng/delMultiCustGroup';
						opts.method = 'POST';
						opts.params = {};
						opts.data = [item];
						HttpService.linkHttp(opts).then(
								function(response) {
									if (response.status == "1") {
										$scope.search();
									} else {
										Alert.error(response.message);
									}
								});
					});
		}
        $scope.deleteCustGroup = function() {
            if ($scope.checkedRow.length == 0) {
                Alert.error("请选择要删除的群组！");
                return;
            }
            Alert.confirm("确定删除？").then(
                function() {
                    var opts = {};
                    opts.url = '/crm/ocrm/CustGroupMng/delMultiCustGroup';
                    opts.method = 'POST';
                    opts.params = {};
                    opts.data = $scope.checkedRow;
                    HttpService.linkHttp(opts).then(
                        function(response) {
                            if (response.status == "1") {
                                Alert.success("删除群组成功,删除群组个数：["
                                    + response.data + "]!");
                                $scope.search();
                            } else {
                                Alert.error(response.message);
                            }
                        });
                });
        }
		var init = function () {
			
			// 分页查询客群信息列表
			$scope.queryGroupList = {};
			$scope.queryGroupList.pagination = {
				pageSize:'10',
				pageIndex:1,
				maxText:5
			}
			$scope.queryGroupList.url = '/crm/ocrm/CustGroupMng/getCustGrpByEntity';
			$scope.queryGroupList.method = 'GET';
			$scope.queryGroupList.params = $scope.searchObj;
			$scope.queryGroupList.success = function successCallback(response) {
				$scope.rowCollection = response.data.list;
				$scope.rowCollection.forEach(function(item){
					item.establishTime = item.establishTime.substr(0,10)
				})
			};
		}
		init()

	}
})();
