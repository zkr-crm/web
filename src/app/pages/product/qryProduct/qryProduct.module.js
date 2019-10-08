(function () {
  'use strict';

  angular.module('BlurAdmin.pages.product.qryProduct', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('product.qryProduct', {
          url: '/qryProduct',
          templateUrl: 'app/pages/product/qryProduct/qryProduct.html',
          title: '产品查询',
          sidebarMeta: {
            order: 2,
          },
        });
  }
})();
