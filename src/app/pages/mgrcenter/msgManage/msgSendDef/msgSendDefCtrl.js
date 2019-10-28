(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.msgManage.msgSendDef').controller(
			'msgSendDefCtrl', msgSendDefCtrl);
	/** @ngInject */
	function msgSendDefCtrl($scope, $uibModal, $filter, $timeout, $http,
			HttpService, EnumType, Alert) {

		// 信息发送定义对象
		$scope.msg = {};
		// 查询条件对象
		$scope.searchObj = {};
		// 信息发送定义对象数据集
		$scope.MsgRowCollection = [];

		// 信息类型下拉框初始化
		$scope.msgTypeSelect = EnumType.msgType;
		// 信息类型下拉框显示
		$scope.ShowMsgType = function(item) {			
			var msgTypeLabel="";
			angular.forEach(EnumType.msgType, function(i) {
				if (item.msgType === i.value) {
					msgTypeLabel=i.label;
				}
			});
			return msgTypeLabel;
		};
		
		// 发送渠道下拉框初始化
		$scope.sendChannelSelect = EnumType.sendChannel;
		// 发送渠道下拉框显示
		$scope.ShowSendChannel = function(item) {
			var sendChannelLabel="";
			if(item != "" && item != null){
				var sendChannelParam = item.sendChannel.split("|");
				angular.forEach(EnumType.sendChannel, function(i) {
					angular.forEach(sendChannelParam, function(j) {
						if (j === i.value) {
							if (sendChannelLabel != ""){
								sendChannelLabel = sendChannelLabel+"，";
							}
							sendChannelLabel = sendChannelLabel + i.label;
						}
					});
			});}

			return sendChannelLabel;
		};
		
		// 发送方式下拉框初始化
		$scope.sendWaySelect = EnumType.sendWay;
		// 发送方式下拉框显示
		$scope.ShowSendWay = function(item) {			
			var sendWayLabel="";
			angular.forEach(EnumType.sendWay, function(i) {
				if (item.sendWay === i.value) {
					sendWayLabel=i.label;
				}
			});
			return sendWayLabel;
		};
		
		// 循环发送类型下拉框初始化
		$scope.loopFlagSelect = EnumType.loopFlag;
		// 循环发送类型下拉框显示
		$scope.ShowLoopFlag = function(item) {			
			var loopFlagLabel="";
			angular.forEach(EnumType.loopFlag, function(i) {
				if (item.loopFlag === i.value) {
					loopFlagLabel=i.label;
				}
			});
			return loopFlagLabel;
		};
		
		// 循环类型下拉框初始化
		$scope.loopTypeSelect = EnumType.loopType;
		// 循环类型下拉框显示
		$scope.ShowLoopType = function(item) {			
			var loopTypeLabel="";
			angular.forEach(EnumType.loopType, function(i) {
				if (item.loopType === i.value) {
					loopTypeLabel=i.label;
				}
			});
			return loopTypeLabel;
		};
		// 信息状态下拉框初始化
		$scope.msgStatSelect = EnumType.msgState;
		// 信息状态下拉框显示
		$scope.ShowMsgStat = function(item) {
			var msgStatLabel="";
			angular.forEach(EnumType.msgState, function(i) {
				if (item.msgStat === i.value) {
					msgStatLabel=i.label;
				}
			});
			return msgStatLabel;
		};
		
		// 查询事件
		$scope.searchMsg = function() {

			var opts = {};
			opts.url = '/crm/manage/msgmng/getMsgByEntity';
			opts.method = 'GET';
			opts.params = $scope.searchObj;
			HttpService.linkHttp(opts).then(function(response) {
				console.log("请求成功");
				console.log(response);
				$scope.MsgRowCollection = response.data;
                $scope.total = response.data.length;
			});
		}
		// 页面初始化查询
		$scope.searchMsg();

		// 新增事件
		$scope.addMsg = function() {
            $uibModal.open({
                animation : true,
                backdrop : 'static',
                templateUrl : 'app/pages/mgrcenter/msgManage/msgSendAdd/msgSendSet.html',
                size : 'midle-900',
                controller : 'msgSendSetCtrl',
                scope : $scope,
                resolve : {

                }
            });
		}

		// 修改事件
		$scope.updMsg = function(item) {
			$scope.msg = item;
			console.log(item);

			$uibModal
					.open({
						animation : true,
						backdrop : 'static',
						templateUrl : 'app/pages/mgrcenter/msgManage/msgSendAdd/msgSendUpd.html',
						size : 'midle-900',
						controller : 'msgSendUpdCtrl',
						scope : $scope,
						resolve : {

						}
					});
		}
		// 保存-生效
		$scope.saveMsg = function(item) {
			var opts = {};
			opts.url = '/crm/manage/msgmng/updSaveMsg';
			opts.method = 'PUT';
			opts.params = {
					msgCode : item.msgCode
			};
			HttpService.linkHttp(opts).then(function(response) {
				console.log("请求成功");
				console.log(response);
				Alert.success("信息生效！");
				// 执行查询
				$scope.searchMsg();
			});
		}
		// 物理删除事件（单行删除）
		$scope.removeMsg = function(item) {

			Alert.confirm("确定删除？").then(function() {
				var opts = {};
				opts.url = '/crm/manage/msgmng/delMsg';
				opts.method = 'DELETE';
				opts.params = {
					msgCode : item.msgCode
				};
				HttpService.linkHttp(opts).then(function(response) {
					console.log("请求成功");
					console.log(response);
					// 执行查询
					$scope.searchMsg();
				});
			});

		};

		// 物理删除事件（多行删除）
		$scope.batchRemoveMsg = function() {

			if ($scope.count == 0) {
				Alert.error('请选择要删除的行！');
			} else {

				Alert.confirm("确定删除？").then(function() {
					var opts = {};
					opts.url = '/crm/manage/msgmng/delMsgByKey';
					opts.method = 'DELETE';
					opts.params = {};
					opts.data = $scope.checkedRow;
					HttpService.linkHttp(opts).then(function(response) {
						console.log("请求成功");
						console.log(response);
						// 执行查询
						$scope.searchMsg();
					});
					$scope.checkedRow = [];
				});

				// if (Alert.confirm("确定删除？") == true) {
				//					
				// } else {
				// // 无处理
				// }
			}
		};

		$scope.checkedRow = [];
		// 全选
		$scope.selectAll = function() {
			if (!$scope.select_all) {
				$scope.checkedRow = [];
				var count = 0;
				angular.forEach($scope.MsgRowCollection, function(i) {
					i.checked = true;

					// 删除条件对象
					$scope.delObj = {
						'msgCode' : ''
					};
					$scope.delObj.msgCode = i.msgCode;

					$scope.checkedRow.push($scope.delObj);
				})
				$scope.select_all = true;
			} else {
				angular.forEach($scope.MsgRowCollection, function(i) {
					i.checked = false;
					$scope.checkedRow = [];
				})
				$scope.select_all = false;
			}
			console.log($scope.checkedRow);
		};

		// 单个选中
		$scope.selectOne = function() {
			angular.forEach($scope.MsgRowCollection, function(i) {
				var index = $scope.checkedRow.indexOf(i);
				if (i.checked && index === -1) {

					// 删除条件对象
					$scope.delObj = {
						'msgCode' : ''
					};
					$scope.delObj.msgCode = i.msgCode;

					$scope.checkedRow.push($scope.delObj);
				} else if (!i.checked && index !== -1) {
					$scope.checkedRow.splice(index, 1);
				}
			});

			if ($scope.MsgRowCollection.length === $scope.checkedRow.length) {
				$scope.select_all = true;
			} else {
				$scope.select_all = false;
			}
			console.log($scope.checkedRow);
		}

	}

})();
