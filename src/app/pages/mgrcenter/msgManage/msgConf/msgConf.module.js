(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.msgManage.msgConf', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mgrcenter.msgManage.msgConf', {
          url: '/msgConf',
          templateUrl: 'app/pages/mgrcenter/msgManage/msgConf/msgConf.html',
          title: '短信调度配置',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
