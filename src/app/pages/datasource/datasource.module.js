(function () {
  'use strict';

  angular.module('BlurAdmin.pages.datasource', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('datasource', {
          url: '/datasource',
          templateUrl: 'app/pages/datasource/datasource.html',
          title: '数据源管理',
          sidebarMeta: {
            icon: 'ion-archive',
            order: 2,
          },
        });
  }
})();
