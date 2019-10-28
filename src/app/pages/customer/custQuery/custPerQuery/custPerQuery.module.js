(function() {
	'use strict';

	angular.module('BlurAdmin.pages.customer.custQuery.custPerQuery',[
	  ]).config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider) {
	    $stateProvider
	        .state('customer.custQuery.custPerQuery', {
	          url: '/custPerQuery',
	          templateUrl: 'app/pages/customer/custQuery/custPerQuery/custPerQuery.html',
	          title: '个人客户综合查询',
	          sidebarMeta: {
	            order: 1,
	          },
	        });
	  }
})();
