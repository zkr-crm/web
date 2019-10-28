(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.msgManage.msgSendDef', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mgrcenter.msgManage.msgSendDef', {
          url: '/msgSendDef',
          templateUrl: 'app/pages/mgrcenter/msgManage/msgSendDef/msgSendDef.html',
          title: '信息发送配置',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
