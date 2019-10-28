(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.department.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('department.popupPages', {
          url: '/modDept',
          templateUrl: 'app/pages/mgrcenter/department/popupPages/modDept.html',
          title: '修改部门',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
