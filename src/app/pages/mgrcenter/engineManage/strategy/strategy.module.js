(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.engineManage.strategy', ['mgrcenter.engineManage.strategy.add','mgrcenter.engineManage.strategy.modify','mgrcenter.engineManage.strategy.view'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mgrcenter.engineManage.strategy', {
          url: '/strategy',
          templateUrl: 'app/pages/mgrcenter/engineManage/strategy/strategy.html',
          title: '规则模型配置',
          sidebarMeta: {
            order: 90,
          },
        });
  }
})();
