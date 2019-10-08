(function () {
  'use strict';

  angular.module('BlurAdmin.pages.personalInfo', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('personalInfo', {
          url: '/personalInfo',
          templateUrl: 'app/pages/personalInfo/personalInfo.html',
          title: '个人信息',
        });
  }
})();
