(function () {
  'use strict';

  angular.module('BlurAdmin.pages.busiopp', ['BlurAdmin.pages.busiopp.allotBusiOppList',
	  											 'BlurAdmin.pages.busiopp.traceBusiOppList'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('busiopp', {
          url: '/busiopp',
          template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          /*templateUrl: 'app/pages/opportunity/opportunity.html',*/
          title: '商机管理',
          sidebarMeta: {
            icon: 'ion-social-yen',
            order: 6,
          },
        });
  }

})();
