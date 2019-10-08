(function() {
	'use strict';

	angular.module('BlurAdmin.pages.product',[
         'BlurAdmin.pages.product.qryProduct',
         'BlurAdmin.pages.product.uploadProduct'
	  ]).config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider) {
		$stateProvider.state('product',{
			url : '/product',
			template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
			abstract : true,
			title : '产品管理',
			sidebarMeta : {
				icon : 'ion-heart',
				order : 4,
			},
		});
	}
})();
