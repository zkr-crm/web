(function () {
  'use strict';

  angular.module('BlurAdmin.pages.myreport.saleSuccessRate', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('myreport.saleSuccessRate', {
          url: '/saleSuccessRate',
          templateUrl: 'app/pages/myreport/saleSuccessRate/saleSuccessRate.html',
          title: '销售成功率统计',
          sidebarMeta: {
            order: 4,
          },
        });
  }
})();
