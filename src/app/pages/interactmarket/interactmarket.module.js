(function() {
	'use strict';

	angular.module('BlurAdmin.pages.interactmarket',[
         'BlurAdmin.pages.interactmarket.cstmrMarket',
	    'BlurAdmin.pages.interactmarket.smsgroupsend'    
	  ]).config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider) {
		$stateProvider.state('interactmarket',{
			url : '/interactmarket',
			template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
			abstract : true,
			title : '互动营销',
			sidebarMeta : {
				icon : 'fa fa-paper-plane-o',
				order : 8,
			},
		});
	}
})();
