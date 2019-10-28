(function () {
  'use strict';

  angular.module('BlurAdmin.pages.analysis', [
        'BlurAdmin.pages.analysis.custagedistribution',
		'BlurAdmin.pages.analysis.custeventsscale',
        'BlurAdmin.pages.analysis.custtruth',
        'BlurAdmin.pages.analysis.custloyalty'
        
	  
  ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
	
    $stateProvider
        .state('analysis', {
          url: '/analysis',
            template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
			abstract : true,
          title: '客户智能分析',
          sidebarMeta: {
              icon: 'ion-flag',
            order: 5,
          },
        });
  }
})();
