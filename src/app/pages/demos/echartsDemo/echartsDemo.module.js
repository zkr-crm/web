(function () {
  'use strict';

  angular.module('BlurAdmin.pages.demos.echartsDemo', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('demos.echartsDemo', {
          url: '/echartsDemo',
          templateUrl: 'app/pages/demos/echartsDemo/echartsDemo.html',
          title: '力导向图',
          sidebarMeta: {
            order: 15,
          },
        });
  }
})();
