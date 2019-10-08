(function () {
    'use strict';

    angular.module('BlurAdmin.pages.product').controller('qryProductCtrl', qryProductCtrl);

    /** @ngInject */
    function qryProductCtrl($scope, $uibModal, $filter, $timeout, $http,
                            HttpService, EnumType, Alert) {
        $scope.RowCollection = [];
        // html查询条件对象
        $scope.searchConditions = {};

        $scope.ShowProductTyp = function (item) {
            var typeLabel = "";
            angular.forEach(EnumType.productTyp, function (i) {
                if (item.productTyp == i.value) {
                    typeLabel = i.label;
                }
            });
            return typeLabel;
        };
        $scope.ShowSaleChnl = function (item) {
            var typeLabel = "";
            angular.forEach(EnumType.saleChnl, function (i) {
                if (item.saleChnl == i.value) {
                    typeLabel = i.label;
                }
            });
            return typeLabel;
        };
        $scope.search = function (page) {
            //$scope.queryProductOptions.params = $scope.searchProduct;
            // page=page||1;
            this.queryPage(page);
        }
        $scope.pagination = {
            pageSize: '10',
            pageIndex: 1,
            maxText: 5
        }
        $scope.queryProductOptions = $scope.pagination;
        $scope.queryProductOptions.url = 'crm/ecif/productmng/productByEntity';
        $scope.queryProductOptions.method = 'GET';
        $scope.queryProductOptions.params = $scope.searchConditions;
        $scope.queryProductOptions.success = function successCallback(response) {
            $scope.RowCollection = response.data.list;
        };

    }
})();
