(function () {
  'use strict';

  angular.module('BlurAdmin.pages.analysis.custtruth', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('analysis.custtruth', {
          url: '/custtruth',
          templateUrl: 'app/pages/analysis/custtruth/custtruth.html',
          title: '客户真实性',
          sidebarMeta: {
            order: 4,
          },
        });
  }
})();
