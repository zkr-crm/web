(function () {
  'use strict';

  angular.module('BlurAdmin.pages.analysis.custeventsscale', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('analysis.custeventsscale', {
          url: '/custeventsscale',
          templateUrl: 'app/pages/analysis/custeventsscale/custeventsscale.html',
          title: '客户事件占比',
          sidebarMeta: {
            order: 1,
          },
        });
  }
})();
