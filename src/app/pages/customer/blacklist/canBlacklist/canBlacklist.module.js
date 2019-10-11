(function () {
  'use strict';

  angular.module('BlurAdmin.pages.customer.blacklist.setBlacklist', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('customer.blacklist.setBlacklist', {
          url: '/setBlackDlg',
          templateUrl: 'app/pages/customer/blacklist/setBlacklist/setBlackDlg.html',
          title: '撤销黑名单',
          sidebarMeta: {
            order: 4,
          },
        });
  }
})();
