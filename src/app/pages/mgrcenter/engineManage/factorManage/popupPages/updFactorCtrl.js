(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.engineManage.factorManage').controller(
			'updFactorCtrl', updFactorCtrl);
	/** @ngInject */
	function updFactorCtrl($scope, $filter, $uibModal, $timeout, HttpService,$state,
			toastr, EnumType, Alert) {

		//加载因子名称，组成下拉列表
		
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
		
		var eItem = {label:$scope.updFactor.factorName, value:$scope.updFactor.factorName};
		$scope.updFactor.factorName = eItem;
		
		
		//加载因子类型组成枚举
		$scope.factorTypeT = [];
		var optsForF = {};
		optsForF.url = '/crm/manage/getTypeList';
		optsForF.method = 'GET';
		HttpService.linkHttp(optsForF).then(function(response) {
			angular.forEach(response.data, function(item) {
				$scope.factorTypeT.push({ label : item.typeDesc, value : item.factorType });
				if( $scope.updFactor.factorType ==  item.typeDesc || $scope.updFactor.factorType ==  item.factorType){
					$scope.updFactor.factorType = "";
					$scope.updFactor.factorType = { label : item.typeDesc, value : item.factorType };
				}
			})
			
			$scope.factorTypes = $scope.factorTypeT;
			console.log($scope.factorTypes);
		});
	//加载因子操作类型，组成枚举
	$scope.operTypeT = [];
	var optsForO = {};
	optsForO.url = '/crm/manage/getOperList';
	optsForO.method = 'GET';
	HttpService.linkHttp(optsForO).then(function(response) {
		angular.forEach(response.data, function(item) {
			$scope.operTypeT.push({ label : item.operateDesc, value : item.operateType });
			if( $scope.updFactor.operateType ==  item.operateDesc || $scope.updFactor.operateType ==  item.operateType ){
				$scope.updFactor.operateType = "";
				$scope.updFactor.operateType = { label : item.operateDesc, value : item.operateType };
			}
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
			if( $scope.updFactor.valueType ==  item.valueDesc || $scope.updFactor.valueType ==  item.valueType ){
				$scope.updFactor.valueType = "";
				$scope.updFactor.valueType = { label : item.valueDesc, value : item.valueType };
			}
		})
		
		$scope.valueTypes = $scope.valueTypeT;
	});
		
		
	
	
		$scope.saveValue = function(isValid) {

			if (!isValid) {
				return;
			}
			$scope.f = $scope.updFactor.factorType.value;
			$scope.o = $scope.updFactor.operateType.value;
			$scope.v = $scope.updFactor.valueType.value;
			$scope.n = $scope.updFactor.factorName.value;
			$scope.updFactor.factorType = "";
			$scope.updFactor.operateType = "";
			$scope.updFactor.valueType = "";
			$scope.updFactor.factorName = "";
			$scope.updFactor.factorType = $scope.f;
			$scope.updFactor.operateType = $scope.o;
			$scope.updFactor.valueType = $scope.v;
			$scope.updFactor.factorName = $scope.n;
			var opts = {};
			opts.url = '/crm/manage/updateOneFactor';
			opts.method = 'PUT';
			opts.params = $scope.updFactor;
			HttpService.linkHttp(opts).then(function(response) {
				console.log("请求成功");
				console.log(response);
				$scope.updFactor = {};
				// 执行查询
				$scope.searchFactor();
				$scope.$parent.$dismiss();
			});
		}
		
		$scope.toModList = function(){
			$scope.searchObj = {"paramName":$scope.updFactor.factorName.value};
			var jumpFactorName = $scope.updFactor.factorName.value;
			console.log($scope.searchObj);
			console.log(jumpFactorName);
			
            $state.go('mgrcenter.engineManage.factorValueListManage',{'paramName':jumpFactorName});
		}
		
		

	}

})();
