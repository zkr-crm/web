(function () {
  'use strict';

  angular.module('BlurAdmin.pages.demos.tableDemo4', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('demos.tableDemo4', {
          url: '/tableDemo4',
          templateUrl: 'app/pages/demos/tableDemo4/tableDemo4.html',
          title: '表格4',
          sidebarMeta: {
            order: 4,
          },
        });
  }
})();
