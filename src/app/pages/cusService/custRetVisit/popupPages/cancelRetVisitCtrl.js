(function () {
    'use strict';

    angular.module('BlurAdmin.pages.cusService.custRetVisit')
        .controller('cancelRetVisitCtrl', cancelRetVisitCtrl);

    /** @ngInject */
    function cancelRetVisitCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal) {
        $scope.ok = function() {
        	if ($scope.consult.cancelDesc == undefined || $scope.consult.cancelDesc == '') {
        		Alert.error("取消原因必输");
        		return;
        	}
            $uibModalInstance.close($scope.consult.cancelDesc);
        }
    }
})();
