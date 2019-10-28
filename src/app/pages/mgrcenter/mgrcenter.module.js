(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter',[
	    'BlurAdmin.pages.mgrcenter.department',
	    'BlurAdmin.pages.mgrcenter.usermanagement',
	    'BlurAdmin.pages.mgrcenter.menumanagement',
	    'BlurAdmin.pages.mgrcenter.paramManage',
        'BlurAdmin.pages.mgrcenter.authMgr',
		'BlurAdmin.pages.mgrcenter.engineManage',
		'BlurAdmin.pages.mgrcenter.msgTemplate',
		'BlurAdmin.pages.mgrcenter.enumManage',
		'BlurAdmin.pages.mgrcenter.msgManage',
        'BlurAdmin.pages.scheduler',
		'BlurAdmin.pages.mgrcenter.product',
		'BlurAdmin.pages.mgrcenter.log'])
        .config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider) {
		$stateProvider.state('mgrcenter',{
			url : '/mgrcenter',
			template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
			abstract : true,
			title : '管理中心',
			sidebarMeta : {
				icon : 'ion-gear-a',
				order : 99,
			},
		});
	}
})();
