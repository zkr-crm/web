(function () {
  'use strict';

  angular.module('BlurAdmin.pages.taskService.allTask', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('taskService.allTask', {
          url: '/allTask',
          templateUrl: 'app/pages/taskService/allTask/allTask.html',
          title: '全部任务',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
