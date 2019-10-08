(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.tagMgr.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('tagMgr.popupPages', {
          url: '/addTag',
          templateUrl: 'app/pages/mgrcenter/tagmgr/popupPages/addTag.html',
          title: '标签新增',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
