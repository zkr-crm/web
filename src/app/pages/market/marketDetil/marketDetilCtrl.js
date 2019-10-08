(function() {
	'use strict';

	angular.module('BlurAdmin.pages.market.marketDetil').controller('marketDetilCtrl', marketDetilCtrl);

	/** @ngInject */
	function marketDetilCtrl($scope, $state, $stateParams, $uibModal, Alert) {

		$scope.activInfo = $stateParams.activInfo;

		//div是否显示
		$scope.isShow = true;
		if($scope.activInfo.activeType=="自动"){
			$scope.isShow= false;
		}else if($scope.activInfo.activeType=="人工"){
			$scope.isShow = true;
		}
		
		/* 活动报名人员信息 */
		$scope.personList = [];
		for (var i = 0; i < 12; i++) {
			var personObj = {};

			personObj.seqNo = "序号-" + i;
			personObj.name = "姓名-" + i;
			personObj.sex = "性别-" + i;
			personObj.age = "年龄-" + i;
			personObj.phone = "电话-" + i;
			personObj.address = "家庭地址-" + i;
			personObj.singTime = "报名时间-" + i;
			personObj.isFormalCust = "是否正式客户-" + i;
			$scope.personList.push(personObj);
		}
		// 记录条数
		$scope.personTotal = $scope.personList.length;

		// 活动群发消息列表
		$scope.GroupMsgList = [];
		for (var i = 0; i < 12; i++) {
			var msgObj = {};

			msgObj.msgTitle = "消息主题" + i;
			msgObj.msgContent = "消息内容" + i;
			msgObj.sendChannel = "发送渠道" + i;
			msgObj.sendTime = "发送时间" + i;
			$scope.GroupMsgList.push(msgObj);
		}
		$scope.msgTotal = $scope.GroupMsgList.length;

		// 反馈意见列表
		$scope.feedBackList = [];
		for (var i = 0; i < 12; i++) {
			var feedBackObj = {};

			feedBackObj.name = "客户姓名" + i;
			feedBackObj.isFormalCust = "是否正式客户" + i;
			feedBackObj.custLevel = "客户等级" + i;
			feedBackObj.activSuggest = "活动意见" + i;
			feedBackObj.feedBackTime = "反馈时间" + i;
			feedBackObj.isDispos = "是否已处理" + i;
			$scope.feedBackList.push(feedBackObj);
		}
		$scope.feedBackTotal = $scope.feedBackList.length;

		// 活动信息修改窗口弹出
		$scope.editActivInfo = function() {
			var modalInstance = $uibModal.open({
				animation : true,
				backdrop : 'static',
				templateUrl : 'app/pages/market/marketDetil/popUps/editMarketInfo.html',
				size : 'midle-900',
				controller : 'editMarketInfoCtrl',
				scope : $scope
			});
		}

		// 选中行对象
		$scope.checkedRow = [];
		$scope.select_all = false;
		// 全选
		$scope.selectAll = function() {
			if (!$scope.select_all) {
				$scope.checkedRow = [];
				var count = 0;
				angular.forEach($scope.personList, function(i) {
					i.isChecked = true;

					// 选中对象
					$scope.checkedRow.push(i);
				})
				$scope.select_all = true;
			} else {
				angular.forEach($scope.personList, function(i) {
					i.isChecked = false;
					$scope.checkedRow = [];
				})
				$scope.select_all = false;
			}
		};

		// 单个选中
		$scope.selectOne = function() {
			angular.forEach($scope.personList, function(i) {
				var index = $scope.checkedRow.indexOf(i);
				if (i.isChecked && index === -1) {
					// 选中对象
					$scope.checkedRow.push(i);
				} else if (!i.isChecked && index !== -1) {
					$scope.checkedRow.splice(index, 1);
				}
			});
			if ($scope.personList.length === $scope.checkedRow.length) {
				$scope.select_all = true;
			} else {
				$scope.select_all = false;
			}
		}

		// 创建群发消息
		$scope.sendMsg = function() {
			if ($scope.checkedRow.length == 0) {
				Alert.error('请选择发送信息的客户！');
				return;
			}
			$uibModal.open({
				animation : true,
				backdrop : 'static',
				templateUrl : 'app/pages/market/marketDetil/popUps/sendMsg.html',
				size : 'midle-900',
				controller : 'sendMsgCtrl',
				scope : $scope,
				resolve : {

				}
			});
		}

		// 录入活动参与者反馈
		$scope.entryFeedBack = function() {
			$uibModal.open({
				animation : true,
				backdrop : 'static',
				templateUrl : 'app/pages/market/marketDetil/popUps/entryFeedBack.html',
				size : 'midle-900',
				controller : 'entryFeedBackCtrl',
				scope : $scope,
				resolve : {

				}
			});
		}

		// 生成正式客户
		$scope.addUser = function() {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'app/pages/portrayal/custDetailAdd/custDetailAdd.html',
				controller : 'custDetailAddCtrl',
				size : 'midle-900', 
				backdrop : 'static',
				resolve : {
					'custNo' : function() {}
				}
			});
			modalInstance.result.then(function() {
				$scope.searchUser();
			});
		};

		// 生成商机
		$scope.addBusiOpp = function() {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'app/pages/busiopp/popupPages/addBusiOpp.html',
				controller : 'addBusiOppCtrl',
				size : 'midle-900',
				backdrop : 'static',
				scope : $scope,
				resolve : {
					'optTyp' : function() {
						return 'local';
					},
					'custNo' : function() {
						return '';
					}
				}
			});
			modalInstance.result.then(function() {
				$scope.selectBusiOpp();
			});
		};

		// 任务列表
		$scope.taskList = [];
		for (var i = 0; i < 12; i++) {
			var taskObj = {};

			taskObj.seqNo = "序号" + i;
			taskObj.taskName = "任务名称" + i;
			taskObj.startTime = "开始时间" + i;
			taskObj.endTime = "结束时间" + i;
			taskObj.budget = "预算" + i;
			taskObj.chargePerson = "负责人" + i;
			$scope.taskList.push(taskObj);
		}

		// 生成任务
		$scope.addTask = function() {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'app/pages/market/marketDetil/popUps/addTask.html',
				controller : 'addTaskCtrl',
				size : 'midle-900',
				backdrop : 'static',
				scope : $scope,
				resolve : {}
			});
		};

	}

})();
