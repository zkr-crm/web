(function () {
  'use strict';

  angular.module('BlurAdmin.pages.cusService.inteUsePromQuery', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('cusService.inteUsePromQuery', {
          url: '/inteUsePromQuery',
          templateUrl: 'app/pages/cusService/inteUsePromQuery/inteUsePromQuery.html',
          title: '积分使用提示查询',
          sidebarMeta: {
            order: 3,
          },
        });
  }
})();
