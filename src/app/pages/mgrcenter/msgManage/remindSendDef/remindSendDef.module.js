(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.msgManage.remindSendDef', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mgrcenter.msgManage.remindSendDef', {
          url: '/remindSendDef',
          templateUrl: 'app/pages/mgrcenter/msgManage/remindSendDef/remindSendDef.html',
          title: '站内提醒发送配置',
          sidebarMeta: {
            order: 2,
          },
        });
  }
})();
