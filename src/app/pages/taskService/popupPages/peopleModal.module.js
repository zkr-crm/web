(function () {
  'use strict';

  angular.module('BlurAdmin.pages.taskService.allTask.popupPages', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('allTask.popupPages', {
          url: '/allTaskPeopleModal',
          templateUrl: 'app/pages/taskService/allTask/popupPages/peopleModal.html',
          title: '人员关联维护',
          sidebarMeta: {
            order: 0,
          },
        });
  }
})();
