(function () {
    'use strict';

    angular.module('BlurAdmin.pages.busiopp')
        .controller('selectBusiOppDlgCtrl', selectBusiOppDlgCtrl);

    /** @ngInject */
    function selectBusiOppDlgCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal, checkedRow) {
    	// 分页默认
    	$scope.smartTablePageSize = 5;
		$scope.searchObj = {};
		// 用户对象数据集
		$scope.busiOppList = [];

        $scope.searchObj = {
                'busiOppName' : '',
                'custAgent' : '',
                'collaborator' : '',
                'busiOppStage' : '03'
            };

        $scope.selectBusiOppList = function() {
            var opts = {};
            opts.url = 'crm/ocrm/busiOpp/busiOppList';
            opts.method = 'GET';
            opts.params =  $scope.searchObj;
            HttpService.linkHttp(opts).then(function(response) {
	              $scope.busiOppList = response.data.map(function (item) {
	                  item.busiOppType = EnumType.ProductType.getLabelByValue(item.busiOppType);
	                  item.custType = EnumType.CustType.getLabelByValue(item.custType);
	            	  item.busiOppSrc = EnumType.BusiOppSrc.getLabelByValue(item.busiOppSrc);
	                  item.busiOppStageNam = EnumType.BusiOppStage.getLabelByValue(item.busiOppStage);
	                  item.custSource = EnumType.DataSource.getLabelByValue(item.custSource);
	                  return item;
                });
				$scope.total = response.data.length;

            });
        }
		// 重置查询
		$scope.resetSearchBusiOpp = function() {
			$scope.searchObj = {};
			$scope.selectBusiOppList();
		}

		// 页面初始化查询
		$scope.selectBusiOppList();
        // ----------------选择客户开始--------------------

		$scope.radioRptOptions = {};
        $scope.radioRptOptions.select="";
        // 单个选中
        $scope.selectRptOne = function(i) {
            angular.forEach($scope.busiOppList, function(i) {
                if($scope.radioRptOptions.select == i.busiOppNo){
                	$scope.selectBusiOppInfo = i;
                	return ;
                }
            });
        }
        $scope.selectRptRow = function(item) {
            $scope.radioRptOptions.select = item.busiOppNo;
        	$scope.selectBusiOppInfo = item;

        }

        $scope.ok = function () {
            $uibModalInstance.close($scope.selectBusiOppInfo);
        };
        // ----------------选择客户结束--------------------

	
    }
})();
