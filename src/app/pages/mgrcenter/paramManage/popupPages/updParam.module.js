(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.usermanagement.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('usermanagement.popupPages', {
          url: '/updParam',
          templateUrl: 'app/pages/mgrcenter/paramManage/popupPages/updParam.html',
          title: '新增参数',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
