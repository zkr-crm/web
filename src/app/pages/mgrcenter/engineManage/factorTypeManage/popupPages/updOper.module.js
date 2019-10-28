(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.engineManage.factorTypeManage.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('factorTypeManage.popupPages', {
          url: '/updOper',
          templateUrl: 'app/pages/mgrcenter/engineManage/factorTypeManage/popupPages/updParam.html',
          title: '因子操作类型修改',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
