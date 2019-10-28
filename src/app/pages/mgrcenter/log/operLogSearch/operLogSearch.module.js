(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.log.operLogSearch', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mgrcenter.log.operLogSearch', {
          url: '/operLogSearch',
          templateUrl: 'app/pages/mgrcenter/log/operLogSearch/operLogSearch.html',
          title: '操作日志',
          sidebarMeta: {
            order: 1,
          },
        });
  }
})();
