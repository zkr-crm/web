(function () {
  'use strict';

  angular.module('BlurAdmin.pages.demos', ['BlurAdmin.pages.demos.modifyDemo',
	  									   'BlurAdmin.pages.demos.formValidate',
	  									   'BlurAdmin.pages.demos.tableDemo2',
	  									   'BlurAdmin.pages.demos.tableDemo3',
                                            'BlurAdmin.pages.demos.tableDemo4',
                                            'BlurAdmin.pages.demos.tableDemo5',
	  									   'BlurAdmin.pages.demos.treeDemo',
	  									   'BlurAdmin.pages.demos.testAngular',
	  									   'BlurAdmin.pages.demos.second',
	  									   'BlurAdmin.pages.demos.upload',
                                           'BlurAdmin.pages.demos.echartsDemo',
                                           'BlurAdmin.pages.demos.tabDemo'])
      .config(routeConfig);

  /** @ngInject */
function routeConfig($stateProvider) {
    $stateProvider
        .state('demos', {
            url: '/demos',
            template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
            abstract: true,
            title: '例子',
            sidebarMeta: {
                icon: 'ion-compose',
                order: 1,
            },
        });
}
})();
