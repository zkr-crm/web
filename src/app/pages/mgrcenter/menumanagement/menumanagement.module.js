(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.menumanagement', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mgrcenter.menumanagement', {
          url: '/menumanagement',
          templateUrl: 'app/pages/mgrcenter/menumanagement/menumanagement.html',
          title: '菜单管理',
          sidebarMeta: {
            order: 2,
          },
        });
  }
})();
