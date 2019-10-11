(function () {
  'use strict';

  angular.module('BlurAdmin.pages.cusService.incServPush', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('cusService.incServPush', {
          url: '/incServPush',
          templateUrl: 'app/pages/cusService/incServPush/incServPush.html',
          title: '增值服务推送',
          sidebarMeta: {
            order: 1,
          },
        });
  }
})();
