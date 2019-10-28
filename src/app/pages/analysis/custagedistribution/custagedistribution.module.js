(function () {
  'use strict';

  angular.module('BlurAdmin.pages.analysis.custagedistribution', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('analysis.custagedistribution', {
          url: '/custagedistribution',
          templateUrl: 'app/pages/analysis/custagedistribution/custagedistribution.html',
          title: '客户年龄分布',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
