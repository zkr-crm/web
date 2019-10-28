(function () {
    'use strict';

    angular.module('BlurAdmin.pages.portrayal.perCusPortrayal')
        .controller('pdfviewerCtrl', pdfviewerCtrl);

    /** @ngInject */
    function pdfviewerCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal, custNo) {
    	  $scope.pdfName = 'demo';
    	  $scope.pdfUrl = 'app/pages/portrayal/popupPages/pdfviewer/1221400.pdf';
    	  $scope.pdfPassword = 'test';
    	  $scope.scroll = 0;
  //  	  $scope.loading = 'loading';

    	  $scope.getNavStyle = function(scroll) {
    	    if(scroll > 100) return 'pdf-controls fixed';
    	    else return 'pdf-controls';
    	  }

    	  $scope.onError = function(error) {
    	    console.log(error);
    	  }

//    	  $scope.onLoad = function() {
//    	    $scope.loading = '';
//    	  }

    	  $scope.onProgress = function (progressData) {
    	    console.log(progressData);
    	  };

    	  $scope.onPassword = function (updatePasswordFn, passwordResponse) {
    	    if (passwordResponse === PDFJS.PasswordResponses.NEED_PASSWORD) {
    	        updatePasswordFn($scope.pdfPassword);
    	    } else if (passwordResponse === PDFJS.PasswordResponses.INCORRECT_PASSWORD) {
    	        console.log('Incorrect password')
    	    }
    	  };
    }
})();
