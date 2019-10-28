(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.engineManage.factorTypeManage.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('factorTypeManage.popupPages', {
          url: '/addOper',
          templateUrl: 'app/pages/mgrcenter/engineManage/factorTypeManage/popupPages/addOper.html',
          title: '因子操作类型新增',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
