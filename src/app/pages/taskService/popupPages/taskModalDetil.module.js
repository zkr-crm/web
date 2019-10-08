(function () {
  'use strict';

  angular.module('BlurAdmin.pages.taskService.allTask.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('allTask.popupPages', {
          url: '/allTasktaskModalDetil',
          templateUrl: 'app/pages/taskService/allTask/popupPages/taskModalDetil.html',
          title: '任务维护',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
