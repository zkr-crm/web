(function() {
	'use strict';

	angular.module(
			'BlurAdmin.pages.knowledge',
			[ 'BlurAdmin.pages.knowledge.publicRepository']
	).config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider) {
		$stateProvider.state('knowledge', {
			url : '/knowledge',
			template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
			abstract : true,
			title : '知识库',
			sidebarMeta : {
				icon : 'ion-document',
				order : 1000,
			},
		});
	}
})();
