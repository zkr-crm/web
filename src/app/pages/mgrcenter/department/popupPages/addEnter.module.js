(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.department.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('department.popupPages', {
          url: '/addEnter',
          templateUrl: 'app/pages/mgrcenter/department/popupPages/addEnter.html',
          title: '新增机构',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
