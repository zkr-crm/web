(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.department.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('department.popupPages', {
          url: '/setPosi',
          templateUrl: 'app/pages/mgrcenter/department/setPosi.html',
          title: '设置岗位',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
