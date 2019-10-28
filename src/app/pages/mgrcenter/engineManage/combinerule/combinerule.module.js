(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.engineManage.combinerule', ['mgrcenter.engineManage.combinerule.add','mgrcenter.engineManage.combinerule.modify','mgrcenter.engineManage.combinerule.view'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mgrcenter.engineManage.combinerule', {
          url: '/combinerule',
          templateUrl: 'app/pages/mgrcenter/engineManage/combinerule/combinerule.html',
          title: '组合规则配置',
          sidebarMeta: {
            order: 89,
          },
        });
  }
})();
