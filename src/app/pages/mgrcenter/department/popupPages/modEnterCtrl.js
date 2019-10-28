(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.department').controller(
			'modEnterCtrl', modEnterCtrl);
	/** @ngInject */
	function modEnterCtrl($scope, $filter, $uibModal, $timeout, toastr,
			EnumType, Alert, HttpService) {

		$scope.modEnter = {};
		$scope.regex ="1(3|4|5|6|7|8|9)\\d{9}";
		$scope.modEnter.enterCode = $scope.modObj.enterCode;
		$scope.modEnter.enterName = $scope.modObj.enterName;
		$scope.modEnter.enterHead = $scope.modObj.enterHead;
		$scope.modEnter.enterAddr = $scope.modObj.enterAddr;
		$scope.modEnter.enterTel = $scope.modObj.enterTel;
		$scope.modEnter.enterWeb = $scope.modObj.enterWeb;
		$scope.modEnter.enterEmail = $scope.modObj.enterEmail;
		$scope.modEnter.busiSumm = $scope.modObj.busiSumm;
		$scope.modEnter.enterLevel = $scope.modObj.enterLevel;
		$scope.modEnter.superEnter = $scope.modObj.superEnter;
		$scope.modEnter.superEnterCode = $scope.modObj.superEnterCode;

		// 机构级别列表对象
		$scope.enterLevelList = EnumType.EnterLevel;
		// 机构级别列表数据初始化
		angular.forEach($scope.enterLevelList, function(i) {
			if ($scope.modObj.enterLevel === i.value) {
				$scope.selectedLevel = i;
			}
		});

		// 机构列表对象
		$scope.enterList = [];
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

					// 机构列表数据初始化
					angular.forEach($scope.enterList, function(i) {
						if ($scope.modObj.superEnterCode === i.enterCode) {
							$scope.selectedEnter = i;
						}
					});
				}
			});
		}
		$scope.getEnterList();

		// 机构选中事件
		$scope.selectSuperEnter = function(selected) {

			$scope.modEnter.superEnter = selected.enterName;
			$scope.modEnter.superEnterCode = selected.enterCode;
		}

		// 机构级别选中事件
		$scope.selectEnterLevel = function(selectedLevel) {
			$scope.modEnter.enterLevel = selectedLevel.value;
		}

		// 修改保存
		$scope.modValue = function(isValid) {

			if (!isValid) {
                Alert.error('机构信息不完整或不合法！');
				return;
			}

			var opts = {};
			opts.url = '/crm/manage/enter';
			opts.method = 'PUT';
			opts.params = $scope.modEnter;
			console.log(opts.params);
			console.log($scope.modEnter);
			console.log($scope.modObj);

			HttpService.linkHttp(opts).then(function(response) {
				Alert.success('提交完成!');
                $scope.$parent.$dismiss();
			});
		}

	}

})();
