(function () {
  'use strict';

  angular.module('BlurAdmin.pages.demos.second', ['BlurAdmin.pages.demos.second.third'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('demos.second', {
          url: '/second',
          template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: '二层',
          sidebarMeta: {
            icon: 'ion-compose',
            order: 1,
          },
        });
  }
})();
