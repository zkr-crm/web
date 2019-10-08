(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.engineManage.typeManage.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('typeManage.popupPages', {
          url: '/updType',
          templateUrl: 'app/pages/mgrcenter/engineManage/typeManage/popupPages/updType.html',
          title: '因子类型修改',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
