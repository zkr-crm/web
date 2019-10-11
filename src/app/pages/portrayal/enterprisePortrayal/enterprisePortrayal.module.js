(function () {
  'use strict';

  angular.module('BlurAdmin.pages.portrayal.enterprisePortrayal', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('portrayal.enterprisePortrayal', {
          url: '/enterprisePortrayal',
          templateUrl: 'app/pages/portrayal/enterprisePortrayal/enterprisePortrayal.html',
          title: '企业客户画像',
          sidebarMeta: {
            order: 2,
          },
        });
  }
})();
