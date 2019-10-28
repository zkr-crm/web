(function () {
  'use strict';

  angular.module('BlurAdmin.pages.demos.treeDemo', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('demos.treeDemo', {
          url: '/treeDemo',
          templateUrl: 'app/pages/demos/treeDemo/treeDemo.html',
          title: '树',
          sidebarMeta: {
            order: 4,
          },
        });
  }
})();
