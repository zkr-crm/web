(function() {
				'use strict';
	angular.module('BlurAdmin.pages.mgrcenter.product').controller('selectProductDlgCtrl', selectProductDlgCtrl);
	/** @ngInject */
	function selectProductDlgCtrl($scope, $uibModal, $filter, $timeout, $http, HttpService, EnumType, Alert, $uibModalInstance) {
		$scope.RowCollection = [];
		// html查询条件对象
		$scope.searchProduct = {};
		
		$scope.ShowProductTyp = function(item) {
			var typeLabel="";
			angular.forEach(EnumType.productTyp, function(i) {
				if (item.productTyp == i.value) {
					typeLabel=i.label;
				}
			});
			return typeLabel;
		};
		$scope.ShowSaleChnl = function(item) {
			var typeLabel="";
			angular.forEach(EnumType.saleChnl, function(i) {
				if (item.saleChnl == i.value) {
					typeLabel=i.label;
				}
			});
			return typeLabel;
		};
        $scope.radioRptOptions = {};
        $scope.radioRptOptions.select="";
        // 单个选中
        $scope.selectRptOne = function(i) {
            angular.forEach($scope.busiOppList, function(i) {
                if($scope.radioRptOptions.select == i.productCd){
                    $scope.checkedRow = i;
                    return ;
                }
            });
        }
        $scope.selectRptRow = function(item) {
            $scope.radioRptOptions.select = item.productCd;
            $scope.checkedRow = item;

        }

		// 确定按钮事件
		$scope.doConfirm = function() {
		    if ($scope.checkedRow.select == '') {
		        Alert.error('请选择联系人！');
		        return;
		    }
		    $uibModalInstance.close($scope.checkedRow);
		}
		$scope.searchProduct = function() {
		    $scope.queryProductOptions.url = 'crm/ecif/productmng/productByEntity';
		    $scope.queryProductOptions.method = 'GET';
		    $scope.queryProductOptions.params = $scope.searchProduct;
			this.queryPage(1);
		}
		
	      $scope.queryProductOptions = {};
	      $scope.queryProductOptions.url = 'crm/ecif/productmng/productByEntity';
	      $scope.queryProductOptions.method = 'GET';
	      $scope.queryProductOptions.params = $scope.searchProduct;
	      $scope.queryProductOptions.success = function successCallback(response) {
	      $scope.RowCollection = response.data;
	      };

	}
})();
