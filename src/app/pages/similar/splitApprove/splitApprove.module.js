(function() {
	'use strict';

	angular.module('BlurAdmin.pages.similar.splitApprove', []).config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider) {
		$stateProvider.state('similar.splitApprove', {
			url : '/splitApprove',
			params : {
				'taskId' : null
			},
			templateUrl : 'app/pages/similar/splitApprove/splitApprove.html',
			title : '客户拆分审批',
			sidebarMeta : {
				icon : 'ion-grid',
				order : 4
			}
		}).state('similar.splitApproveDetail', {
			url : '/splitApproveDetail',
			params : {
				'taskId' : null
			},
			templateUrl : 'app/pages/similar/splitApprove/splitApproveDetail.html',
			title : '拆分审批详情'
		});

	}
})();