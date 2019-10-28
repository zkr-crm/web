(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.enumManage',
		  ['BlurAdmin.pages.mgrcenter.enumManage.codeMapper'])
		  .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
		$stateProvider.state('mgrcenter.enumManage',{
			url : '/enumManage',
			template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
			abstract : true,
			title : '码值管理',
			sidebarMeta : {
				order : 10,
			},
	  });
}
})();
