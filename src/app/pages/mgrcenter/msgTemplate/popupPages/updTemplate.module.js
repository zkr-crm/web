(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.msgTemplate.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('msgTemplate.popupPages', {
          url: '/updPages',
          templateUrl: 'app/pages/mgrcenter/msgTemplate/popupPages/updTemplate.html',
          title: '修改消息模板',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
