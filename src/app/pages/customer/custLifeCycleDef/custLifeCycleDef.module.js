(function () {
  'use strict';

  angular.module('BlurAdmin.pages.customer.custLifeCycleDef', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('customer.custLifeCycleDef', {
          url: '/custLifeCycleDef',
          templateUrl: 'app/pages/customer/custLifeCycleDef/custLifeCycleDef.html',
          title: '客户生命周期定义',
          sidebarMeta: {
            order: 5,
          },
        });
  }
})();
