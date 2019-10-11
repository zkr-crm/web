(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.msgManage.jobMsgRelaManage').controller(
			'updRelaCtrl', updRelaCtrl);
	/** @ngInject */
	function updRelaCtrl($scope, $filter, $uibModal, $timeout, HttpService,
			toastr, EnumType, Alert) {
		

		//加载消息定义信息组成枚举
		$scope.msgDefT = [];
		var optsForMsg = {};
		optsForMsg.url = '/crm/manage/msgmng/getMsgByEntity';
		optsForMsg.method = 'GET';
		HttpService.linkHttp(optsForMsg).then(function(response) {
			angular.forEach(response.data, function(item) {
				$scope.msgDefT.push({ label : item.msgTopic, value : item.msgCode });
				if( $scope.updRela.msgCode ==  item.msgTopic || $scope.updRela.msgCode ==  item.msgCode ){
					$scope.updRela.msgCode = "";
					$scope.updRela.msgCode = { label : item.msgTopic, value : item.msgCode };
				}
			})
			
			$scope.msgCodes = $scope.msgDefT;
		});
		
		
		//加载提醒定义信息组成枚举
		$scope.remDefT = [];
		var optsForRem = {};
		optsForRem.url = '/crm/manage/msgmng/getRemindDefByEntity';
		optsForRem.method = 'GET';
		HttpService.linkHttp(optsForRem).then(function(resp) {
			angular.forEach(resp.data, function(item) {
				$scope.remDefT.push({ label : item.remindTopic, value : item.ruleId });
				if( $scope.updRela.remindCode ==  item.remindTopic || $scope.updRela.remindCode ==  item.ruleId ){
					$scope.updRela.remindCode = "";
					$scope.updRela.remindCode = { label : item.remindTopic, value : item.ruleId };
				}
			})
			
			$scope.remCodes = $scope.remDefT;
		});
		
		$scope.saveValue = function(isValid) {

			if (!isValid) {
				return;
			}
			

			$scope.cv = $scope.updRela.msgCode.value;
			$scope.updRela.msgCode = "";
			$scope.updRela.msgCode = $scope.cv;
			
			$scope.rcv = $scope.updRela.remindCode.value;
			$scope.updRela.remindCode = "";
			$scope.updRela.remindCode = $scope.rcv;
			
			var opts = {};
			opts.url = '/crm/manage/msgmng/updateJobMsg';
			opts.method = 'PUT';
			opts.params = $scope.updRela;
			HttpService.linkHttp(opts).then(function(response) {
				console.log("请求成功");
				console.log(response);
				$scope.updRela = {};
				// 执行查询
				$scope.searchRela();
				$scope.$parent.$dismiss();
			});
		}

	}

})();
