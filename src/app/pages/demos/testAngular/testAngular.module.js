(function () {
  'use strict';

  angular.module('BlurAdmin.pages.demos.testAngular', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('demos.testAngular', {
          url: '/testAngular',
          templateUrl: 'app/pages/demos/testAngular/testAngular.html',
          title: '测试',
          sidebarMeta: {
            order: 99,
          },
        });
  }
})();
