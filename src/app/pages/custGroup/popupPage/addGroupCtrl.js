(function() {
	'use strict';

	angular.module('BlurAdmin.pages.custGroup').controller('addGroupCtrl',
			addGroupCtrl);

	/** @ngInject */
	function addGroupCtrl($scope, $stateParams, $state, layoutPaths, baConfig,
			EnumType, HttpService, Alert) {

		// 新建群组对象
		$scope.groupData = {};

		// 选择客群类型事件
		$scope.selectCustGroupTyp = function(selected) {
			$scope.groupData.groupType = selected.value;
		}
		// 选择客群成员类型事件
		$scope.selectMemberType = function(selected) {
			$scope.groupData.memberType = selected.value;
		}

		// 新增客户群组
		$scope.addCustGroup = function() {

			if ($scope.groupData.groupName == ''
					|| $scope.groupData.groupName == undefined
					|| $scope.groupData.groupType == ''
					|| $scope.groupData.groupType == undefined
					|| $scope.groupData.memberType == ''
					|| $scope.groupData.memberType == undefined
					|| $scope.groupData.groupDesc == ''
					|| $scope.groupData.groupDesc == undefined) {
				Alert.error('输入参数不能为空！');
				return;
			}

			// 群组创建方式：直接创建
			$scope.groupData.establishType = EnumType.EstablishType.establish.value;

			var opts = {};
			opts.url = '/crm/ocrm/CustGroupMng/addCustGroup';
			opts.method = 'POST';
			opts.params = $scope.groupData;
			HttpService.linkHttp(opts).then(function(response) {
				if (response.status == "1") {
					Alert.success("新增客户群组成功,群组Id：[" + response.data + "]!");
					$scope.$parent.$dismiss();
					$scope.doSearch("");
				} else {
					Alert.error('新增客户群组失败！');
				}
			});
		}

		// 关闭新增页面
		$scope.closePage = function() {

			$scope.$parent.$dismiss();
		}

		$scope.writCount = 200;
		// 输入字数限定200字
		$scope.tolCount = function() {
			if ($scope.groupData.groupDesc.length > 200) {
				Alert.error('字数不能超过200字！');
			} else {
				$scope.writCount = 200 - $scope.groupData.groupDesc.length;
			}
		};
	}
})();
