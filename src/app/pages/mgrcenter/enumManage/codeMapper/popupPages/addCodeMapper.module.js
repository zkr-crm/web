(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.enumManage.codeMapper.popPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('enumManage.codeMapper.popPages', {
          url: '/popupPages',
          templateUrl: 'app/pages/mgrcenter/enumManage/codeMapper/popupPages/addCodeMapper.html',
          title: '新增码值映射参数',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
