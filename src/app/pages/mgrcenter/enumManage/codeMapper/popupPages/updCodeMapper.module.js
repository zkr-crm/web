(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.enumManage.codeMapper.popPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('enumManage.codeMapper.popPages', {
          url: '/updPages',
          templateUrl: 'app/pages/mgrcenter/enumManage/codeMapper/popupPages/updCodeMapper.html',
          title: '修改码值映射参数',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
