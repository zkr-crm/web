(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.usermanagement.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('usermanagement.popupPages', {
          url: '/roleAuth',
          templateUrl: 'app/pages/mgrcenter/usermanagement/popupPages/roleAuth.html',
          title: '角色授权',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
