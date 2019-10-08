(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.ruleManage.curPropUpdManage', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mgrcenter.ruleManage.curPropUpdManage', {
          url: '/curPropUpdManage',
          templateUrl: 'app/pages/mgrcenter/ruleManage/curPropUpdManage/curPropUpdRule.html',
          title: '客户属性更新规则设置',
          sidebarMeta: {
            order: 4,
          },
        });
  }
})();
