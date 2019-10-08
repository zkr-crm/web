(function () {
  'use strict';

  angular.module('BlurAdmin.pages.demos.tableDemo2', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('demos.tableDemo2', {
          url: '/tableDemo2',
          templateUrl: 'app/pages/demos/tableDemo2/tableDemo2.html',
          title: '表格2（废弃）',
          sidebarMeta: {
            order: 2,
          },
        });
  }
})();
