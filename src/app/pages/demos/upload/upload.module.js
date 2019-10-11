(function () {
  'use strict';

  angular.module('BlurAdmin.pages.demos.upload', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('demos.upload', {
          url: '/upload',
          templateUrl: 'app/pages/demos/upload/upload.html',
          title: '上传',
          sidebarMeta: {
            order: 8,
          },
        });
  }
})();
