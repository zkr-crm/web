(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.msgManage.msgSendQuery', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mgrcenter.msgManage.msgSendQuery', {
          url: '/msgSendQuery',
          templateUrl: 'app/pages/mgrcenter/msgManage/msgSendQuery/msgSendQuery.html',
          title: '信息发送查询',
          sidebarMeta: {
            order: 4,
          },
        });
  }
})();
