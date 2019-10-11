(function() {
	'use strict';

	angular.module('BlurAdmin.pages.cusService.custConsult',[
			'BlurAdmin.pages.cusService.custConsult.consultAllot',
			'BlurAdmin.pages.cusService.custConsult.consultProcess'])
        .config(routeConfig);

function routeConfig($stateProvider) {
	$stateProvider.state('cusService.custConsult',{
		url : '/custConsult',
		template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
		abstract : true,
		title : '咨询管理',
		sidebarMeta : {
			icon : 'ion-gear-a',
			order : 5,
		},
	});
}
})();