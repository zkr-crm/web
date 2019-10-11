(function () {
    'use strict';

    angular.module('BlurAdmin.pages.portrayal.perCusPortrayal')
        .controller('uptPerAssetsCtrl', uptPerAssetsCtrl);

    /** @ngInject */
    function uptPerAssetsCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal, custNo, seqNo) {
        console.log("uptPerAssetsCtrl custNo=" + custNo);
        console.log("uptPerAssetsCtrl seqNo=" + seqNo);
        
        $scope.AssetsTyp = EnumType.AssetsTyp;

        $scope.selectAssetsTyp = function(selectAssetsTyp) {
			console.log(selectAssetsTyp);
			$scope.custAssets.assetsTyp = selectAssetsTyp;
		}

    	$scope.obtainOpen = obtainOpen;
        $scope.obtainOpened = false;

        $scope.expireOpen = expireOpen;
        $scope.expireOpened = false;
        // 打开日期控件
        function obtainOpen() {
            $scope.obtainOpened = true;
        }

        function expireOpen() {
            $scope.expireOpened = true;
        }

        //-------------查询回显开始--------------
        var initAssetsInfo = function() {
            HttpService.linkHttp({
                url: 'crm/ecif/cust/perCustAssetsInfo',
                method: 'GET',
                params: {'custNo': custNo, 'seqNo': seqNo}
            }).then(function (response) {
                response.data.assetsTyp = EnumType.AssetsTyp.getEnumByValue(response.data.assetsTyp);
                $scope.custAssets = response.data;
                if(response.data.obtainTime != null) {
                	var v = new Date(response.data.obtainTime);
                    $scope.custAssets.obtainTime = v;
                }
                if(response.data.expireTime != null) {
                	var v = new Date(response.data.expireTime);
                    $scope.custAssets.expireTime = v;
                }
            });
        }

        $scope.reset = function() {
        	initAssetsInfo();
        }
        initAssetsInfo();
        //-------------查询回显结束--------------

        //-------------修改开始--------------
		$scope.uptAssets = function() {
			if ($scope.custAssets == null) {
				Alert.error("资产参数不能为空");
				return;
			}
			if ($scope.custAssets.custNo == null || $scope.custAssets.custNo == '') {
				Alert.error("客户号不能为空");
				return;
			}
			if ($scope.custAssets.assetsNam == null || $scope.custAssets.assetsNam == '') {
				Alert.error("资产名称不能为空");
				return;
			}
			if ($scope.custAssets.assetsTyp == null || $scope.custAssets.assetsTyp == '') {
				Alert.error("资产类型不能为空");
				return;
			}
			if ($scope.custAssets.storedAmt == null || $scope.custAssets.storedAmt == '') {
				Alert.error("储值额度不能为空");
				return;
			}
			if ($scope.custAssets.obtainTime == null || $scope.custAssets.obtainTime == '') {
				Alert.error("获取日期不能为空");
				return;
			}
			if ($scope.custAssets.principal == null || $scope.custAssets.principal == '') {
				Alert.error("负责人不能为空");
				return;
			}
			var assetsObj = angular.copy($scope.custAssets);
			assetsObj.assetsTyp = $scope.custAssets.assetsTyp.value;
			var obtainTime = new Date($scope.custAssets.obtainTime);
			assetsObj.obtainTime = $filter('date')(obtainTime, 'yyyy-MM-dd'); 
			if ($scope.custAssets.expireTime != undefined) {
				 var expireTime = new Date($scope.custAssets.expireTime);
				 assetsObj.expireTime = $filter('date')(expireTime, 'yyyy-MM-dd'); 
			}

			console.log(assetsObj);
            HttpService.linkHttp({
                url: 'crm/ecif/cust/uptPerCustAssets',
                method: 'PUT',
                params: assetsObj
            }).then(function (response) {
                $uibModalInstance.close();
            });
		}
        //-------------修改结束--------------
    }
})();
