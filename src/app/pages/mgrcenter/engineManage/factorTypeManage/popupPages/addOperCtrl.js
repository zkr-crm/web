(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.engineManage.factorTypeManage').controller(
			'addOperCtrl', addOperCtrl);
	/** @ngInject */
	function addOperCtrl($scope, $filter, $uibModal, $timeout, toastr, Alert, HttpService, EnumType) {

		$scope.addOper = {
				"operateType":"",
				"operateValue":"",
				"operateDesc":""
		};
		

		$scope.FactorOperTypeList = EnumType.FactorOperType;

		$scope.selectOperValue = function(selectedValue) {
			
			var descAddStr = "";
			var valueAddStr = "";
			angular.forEach(selectedValue, function(item) {
				valueAddStr = valueAddStr + item.value + "、"
				descAddStr = descAddStr +item.label + "、";
				
			})
			$scope.addOper.operateValue = valueAddStr.substring(0,valueAddStr.length-1);
			$scope.addOper.operateDesc = descAddStr.substring(0,descAddStr.length-1);
		}
		
		$scope.saveValue = function(isValid) {

			if (!isValid) {
				return;
			}
			var opts = {};
			opts.url = '/crm/manage/saveOper';
			opts.method = 'POST';
			opts.params = $scope.addOper;
			HttpService.linkHttp(opts).then(function(response) {
				toastr.success('提交完成!');
				console.log(response);
				$scope.searchOper();
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
