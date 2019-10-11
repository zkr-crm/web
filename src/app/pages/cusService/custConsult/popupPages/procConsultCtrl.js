(function () {
    'use strict';

    angular.module('BlurAdmin.pages.cusService.custConsult')
        .controller('procConsultCtrl', procConsultCtrl);

    /** @ngInject */
    function procConsultCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal, custNo) {
        console.log("procConsultCtrl custNo= " + custNo);
        $scope.ok = function() {
        	if ($scope.deliver.deliverDesc == undefined) {
              	Alert.error("处理原因不能为空");
            	return;
        	}
        	$uibModalInstance.close(true);
        }
    }
})();
