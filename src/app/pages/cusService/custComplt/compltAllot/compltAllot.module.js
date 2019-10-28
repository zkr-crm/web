(function () {
  'use strict';

  angular.module('BlurAdmin.pages.cusService.custComplt.compltAllot', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('cusService.custComplt.compltAllot', {
          url: '/compltAllot',
          templateUrl: 'app/pages/cusService/custComplt/compltAllot/compltAllot.html',
          title: '投诉分配',
          sidebarMeta: {
            order: 1,
          },
        }).state('cusService.custComplt.custCompltDet', {
    		url : '/custCompltDet',
    		params : {
    			'touchItem' : null,
    		},
    		templateUrl : 'app/pages/cusService/custComplt/custCompltDet/custCompltDet.html',
    		title : '客户投诉详情'
    	});
  }
})();
