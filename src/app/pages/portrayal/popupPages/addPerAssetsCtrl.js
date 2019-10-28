(function () {
    'use strict';

    angular.module('BlurAdmin.pages.portrayal.perCusPortrayal')
        .controller('addPerAssetsCtrl', addPerAssetsCtrl);

    /** @ngInject */
    function addPerAssetsCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal) {
    	console.log("custNo=" + $scope.custNo);
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
		//-------------新增开始--------------
		$scope.addAssets = function() {
			
			var assetsObj = angular.copy($scope.custAssets);
			if ($scope.custAssets == null) {
				Alert.error("资产参数不能为空");
				return;
			}
			if ($scope.custNo == null || $scope.custNo == '') {
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
			assetsObj.custNo = $scope.custNo;
			assetsObj.assetsTyp = $scope.custAssets.assetsTyp.value;
			var obtainTime = new Date($scope.custAssets.obtainTime);
			assetsObj.obtainTime = $filter('date')(obtainTime, 'yyyy-MM-dd'); 
			if ($scope.custAssets.expireTime != undefined 
					&& $scope.custAssets.expireTime != null) {
				 var expireTime = new Date($scope.custAssets.expireTime);
				 assetsObj.expireTime = $filter('date')(expireTime, 'yyyy-MM-dd'); 
			}

			console.log(assetsObj);
            HttpService.linkHttp({
                url: 'crm/ecif/cust/addPerCustAssets',
                method: 'PUT',
                params: assetsObj
            }).then(function (response) {
                $uibModalInstance.close();
            });
		}
        //-------------新增结束--------------

    }
})();
