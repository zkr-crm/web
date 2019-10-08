(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.paramManage', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mgrcenter.paramManage', {
          url: '/paramManage',
          templateUrl: 'app/pages/mgrcenter/paramManage/paramManage.html',
          title: '参数管理',
          sidebarMeta: {
            order: 9,
          },
        });
  }
})();
