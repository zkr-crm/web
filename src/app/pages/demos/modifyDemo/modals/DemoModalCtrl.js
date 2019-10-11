(function () {
  'use strict';

  angular.module('BlurAdmin.pages.demos.modifyDemo')
      .controller('DemoModalCtrl', DemoModalCtrl);
  
  function DemoModalCtrl($scope,item1) {
	  $scope.person.age = item1;
  }
  
})();
