(function () {
  'use strict';

  angular.module('BlurAdmin.pages.demos.modifyDemo')
      .controller('AddUserModalCtrl', AddUserModalCtrl);
  
  function AddUserModalCtrl($scope) {
	  $scope.newUser = {};
	  $scope.newUser.id = null;
	  $scope.newUser.firstName = "张";
	  $scope.newUser.lastName = "";
	  $scope.newUser.username = "";
	  $scope.newUser.email = "";
	  
	  
	  $scope.saveNewUser = function(){
		  $scope.tableData.push($scope.newUser);
	  }
  }
  
})();
