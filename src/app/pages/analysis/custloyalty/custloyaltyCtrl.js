(function() {
	'use strict';

	angular.module('BlurAdmin.pages.analysis.custloyalty').controller('custloyaltyCtrl', custloyaltyCtrl);
	/** @ngInject */
	function custloyaltyCtrl($scope, $uibModal, $filter, $timeout, $http,HttpService, EnumType, $rootScope, Alert) {

		$scope.searchAnalysis = {};
    	$scope.CustType = [];
		angular.forEach(
				EnumType.CustType,
				function(item) {
					if (item.value == '01' || item.value == '03' ) {
						$scope.CustType.push(item);
					}
				});
		$scope.DataSource = EnumType.DataSource;
		$scope.YesNoFlg = EnumType.YesNoFlg;
		
        $scope.startChange=function(){
            if ($scope.searchAnalysis.endDate != null && $scope.searchAnalysis.endDate != '') {
                var endDate = new Date($scope.searchAnalysis.endDate);
                var startDate = new Date($scope.searchAnalysis.startDate);
                if(startDate>endDate){
                   $scope.searchAnalysis.startDate=null;
               }
            }
        }

        $scope.endChange=function(){
            if ($scope.searchAnalysis.startDate != null && $scope.searchAnalysis.startDate != '') {
                var endDate = new Date($scope.searchAnalysis.endDate);
                var startDate = new Date($scope.searchAnalysis.startDate);
                if(startDate>endDate){
                    $scope.searchAnalysis.endDate=null;
                }
            }
        }
        // 日期控件
        $scope.endOpened = {
            opened : false
        }
        $scope.startOpened = {
            opened : false
        }

        // 打开日期控件
        $scope.endOpen = function() {
            $scope.endOpened.opened = !$scope.endOpened.opened;
        }

        $scope.startOpen = function () {
            $scope.startOpened.opened = !$scope.startOpened.opened;
        }

        // 重置条件
        $scope.resetSearch = function() {
        	$scope.searchAnalysis = {};
        	$scope.initBarByAges();
        }

		$scope.initBarByAges=function(){
	        $scope.hasAgesBar = false;
	        $scope.simpleBarOptions = {
	            fullWidth: true,
	            height: "300px"
	        };
	        $scope.initBarByAgesOptions={
	            url :'/crm/query/homePageCtrl/getDataBarByAges',
	            method: 'POST',
	            params:{},
	            success: function successCallback(response) {}
	        };
	        HttpService.linkHttp($scope.initBarByAgesOptions);

	    }
	
	}

})();
