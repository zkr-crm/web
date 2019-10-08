(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.msgTemplate.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('msgTemplate.popupPages', {
          url: '/popupPages',
          templateUrl: 'app/pages/mgrcenter/msgTemplate/popupPages/addTemplate.html',
          title: '新增消息模板',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
