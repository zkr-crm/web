(function () {
  'use strict';

  angular.module('BlurAdmin.pages.busiopp.traceBusiOppList', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('busiopp.traceBusiOppList', {
          url: '/traceBusiOppList',
          templateUrl: 'app/pages/busiopp/tracebusiopp/traceBusiOppList.html',
          title: '商机跟踪',
          sidebarMeta: {
            order: 1,
          },
        });
  }

})();
