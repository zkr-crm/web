
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.customer.custContract',[])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('customer.custContract', {
          url: '/custContract',
          templateUrl: 'app/pages/customer/custContract/custContract.html',
          title: '联系人管理',
          sidebarMeta: {
            order: 6,
          },
        });
  }
})();
