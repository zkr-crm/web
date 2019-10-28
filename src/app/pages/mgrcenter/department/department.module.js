(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.department', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mgrcenter.department', {
          url: '/department',
          templateUrl: 'app/pages/mgrcenter/department/department.html',
          title: '机构部门',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
