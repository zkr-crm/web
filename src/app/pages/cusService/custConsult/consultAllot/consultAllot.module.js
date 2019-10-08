(function () {
  'use strict';

  angular.module('BlurAdmin.pages.cusService.custConsult.consultAllot', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('cusService.custConsult.consultAllot', {
          url: '/consultAllot',
          templateUrl: 'app/pages/cusService/custConsult/consultAllot/consultAllot.html',
          title: '咨询分配',
          sidebarMeta: {
            order: 1,
          },
        }).state('cusService.custConsult.custConsultDet', {
    		url : '/custConsultDet',
    		params : {
    			'touchItem' : null,
    		},
    		templateUrl : 'app/pages/cusService/custConsult/custConsultDet/custConsultDet.html',
    		title : '客户咨询详情'
    	});
  }
})();
