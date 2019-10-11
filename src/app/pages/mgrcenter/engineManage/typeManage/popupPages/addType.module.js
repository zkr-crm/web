(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.engineManage.typeManage.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('typeManage.popupPages', {
          url: '/addType',
          templateUrl: 'app/pages/mgrcenter/engineManage/typeManage/popupPages/addType.html',
          title: '因子类型新增',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
