(function () {
    'use strict';

    angular.module('BlurAdmin.pages.portrayal.perCusPortrayal')
        .controller('addCustCertCtrl', addCustCertCtrl);

    /** @ngInject */
    function addCustCertCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal) {
    	console.log("custNo=" + $scope.custNo);
    	$scope.IdType  = EnumType.IdType;

    	$scope.selectIdType = function(selectIdType) {
			console.log(selectIdType);
			$scope.custAgent.IdType = selectIdType;
		}

    	//-------------新增开始--------------
		$scope.addCustCert = function() {
			
		}
        //-------------新增结束--------------

    	//-------------查询开始--------------
		$scope.searchCustCert = function() {
			
		}
        //-------------查询结束--------------

    	//-------------修改开始--------------
		$scope.getCustCert = function() {
			
		}
        //-------------修改结束--------------
    	//-------------删除开始--------------
		$scope.delCustCert = function() {
			
		}
        //-------------删除结束--------------
    }
})();
