(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.engineManage.factorValueListManage.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('factorValueListManage.popupPages', {
          url: '/updParam',
          templateUrl: 'app/pages/mgrcenter/engineManage/factorValueListManage/popupPages/updParam.html',
          title: '因子参数修改',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
