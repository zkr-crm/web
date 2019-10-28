(function () {
    'use strict';

    angular.module('BlurAdmin.pages.busiopp')
        .controller('cancelBusiOppCtrl', cancelBusiOppCtrl);

    /** @ngInject */
    function cancelBusiOppCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal, busiOppNo,oldStage,newStage) {
		$scope.stageInfo = {};
        $scope.cancelSave = function(){
    	  	if (busiOppNo == undefined || busiOppNo == '') {
                Alert.error('商机编码不能为空！');
                return ;
    	  	}
        	if (oldStage == undefined || oldStage == '') {
                Alert.error('商机原阶段状态不能为空！');
                return ;
    	  	}
    	  	if (newStage == undefined || newStage == '') {
                Alert.error('商机新阶段状态不能为空！');
                return ;
    	  	}
    	  	if ($scope.stageInfo.reason == undefined || $scope.stageInfo.reason == '') {
                Alert.error('商机失败原因不能为空！');
                return ;
    	  	}
    	  	$scope.stageInfo.busiOppNo = busiOppNo;
    	  	$scope.stageInfo.oldStage = oldStage;
    	  	$scope.stageInfo.newStage = newStage;

            HttpService.linkHttp({
                url: '/crm/ocrm/busiOpp/setBusiOppStage',
                method: 'PUT',
                params: $scope.stageInfo
            }).then(function (response) {
                $uibModalInstance.close();
            });
        
      }
        // 取消
    	$scope.cancel = function(){
            $uibModalInstance.close(false);
    	}
    }
})();
