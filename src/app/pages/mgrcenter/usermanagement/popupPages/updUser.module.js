(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.usermanagement.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('usermanagement.popupPages', {
          url: '/updUser',
          templateUrl: 'app/pages/mgrcenter/usermanagement/popupPages/updUser.html',
          title: '新增用户',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
