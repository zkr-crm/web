(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.department.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('department.popupPages', {
          url: '/modPosi',
          templateUrl: 'app/pages/mgrcenter/department/popupPages/modPosi.html',
          title: '修改岗位',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
