(function() {
	'use strict';

	angular.module('BlurAdmin.pages.custGroup').controller('editGroupCtrl',
			editGroupCtrl);

	/** @ngInject */
	function editGroupCtrl($scope, $stateParams, $state, layoutPaths, baConfig,
			EnumType, HttpService, Alert) {

		// 群组对象
		$scope.groupData = {};

		$scope.groupData.groupName = $scope.custGrop.groupName;
		$scope.groupData.groupDesc = $scope.custGrop.groupDesc;

		if ($scope.groupData.groupDesc != ''
				&& $scope.groupData.groupDesc != undefined
				&& $scope.groupData.groupDesc != null) {
			$scope.writCount = 200 - $scope.groupData.groupDesc.length;
		} else {
			$scope.writCount = 200;
		}

		// 修改客户群组
		$scope.addCustGroup = function() {

			$scope.groupData.groupId = $scope.groupId;

			if ($scope.groupData.groupName == ''
					|| $scope.groupData.groupName == undefined
					|| $scope.groupData.groupDesc == ''
					|| $scope.groupData.groupDesc == undefined) {
				Alert.error('输入参数不能为空！');
				return;
			}

			var opts = {};
			opts.url = '/crm/ocrm/CustGroupMng/editCustGroup';
			opts.method = 'POST';
			opts.params = $scope.groupData;
			HttpService.linkHttp(opts).then(function(response) {
				if (response.status == "1") {
					Alert.success("修改客户群组成功!");
					$scope.$parent.$dismiss();
					$scope.initData();
				} else {
					Alert.error('修改客户群组失败！');
				}
			});
		}

		// 关闭修改页面
		$scope.closePage = function() {

			$scope.$parent.$dismiss();
		}

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
