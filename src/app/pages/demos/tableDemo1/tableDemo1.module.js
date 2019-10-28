(function () {
  'use strict';

  angular.module('BlurAdmin.pages.demos.tableDemo1', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('demos.tableDemo1', {
          url: '/tableDemo1',
          templateUrl: 'app/pages/demos/tableDemo1/tableDemo1.html',
          title: '表格1（废弃）',
          sidebarMeta: {
            order: 1,
          },
        });
  }
})();
