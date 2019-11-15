(function() {
	'use strict';

	angular.module('BlurAdmin.pages.custGroup').controller('groupSelectCustListCtrl',
		groupSelectCustListCtrl);
	/** @ngInject */
	function groupSelectCustListCtrl($scope, HttpService, EnumType, Alert, $rootScope) {
		$scope.checkedRow = []; //选中的客户数组
		$scope.searchObj = {}; //查询客户列表的条件
		$scope.smartTablePageSize = 5; // 页面大小
		/**
		 * [search 客户列表查询]
		 * @param  {[type]} page [页码]
		 * @return {[type]}      [description]
		 */
		$scope.search = function(page) {
			$scope.queryPage(page);
		}
		// 单个选中
		$scope.selectOne1 = function(item) {
			$scope.checkedRow = []
			angular.forEach($scope.custCollection, function(i) {
				var index = $scope.checkedRow.indexOf(i);
				if (i.checked) {
					$scope.checkedRow.push(i);
				}
			});
		}
		// 点击行选中本行
		$scope.selectRow = function(item) {
			item.checked = !item.checked;
			$scope.selectOne1(item)
		}
		//多选
		$scope.selectAll1 = function(e) {
			if (e) {
				$scope.checkedRow = [];
				var count = 0;
				angular.forEach($scope.custCollection, function(cust) {
					cust.checked = true;
					// 选中的客户
					var checkedCust = {
						'custNo': cust.custNo,
						'custTyp': cust.custTyp
					};
					$scope.checkedRow.push($scope.checkedCust);
				})
				$scope.select_all = true;
			} else {
				angular.forEach($scope.custCollection, function(cust) {
					cust.checked = false;
				})
				$scope.checkedRow = [];
				$scope.select_all = false;
			}
		};
		// 添加群组成员
		$scope.addGroupMember = function() {
			if ($scope.checkedRow.length == 0) {
				Alert.error('请选择用户！');
				return;
			}
			var groupMemberObj = [];
			angular.forEach($scope.checkedRow, function(item) {
				var obj = {};
				obj.groupId = $scope.groupId;
				obj.custNo = item.custNo;
				obj.custType = item.custTyp;
				obj.groupType = EnumType.CustGroupTyp.staticGroup.value; // 静态群组
				groupMemberObj.push(obj);
			});

			var opts = {};
			opts.url = '/crm/ocrm/CustGroupMng/addGroupMember';
			opts.method = 'POST';
			opts.params = {};
			opts.data = groupMemberObj;
			HttpService.linkHttp(opts).then(function(response) {
				if (response.status === '1') {
					if (response.data > 0) {
						//Alert.success("部分客户已存在,添加成员个数：[" + (groupMemberObj.length-response.data) + "]!");
						Alert.success("部分客户已存在,添加成功!");
					} else {
						//Alert.success("添加群组成员成功,添加成员个数：[" + groupMemberObj.length + "]!");
						Alert.success("添加群组成员成功!");
					}
					$scope.addGroupMemberModal.close();
				} else {
					Alert.error(response.message)
				}
				$scope.initData();
			});
		}
		// 初始化方法
		var init = function() {
			$scope.$on('queryPage', function(event, queryPage) {
				if (!$scope.queryPage) {
					$scope.queryPage = queryPage;
				}
			});
			//用户权限查询
			var custAgentList = []; //客户经理数组，数据权限控制
			var initOpts = {};
			initOpts.url = '/crm/manage/auth/getRoleDateAuth';
			initOpts.method = 'GET';
			initOpts.params = {
				userCode: $rootScope.global.user,
				tableCode: "T001"
			};
			HttpService
				.linkHttp(initOpts)
				.then(
					function(result) {
						if (!(result.data === undefined || result.data.length == 0)) {
							angular.forEach(result.data, function(i) {
								if (i.employeeId !== undefined) {
									custAgentList.push(i.employeeId);
								}
							});
						}
						$scope.queryPage();
					});
			//分页查询客户信息列表
			$scope.queryCustList = {};
			$scope.queryCustList.pagination = {
				pageSize: '10',
				pageIndex: 1,
				maxText: 5
			}
			$scope.queryCustList.noDefaultQuery = true;//是否默认查询
			$scope.queryCustList.url = '/crm/ecif/cust/getPerCustListByRole';
			$scope.queryCustList.method = 'POST';
			$scope.queryCustList.params = $scope.searchObj;
			$scope.queryCustList.data = custAgentList; //用户数据权限
			$scope.queryCustList.success = function successCallback(response) {
				if (response.status === '1') {
					$scope.custCollection = response.data.list;
					$scope.custCollection = response.data.list.map(function(item) {
						item.custTypNam = EnumType.CustType.getLabelByValue(item.custTyp);
						item.custSourceNam = EnumType.DataSource.getLabelByValue(item.custSource);
						item.certTypNam = EnumType.IdType.getLabelByValue(item.certTyp);
						return item;
					});
					$scope.total = response.data.length;
				}
			}
		}
		init();
	}
})();