(function () {
  'use strict';
  
  angular.module('BlurAdmin.common')
  .controller('AlertCtrl', AlertCtrl)
  .factory('Alert', Alert);

  /** @ngInject */
  function Alert($uibModal) {
	  var service = {};
	  var open = function(url,msg){
          var modalInstance = $uibModal.open({
		        animation: true,
		        templateUrl: url,
		        controller: 'AlertCtrl',
		        resolve: {
	        	     message: function () {
	        	      return msg;
	        	     }
	        	    }
		      });
          return modalInstance;
	  };
	  service.success = function(msg){
		  open('app/common/services/modalTemplates/successModal.html',msg);
	  };
	  service.error = function(msg){
          var modalInstance = open('app/common/services/modalTemplates/errorModal.html',msg);
          return modalInstance.result;
	  };
      service.confirm = function(msg){
          var modalInstance = open('app/common/services/modalTemplates/confirmModal.html',msg);
          return modalInstance.result;
      };
      service.info = function(msg){
          var modalInstance = open('app/common/services/modalTemplates/infoModal.html',msg);
          return modalInstance.result;
      };
	  return service;
  }
  
  function AlertCtrl($scope,message,$uibModalInstance){
	  $scope.msg = message;
	  $scope.ok = function(){
          $uibModalInstance.close();
      };
      $scope.cancel = function(){
          $uibModalInstance.dismiss();
      };
  }
})();
