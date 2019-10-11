(function () {
  'use strict';

  angular.module('BlurAdmin.pages.customer.custIntegral', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('customer.custIntegral', {
          url: '/custIntegral',
          templateUrl: 'app/pages/customer/custIntegral/custIntegral.html',
          title: '客户积分查询',
          sidebarMeta: {
            order: 3,
          },
        });
  }
})();
