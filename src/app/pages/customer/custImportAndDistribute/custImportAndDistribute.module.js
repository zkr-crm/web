(function () {
  'use strict';

  angular.module('BlurAdmin.pages.customer.custImportAndDistribute', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('customer.custImportAndDistribute', {
          url: '/custImportAndDistribute',
          templateUrl: 'app/pages/customer/custImportAndDistribute/custImportAndDistribute.html',
          title: '客户分配',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
