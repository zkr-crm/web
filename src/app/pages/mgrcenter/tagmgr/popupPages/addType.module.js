(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.tagMgr.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('tagMgr.popupPages', {
          url: '/addType',
          templateUrl: 'app/pages/mgrcenter/tagmgr/popupPages/addType.html',
          title: '标签类别新增',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
