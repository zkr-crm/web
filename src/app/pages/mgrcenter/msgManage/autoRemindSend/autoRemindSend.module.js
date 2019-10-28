(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.msgManage.autoRemindSend', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mgrcenter.msgManage.autoRemindSend', {
          url: '/autoRemindSend',
          templateUrl: 'app/pages/mgrcenter/msgManage/autoRemindSend/autoRemindSend.html',
          title: '站内提醒配置',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
