(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.engineManage.factorManage', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mgrcenter.engineManage.factorManage', {
          url: '/factorManage',
          templateUrl: 'app/pages/mgrcenter/engineManage/factorManage/factorManage.html',
          title: '因子管理',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
