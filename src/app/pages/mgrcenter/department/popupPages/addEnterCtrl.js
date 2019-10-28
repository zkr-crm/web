(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.department').controller(
			'addEnterCtrl', addEnterCtrl);
	/** @ngInject */
	function addEnterCtrl($scope, $filter, $uibModal, $timeout, toastr, Alert,
			EnumType, HttpService) {
		//手机号匹配的正则表达式
		$scope.regex ="1(3|4|5|6|7|8|9)\\d{9}";
		/* 联动查询 */
		var paramInAE = {};
		paramInAE.url = '/crm/manage/entersByEntity';
		paramInAE.method = 'GET';
		HttpService.linkHttp(paramInAE).then(function(response) {
			console.log(response.data);
			$scope.entersInAEForShow = response.data.list;
			console.log($scope.entersInAEForShow);
		});

		$scope.getChangeVal = function() {
			$scope.getSEnterCode = $('#superEnterCode').find('option:selected')
					.text();
			$scope.saveEnter.superEnterCode = $scope.getSEnterCode;

			$scope.getEnter = {};
			$scope.getEnter.enterCode = $scope.getSEnterCode;
			var opts = {};
			opts.url = '/crm/manage/entersByEntity';
			opts.method = 'GET';
			opts.params = $scope.getEnter;
			HttpService.linkHttp(opts).then(function(response) {
				console.log(response.data);
				// $scope.EnterRowCollection=response.data;
				$scope.saveEnter.superEnter = response.data.list[0].enterName;
			});
			console.log($scope.saveEnter);
		}

		$scope.saveEnter = {};
		$scope.saveEnter.enterCode = "";
		$scope.saveEnter.enterName = "";
		$scope.saveEnter.enterHead = "";
		$scope.saveEnter.enterLevel = "";
		$scope.saveEnter.superEnter = "";
		$scope.saveEnter.superEnterCode = "";
		$scope.saveEnter.enterAddr = "";
		$scope.saveEnter.enterTel = "";
		$scope.saveEnter.enterWeb = "";
		$scope.saveEnter.enterEmail = "";
		$scope.saveEnter.busiSumm = "";

		// 机构级别列表对象
		$scope.enterLevelList = EnumType.EnterLevel;

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
				}
			});
		}
		$scope.getEnterList();

		// 机构选中事件
		$scope.selectSuperEnter = function(selected) {

			$scope.saveEnter.superEnter = selected.enterName;
			$scope.saveEnter.superEnterCode = selected.enterCode;
		}

		// 机构级别选中事件
		$scope.selectEnterLevel = function(selectedLevel) {
			$scope.saveEnter.enterLevel = selectedLevel.value;
		}

		// 新增保存
		$scope.saveValue = function(isValid) {
			if (!isValid) {
                Alert.error('机构信息不完整或不合法！');
				return;
			}

			var opts = {};
			opts.url = '/crm/manage/enter';
			opts.method = 'POST';
			opts.params = $scope.saveEnter;
			HttpService.linkHttp(opts).then(function(response) {
				//$scope.searchEnters();
				Alert.success('提交完成!');
                $scope.$parent.$dismiss();
			});

		}

	}

})();
