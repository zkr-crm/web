(function () {
  'use strict';

  angular.module('BlurAdmin.pages.demos.tabDemo', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('demos.tabDemo', {
          url: '/tabDemo',
          templateUrl: 'app/pages/demos/tabDemo/tabDemo.html',
          title: '页签示例',
          sidebarMeta: {
            order: 3,
          },
        });
  }
})();
