(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.ruleManage.integralRuleManage', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mgrcenter.ruleManage.integralRuleManage', {
          url: '/integralRuleManage',
          templateUrl: 'app/pages/mgrcenter/ruleManage/integralRuleManage/integralRule.html',
          title: '积分规则设置',
          sidebarMeta: {
            order: 4,
          },
        });
  }
})();
