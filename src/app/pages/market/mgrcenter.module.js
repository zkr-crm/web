(function() {
	'use strict';

	angular.module('BlurAdmin.pages.market',[
	    'BlurAdmin.pages.market.marketDetil',
	    'BlurAdmin.pages.market.activAnalys',
	    'BlurAdmin.pages.market.autoMarketDetil'])
        .config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider) {
		$stateProvider.state('market',{
			url : '/market',
			template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
			abstract : true,
			title : '营销活动',
			sidebarMeta : {
				icon : 'ion-gear-a',
				order : 199,
			},
		});
	}
})();
