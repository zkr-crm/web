(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.product',[
         'BlurAdmin.pages.mgrcenter.product.qryProduct',
         'BlurAdmin.pages.mgrcenter.product.uploadProduct'
	  ]).config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider) {
		$stateProvider.state('mgrcenter.product',{
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
