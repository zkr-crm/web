(function() {
	'use strict';

	angular.module('BlurAdmin.pages.busiopp.allotBusiOppList', []).config(
			routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider) {
		$stateProvider
				.state(
						'busiopp.allotBusiOppList',
						{
							url : '/allotBusiOppList',
							templateUrl : 'app/pages/busiopp/allotbusiopp/allotBusiOppList.html',
							title : '商机分配',
							sidebarMeta : {
								order : 1,
							},
						}).state('busiopp.busiOppDetail', {
							url : '/busioppdet',
							params : {
								'busiOppNo' : null,
								'busiOppStage' : null,
								'custNo' : null
							},
							templateUrl : 'app/pages/busiopp/busioppdet/busiOppDetail.html',
							title : '商机详情'
						});
	}

})();
