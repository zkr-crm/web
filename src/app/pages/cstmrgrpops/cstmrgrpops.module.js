(function() {
	'use strict';

	angular.module('BlurAdmin.pages.cstmrgrpops',[]).config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider) {
		$stateProvider.state('cstmrgrpops',{
			url : '/cstmrgrpops',
			templateUrl: 'app/pages/cstmrgrpops/cstmrGrpList.html',
			title : '客群运营',
			sidebarMeta : {
				icon : 'fa fa-users',
				order : 7,
			}
		}).state('static', {
			url : '/cstmrgrpops/static',
			templateUrl : 'app/pages/cstmrgrpops/static/static.html',
			title : '静态客户群'
		}).state('dynamic', {
			url : '/cstmrgrpops/dynamic',
			templateUrl : 'app/pages/cstmrgrpops/dynamic/dynamic.html',
			title : '动态客户群'
		});
	}
})();
