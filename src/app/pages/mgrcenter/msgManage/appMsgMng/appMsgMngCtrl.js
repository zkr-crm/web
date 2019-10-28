(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.msgManage.appMsgMng').controller(
		'appMsgMngCtrl', appMsgMngCtrl);
	/** @ngInject */
	function appMsgMngCtrl($scope, $uibModal, $filter, $timeout, $http,
						   $rootScope, $stateParams, HttpService, EnumType, Alert,toastr) {
		// 重置
		$scope.clearAppMailSearch = function() {
			$scope.mailSearchObj.sendUser="";
			$scope.mailSearchObj.selected="";
			$scope.select("");
		}
		$scope.clearAppRemindSearch = function() {
			$scope.remindSearchObj.selected="";
			$scope.select("");
		}
		if ($stateParams.activeTab !== undefined
			&& $stateParams.activeTab !== ''
			&& $stateParams.activeTab !== null) {
			$scope.activeTab = $stateParams.activeTab;
		} else {
			$scope.activeTab = 0;
		}
		$scope.remindSearchObj = {};
		$scope.isReadSelect = EnumType.isRead;

		if ($stateParams.selected !== undefined
			&& $stateParams.selected !== ''
			&& $stateParams.selected !== null) {
			$scope.selected = $scope.isReadSelect.filter(function(x){
				return x.value === $stateParams.selected
			})[0];
		} else {
			$scope.selected = '';
		}

		// 是否已读标志
		$scope.getIsRead = function(value) {

			if ('0' === value) {
				return '未读';
			} else {
				return '已读';
			}
		}
        $scope.changeTab=function(x){
            $scope.activeTab = x;
		}
		// 是否已读选中事件
		$scope.select = function(selected) {
			$scope.selected = selected;
			if ($scope.activeTab === 0) {
				$scope.mailSearchObj.isRead = selected!=null?selected.value:'';
			} else {
				$scope.remindSearchObj.isRead = selected!=null?selected.value:'';
			}
		}

		if ($stateParams.selected !== undefined
			&& $stateParams.selected !== ''
			&& $stateParams.selected !== null) {
			$scope.selected = $stateParams.selected;
			$scope.remindSearchObj.isRead = $stateParams.selected;
		}


		// 所有提醒消息
		$scope.remindMsgs = [];

		// 查询当前登录用户的站内信和站内提醒
		$scope.getEmployeeId = function() {

			var opts = {};
			opts.url = '/crm/manage/usermng/user';
			opts.method = 'GET';
			opts.params = {
				userID : $rootScope.global.user
			};
			HttpService.linkHttp(opts).then(function(response) {
				var userInfo = response.data;

				// 站内提醒查询事件
				$scope.remindSearchObj.employeeId = userInfo.employeeId;
				$scope.searchRemind();
				// 站内信查询事件
				$scope.mailSearchObj.employeeId = userInfo.employeeId;
				$scope.searchAppMail();
			});
		};
		$scope.getEmployeeId();

		// 站内提醒查询事件
		$scope.searchRemind = function() {

			/*var opts = {};
			opts.url = '/crm/manage/msgmng/getAppRemindByEntity';
			opts.method = 'GET';
			if($scope.selected && $scope.selected !=''){
				$scope.remindSearchObj.isRead = $scope.selected.value;
			}
			opts.params = $scope.remindSearchObj;
			HttpService.linkHttp(opts).then(function(response) {
				$scope.RemindCollection = response.data;
				$scope.remindTotal = response.data.length;
			});*/
			$scope.search(1);
		}
		// 创建新站内信
		$scope.addAppMail = function() {
			$uibModal
				.open({
					animation : true,
					backdrop : 'static',
					templateUrl : 'app/pages/mgrcenter/msgManage/appMsgMng/popup/addAppMail.html',
					size : 'midle-900',
					controller : 'addAppMailCtrl',
					scope : $scope,
					resolve : {

					}
				});
		}

		// 查看站内提醒详情
		$scope.openRemindDetail = function(item) {

			$scope.remindDetail = item
			$uibModal
				.open({
					animation : true,
					backdrop : 'static',
					templateUrl : 'app/pages/mgrcenter/msgManage/appMsgMng/popup/remindDetail.html',
					size : 'midle-900',
					controller : 'remindDetailCtrl',
					scope : $scope,
					resolve : {

					}
				});
		}

		// 删除站内提醒
		$scope.removeRemind = function(item) {
			Alert.confirm("确定删除？").then(function() {
				var opts = {};
				opts.url = '/crm/manage/msgmng/delRemindMsg';
				opts.method = 'DELETE';
				opts.params = {
					remindId : item.remindId
				};
				HttpService.linkHttp(opts).then(function(response) {
                    toastr.success("删除成功");
					// 刷新页面查询
					$scope.searchRemind();
				});
			});
		}

		// 查询条件重置
		$scope.resetRemind = function() {
			$scope.remindSearchObj = {};
			$scope.selected = '';
			$scope.remindSearchObj.isRead = '0';
		}
		/** ******************************站内信的分隔线****************************************** */

			// 站内信查询条件对象
		$scope.mailSearchObj = {};

		// 显示站内信类型
		$scope.ShowMailAttr = function(item) {
			var mailAttr = "";
			angular.forEach(EnumType.mailType, function(i) {
				if (item.mailAttr === i.value) {
					mailAttr = i.label;
				}
			});
			return mailAttr;
		}
		if ($stateParams.selected !== undefined
			&& $stateParams.selected !== ''
			&& $stateParams.selected !== null) {
			$scope.selected = $stateParams.selected;
			$scope.mailSearchObj.isRead = $stateParams.selected;
		}

		// 站内信查询事件
		$scope.searchAppMail = function() {
			/*var opts = {};
			opts.url = '/crm/manage/msgmng/getAppMailByEntity';
			opts.method = 'GET';
			opts.params = $scope.mailSearchObj;
            opts.params.sys={
                pageNum:1
			};
			HttpService.linkHttp(opts).then(function(response) {
				$scope.MailCollection = response.data.list;
			});*/
            $scope.search(1);
		}

		// 站内信重置时间
		$scope.resetAppMail = function() {

		}

		// 删除站内信
		$scope.removeMail = function(item) {
			Alert.confirm("确定删除？").then(function() {
				var opts = {};
				opts.url = '/crm/manage/msgmng/delAppMail';
				opts.method = 'DELETE';
				opts.params = {
					mailId : item.mailId
				};
				HttpService.linkHttp(opts).then(function(response) {
                    toastr.success("删除成功");
					// 刷新页面查询
					$scope.searchAppMail();
				});
			});
		}

		// 查看站内信详情
		$scope.openMailDetail = function(item) {

			$scope.mailDetail = item
			$uibModal.open({
				animation : true,
				backdrop : 'static',
				templateUrl : 'app/pages/mgrcenter/msgManage/appMsgMng/popup/mailDetail.html',
				size : 'midle-900',
				controller : 'mailDetailCtrl',
				scope : $scope,
				resolve : {

				}
			});
		}
        $scope.search =function(page){
            page=page||1;
            //$scope.queryPage(page);
			if($scope.activeTab==0){
                $scope.queryList["searchAppMailOpts"](page);
			}else{
                $scope.queryList["searchRemindOpts"](page);
			}

        }
        $scope.queryList=[];
        var init = function () {
            $scope.$on('queryPage',function(event,queryPage){
                var optsType=event.targetScope.optsType
                $scope.queryList[optsType]=queryPage;
            });
            $scope.searchAppMailOpts={
                pagination:{
                    pageSize:'10',
                    pageIndex:1,
                    maxText:5
                },
                url:'/crm/manage/msgmng/getAppMailByEntity',
                method:'GET',
                params:$scope.mailSearchObj,
                success:function(response){
                    if (response == undefined || response.data == undefined) {
                        return;
                    }
                    $scope.MailCollection = response.data.list;
                }
            }
            $scope.searchRemindOpts={
                pagination:{
                    pageSize:'10',
                    pageIndex:1,
                    maxText:5
                },
                url:'/crm/manage/msgmng/getAppRemindByEntity',
                method:'GET',
                params:$scope.remindSearchObj,
                success:function(response){
                    if (response == undefined || response.data == undefined) {
                        return;
                    }
                    $scope.RemindCollection = response.data.list;
                }
			}
        }
        init();
	}
})();
