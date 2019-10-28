(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.authMgr', ['BlurAdmin.pages.mgrcenter.addAuthMgr']).config(
		function routeConfig($stateProvider) {
			$stateProvider.state('mgrcenter.authMgr', {
				url : '/authMgr',
				templateUrl : 'app/pages/mgrcenter/authmgr/authMgr.html',
				title : '权限管理',
				sidebarMeta : {
					order : 3,
				},
			});
		});

})();