(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.usermanagement', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mgrcenter.usermanagement', {
          url: '/usermanagement',
          templateUrl: 'app/pages/mgrcenter/usermanagement/usermanagement.html',
          title: '用户管理',
          sidebarMeta: {
            order: 1,
          },
        });
  }
})();
