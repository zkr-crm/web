(function () {
  'use strict';

  angular.module('BlurAdmin.pages.demos.modifyDemo', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('demos.modifyDemo', {
          url: '/modifyDemo',
          templateUrl: 'app/pages/demos/modifyDemo/modifyDemo.html',
          title: '信息维护',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
