(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.paramManage.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('paramManage.popupPages', {
          url: '/addParam',
          templateUrl: 'app/pages/mgrcenter/paramManage/popupPages/addParam.html',
          title: '新增参数',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
