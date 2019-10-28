(function () {
  'use strict';

  angular.module('BlurAdmin.pages.cusService.custConsult.consultProcess', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('cusService.custConsult.consultProcess', {
          url: '/consultProcess',
          templateUrl: 'app/pages/cusService/custConsult/consultProcess/consultProcess.html',
          title: '咨询处理',
          sidebarMeta: {
            order: 2,
          },
        });
  }
})();
