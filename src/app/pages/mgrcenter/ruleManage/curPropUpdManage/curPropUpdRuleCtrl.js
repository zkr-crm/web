(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.ruleManage.curPropUpdManage')
		.controller('curPropUpdRuleCtrl', curPropUpdRuleCtrl);

	/** @ngInject */
	function curPropUpdRuleCtrl($scope, $filter, editableOptions, editableThemes) {

		$scope.tblInfo = {};
		
		$scope.tblNames =  [
		      {id: "table1", text: '客户基本信息'},
		      {id: "table2", text: '客户关联信息'}
		    ];

		$scope.tblRules =  [
		      {id: "0", text: '不覆盖'},
		      {id: "1", text: '覆盖'}
		    ];
		
		$scope.tblFirstRules =  [
		      {id: "0", text: '系统优先'},
		      {id: "1", text: '时间优先'}
		    ];
		
		$scope.showAttInfo = function() {
			
			if ($scope.tblInfo.tblName.id == "table1") {
				$scope.tblInfo.tblRule = {id: "0", text: '不覆盖'};
				$scope.tblInfo.firstRule = {id: "1", text: '时间优先'};
				$scope.tblInfo.subRule = {id: "1", text: '最晚更新优先'};
				$scope.tblInfo.sysOrderList = "";
			} else {
				$scope.tblInfo.tblRule = {id: "1", text: '覆盖'};
				$scope.tblInfo.firstRule = {id: "0", text: '系统优先'},
				$scope.tblInfo.subRule = {id: "0", text: '最早更新优先'};
				$scope.tblInfo.sysOrderList = "核心系统，A,B,C";
			}

			$scope.curPropRuleDts = [ {
				"id" : 1,
				"attCode" : "name",
				"attDesc" : "姓名",
				"firstRule" : "",
				"subRule" : "",
				"sysOrderList" : "",
				"editAbleFlg" : false
			}, {
				"id" : 2,
				"attCode" : "sex",
				"attDesc" : "性别",
				"firstRule" : "",
				"subRule" : "",
				"sysOrderList" : "",
				"editAbleFlg" : false
			},{
				"id" : 3,
				"attCode" : "birthday",
				"attDesc" : "出生日期",
				"firstRule" : "",
				"subRule" : "",
				"sysOrderList" : "",
				"editAbleFlg" : false
			}, {
				"id" : 4,
				"attCode" : "cert_type",
				"attDesc" : "证件类型",
				"firstRule" : "",
				"subRule" : "",
				"sysOrderList" : "",
				"editAbleFlg" : false
			},{
				"id" : 5,
				"attCode" : "cert_no",
				"attDesc" : "证件号码",
				"firstRule" : "",
				"subRule" : "",
				"sysOrderList" : "",
				"editAbleFlg" : false
			}, {
				"id" : 6,
				"attCode" : "first_work_tm",
				"attDesc" : "首次参加工作时间",
				"firstRule" : "0",
				"subRule" : "1",
				"sysOrderList" : "核心系统，A,B,C"
			}, {
				"id" : 7,
				"attCode" : "hieght",
				"attDesc" : "身高cm",
				"firstRule" : "1",
				"subRule" : "0",
				"sysOrderList" : "核心系统，A,B,C"
			}, {
				"id" : 8,
				"attCode" : "tel_no",
				"attDesc" : "手机号",
				"firstRule" : "2",
				"subRule" : "1",
				"sysOrderList" : "核心系统，A,B,C"
			}, {
				"id" : 9,
				"attCode" : "hobby",
				"attDesc" : "兴趣爱好",
				"firstRule" : "2",
				"subRule" : "1",
				"sysOrderList" : ""
			}, {
				"id" : 10,
				"attCode" : "upd_tm",
				"attDesc" : "更新时间",
				"firstRule" : "",
				"subRule" : "",
				"sysOrderList" : ""
			} ];

			$scope.curSpecialRuleDts = [{
				"id" : 1,
				"specialRuleNm" : "证件合并规则",
				"specialRuleFlg" : "0",
				"specialRuleVal" : "规则里用到的参数"
			}]
		}
		
		$scope.firstRules =  [
		      {id: "0", text: '系统优先'},
		      {id: "1", text: '时间优先'},
		      {id: "2", text: '数据合并'}
		    ];
	    $scope.showFirstRule = function(value) {
	      if(value && $scope.firstRules.length) {
	        var selected = $filter('filter')($scope.firstRules, {id: value});
	        return selected.length ? selected[0].text : 'Error set';
	      } else return 'Not set';
	    };

		$scope.subRules =  [
		      {id: "0", text: '最早更新优先'},
		      {id: "1", text: '最晚更新优先'}
		    ];
		$scope.showSubRule = function(value) {
	      if(value && $scope.subRules.length) {
	        var selected = $filter('filter')($scope.subRules, {id: value});
	        return selected.length ? selected[0].text : 'Error set';
	      } else return 'Not set';
		}

		$scope.specialRuleFlgs =  [
		      {id: "0", text: '否'},
		      {id: "1", text: '是'}
		    ];
		$scope.showSpecialRuleFlg = function(value) {
		      if(value && $scope.specialRuleFlgs.length) {
		        var selected = $filter('filter')($scope.specialRuleFlgs, {id: value});
		        return selected.length ? selected[0].text : 'Error set';
		      } else return 'Not set';
			}

		
	}

})();
