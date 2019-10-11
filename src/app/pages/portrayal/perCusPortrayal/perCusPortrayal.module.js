(function () {
  'use strict';

  angular.module('BlurAdmin.pages.portrayal.perCusPortrayal',['pdf'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('portrayal.perCusPortrayal', {
          url: '/perCusPortrayal',
          params:{'custNo':null},
          templateUrl: 'app/pages/portrayal/perCusPortrayal/perCusPortrayal.html',
          title: '个人客户画像',
          /*sidebarMeta: {
            order: 1,
          },*/
        });
  }
})();
