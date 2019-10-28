(function () {
  'use strict';

  angular.module('BlurAdmin.pages.cusService.custComplt.compltProcess', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('cusService.custComplt.compltProcess', {
          url: '/compltProcess',
          templateUrl: 'app/pages/cusService/custComplt/compltProcess/compltProcess.html',
          title: '投诉处理',
          sidebarMeta: {
            order: 2,
          },
        })
  }
})();
