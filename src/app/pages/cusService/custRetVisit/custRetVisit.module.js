(function() {
	'use strict';

	angular.module('BlurAdmin.pages.cusService.custRetVisit',[
			'BlurAdmin.pages.cusService.custRetVisit.retVisitAllot',
			'BlurAdmin.pages.cusService.custRetVisit.retVisitProcess'])
        .config(routeConfig);

function routeConfig($stateProvider) {
	$stateProvider.state('cusService.custRetVisit',{
		url : '/custRetVisit',
		template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
		abstract : true,
		title : '回访管理',
		sidebarMeta : {
			icon : 'ion-gear-a',
			order : 6,
		},
	});
}
})();