(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.msgManage.msgSendAdd', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('msgManage.msgSendAdd', {
          url: '/msgSendUpd',
          templateUrl: 'app/pages/mgrcenter/msgManage/msgSendAdd/msgSendupd.html',
          title: '修改信息发送定义',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
