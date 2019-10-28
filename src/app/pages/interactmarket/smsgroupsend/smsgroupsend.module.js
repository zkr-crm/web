(function() {
	'use strict';
	angular.module('BlurAdmin.pages.interactmarket.smsgroupsend', []).config(
			function routeConfig($stateProvider,$urlRouterProvider) {
				$stateProvider.state('interactmarket.smsgroupsend', {
					url : '/smsgroupsend',
					templateUrl : 'app/pages/interactmarket/smsgroupsend/smsgroupsend.html',
					title : '短信群发',
					sidebarMeta : {
						order : 1,
					},
				}).state('add', {
					url : '/interactmarket/smsgroupsend/add',
					templateUrl : 'app/pages/interactmarket/smsgroupsend/addsmsgroup.html',
					title : '新建短信群发'
				});
			});
	

})();