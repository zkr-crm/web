(function() {
  'use strict';

  angular.module('BlurAdmin.pages.busiopp.allotBusiOppList')
    .controller('formValidateCtrl', formValidateCtrl);

  /** @ngInject */
  function formValidateCtrl($scope, HttpService, EnumType, Alert) {

      $scope.Sex = EnumType.Sex;
      $scope.CertTyp = EnumType.IdType;
      $scope.Sex = EnumType.Sex;
      $scope.cust = {};
//    	  ng-disabled="addForm.$invalid" 
  	$scope.selectSex = function(selectSex) {
		$scope.cust.custSex = selectSex;
	}

  	$scope.selectCertTyp = function(selectCertTyp) {
		$scope.cust.certTyp = selectCertTyp;
	}
	$scope.birthDateOpen = birthDateOpen;
    $scope.birthDateOpened = false;

    // 打开日期控件
    function birthDateOpen() {
        $scope.birthDateOpened = true;
    }

      $scope.save=function(valid){
    	  $scope.submitted = false;
          if(valid) {
        	// 提交相关逻辑
        	  
        	  
        	  
          } else {
        	  $scope.submitted = true;
          }
		}
  }

})();
