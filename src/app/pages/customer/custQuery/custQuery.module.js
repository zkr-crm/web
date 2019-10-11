(function() {
	'use strict';

	angular.module('BlurAdmin.pages.customer.custQuery',[
         'BlurAdmin.pages.customer.custQuery.custPerQuery'
	  ]).config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider) {
		$stateProvider.state('customer.custQuery',{
			url : '/custQuery',
			template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
			abstract : true,
			title : '客户查询',
			sidebarMeta : {
				icon : 'ion-compose',
				order : 99,
			},
		});
	}
})();
