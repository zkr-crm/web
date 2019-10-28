(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.msgManage.jobMsgRelaManage.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('jobMsgRelaManage.popupPages', {
          url: '/addRela',
          templateUrl: 'app/pages/mgrcenter/msgManage/jobMsgRelaManage/popupPages/addRela.html',
          title: '调度作业短信新增',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
