(function () {
  'use strict';

  angular.module('BlurAdmin.pages.analysis.custloyalty', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('analysis.custloyalty', {
          url: '/custloyalty',
          templateUrl: 'app/pages/analysis/custloyalty/custloyalty.html',
          title: '客户忠诚度',
          sidebarMeta: {
            order: 2,
          },
        });
  }
})();
