(function () {
  'use strict';

  angular.module('BlurAdmin.pages.myreport.managerSales', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('myreport.managerSales', {
          url: '/managerSales',
          templateUrl: 'app/pages/myreport/managerSales/managerSales.html',
          title: '客户经理销售业绩统计',
          sidebarMeta: {
            order: 4,
          },
        });
  }
})();
