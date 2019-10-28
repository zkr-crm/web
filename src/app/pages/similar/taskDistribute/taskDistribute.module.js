(function() {
	'use strict';

	angular.module('BlurAdmin.pages.similar.taskDistribute', []).config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider) {
		$stateProvider.state('similar.taskDistribute', {
			url : '/taskDistribute',
			params : {
				'taskId' : null
			},
			templateUrl : 'app/pages/similar/taskDistribute/taskDistribute.html',
			title : '相似任务管理',
			sidebarMeta : {
				icon : 'ion-grid',
				order : 0
			}
		}).state('taskDistriDetail', {
			url : '/taskDistriDetail',
			params : {
				'taskId' : null
			},
			templateUrl : 'app/pages/similar/taskDistribute/taskDistriDetail.html'
		});

	}
})();