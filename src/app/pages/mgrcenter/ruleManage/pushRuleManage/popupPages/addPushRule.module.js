(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.ruleManage.pushRuleManage.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mgrcenter.ruleManage.pushRuleManage.popupPages', {
          url: '/popupPages',
          templateUrl: 'app/pages/mgrcenter/ruleManage/pushRuleManage/popupPages/addPushRule.html',
          title: '新增推送规则',
          sidebarMeta: {
            order: 4,
          },
        });
  }
})();
