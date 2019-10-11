(function () {
  'use strict';

  angular.module('BlurAdmin.pages.report', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('report', {
          url: '/report',
          templateUrl: 'app/pages/report/report.html',
          title: '数据报表',
          sidebarMeta: {
            icon: 'ion-pie-graph',
            order: 5,
          },
        });
  }

})();
