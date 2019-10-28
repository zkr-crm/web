(function() {
	'use strict';

	angular.module('BlurAdmin.pages.similar.splitApply', [])
			.config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider) {
		$stateProvider.state('similar.splitApply', {
			url : '/splitApply',
			params : {
				'taskId' : null
			},
			templateUrl : 'app/pages/similar/splitApply/splitApply.html',
			title : '客户拆分申请',
			sidebarMeta : {
				icon : 'ion-grid',
				order : 3
			}
		}).state('similar.splitDetail', {
			url : '/splitApply',
			params : {
				'taskId' : null
			},
			templateUrl : 'app/pages/similar/splitApply/splitDetail.html',
			title : '拆分申请详情'
		});

	}
})();