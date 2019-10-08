(function () {
    'use strict';

    angular.module('BlurAdmin.pages.cusService.custRetVisit')
        .controller('procRetVisitCtrl', procRetVisitCtrl);

    /** @ngInject */
    function procRetVisitCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal, custNo) {
        console.log("procRetVisitCtrl custNo= " + custNo);
        $scope.ok = function() {
        	if ($scope.deliver.deliverDesc == undefined) {
              	Alert.error("处理原因不能为空");
            	return;
        	}
        	$uibModalInstance.close(true);
        }
    }
})();
