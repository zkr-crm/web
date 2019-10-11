(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.engineManage.baserule', ['mgrcenter.engineManage.baserule.add','mgrcenter.engineManage.baserule.modify','mgrcenter.engineManage.baserule.view'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mgrcenter.engineManage.baserule', {
          url: '/baserule',
          templateUrl: 'app/pages/mgrcenter/engineManage/baserule/baserule.html',
          title: '基本规则配置',
          sidebarMeta: {
            order: 88,
          },
        });
  }
})();
