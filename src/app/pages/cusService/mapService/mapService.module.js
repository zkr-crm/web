(function () {
  'use strict';

  angular.module('BlurAdmin.pages.cusService.mapService', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('cusService.mapService', {
          url: '/mapService',
          templateUrl: 'app/pages/cusService/mapService/mapService.html',
          title: '地图服务',
          sidebarMeta: {
            order: 7,
          },
        });
  }
})();
