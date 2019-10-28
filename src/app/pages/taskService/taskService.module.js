(function () {
  'use strict';

  angular.module('BlurAdmin.pages.taskService', [
		'BlurAdmin.pages.taskService.allTask',
		'BlurAdmin.pages.taskService.myTask'
	  
  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
	
    $stateProvider
        .state('taskService', {
          url: '/taskService',
			template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
			abstract : true,
          title: '任务管理',
          sidebarMeta: {
              icon: 'ion-flag',
            order: 5,
          },
        });
  }
})();
