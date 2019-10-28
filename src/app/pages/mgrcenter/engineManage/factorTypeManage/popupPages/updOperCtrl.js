(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.engineManage.factorTypeManage').controller(
			'updOperCtrl', updOperCtrl);
	/** @ngInject */
	function updOperCtrl($scope, $filter, $uibModal, $timeout, HttpService,
			toastr, EnumType, Alert) {


		/*$scope.updOper = {
				"operateType":"",
				"operateValue":"",
				"operateDesc":""
		};*/
		

		var operValues = $scope.updOper.operateValue.split("、");
		$scope.tempValue = [];
		angular.forEach(operValues, function(oValue) {
			$scope.tempValue.push(EnumType.FactorOperType.getEnumByValue(oValue));
		})
		
		
//		$scope.operateValue = EnumType.FactorOperType.getEnumByValue($scope.updOper.operateValue);
		

		$scope.FactorOperTypeList = EnumType.FactorOperType;
		$scope.operateValue = $scope.tempValue;

		$scope.selectOperValue = function(selectedValue) {
			
			var descUpdStr = "";
			var valueUpdStr = "";
			angular.forEach(selectedValue, function(item) {
				descUpdStr = descUpdStr + item.label + "、"
				valueUpdStr = valueUpdStr +item.value + "、";
				
			})
			$scope.updOper.operateValue = valueUpdStr.substring(0,valueUpdStr.length-1);
			$scope.updOper.operateDesc = descUpdStr.substring(0,descUpdStr.length-1);
		
		}
		
		$scope.saveValue = function(isValid) {

			if (!isValid) {
				return;
			}
			var opts = {};
			opts.url = '/crm/manage/updateOper';
			opts.method = 'PUT';
			opts.params = $scope.updOper;
			HttpService.linkHttp(opts).then(function(response) {
				console.log("请求成功");
				console.log(response);
				$scope.updOper = {};
				// 执行查询
				$scope.searchOper();
				$scope.$parent.$dismiss();
			});
		}

	}

})();
