(function () {
  'use strict';

  angular.module('BlurAdmin.pages.cusService.custRetVisit.retVisitAllot', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('cusService.custRetVisit.retVisitAllot', {
          url: '/retVisitAllot',
          templateUrl: 'app/pages/cusService/custRetVisit/retVisitAllot/retVisitAllot.html',
          title: '回访分配',
          sidebarMeta: {
            order: 1,
          },
        }).state('cusService.custRetVisit.custRetVisitDet', {
    		url : '/custRetVisitDet',
    		params : {
    			'touchItem' : null,
    		},
    		templateUrl : 'app/pages/cusService/custRetVisit/custRetVisitDet/custRetVisitDet.html',
    		title : '客户回访详情'
    	});
  }
})();
