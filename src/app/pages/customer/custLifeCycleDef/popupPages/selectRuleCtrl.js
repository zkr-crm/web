(function() {
	'use strict';

	angular.module('BlurAdmin.pages.customer.custLifeCycleDef').controller('selectRuleCtrl',
			selectRuleCtrl);
	/** @ngInject */
	function selectRuleCtrl($scope, $filter, $uibModal, $timeout, HttpService,$rootScope, 
			$uibModalInstance, toastr, EnumType, Alert) {

		$scope.searchObj = {
			'userName' : '',
			'custName' : ''
		};

		$scope.closePage = function() {
			$uibModalInstance.close();
		}		
		
		$scope.searchCust = function() {

			var opts = {};
			opts.url = '/crm/manage/engine/getAllStraByEntity';
			opts.method = 'GET';
			opts.params = $scope.searchObj;
			HttpService.linkHttp(opts).then(function(response) {
				
				$scope.StratRowCollection = response.data;

//				angular.forEach(response.data, function(item) {
//					if(   item.strategyId ==  $scope.strategyName  ){
//
//						$scope.strategyName = item.strategyName;
//						$scope.searchObj.strategyName = item.strategyName;
//						$scope.saveTag.strategyId =  item.strategyId;
//					}
//					
//				})
				
				$scope.total = response.data.length;
			});

		}
		

		$scope.searchCust();

		$scope.saveValueP = function(item) {

			//console.log(item);
			$scope.custLifeCycleDef.ruleId = item.strategyId;
			$scope.custLifeCycleDef.strategyName = item.strategyName;
			$scope.closePage();

		}

		
		

		
		
		
		
	}

})();
