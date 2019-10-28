(function () {
  'use strict';

  angular.module('BlurAdmin.pages.interactmarket.tagMgr.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('tagMgr.popupPages', {
          url: '/updType',
          templateUrl: 'app/pages/mgrcenter/tagmgr/popupPages/updType.html',
          title: '标签类别修改',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
