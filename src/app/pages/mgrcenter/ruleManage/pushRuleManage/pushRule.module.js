(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.ruleManage.pushRuleManage', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mgrcenter.ruleManage.pushRuleManage', {
          url: '/pushRuleManage',
          templateUrl: 'app/pages/mgrcenter/ruleManage/pushRuleManage/pushRule.html',
          title: '推送规则设置',
          sidebarMeta: {
            order: 4,
          },
        });
  }
})();
