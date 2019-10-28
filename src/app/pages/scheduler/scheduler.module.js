(function () {
  'use strict';

  angular.module('BlurAdmin.pages.scheduler', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('mgrcenter.scheduler', {
          url: '/scheduler',
          templateUrl: 'app/pages/scheduler/scheduler.html',
          title: '调度管理',
          sidebarMeta: {
            icon: 'ion-android-stopwatch',
            order: 99,
          },
        });
  }

})();
