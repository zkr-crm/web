(function() {
	'use strict';

	angular.module('BlurAdmin.pages.myreport',[
	    'BlurAdmin.pages.myreport.saleSuccessRate',
	    'BlurAdmin.pages.myreport.companySales',
	    'BlurAdmin.pages.myreport.managerSales'])
        .config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider) {
		$stateProvider.state('myreport',{
			url : '/myreport',
			template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
			abstract : true,
			title : '销售报表管理',
			sidebarMeta : {
				icon : 'ion-gear-a',
				order : 99,
			},
		});
	}
})();
