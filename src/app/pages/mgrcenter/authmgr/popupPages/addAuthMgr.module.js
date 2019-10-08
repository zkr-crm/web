(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.addAuthMgr', []).config(
		function routeConfig($stateProvider) {
			$stateProvider.state('mgrcenter.addAuthMgr', {
				url : '/addAuthMgr',
				templateUrl : 'app/pages/mgrcenter/authmgr/popupPages/addAuthMgr.html',
				title : '角色添加'
			});
		});

})();