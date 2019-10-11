(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.msgManage.jobMsgRelaManage', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mgrcenter.msgManage.jobMsgRelaManage', {
          url: '/jobMsgRelaManage',
          templateUrl: 'app/pages/mgrcenter/msgManage/jobMsgRelaManage/jobMsgRelaManage.html',
          title: '调度作业短信管理',
          sidebarMeta: {
            order: 1,
          },
        });
  }
})();
