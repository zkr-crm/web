(function () {
  'use strict';

  angular.module('BlurAdmin.pages.portrayal.potentialEnterprisePortrayal', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('portrayal.potentialEnterprisePortrayal', {
          url: '/potentialEnterprisePortrayal',
          templateUrl: 'app/pages/portrayal/potentialEnterprisePortrayal/potentialEnterprisePortrayal.html',
          title: '潜在企业客户画像',
          sidebarMeta: {
            order: 4,
          },
        });
  }
})();
