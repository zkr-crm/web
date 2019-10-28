(function () {
  'use strict';

  angular.module('BlurAdmin.pages.customer.custRelMnt', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('customer.custRelMnt', {
          url: '/custRelMnt',
          templateUrl: 'app/pages/customer/custRelMnt/custRelMnt.html',
          title: '客户关系维护',
          sidebarMeta: {
            order: 2,
          },
        });
  }
})();
