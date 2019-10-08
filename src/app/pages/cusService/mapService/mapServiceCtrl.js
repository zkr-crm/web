(function() {
	'use strict';

	angular.module('BlurAdmin.pages.cusService')
		.controller('mapServiceCtrl', function($scope) {
			
			$scope.searchObj = {};
			$scope.queryTypes = [
		        {label: '网点查询', value: 1},
		        {label: '定损人员分布', value: 2},
		        {label: '定点医院查询', value: 3}
		    ];
			
			$scope.provinces = [
			     		        {label: '吉林省', value: 1},
			     		        {label: '辽宁省', value: 2}
			     		    ];
			
			$scope.citys = [
			     		        {label: '沈阳市', value: 1},
			     		        {label: '辽阳市', value: 2}
			     		    ];
			
			$scope.countys = [
			     		        {label: '沈河区', value: 1},
			     		        {label: '和平区', value: 2},
			     		       {label: '铁西区', value: 1},
			     		      {label: '皇姑区', value: 1},
			     		     {label: '浑南区', value: 1}
			     		    ];
			
		});

})();
