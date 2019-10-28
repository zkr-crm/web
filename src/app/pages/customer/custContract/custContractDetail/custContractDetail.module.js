
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.customer.custContractDetail',[
//      'BlurAdmin.pages.customer.custContract.custContractDetail'
	  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('customer.custContractDetail', {
          url: '/custContractDetail',
          params:{'contractNo':null},
          templateUrl: 'app/pages/customer/custContract/custContractDetail/custContractDetail.html',
          title: '联系人明细',
//          sidebarMeta: {
//            order: 0,
//          },
        });
  }
})();
