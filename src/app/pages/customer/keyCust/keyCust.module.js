(function () {
  'use strict';

  angular.module('BlurAdmin.pages.customer.keyCust', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('customer.keyCust', {
          url: '/keyCust',
          templateUrl: 'app/pages/customer/keyCust/keyCust.html',
          title: '重点客户管理',
          sidebarMeta: {
            order: 3,
          },
        });
  }
})();
