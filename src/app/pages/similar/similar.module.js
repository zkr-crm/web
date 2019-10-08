(function() {
	'use strict';

	angular.module('BlurAdmin.pages.similar', [
		'BlurAdmin.pages.similar.taskList',
		'BlurAdmin.pages.similar.mergeApprove',
		'BlurAdmin.pages.similar.taskDistribute',
		'BlurAdmin.pages.similar.splitApply',
		'BlurAdmin.pages.similar.splitApprove'
	]).config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider) {
		
		$stateProvider.state('similar',{
			url : '/similar',
			template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
			abstract : true,
			title : '相似客户管理',
			sidebarMeta : {
				icon : 'ion-android-people',
				order : 3,
			},
		});
		
		/*$stateProvider.state('similar', {
			url : '/taskList',
			params : {
				'taskId' : null
			},
			templateUrl : 'app/pages/similar/taskList/taskList.html',
			title : '相似任务',
			sidebarMeta : {
				icon : 'ion-grid',
				order : 4
			}
		}).state('similarDetail', {
			url : '/similarDetail',
			params : {
				'taskId' : null
			},
			templateUrl : 'app/pages/similar/similarDetail/similarDetail.html',
			title : '任务详情',
			sidebarMeta : {
				icon : 'ion-grid',
				order : 4
			}
		});*/

	}
})();