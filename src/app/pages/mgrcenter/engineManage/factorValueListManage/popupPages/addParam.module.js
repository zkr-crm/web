(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.engineManage.factorValueListManage.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('factorValueListManage.popupPages', {
          url: '/addParam',
          templateUrl: 'app/pages/mgrcenter/engineManage/factorValueListManage/popupPages/addParam.html',
          title: '因子参数新增',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
