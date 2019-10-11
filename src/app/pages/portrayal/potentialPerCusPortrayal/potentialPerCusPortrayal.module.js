(function () {
  'use strict';

  angular.module('BlurAdmin.pages.portrayal.potentialPerCusPortrayal', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('portrayal.potentialPerCusPortrayal', {
          url: '/potentialPerCusPortrayal',
          templateUrl: 'app/pages/portrayal/potentialPerCusPortrayal/potentialPerCusPortrayal.html',
          title: '潜在个人客户画像',
          sidebarMeta: {
            order: 3,
          },
        });
  }
})();
