(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.department.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('department.popupPages', {
          url: '/addDept',
          templateUrl: 'app/pages/mgrcenter/department/popupPages/addDept.html',
          title: '新增部门',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
