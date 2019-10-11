(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.msgManage.remindSendDef')
			.controller('remindSendDefCtrl', remindSendDefCtrl);
	/** @ngInject */
	function remindSendDefCtrl($scope, $uibModal, $filter, $timeout, $http,
			HttpService, EnumType, Alert) {

		// 查询条件对象
		$scope.searchObj = {};
		// 提醒发送定义对象数据集
		$scope.RemindDefRows = [];

		// 获取提醒定义列表
		$scope.getAllRemindDef = function() {

			var opts = {};
			opts.url = '/crm/manage/msgmng/getRemindDefByEntity';
			opts.method = 'GET';
			opts.params = $scope.searchObj;
			HttpService.linkHttp(opts).then(function(response) {
				console.log("请求成功");
				console.log(response);
				$scope.RemindDefRows = response.data;
				$scope.total = response.data.length;
			});
		}

		$scope.getAllRemindDef();

		// 新增提醒发送定义
		$scope.addRemindDef = function() {
			$uibModal
					.open({
						animation : true,
						backdrop : 'static',
						templateUrl : 'app/pages/mgrcenter/msgManage/remindSendDef/popup/addRemindDef.html',
						size : 'midle-900',
						controller : 'addRemindDefCtrl',
						scope : $scope,
						resolve : {

						}
					});
		}

		// 修改提醒发送定义
		$scope.updRemindDef = function(item) {

			$scope.updateDate = item;

			$uibModal
					.open({
						animation : true,
						backdrop : 'static',
						templateUrl : 'app/pages/mgrcenter/msgManage/remindSendDef/popup/updRemindDef.html',
						size : 'midle-900',
						controller : 'updRemindDefCtrl',
						scope : $scope,
						resolve : {

						}
					});
		}

		// 删除提醒发送定义
		$scope.removeRemindDef = function(item) {

			Alert.confirm("确定删除？").then(function() {
				var opts = {};
				opts.url = '/crm/manage/msgmng/delRemindDefMsg';
				opts.method = 'DELETE';
				opts.params = {
					ruleId : item.ruleId
				};
				HttpService.linkHttp(opts).then(function(response) {
					Alert.success("删除成功！");
					// 刷新主页面
					$scope.getAllRemindDef();
				});
			});
		}

		// 显示是否当日提醒
		$scope.ShowIsSameDay=function(item) {
			
			var isSameDay="";
			angular.forEach(EnumType.YesNoFlg, function(i) {
				if (item.isSameDay === i.value) {
					isSameDay=i.label;
				}
			});
			
			return isSameDay;
		}

		// 显示提醒级别
		$scope.ShowremindLevel=function(item) {
			
			var remindLevel="";
			angular.forEach(EnumType.Rating, function(i) {
				if (item.remindLevel === i.value) {
					remindLevel=i.label;
				}
			});
			
			return remindLevel;
		}

		/** ****************************************************************** */

	}

})();
