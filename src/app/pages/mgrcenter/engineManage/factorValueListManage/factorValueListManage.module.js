(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.engineManage.factorValueListManage', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mgrcenter.engineManage.factorValueListManage', {
          url: '/factorValueListManage',
          params:{'paramName':null},
          templateUrl: 'app/pages/mgrcenter/engineManage/factorValueListManage/factorValueListManage.html',
          title: '因子参数管理',
          sidebarMeta: {
            order: 3,
          },
        });
  }
})();
