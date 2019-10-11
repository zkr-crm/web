(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.ruleManage.integralRuleManage')
		.controller('integralRuleCtrl', integralRuleCtrl);

	/** @ngInject */
	function integralRuleCtrl($scope, $filter, editableOptions, editableThemes) {

		$scope.inlRuleDts = [ {
			"id" : 1,
			"inlRuleName" : "积分规则名称1",
			"prodCode" : "001",
			"getInlType" : "消费积分",
			"inlCoe" : 1.5,
			"giveInlRule" : "",
			"startTim" : "",
			"endTim" : "",
			"giveType" : "",
			"inlRatio" : 0,
			"inlValue" : 0,
			"brNo" : "101001",
			"curLevel" : "二级客户",
			"payType" : "现金",
			"extendRule" : "",
			"inlValidity" : 180
		},{
			"id" : 1,
			"inlRuleName" : "积分规则名称2",
			"prodCode" : "001",
			"getInlType" : "赠送积分",
			"inlCoe" : 0,
			"giveInlRule" : "主推业务",
			"startTim" : "2017/12/01",
			"endTim" : "2018/12/01",
			"giveType" : "按比例",
			"inlRatio" : 0.5,
			"inlValue" : 0,
			"brNo" : "101001",
			"curLevel" : "二级客户",
			"payType" : "现金",
			"extendRule" : "生日月",
			"inlValidity" : 180
		},{
			"id" : 1,
			"inlRuleName" : "积分规则名称3",
			"prodCode" : "001",
			"getInlType" : "消费积分",
			"inlCoe" : 1.5,
			"giveInlRule" : "",
			"startTim" : "",
			"endTim" : "",
			"giveType" : "",
			"inlRatio" : 0,
			"inlValue" : 0,
			"brNo" : "101001",
			"curLevel" : "二级客户",
			"payType" : "现金",
			"extendRule" : "",
			"inlValidity" : 180
		},{
			"id" : 1,
			"inlRuleName" : "积分规则名称4",
			"prodCode" : "001",
			"getInlType" : "赠送积分",
			"inlCoe" : 0,
			"giveInlRule" : "主推业务",
			"startTim" : "2017/12/01",
			"endTim" : "2018/12/01",
			"giveType" : "按比例",
			"inlRatio" : 0.5,
			"inlValue" : 0,
			"brNo" : "101001",
			"curLevel" : "二级客户",
			"payType" : "现金",
			"extendRule" : "生日月",
			"inlValidity" : 180
		} ];
	}

})();
