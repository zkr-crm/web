(function () {
  'use strict';

  angular.module('BlurAdmin.pages.interactmarket.tagMgr.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('tagMgr.popupPages', {
          url: '/updTag',
          templateUrl: 'app/pages/mgrcenter/tagmgr/popupPages/updTag.html',
          title: '标签修改',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
