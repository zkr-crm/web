(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.engineManage.factorManage.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('factorManage.popupPages', {
          url: '/addFactor',
          templateUrl: 'app/pages/mgrcenter/engineManage/factorManage/popupPages/addFactor.html',
          title: '因子新增',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
