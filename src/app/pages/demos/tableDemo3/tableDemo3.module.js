(function () {
  'use strict';

  angular.module('BlurAdmin.pages.demos.tableDemo3', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('demos.tableDemo3', {
          url: '/tableDemo3',
          templateUrl: 'app/pages/demos/tableDemo3/tableDemo3.html',
          title: '表格3',
          sidebarMeta: {
            order: 3,
          },
        });
  }
})();
