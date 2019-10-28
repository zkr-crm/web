(function () {
  'use strict';

  angular.module('BlurAdmin.pages.demos.formValidate', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('demos.formValidate', {
          url: '/formValidate',
          templateUrl: 'app/pages/demos/formValidate/formValidate.html',
          title: '表单校验',
          sidebarMeta: {
            order: -60,
          },
        });
  }
})();
