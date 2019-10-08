(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.engineManage.factorValueManage.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('factorValueManage.popupPages', {
          url: '/addValue',
          templateUrl: 'app/pages/mgrcenter/engineManage/factorValueManage/popupPages/addValue.html',
          title: '因子赋值类型新增',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
