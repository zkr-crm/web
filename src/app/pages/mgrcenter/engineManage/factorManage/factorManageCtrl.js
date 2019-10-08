(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.engineManage.factorManage').controller(
			'factorManageCtrl', factorManageCtrl);
	/** @ngInject */
	function factorManageCtrl($scope, $filter, $uibModal,editableOptions, editableThemes,HttpService, toastr,Alert) {

		//加载因子名称，组成下拉列表
		$scope.EOFactorNames = [];
		$scope.factorNamesT = [];
		var optsForN = {};
		optsForN.url = '/crm/manage/getAllFactorByEntity';
		optsForN.method = 'GET';
		HttpService.linkHttp(optsForN).then(function(response) {
			angular.forEach(response.data, function(item) {
				$scope.factorNamesT.push({ label : item.displayName, value : item.factorName });
			})
			
			$scope.EOFactorNames = $scope.factorNamesT;
			$scope.factorNames = $scope.factorNamesT;
		});
		
		
		//加载因子类型组成枚举
		$scope.EOFactorType = [];
		$scope.factorTypeT = [];
		var optsForF = {};
		optsForF.url = '/crm/manage/getTypeList';
		optsForF.method = 'GET';
		HttpService.linkHttp(optsForF).then(function(response) {
			console.log(response.data);
			angular.forEach(response.data, function(item) {
				$scope.factorTypeT.push({ label : item.typeDesc, value : item.factorType });
			})
			
			$scope.EOFactorType = $scope.factorTypeT;
		});
		//加载因子操作类型，组成枚举
		$scope.EOOperType = [];
		$scope.operTypeT = [];
		var optsForO = {};
		optsForO.url = '/crm/manage/getOperList';
		optsForO.method = 'GET';
		HttpService.linkHttp(optsForO).then(function(response) {
			angular.forEach(response.data, function(item) {
				$scope.operTypeT.push({ label : item.operateDesc, value : item.operateType });
			})
			
			$scope.EOOperType = $scope.operTypeT;
			console.log($scope.EOOperType);
		});
	
		//加载因子数据类型，组成枚举
		$scope.EOValueType = [];
		$scope.valueTypeT = [];
		var optsForV = {};
		optsForV.url = '/crm/manage/getValueList';
		optsForV.method = 'GET';
		HttpService.linkHttp(optsForV).then(function(response) {
			angular.forEach(response.data, function(item) {
				$scope.valueTypeT.push({ label : item.valueDesc, value : item.valueType });
			})
			
			$scope.EOValueType = $scope.valueTypeT;
			console.log($scope.EOValueType);
		});
	
		
		
		
		
		$scope.searchObj ={
				"factorName" : "",
				"displayName" : ""
		}
		
		$scope.sysFactor ={
			"factorName" : "",
			"factorExp" : "",
			"displayName" : "",
			"factorType" : "",
			"operateType" : "",
			"valueType" : ""
		}

		$scope.addFactor = function() {
			
			 $uibModal.open({
				 animation: true,
				 backdrop: 'static',
				 templateUrl: 'app/pages/mgrcenter/engineManage/factorManage/popupPages/addFactor.html',
				 size : 'midle-900',
				//controller:'addFactorCtrl',
				 scope:$scope,
				 resolve: {
				 }
			 });
		};
		// 查询事件
		$scope.searchFactor = function() {
			
			if($scope.searchObj.factorName){
				$scope.v = $scope.searchObj.factorName.value;
				$scope.searchObj.factorName = "";
				$scope.searchObj.factorName = $scope.v;
			}

			var opts = {};
			opts.url = '/crm/manage/getAllFactorByEntity';
			opts.method = 'GET';
			opts.params = $scope.searchObj;
			HttpService.linkHttp(opts).then(function(response) {
				angular.forEach(response.data, function(item) {
					angular.forEach($scope.EOFactorType, function(ft) {
						if(ft.value == item.factorType){
							item.factorType = ft.label;
							return;
						}
					})
					angular.forEach($scope.EOOperType, function(ot) {
						if(ot.value == item.operateType){
							item.operateType = ot.label;
							return;
						}
					})
					angular.forEach($scope.EOValueType, function(vt) {
						if(vt.value == item.valueType){
							item.valueType = vt.label;
							return;
						}
					})
					var paramOpts = {};
					paramOpts.url = '/crm/manage/getFactorParams';
					paramOpts.method = 'GET';
					paramOpts.params = {paramName:item.factorName};
					HttpService.linkHttp(paramOpts).then(function(response) {
						var strVList = "";
						var inte = 1;
						angular.forEach(response.data, function(param) {
							strVList = strVList + param.itemName+",";
							inte++;
						})
						strVList.substring(0,strVList.length-1);
						item.valueList = strVList.substring(0,strVList.length-1);
						//item.valueList = strVList;
					});
					
				})
				$scope.FactorsRowCollection = response.data;
				$scope.total=response.data.length;
				
			});
		}
		
		// 页面初始化查询
		$scope.searchFactor();
		$scope.smartTablePageSize = 10;
		
		// 修改
		$scope.updateFactor = function(index){
			$scope.updFactor={};
			$scope.updFactor.factorId = $scope.FactorsRowCollection[index].factorId;
			$scope.updFactor.factorName = $scope.FactorsRowCollection[index].factorName;
			$scope.updFactor.factorExp = $scope.FactorsRowCollection[index].factorExp;
			$scope.updFactor.displayName = $scope.FactorsRowCollection[index].displayName;
			$scope.updFactor.factorType = $scope.FactorsRowCollection[index].factorType;
			$scope.updFactor.operateType = $scope.FactorsRowCollection[index].operateType;
			$scope.updFactor.valueType = $scope.FactorsRowCollection[index].valueType;
			console.log($scope.updFactor);
						
			$uibModal
			.open({
				animation : true,
				backdrop:'static',
				templateUrl : 'app/pages/mgrcenter/engineManage/factorManage/popupPages/updFactor.html',
				size : 'midle-900',
//				controller : 'updFactorCtrl',
				scope : $scope,
				resolve : {

				}
			});
		}
		// 删除
		$scope.removeFactor=function(index){
			
			Alert.confirm("确定要删除该条记录？").then(function(){
				$scope.sysFactor={};
				$scope.sysFactor.factorName = $scope.FactorsRowCollection[index].factorName;
				$scope.sysFactor.factorExp = $scope.FactorsRowCollection[index].factorExp;
				$scope.sysFactor.displayName = $scope.FactorsRowCollection[index].displayName;
				$scope.sysFactor.factorType = $scope.FactorsRowCollection[index].factorType.value;
				$scope.sysFactor.operateType = $scope.FactorsRowCollection[index].operateType.value;
				$scope.sysFactor.valueType = $scope.FactorsRowCollection[index].valueType.value;
				var opts = {};
				opts.url = '/crm/manage/deleteOneFactor';
				opts.method = 'DELETE';
				opts.params = $scope.sysFactor;
				HttpService.linkHttp(opts).then(function(response) {
					toastr.success('提交完成!');
					console.log(response);
					$scope.searchFactor();
				});
			});
			/*$scope.sysFactor={};
			$scope.sysFactor.factorName = $scope.FactorsRowCollection[index].factorName;
			$scope.sysFactor.displayName = $scope.FactorsRowCollection[index].displayName;
			$scope.sysFactor.factorType = $scope.FactorsRowCollection[index].factorType.value;
			$scope.sysFactor.operateType = $scope.FactorsRowCollection[index].operateType.value;
			$scope.sysFactor.valueType = $scope.FactorsRowCollection[index].valueType.value;
			var opts = {};
			opts.url = '/crm/manage/deleteOneFactor';
			opts.method = 'DELETE';
			opts.params = $scope.sysFactor;
			HttpService.linkHttp(opts).then(function(response) {
				toastr.success('提交完成!');
				console.log(response);
				$scope.searchFactor();
			});*/
		}
		
	}

}
)();
