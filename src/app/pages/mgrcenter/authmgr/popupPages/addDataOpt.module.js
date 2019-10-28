(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mgrcenter.addAuthMgr', {
          url: '/addDataOpt',
          templateUrl: 'app/pages/mgrcenter/authmgr/popupPages/addDataOpt.html',
          title: '编辑权限'
        });
  }
})();
