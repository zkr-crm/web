(function () {
  'use strict';

  angular.module('BlurAdmin.pages.taskService.myTask', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('taskService.myTask', {
          url: '/myTask',
          templateUrl: 'app/pages/taskService/myTask/myTask.html',
          title: '我的任务',
          sidebarMeta: {
            order: 1,
          },
        });
  }
})();
