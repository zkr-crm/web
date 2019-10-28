(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.engineManage.factorManage.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('factorManage.popupPages', {
          url: '/updFactor',
          templateUrl: 'app/pages/mgrcenter/engineManage/factorManage/popupPages/updFactor.html',
          title: '因子修改',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
