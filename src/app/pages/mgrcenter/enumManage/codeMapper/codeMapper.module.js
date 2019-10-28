(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.enumManage.codeMapper', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mgrcenter.enumManage.codeMapper', {
          url: '/codeMapper',
          templateUrl: 'app/pages/mgrcenter/enumManage/codeMapper/codeMapper.html',
          title: '码值参数设置',
          sidebarMeta: {
            order: 5,
          },
        });
  }
})();
