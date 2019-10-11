(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.engineManage',[
	    'BlurAdmin.pages.mgrcenter.engineManage.factorManage',
	    'BlurAdmin.pages.mgrcenter.engineManage.typeManage',
	    'BlurAdmin.pages.mgrcenter.engineManage.factorTypeManage',
	    'BlurAdmin.pages.mgrcenter.engineManage.factorValueManage',
	    'BlurAdmin.pages.mgrcenter.engineManage.baserule',
	    'BlurAdmin.pages.mgrcenter.engineManage.combinerule',
	    'BlurAdmin.pages.mgrcenter.engineManage.strategy',
	    'BlurAdmin.pages.mgrcenter.engineManage.factorValueListManage'])
        .config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider) {
		$stateProvider.state('mgrcenter.engineManage',{
			url : '/engineManage',
			template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
			abstract : true,
			title : '引擎管理',
			sidebarMeta : {
				icon : 'ion-gear-a',
				order : 4,
			},
		});
	}
})();
