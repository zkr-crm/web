(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.msgManage.msgSendAdd', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('msgManage.msgSendAdd', {
          url: '/msgSendAdd',
          templateUrl: 'app/pages/mgrcenter/msgManage/msgSendAdd/msgSendAdd.html',
          title: '新增用户',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
