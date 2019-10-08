(function () {
    'use strict';

    angular.module('BlurAdmin.pages.cusService.custComplt')
        .controller('cancelCompltCtrl', cancelCompltCtrl);

    /** @ngInject */
    function cancelCompltCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal) {
        $scope.ok = function() {
        	if ($scope.complt.cancelDesc == undefined || $scope.complt.cancelDesc == '') {
        		Alert.error("取消原因必输");
        		return;
        	}
            $uibModalInstance.close($scope.complt.cancelDesc);
        }
    }
})();
