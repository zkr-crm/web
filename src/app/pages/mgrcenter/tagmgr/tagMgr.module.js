(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.tagMgr', []).config(
		function routeConfig($stateProvider) {
			$stateProvider.state('mgrcenter.tagMgr', {
				url : '/tagMgr',
				templateUrl : 'app/pages/mgrcenter/tagmgr/tagMgr.html',
				title : '标签管理',
				sidebarMeta : {
					order : 5,
				},
			});
		});

})();