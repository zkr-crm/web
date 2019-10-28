(function() {
	'use strict';

	angular.module('BlurAdmin.pages.similar.taskList', []).config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider) {
		$stateProvider.state('similar.taskList', {
			url : '/taskList',
			params : {
				'taskId' : null
			},
			templateUrl : 'app/pages/similar/taskList/taskList.html',
			title : '客户合并申请',
			sidebarMeta : {
				icon : 'ion-grid',
				order : 1
			}
		}).state('similarDetail', {
			url : '/similarDetail',
			params : {
				'taskId' : null
			},
			templateUrl : 'app/pages/similar/similarDetail/similarDetail.html',
			title : '合并申请详情'
		});

	}
})();