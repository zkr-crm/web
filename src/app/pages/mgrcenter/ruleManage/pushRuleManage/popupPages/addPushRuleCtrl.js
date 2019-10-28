(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.ruleManage.pushRuleManage')
		.controller('addPushRuleCtrl', addPushRuleCtrl);
	/** @ngInject */
	function addPushRuleCtrl($scope, $filter, $uibModal, $timeout, toastr, Alert) {

		$scope.Rule = {};
	    $scope.Rule.subId = $scope.pushRuleDts.length + 1;
	    $scope.Rule.pushTheme = "新增主题";
		$scope.Rule.pushObjTyp = {id: 0, text: '客户'};

		$scope.saveValue = function() {

			$scope.pushRuleDts.push({
				"id" : $scope.Rule.subId,
				"pushTheme" : $scope.Rule.pushTheme,
				"pushObjTyp" : $scope.Rule.pushObjTyp? $scope.Rule.pushObjTyp.id : '',
				"pushMsgTyp" : $scope.Rule.pushMsgTyp? $scope.Rule.pushMsgTyp.id : '',
				"pushMsgChan" : $scope.Rule.pushMsgChan? $scope.Rule.pushMsgChan.id : '',
				"pushMsg" : $scope.Rule.pushMsg,
				"pushAct" : $scope.Rule.pushAct,
				"pushCC" : $scope.Rule.pushCC,
				"pushTime" : $scope.Rule.pushTime,
				"pushTmRule" : $scope.Rule.pushTmRule? $scope.Rule.pushTmRule.id : '',
				"pushTmDays" : $scope.Rule.pushTmDays
			});
			
			toastr.success('提交完成!');
//			toastr.success($scope.Rule.pushObjTyp.id);
			$scope.$parent.$dismiss();
		}
	}

})();
