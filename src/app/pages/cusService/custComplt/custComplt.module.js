(function() {
	'use strict';

	angular.module('BlurAdmin.pages.cusService.custComplt',[
			'BlurAdmin.pages.cusService.custComplt.compltAllot',
			'BlurAdmin.pages.cusService.custComplt.compltProcess'])
        .config(routeConfig);

function routeConfig($stateProvider) {
	$stateProvider.state('cusService.custComplt',{
		url : '/custComplt',
		template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
		abstract : true,
		title : '投诉管理',
		sidebarMeta : {
			icon : 'ion-gear-a',
			order : 4,
		},
	});
}
})();