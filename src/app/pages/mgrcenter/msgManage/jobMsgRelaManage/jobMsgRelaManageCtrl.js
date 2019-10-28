(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.msgManage.jobMsgRelaManage').controller(
			'jobMsgRelaManageCtrl', jobMsgRelaManageCtrl);
	/** @ngInject */
	function jobMsgRelaManageCtrl($scope, $filter, $uibModal,editableOptions, editableThemes,HttpService, toastr,Alert) {

		
		//加载消息定义信息组成枚举
		$scope.msgCodes = [];
		$scope.msgDefT = [];
		var optsForMsg = {};
		optsForMsg.url = '/crm/manage/msgmng/getMsgByEntity';
		optsForMsg.method = 'GET';
		HttpService.linkHttp(optsForMsg).then(function(response) {
			console.log(response.data);
			angular.forEach(response.data, function(item) {
				$scope.msgDefT.push({ label : item.msgTopic, value : item.msgCode });
			})
			
			$scope.msgCodes = $scope.msgDefT;
		});
		
		
		//加载提醒定义信息组成枚举
		$scope.remCodes = [];
		$scope.remDefT = [];
		var optsForRem = {};
		optsForRem.url = '/crm/manage/msgmng/getRemindDefByEntity';
		optsForRem.method = 'GET';
		HttpService.linkHttp(optsForRem).then(function(resp) {
			console.log(resp.data);
			angular.forEach(resp.data, function(item) {
				$scope.remDefT.push({ label : item.remindTopic, value : item.ruleId });
			})
			
			$scope.remCodes = $scope.remDefT;
		});
		
		
		
		$scope.searchObj ={
				"jobName" : "",
				"msgCode" : ""
		}
		
		$scope.sysRela ={
				"jobName" : "",
				"schedName" : "",
				"jobGroup" : "",
				"msgCode" : "",
				"remindCode" : ""
		}
//新增
		$scope.addRela = function() {
			 $uibModal.open({
				 animation: true,
				backdrop : 'static',
				 templateUrl: 'app/pages/mgrcenter/msgManage/jobMsgRelaManage/popupPages/addRela.html',
				 size : 'midle-900',
				 controller:'addRelaCtrl',
				 scope:$scope,
				 resolve: {
				 }
			 });
		};
		// 查询事件
		$scope.searchRela = function() {

			var opts = {};
			opts.url = '/crm/manage/msgmng/getJobMsgListByEntity';
			opts.method = 'GET';
			opts.params = $scope.searchObj;
			HttpService.linkHttp(opts).then(function(response) {
				angular.forEach(response.data, function(item) {
					angular.forEach($scope.msgCodes, function(mc) {
						if(mc.value == item.msgCode){
							item.msgCode = mc.label;
							return;
						}
					})
					angular.forEach($scope.remCodes, function(rc) {
						if(rc.value == item.remindCode){
							item.remindCode = rc.label;
							return;
						}
					})
				})
				$scope.RelasRowCollection = response.data;

				$scope.total=response.data.length;
			});
		}
		
		// 页面初始化查询
		$scope.searchRela();
		$scope.smartTablePageSize = 10;
		// 修改
		$scope.updateRela = function(index){
			$scope.updRela={};
			$scope.updRela.jobName = $scope.RelasRowCollection[index].jobName;
			$scope.updRela.schedName = $scope.RelasRowCollection[index].schedName;
			$scope.updRela.jobGroup = $scope.RelasRowCollection[index].jobGroup;
			$scope.updRela.msgCode = $scope.RelasRowCollection[index].msgCode;
			$scope.updRela.remindCode = $scope.RelasRowCollection[index].remindCode;
			$uibModal
			.open({
				animation : true,
				backdrop : 'static',
				templateUrl : 'app/pages/mgrcenter/msgManage/jobMsgRelaManage/popupPages/updRela.html',
				size : 'midle-900',
				controller : 'updRelaCtrl',
				scope : $scope,
				resolve : {
				}
			});
		}
		// 删除
		$scope.removeRela=function(index){
			
			Alert.confirm("确定要删除该条记录？").then(function(){
				$scope.sysRela={};
				$scope.sysRela.jobName = $scope.RelasRowCollection[index].jobName;
				$scope.sysRela.schedName = $scope.RelasRowCollection[index].schedName;
				$scope.sysRela.jobGroup = $scope.RelasRowCollection[index].jobGroup;
				$scope.sysRela.msgCode = $scope.RelasRowCollection[index].msgCode;
				$scope.sysRela.remindCode = $scope.RelasRowCollection[index].remindCode;
				var opts = {};
				opts.url = '/crm/manage/msgmng/delJobMsg';
				opts.method = 'DELETE';
				opts.params = $scope.sysRela;
				HttpService.linkHttp(opts).then(function(response) {
					
					//toastr.success('提交完成!');
					console.log(response);
					if(response.status == 0){
						Alert.error(response.message);
					}
					$scope.searchRela();
				});
			});
		}
		

	}

}
)();
