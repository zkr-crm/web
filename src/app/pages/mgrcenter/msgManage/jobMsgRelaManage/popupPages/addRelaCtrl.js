(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.msgManage.jobMsgRelaManage').controller(
			'addRelaCtrl', addRelaCtrl);
	/** @ngInject */
	function addRelaCtrl($scope, $filter, $uibModal, $timeout, toastr, Alert, HttpService) {
		//用户信息对象
		$scope.addRela = {};
		
		
		
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
		
		
		$scope.saveValue = function(isValid) {

			if (!isValid) {
				return;
			}
			$scope.cv = $scope.addRela.msgCode.value;
			$scope.addRela.msgCode = "";
			$scope.addRela.msgCode = $scope.cv;
			
			$scope.rcv = $scope.addRela.remindCode.value;
			$scope.addRela.remindCode = "";
			$scope.addRela.remindCode = $scope.rcv;
			
			var opts = {};
			opts.url = '/crm/manage/msgmng/saveJobMsg';
			opts.method = 'POST';
			opts.params = $scope.addRela;
			HttpService.linkHttp(opts).then(function(response) {
				toastr.success('提交完成!');
				console.log(response);
				$scope.searchRela();
				// 执行查询
				$scope.$parent.$dismiss();
			});
		}
		
		// 关闭页面
		$scope.closePage = function() {
			$scope.$parent.$dismiss();
		}

	}

})();
