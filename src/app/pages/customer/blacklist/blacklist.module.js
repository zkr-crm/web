(function () {
  'use strict';

  angular.module('BlurAdmin.pages.interactmarket.blacklist', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('blacklist', {
          url: '/blacklist',
          templateUrl: 'app/pages/customer/blacklist/blacklist.html',
          title: '黑名单管理',
          sidebarMeta: {
            order: 4,
          },
        });
  }
})();
