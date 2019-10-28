(function () {
  'use strict';

  angular.module('BlurAdmin.pages.demos.modifyDemo')
      .controller('ModifyDemoCtrl', ModifyDemoCtrl);
  /** @ngInject */
  function ModifyDemoCtrl($scope, $filter,$uibModal,$timeout,toastr,Alert,EnumType) {
	  $scope.sexItems = EnumType.Sex;
	  $scope.qqq = function(){
		  return true;
	  };
	  $scope.person = {};
	  $scope.person.name = "xxx";
	  $scope.person.sex = EnumType.Sex.female;
	  $scope.person.age = 11;
	  $scope.person.email = "";
	  $scope.person.address = "";
	  
	  $scope.saveValue = function(){
		  /*console.log($scope.person);*/
	  } ;
	  
	  $scope.addValue = function(){
		  $uibModal.open({
	        animation: true,
	        backdrop: 'static',
	        templateUrl: 'app/pages/demos/modifyDemo/modals/demoModal.html',
	        size: 'md',
	        controller:'DemoModalCtrl',
	        scope:$scope,
	        resolve: {
	        	     item1: function () {
	        	      return 88;
	        	     }
	        	    }
	      });
	  }
	  
	  
	    
	  $scope.submit2 = function() {
		  sleep(2*1000);
		  toastr.success('提交2完成!');
	  }
	  
	  $scope.submit3 = function() {
		  Alert.confirm('是否继续').then(function(){
		  },function(){
		  });
	  }
	  
	    
	    function sleep(numberMillis) { 
	    	var now = new Date(); 
	    	var exitTime = now.getTime() + numberMillis; 
	    	while (true) { 
	    	now = new Date(); 
	    	if (now.getTime() > exitTime) 
	    	return; 
	    	} 
	    	}
      
  }
  
})();
