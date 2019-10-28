(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.msgManage.jobMsgRelaManage.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('jobMsgRelaManage.popupPages', {
          url: '/updRela',
          templateUrl: 'app/pages/mgrcenter/msgManage/jobMsgRelaManage/popupPages/updRela.html',
          title: '调度作业短信修改',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
