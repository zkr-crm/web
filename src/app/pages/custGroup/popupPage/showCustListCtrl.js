(function() {
	'use strict';

	angular.module('BlurAdmin.pages.custGroup').controller('showCustListCtrl',
			showCustListCtrl);
	/** @ngInject */
	function showCustListCtrl($scope, $state, HttpService, EnumType, Alert,
			$uibModal, $rootScope) {

		var custAgentList = [];

		var initOpts = {};
		initOpts.url = '/crm/manage/auth/getRoleDateAuth';
		initOpts.method = 'GET';
		initOpts.params = {
			userCode : $rootScope.global.user,
			tableCode : "T001"
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

								var opts = {};
								opts.url = '/crm/ecif/cust/getPerCustListByRole';
								opts.method = 'POST';
								opts.params = {};
								opts.data = custAgentList;
								HttpService
										.linkHttp(opts)
										.then(
												function(response) {
													$scope.custCollection = response.data;
													$scope.custCollection = response.data
															.map(function(item) {
																item.custTypNam = EnumType.CustType
																		.getLabelByValue(item.custTyp);
																item.custSourceNam = EnumType.DataSource
																		.getLabelByValue(item.custSource);
																item.certTypNam = EnumType.IdType
																		.getLabelByValue(item.certTyp);
																return item;
															});
													$scope.total = response.data.length;
												});
							}
						});

		// 添加群组成员
		$scope.addGroupMember = function() {

			var groupMemberObj = [];
			angular.forEach($scope.checkedRow, function(item) {
				var obj = {};
				obj.groupId = $scope.groupId;
				obj.custNo = item.custNo;
				obj.custType = item.custTyp;
				obj.groupType = EnumType.CustGroupTyp.staticGroup.value;// 静态群组
				groupMemberObj.push(obj);
			});

			var opts = {};
			opts.url = '/crm/ocrm/CustGroupMng/addGroupMember';
			opts.method = 'POST';
			opts.params = {};
			opts.data = groupMemberObj;
			HttpService.linkHttp(opts).then(function(response) {

				Alert.success("添加群组成员成功,添加成员个数：[" + response.data + "]!");
				$scope.initData();
			});
		}

		// 查询条件对象
		$scope.searchObj = {
			'custAgent' : '',
			'custName' : ''
		};
		// 查询事件
		$scope.searchUser = function() {

			$scope.queryCustList.params = $scope.searchObj;
			this.queryPage(1);
		}

		// 选中行对象
		$scope.checkedRow = [];
		// 全选
		$scope.selectAll = function() {
			if (!$scope.select_all) {
				$scope.checkedRow = [];
				var count = 0;
				angular.forEach($scope.custCollection, function(i) {
					i.isChecked = true;

					// 选中对象
					$scope.checkedRow.push(i);
				})
				$scope.select_all = true;
			} else {
				angular.forEach($scope.custCollection, function(i) {
					i.isChecked = false;
					$scope.checkedRow = [];
				})
				$scope.select_all = false;
			}
		};

		// 单个选中
		$scope.selectOne = function() {
			angular.forEach($scope.custCollection, function(i) {
				var index = $scope.checkedRow.indexOf(i);
				if (i.isChecked && index === -1) {

					// 选中对象
					$scope.checkedRow.push(i);
				} else if (!i.isChecked && index !== -1) {
					$scope.checkedRow.splice(index, 1);
				}
			});

			if ($scope.custCollection.length === $scope.checkedRow.length) {
				$scope.select_all = true;
			} else {
				$scope.select_all = false;
			}
		}
	}

})();
