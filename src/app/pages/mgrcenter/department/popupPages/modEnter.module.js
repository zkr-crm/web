(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.department.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('department.popupPages', {
          url: '/modEnter',
          templateUrl: 'app/pages/mgrcenter/department/popupPages/modEnter.html',
          title: '修改机构',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
