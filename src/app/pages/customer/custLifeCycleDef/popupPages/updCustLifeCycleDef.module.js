(function () {
  'use strict';

  angular.module('BlurAdmin.pages.customer.custLifeCycleDef.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('custLifeCycleDef.popupPages', {
          url: '/updPages',
          templateUrl: 'app/pages/customer/custLifeCycleDef/popupPages/updCustLifeCycleDef.html',
          title: '修改客户生命周期定义',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
