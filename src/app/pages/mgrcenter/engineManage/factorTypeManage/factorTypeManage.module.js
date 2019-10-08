(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.engineManage.factorTypeManage', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mgrcenter.engineManage.factorTypeManage', {
          url: '/factorTypeManage',
          templateUrl: 'app/pages/mgrcenter/engineManage/factorTypeManage/factorTypeManage.html',
          title: '因子操作类型管理',
          sidebarMeta: {
            order: 1,
          },
        });
  }
})();
