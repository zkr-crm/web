(function () {
  'use strict';

  angular.module('BlurAdmin.pages.product.uploadProduct', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('product.uploadProduct', {
          url: '/uploadProduct',
          templateUrl: 'app/pages/product/uploadProduct/uploadProduct.html',
          title: '产品导入',
          sidebarMeta: {
            order: 1,
          },
        });
  }
})();
