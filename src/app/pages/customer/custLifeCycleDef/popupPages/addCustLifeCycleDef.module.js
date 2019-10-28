(function () {
  'use strict';

  angular.module('BlurAdmin.pages.customer.custLifeCycleDef.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('custLifeCycleDef.popupPages', {
          url: '/popupPages',
          templateUrl: 'app/pages/customer/custLifeCycleDef/popupPages/addCustLifeCycleDef.html',
          title: '新增客户生命周期定义',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
