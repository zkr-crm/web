(function() {
	'use strict';

	angular.module('BlurAdmin.pages.interactmarket.cstmrMarket', []).config(
		function routeConfig($stateProvider) {
			$stateProvider.state('interactmarket.cstmrMarket', {
				url : '/cstmrMarket',
				templateUrl : 'app/pages/interactmarket/cstmrmarket/cstmrMarket.html',
				title : '营销活动',
				sidebarMeta : {
					order : 0,
				}
			});
			
			
		});
})();