(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.log.loginLogSearch', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mgrcenter.log.loginLogSearch', {
          url: '/loginLogSearch',
          templateUrl: 'app/pages/mgrcenter/log/loginLogSearch/loginLogSearch.html',
          title: '登录日志',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
