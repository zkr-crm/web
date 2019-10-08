(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.engineManage.factorValueManage', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mgrcenter.engineManage.factorValueManage', {
          url: '/factorValueManage',
          templateUrl: 'app/pages/mgrcenter/engineManage/factorValueManage/factorValueManage.html',
          title: '因子数据类型管理',
          sidebarMeta: {
            order: 2,
          },
        });
  }
})();
