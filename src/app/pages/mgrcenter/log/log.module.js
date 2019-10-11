(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.log',[
		  'BlurAdmin.pages.mgrcenter.log.operLogSearch', 
		  'BlurAdmin.pages.mgrcenter.log.loginLogSearch'	])
		  .config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider) {
		$stateProvider.state('mgrcenter.log',{
			url : '/logmanage',
			template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
			abstract : true,
			title : '日志管理',
			sidebarMeta : {
				icon : 'ion-gear-a',
				order : 8,
			},
		});
	}
})();
