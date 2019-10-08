(function () {
  'use strict';

  angular.module('BlurAdmin.pages.knowledge.publicRepository', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('knowledge.publicRepository', {
          url: '/publicRepository',
          templateUrl: 'app/pages/knowledge/publicRepository/publicRepository.html',
          title: '公共知识库',
          sidebarMeta: {
            order: 1000,
          },
        });
  }
})();
