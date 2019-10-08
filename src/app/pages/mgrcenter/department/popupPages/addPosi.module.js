(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.department.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('department.popupPages', {
          url: '/addPosi',
          templateUrl: 'app/pages/mgrcenter/department/popupPages/addPosi.html',
          title: '新增岗位',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
