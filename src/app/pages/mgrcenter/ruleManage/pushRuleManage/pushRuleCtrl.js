(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.ruleManage.pushRuleManage')
		.controller('pushRuleCtrl', pushRuleCtrl);

	/** @ngInject */
	function pushRuleCtrl($scope, $filter, $uibModal, editableOptions, editableThemes) {

		$scope.pushRuleDts = [ {
			"id" : 1,
			"pushTheme" : "推送主题1",
			"pushObjTyp" : 3,
			"pushMsgTyp" : 1,
			"pushMsgChan" : 2,
			"pushMsg" : "推送消息内容1",
			"pushAct" : "活动1",
			"pushCC" : "抄送地址",
			"pushTime" : "10:00:00",
			"pushTmRule" : "0",
			"pushTmDays" : 1
		}, {
			"id" : 2,
			"pushTheme" : "推送主题2",
			"pushObjTyp" : 1,
			"pushMsgTyp" : 2,
			"pushMsgChan" : 3,
			"pushMsg" : "推送消息内容2",
			"pushAct" : "活动2",
			"pushCC" : "抄送地址",
			"pushTime" : "10:00:00",
			"pushTmRule" : "0",
			"pushTmDays" : 1
		},{
			"id" : 3,
			"pushTheme" : "推送主题3",
			"pushObjTyp" : 0,
			"pushMsgTyp" : 1,
			"pushMsgChan" : 2,
			"pushMsg" : "推送消息内容3",
			"pushAct" : "活动3",
			"pushCC" : "抄送地址",
			"pushTime" : "10:00:00",
			"pushTmRule" : "0",
			"pushTmDays" : 1
		}, {
			"id" : 4,
			"pushTheme" : "推送主题4",
			"pushObjTyp" : 1,
			"pushMsgTyp" : 2,
			"pushMsgChan" : 3,
			"pushMsg" : "推送消息内容4",
			"pushAct" : "活动4",
			"pushCC" : "抄送地址",
			"pushTime" : "10:00:00",
			"pushTmRule" : "0",
			"pushTmDays" : 1
		},{
			"id" : 5,
			"pushTheme" : "推送主题5",
			"pushObjTyp" : 0,
			"pushMsgTyp" : 1,
			"pushMsgChan" : 2,
			"pushMsg" : "推送消息内容5",
			"pushAct" : "活动5",
			"pushCC" : "抄送地址",
			"pushTime" : "10:00:00",
			"pushTmRule" : "0",
			"pushTmDays" : 1
		}, {
			"id" : 6,
			"pushTheme" : "推送主题6",
			"pushObjTyp" : 1,
			"pushMsgTyp" : 2,
			"pushMsgChan" : 3,
			"pushMsg" : "推送消息内容6",
			"pushAct" : "活动6",
			"pushCC" : "抄送地址",
			"pushTime" : "10:00:00",
			"pushTmRule" : "0",
			"pushTmDays" : 1
		} ];

		$scope.pushObjTyps =  [
		      {id: 0, text: '客户'},
		      {id: 1, text: '客户群'},
		      {id: 2, text: '用户'},
		      {id: 3, text: '用户岗位'}
		    ];
	    $scope.showObjTyp = function(item) {
	      if(item.pushObjTyp >= 0 && $scope.pushObjTyps.length) {
	        var selected = $filter('filter')($scope.pushObjTyps, {id: item.pushObjTyp});
	        return selected.length ? selected[0].text : 'Not set';
	      } else return 'Not set'
	    };
	    
		$scope.pushMsgTyps =  [
		      {id: 0, text: '生日祝福'},
		      {id: 1, text: '理赔进度'},
		      {id: 2, text: '积分使用提示'},
		      {id: 3, text: '保单到期提醒'},
		      {id: 4, text: '生日提示'},
		      {id: 5, text: '客户流失预警提示'},
		      {id: 6, text: '离职业务衔接服务提示'}
		    ];
		$scope.showMsgTyp = function(item) {
	      if(item.pushMsgTyp >= 0 && $scope.pushMsgTyps.length) {
		        var selected = $filter('filter')($scope.pushMsgTyps, {id: item.pushMsgTyp});
		        return selected.length ? selected[0].text : 'Not set';
		      } else return 'Not set'
		}
		$scope.pushMsgChans =  [
		      {id: 0, text: '短信'},
		      {id: 1, text: '微信'},
		      {id: 2, text: '邮件'},
		      {id: 3, text: 'app'}
		    ];
		$scope.showMsgChan = function(item) {
		      if(item.pushMsgChan >= 0 && $scope.pushMsgChans.length) {
			        var selected = $filter('filter')($scope.pushMsgChans, {id: item.pushMsgChan});
			        return selected.length ? selected[0].text : 'Not set';
			      } else return 'Not set'
		}
		$scope.pushTmRules =  [
		      {id: 0, text: '提前'},
		      {id: 1, text: '当天'},
		      {id: 2, text: '延后'}
		    ];
		$scope.showTmRule = function(item) {
		      if(item.pushTmRule >= 0 && $scope.pushTmRules.length) {
			        var selected = $filter('filter')($scope.pushTmRules, {id: item.pushTmRule});
			        return selected.length ? selected[0].text : 'Not set';
			      } else return 'Not set'
		}
		
		$scope.addPushRule = function() {
			 $uibModal.open({
				 animation: true,
				 templateUrl: 'app/pages/mgrcenter/ruleManage/pushRuleManage/popupPages/addPushRule.html',
				 size: 'lg',
				 controller:'addPushRuleCtrl',
				 scope:$scope,
				 resolve: {
				 }
			 });
			
		};
		
		$scope.delPushRule = function(index) {
			$scope.pushRuleDts.splice(index, 1);
		};

//		$scope.addUser = function() {
//			$scope.inserted = {
//				id : $scope.usersData.length + 1,
//				paramNo : '',
//				paramName : null,
//				paramValue : null,
//				paramDesc : ''
//			};
//			$scope.usersData.push($scope.inserted);
//		};
//	
//		$scope.smartTablePageSize = 10;
//		
//	    editableOptions.theme = 'bs3';
//	    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
//	    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';
	}

})();
