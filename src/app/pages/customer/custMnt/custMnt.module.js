(function () {
  'use strict';

  angular.module('BlurAdmin.pages.customer.custMnt', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('customer.custMnt', {
          url: '/custMnt',
          templateUrl: 'app/pages/customer/custMnt/custMnt.html',
          title: '客户维护',
          sidebarMeta: {
            order: 1,
          },
        });
  }
})();
