(function () {
  'use strict';

  angular.module('BlurAdmin.pages.demos.second.third', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('demos.second.third', {
          url: '/third',
          templateUrl: 'app/pages/demos/second/third/third.html',
          title: '三层',
          sidebarMeta: {
            order: 1,
          },
        });
  }
})();
