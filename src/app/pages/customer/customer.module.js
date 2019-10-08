(function() {
	'use strict';

	angular.module('BlurAdmin.pages.customer',[
        'BlurAdmin.pages.customer.custImportAndDistribute',
        'BlurAdmin.pages.customer.custMnt',
	    'BlurAdmin.pages.customer.custRelMnt',
	    'BlurAdmin.pages.customer.keyCust',
	    'BlurAdmin.pages.customer.blacklist',
	    'BlurAdmin.pages.customer.custLifeCycleDef',
	    'BlurAdmin.pages.customer.custContract',
	    'BlurAdmin.pages.customer.custContractDetail',
	    'BlurAdmin.pages.customer.custQuery',
		'BlurAdmin.pages.customer.leaveoffice'
	  ]).config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider) {
		$stateProvider.state('customer',{
			url : '/customer',
			template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
			abstract : true,
			title : '客户管理',
			sidebarMeta : {
				icon : 'ion-android-person',
				order : 2,
			},
		});
	}
})();
