(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.msgTemplate', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mgrcenter.msgTemplate', {
          url: '/msgTemplate',
          templateUrl: 'app/pages/mgrcenter/msgTemplate/msgTemplate.html',
          title: '模板管理',
          sidebarMeta: {
            order: 6,
          },
        });
  }
})();
