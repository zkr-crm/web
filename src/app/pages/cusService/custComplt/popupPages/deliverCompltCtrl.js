(function () {
    'use strict';

    angular.module('BlurAdmin.pages.cusService.custComplt')
        .controller('deliverCompltCtrl', deliverCompltCtrl);

    /** @ngInject */
    function deliverCompltCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal, custNo) {
        console.log("deliverCompltCtrl custNo= " + custNo);
        $scope.deliver = {};
        $scope.saveDeliver = function() {
          	  if ($scope.deliver.custAgent == undefined) {
              	Alert.error("转交负责人不能为空");
            	return;
          	  }
          	  if ($scope.deliver.custAgentNam == undefined) {
                	Alert.error("转交负责人不能为空");
            	return;
          	  }
          	  if ($scope.deliver.deliverDesc == undefined) {
              	Alert.error("转交描述不能为空");
            	return;
          	  }
              $uibModalInstance.close($scope.deliver);
        }

        $scope.selectAgentDlg = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/mgrcenter/usermanagement/popupPages/selectAgentDlg.html',
                controller: 'selectAgentDlgCtrl',
                size: 'midle-900', // 
                backdrop:'static',
                resolve: {
                    'checkedRow': function () {
                        return '';
                    }
                }
            });
            modalInstance.result.then(function(result){
          	  // 返回调用
          	  console.log(result); //result关闭是回传的值
          	  $scope.deliver.custAgent = result.userId;
          	  $scope.deliver.custAgentNam = result.userName;
          	  $scope.deliver.employeeId = result.employeeId;

            });
        
      }
    }
})();
