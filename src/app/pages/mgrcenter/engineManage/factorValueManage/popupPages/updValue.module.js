(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.engineManage.factorValueManage.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('factorValueManage.popupPages', {
          url: '/updValue',
          templateUrl: 'app/pages/mgrcenter/engineManage/factorValueManage/popupPages/updValue.html',
          title: '因子赋值类型修改',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
