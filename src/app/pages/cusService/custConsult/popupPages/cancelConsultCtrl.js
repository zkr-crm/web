(function () {
    'use strict';

    angular.module('BlurAdmin.pages.cusService.custConsult')
        .controller('cancelConsultCtrl', cancelConsultCtrl);

    /** @ngInject */
    function cancelConsultCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal) {
        $scope.ok = function() {
        	if ($scope.consult.cancelDesc == undefined || $scope.consult.cancelDesc == '') {
        		Alert.error("取消原因必输");
        		return;
        	}
            $uibModalInstance.close($scope.consult.cancelDesc);
        }
    }
})();
