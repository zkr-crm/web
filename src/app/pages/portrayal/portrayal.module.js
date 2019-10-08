(function () {
  'use strict';

  angular.module('BlurAdmin.pages.portrayal', ['BlurAdmin.pages.portrayal.perCusPortrayal',
	  										   'BlurAdmin.pages.portrayal.enterprisePortrayal',
	  										   'BlurAdmin.pages.portrayal.potentialPerCusPortrayal',
	  										   'BlurAdmin.pages.portrayal.potentialEnterprisePortrayal'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('portrayal', {
          url: '/portrayal',
          template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: '客户画像',
          sidebarMeta: {
            icon: 'ion-ios-body',
            order: 3,
          },
        });
  }
})();
