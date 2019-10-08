(function () {
  'use strict';

  angular.module('BlurAdmin.pages.demos.tableDemo5', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('demos.tableDemo5', {
          url: '/tableDemo5',
          templateUrl: 'app/pages/demos/tableDemo5/tableDemo5.html',
          title: '表格5',
          sidebarMeta: {
            order: 5,
          },
        });
  }
})();
