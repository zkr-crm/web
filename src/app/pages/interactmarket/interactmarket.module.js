(function() {
	'use strict';

	angular.module('BlurAdmin.pages.interactmarket',[
         'BlurAdmin.pages.interactmarket.cstmrMarket',
	    'BlurAdmin.pages.interactmarket.smsgroupsend',
		'BlurAdmin.pages.interactmarket.blacklist',
		'BlurAdmin.pages.interactmarket.tagMgr',
		'BlurAdmin.pages.custGroup'
	  ]).config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider) {
		$stateProvider.state('interactmarket',{
			url : '/interactmarket',
			template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
			abstract : true,
			title : '客群运营',
			sidebarMeta : {
				icon : 'fa fa-paper-plane-o',
				order : 8,
			},
		});
	}
})();
