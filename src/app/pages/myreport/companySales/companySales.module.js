(function () {
  'use strict';

  angular.module('BlurAdmin.pages.myreport.companySales', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('myreport.companySales', {
          url: '/companySales',
          templateUrl: 'app/pages/myreport/companySales/companySales.html',
          title: '公司销售业绩统计',
          sidebarMeta: {
            order: 4,
          },
        });
  }
})();
