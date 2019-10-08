(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.engineManage.factorManage').controller(
			'addFactorCtrl', addFactorCtrl);
	/** @ngInject */
	function addFactorCtrl($scope, $filter, $uibModal, $timeout, toastr, Alert, HttpService) {
		$scope.addFactor = {};
		
		//加载因子类型组成枚举
		$scope.factorTypeT = [];
		var optsForF = {};
		optsForF.url = '/crm/manage/getTypeList';
		optsForF.method = 'GET';
		HttpService.linkHttp(optsForF).then(function(response) {
			angular.forEach(response.data, function(item) {
				$scope.factorTypeT.push({ label : item.typeDesc, value : item.factorType });
			})
			
			$scope.factorTypes = $scope.factorTypeT;
		});
		//加载因子操作类型，组成枚举
		$scope.operTypeT = [];
		var optsForO = {};
		optsForO.url = '/crm/manage/getOperList';
		optsForO.method = 'GET';
		HttpService.linkHttp(optsForO).then(function(response) {
			angular.forEach(response.data, function(item) {
				$scope.operTypeT.push({ label : item.operateDesc, value : item.operateType });
			})
			
			$scope.operateTypes = $scope.operTypeT;
		});
	
		//加载因子数据类型，组成枚举
		$scope.valueTypeT = [];
		var optsForV = {};
		optsForV.url = '/crm/manage/getValueList';
		optsForV.method = 'GET';
		HttpService.linkHttp(optsForV).then(function(response) {
			angular.forEach(response.data, function(item) {
				$scope.valueTypeT.push({ label : item.valueDesc, value : item.valueType });
			})
			
			$scope.valueTypes = $scope.valueTypeT;
		});
		
		
		var optsForFName = {};
		optsForFName.url = '/crm/manage/engine/bomTagFactors';
		optsForFName.method = 'GET';
		HttpService.linkHttp(optsForFName).then(function(response) {
			var names = [];
			var jsonArr = angular.fromJson(response.data);

			angular.forEach(jsonArr, function(jsonObj) {
				
				angular.forEach(jsonObj,function( key,val){
					names.push({ label : val, value : val });
				}); 
			})
			$scope.factorName = names;
			console.log(names);
		});
		
		
		
		$scope.saveValue = function(isValid) {

			if (!isValid) {
				return;
			}
			$scope.f = $scope.addFactor.factorType.value;
			$scope.o = $scope.addFactor.operateType.value;
			$scope.v = $scope.addFactor.valueType.value;
			$scope.n = $scope.addFactor.factorName.value;
			$scope.addFactor.factorType = "";
			$scope.addFactor.operateType = "";
			$scope.addFactor.valueType = "";
			$scope.addFactor.factorName = "";
			$scope.addFactor.factorType = $scope.f;
			$scope.addFactor.operateType = $scope.o;
			$scope.addFactor.valueType = $scope.v;
			$scope.addFactor.factorName = $scope.n;
			var opts = {};
			opts.url = '/crm/manage/insertOneFactor';
			opts.method = 'POST';
			opts.params = $scope.addFactor;
			HttpService.linkHttp(opts).then(function(response) {
				toastr.success('提交完成!');
				console.log(response);
				$scope.searchFactor();
				// 执行查询
				$scope.$parent.$dismiss();
			});
		}
		
		// 关闭页面
		$scope.closePage = function() {
			$scope.$parent.$dismiss();
		}

	}

})();
