(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.msgManage.autoRemindSend')
			.controller('updAutoRemindSendCtrl', updAutoRemindSendCtrl);
	/** @ngInject */
	function updAutoRemindSendCtrl($scope, $uibModal, $filter, $timeout, $http,
			HttpService, EnumType, Alert) {

		// 获取消息模板的内容
		$scope.getMsgTplContent = function() {
			var opts = {};
			opts.url = '/crm/manage/msgmng/getMsgConfTmpt';
			opts.method = 'GET';
			opts.params = {
				'tplNo' : $scope.autoRemindSend.msgTemplate
			}
			HttpService.linkHttp(opts).then(function(response) {
				$scope.autoRemindSend.msgContent = response.data.tplCont;
			});
		}

		// 保存
		$scope.saveValue = function() {
			if(!$scope.autoRemindSend.msgEventType){
				Alert.error('事件不能为空');
				return
			}
			if(!$scope.autoRemindSend.msgDescrption){
				Alert.error('事件描述不能为空');
				return
			}
			if(!$scope.autoRemindSend.msgAdvdays){
				Alert.error('提前天数不能为空');
				return
			}else if(isNaN(parseInt($scope.autoRemindSend.msgAdvdays))){
				Alert.error('提前天数只能输入整数');
				return
			}
			if(!$scope.autoRemindSend.msgTitle){
				Alert.error('站内提醒模板标题不能为空');
				return
			}
			if(!$scope.autoRemindSend.msgTplCont){
				Alert.error('站内提醒模板不能为空');
				return
			}
			var opts = {};
			opts.url = '/crm/manage/autoRemind/updAutoRemind';
			opts.method = 'PUT';
			opts.params = $scope.autoRemindSend;
			HttpService.linkHttp(opts).then(function(response) {
				Alert.success("修改成功");
				$scope.$parent.$dismiss();
				// 刷新主页面
				$scope.getAllAutoRemindSend();
			});
		}

		// 任务状态下拉列表事件
		$scope.selectEventTypeState = function(EventTypeList) {
			console.log(EventTypeList.value)
			$scope.autoRemindSend.msgEventType = EventTypeList.value;
		}

			// 获取任务状态列表
		$scope.getTaskStates = function() {
			if (!!EnumType.EventType) {
				$scope.EventTypeList.push(EnumType.EventType.birthday);
				$scope.EventTypeList.push(EnumType.EventType.renewal_insurance);
				$scope.EventTypeList.push(EnumType.EventType.memorial_day);
				$scope.EventTypeList.push(EnumType.EventType.bad_weather);
				$scope.selectedEventTypeState = $scope.EventTypeList.filter(function (x) {
					return x.label === $scope.updateDate.msgEventType
				})[0];
			}
		}

		// 关闭页面
		$scope.closePage = function() {
			$scope.$parent.$dismiss();
		}

		// 模板选择
		$scope.selectTemplate = function() {
			var modalInstance = $uibModal
					.open({
						animation : true,
						backdrop : 'static',
						templateUrl : 'app/pages/mgrcenter/msgManage/autoRemindSend/popup/selAutoRemindSendTmpt.html',
						size : 'midle-1200',
						controller : 'selAutoRemindSendTmptCtrl',
						scope : $scope,
						resolve : {
							items : function() {
								return $scope.items;
							}

						}
					});
			modalInstance.result.then(function(result) {
				$scope.autoRemindSend.msgTemplate = result.tplNo; // 模板代码
				$scope.autoRemindSend.msgTplCont = result.tplCont; // 模板内容
				$scope.autoRemindSend.msgTitle = result.tplTitle; // 模板标题

				console.log(result); // result关闭是回传的值
			}, function(reason) {
				console.log(reason);// 点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel

			});

		}

		// 页面数据初始化
		$scope.initData = function() {
			console.log("---------初始化---------start--------");
			$scope.autoRemindSend = $scope.updateDate;
			// 获取消息模板内容
			$scope.getMsgTplContent();
			//下拉集合
			$scope.EventTypeList = [];
			$scope.selectedEventTypeState= '';
			$scope.getTaskStates();
			console.log("---------初始化---------end--------");
		}
		$scope.initData();
	}

})();
