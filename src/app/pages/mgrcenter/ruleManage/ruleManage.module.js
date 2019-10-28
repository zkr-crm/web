(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.ruleManage',
		  ['BlurAdmin.pages.mgrcenter.ruleManage.pushRuleManage',
			  'BlurAdmin.pages.mgrcenter.ruleManage.curPropUpdManage',
			  'BlurAdmin.pages.mgrcenter.ruleManage.integralRuleManage'])
		  .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
		$stateProvider.state('mgrcenter.ruleManage',{
			url : '/ruleManage',
			template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
			abstract : true,
			title : '规则管理',
			sidebarMeta : {
				order : 5,
			},
	  });
}
})();
