(function () {
  'use strict';

  angular.module('BlurAdmin.pages.customer.leaveoffice', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('customer.custLeaveOffice', {
          url: '/custLeaveOffice',
          templateUrl: 'app/pages/customer/leaveoffice/leaveoffice.html',
          title: '离职业务衔接提示',
          sidebarMeta: {
            order: 4,
          },
        });
  }
})();
