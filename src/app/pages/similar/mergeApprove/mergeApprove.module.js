(function() {
	'use strict';

	angular.module('BlurAdmin.pages.similar.mergeApprove', []).config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider) {
		$stateProvider.state('similar.mergeApprove', {
			url : '/mergeApprove',
			params : {
				'taskId' : null
			},
			templateUrl : 'app/pages/similar/mergeApprove/mergeApprove.html',
			title : '客户合并审批',
			sidebarMeta : {
				icon : 'ion-grid',
				order : 2
			}
		}).state('similar.mergeDetail', {
			url : '/mergeDetail',
			params : {
				'taskId' : null
			},
			templateUrl : 'app/pages/similar/mergeApprove/mergeDetail.html',
			title : '合并审批详情'
		});

	}
})();