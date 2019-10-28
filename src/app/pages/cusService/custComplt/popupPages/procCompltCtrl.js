(function () {
    'use strict';

    angular.module('BlurAdmin.pages.cusService.custComplt')
        .controller('procCompltCtrl', procCompltCtrl);

    /** @ngInject */
    function procCompltCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal, custNo) {
        console.log("procCompltCtrl custNo= " + custNo);
        $scope.ok = function() {
        	$uibModalInstance.close(true);
        }
    }
})();
