(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.engineManage.typeManage', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mgrcenter.engineManage.typeManage', {
          url: '/typeManage',
          templateUrl: 'app/pages/mgrcenter/engineManage/typeManage/typeManage.html',
          title: '因子类型管理',
          sidebarMeta: {
            order: 1,
          },
        });
  }
})();
