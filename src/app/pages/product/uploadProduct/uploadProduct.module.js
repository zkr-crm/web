(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.product.uploadProduct', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mgrcenter.product.uploadProduct', {
          url: '/uploadProduct',
          templateUrl: 'app/pages/product/uploadProduct/uploadProduct.html',
          title: '产品导入',
          sidebarMeta: {
            order: 1,
          },
        });
  }
})();
