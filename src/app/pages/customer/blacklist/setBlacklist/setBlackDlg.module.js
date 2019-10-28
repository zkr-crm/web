(function () {
  'use strict';

  angular.module('BlurAdmin.pages.interactmarket.blacklist.setBlacklist', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('customer.blacklist.setBlacklist', {
          url: '/setBlacklist',
          templateUrl: 'app/pages/customer/blacklist/setBlacklist/setBlacklistDlg.html',
          title: '撤销黑名单',
          sidebarMeta: {
            order: 4,
          },
        });
  }
})();
