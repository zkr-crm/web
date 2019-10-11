(function () {
  'use strict';

  angular.module('BlurAdmin.pages.cusService.custRetVisit.retVisitProcess', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('cusService.custRetVisit.retVisitProcess', {
          url: '/retVisitProcess',
          templateUrl: 'app/pages/cusService/custRetVisit/retVisitProcess/retVisitProcess.html',
          title: '回访处理',
          sidebarMeta: {
            order: 2,
          },
        });
  }
})();
