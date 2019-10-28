(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.msgManage1', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mgrcenter.msgManage1', {
          url: '/selMsgTemplate',
          templateUrl: 'app/pages/mgrcenter/msgManage/msgSendAdd/selMsgTemplate.html',
          title: '模板管理',
          sidebarMeta: {
            order: 4,
          },
        });
  }
})();
