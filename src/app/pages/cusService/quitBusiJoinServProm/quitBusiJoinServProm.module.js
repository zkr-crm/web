(function () {
  'use strict';

  angular.module('BlurAdmin.pages.cusService.quitBusiJoinServProm', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('cusService.quitBusiJoinServProm', {
          url: '/quitBusiJoinServProm',
          templateUrl: 'app/pages/cusService/quitBusiJoinServProm/quitBusiJoinServProm.html',
          title: '离职业务衔接服务提示',
          sidebarMeta: {
            order: 2,
          },
        });
  }
})();
