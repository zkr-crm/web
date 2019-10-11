(function() {
	'use strict';

	angular.module('BlurAdmin.pages.custGroup',[
	]).config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider) {
		
		$stateProvider.state('custGroupList',{
			url : '/custGroup',
			templateUrl: 'app/pages/custGroup/custGroup.html',
			title : '客群运营',
			sidebarMeta : {
				icon : 'fa fa-users',
				order : 96,
			}
		}).state('dynamicGroup',{
			url : '/custGroup/dynamicGroup',
			params : {
				'groupId' : null
			},
			templateUrl: 'app/pages/custGroup/dynamicGroup/dynamic.html',
			title : '动态客户群'
		}).state('staticGroup',{
			url : '/custGroup/staticGroup',
			params : {
				'groupId' : null
			},
			templateUrl: 'app/pages/custGroup/staticGroup/static.html',
			title : '静态客户群'
		})/*.state('custGroup.static', {
			url : '/static',
			templateUrl : 'app/pages/custGroup/static/static.html',
			title : '静态客户群'
		}).state('custGroup.dynamic', {
			url : '/dynamic',
			templateUrl : 'app/pages/custGroup/dynamic/dynamic.html',
			title : '动态客户群'
		})*/;
	}
})();
