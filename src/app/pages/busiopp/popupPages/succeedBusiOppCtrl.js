(function () {
    'use strict';

    angular.module('BlurAdmin.pages.busiopp')
        .controller('succeedBusiOppCtrl', succeedBusiOppCtrl);

    /** @ngInject */
    function succeedBusiOppCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal,busiOppNo, oldStage, newStage, busiOppNam) {
    	$scope.signDateOpen = signDateOpen;
        $scope.signDateOpened = false;

        // 打开日期控件
        function signDateOpen() {
            $scope.signDateOpened = true;
        }

    	$scope.stageInfo = {};
    	var initStageData = function() {
    		$scope.stageInfo.busiOppNo = busiOppNo;
    		$scope.stageInfo.busiOppNam = busiOppNam;
    	}
    	// 初始化
    	initStageData();

        $scope.selectProductDlg = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/product/popupPages/selectProductDlg.html',
                controller: 'selectProductDlgCtrl',
                size: 'midle-900', // 
                backdrop:'static',
                resolve: {
                    'checkedRow': function () {
                        return '';
                    }
                }
            });
            modalInstance.result.then(function(result){
            	if (result == undefined || result == '') {
            		return;
            	}
          	  // 返回调用
          	  $scope.stageInfo.productCode = result.productCd;
          	  $scope.stageInfo.productNam = result.productNam;

            });
        
      }

    	// 保存
    	$scope.succeedSave = function(){
    	  	if ($scope.stageInfo.busiOppNo == undefined || $scope.stageInfo.busiOppNo == '') {
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
    	  	if ($scope.stageInfo.policyNo == undefined || $scope.stageInfo.policyNo == '') {
                Alert.error('保单号不能为空！');
                return ;
    	  	}
    	  	if ($scope.stageInfo.productCode == undefined || $scope.stageInfo.productCode == '') {
                Alert.error('产品代码不能为空！');
                return ;
    	  	}
    	  	if ($scope.stageInfo.policyPrem == undefined || $scope.stageInfo.policyPrem == '') {
                Alert.error('保费不能为空！');
                return ;
    	  	}
    	  	if ($scope.stageInfo.signDate == undefined || $scope.stageInfo.signDate == '') {
                Alert.error('商机签单日期不能为空！');
                return ;
    	  	}
    	  	$scope.stageInfo.oldStage = oldStage;
    	  	$scope.stageInfo.newStage = newStage;
    	  	var signDate = new Date($scope.stageInfo.signDate);
    	  	$scope.stageInfo.signDate = $filter('date')(signDate, 'yyyy-MM-dd'); 

    	  	HttpService.linkHttp({
                url: '/crm/ocrm/busiOpp/setBusiOppStage',
                method: 'PUT',
                params: $scope.stageInfo
            }).then(function (response) {
                $uibModalInstance.close(true);
            });
        
      }
    	// 取消
    	$scope.cancel = function(){
            $uibModalInstance.close(false);
    	}

    }
})();
