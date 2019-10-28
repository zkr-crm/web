(function () {
  'use strict';

  angular.module('BlurAdmin.pages.cusService', ['BlurAdmin.pages.cusService.incServPush',
                                                'BlurAdmin.pages.cusService.quitBusiJoinServProm',
                                                'BlurAdmin.pages.cusService.inteUsePromQuery',
                                                'BlurAdmin.pages.cusService.custComplt',
                                                'BlurAdmin.pages.cusService.custConsult',
                                                'BlurAdmin.pages.cusService.custRetVisit',
                                                'BlurAdmin.pages.cusService.mapService'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('cusService', {
          url: '/cusService',
          template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: '客户服务',
          sidebarMeta: {
            icon: 'ion-android-clipboard',
            order: 9,
          },
        });
  }
})();
