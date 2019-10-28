(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.msgManage',[
		'BlurAdmin.pages.mgrcenter.msgManage.jobMsgRelaManage',
		'BlurAdmin.pages.mgrcenter.msgManage.msgSendDef',
	    'BlurAdmin.pages.mgrcenter.msgManage.msgSendQuery',
	    'BlurAdmin.pages.mgrcenter.msgManage.appMsgMng',
	    'BlurAdmin.pages.mgrcenter.msgManage.remindSendDef',
		'BlurAdmin.pages.mgrcenter.msgManage.msgConf',
		'BlurAdmin.pages.mgrcenter.msgManage.autoRemindSend'])
        .config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider) {
		$stateProvider.state('mgrcenter.msgManage',{
			url : '/msgManage',
			template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
			abstract : true,
			title : '信息管理',
			sidebarMeta : {
				icon : 'ion-gear-a',
				order : 7,
			},
		});
	}
})();
