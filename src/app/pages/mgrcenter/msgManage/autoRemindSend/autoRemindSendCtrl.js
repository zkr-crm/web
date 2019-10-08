(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.msgManage.autoRemindSend').controller(
			'autoRemindSendCtrl', autoRemindSendCtrl);
	/** @ngInject */
	function autoRemindSendCtrl($scope, $uibModal, $filter, $timeout, $http,
			HttpService, EnumType, Alert) {

		// 查询条件对象
		$scope.searchObj = {};
		// 站内提醒自动发送定义对象数据集
		$scope.AutoRemindSendRows = [];

		// 获取站内提醒定义列表
		$scope.getAllAutoRemindSend = function() {
			$scope.search(1);
		}
		// 新增站内提醒发送定义
		$scope.addAutoRemindSend = function() {
			$uibModal
				.open({
					animation : true,
					backdrop : 'static',
					templateUrl : 'app/pages/mgrcenter/msgManage/autoRemindSend/popup/addAutoRemindSend.html',
					size : 'midle-900',
					controller : 'addAutoRemindSendCtrl',
					scope : $scope,
					resolve : {

					}
				});
		}


		// 修改提醒发送定义
		$scope.updAutoRemindSend = function(item) {
			$scope.updateDate = angular.copy(item);
			$uibModal
				.open({
					animation : true,
					backdrop : 'static',
					templateUrl : 'app/pages/mgrcenter/msgManage/autoRemindSend/popup/updAutoRemindSend.html',
					size : 'midle-900',
					controller : 'updAutoRemindSendCtrl',
					scope : $scope,
					resolve : {

					}
				});
		}

		// 删除提醒发送定义
		$scope.removeAutoRemindSend = function(item) {

			Alert.confirm("确定删除？").then(function() {
				var opts = {};
				opts.url = '/crm/manage/autoRemind/deleteByPrimaryKey';
				opts.method = 'DELETE';
				opts.params = {
					msgId : item.msgId
				};
				HttpService.linkHttp(opts).then(function(response) {
					Alert.success("删除成功！");
					// 刷新主页面
					$scope.getAutoRemindSend();
				});
			});
		}
        $scope.search =function(page){
            page=page||1;
            $scope.queryPage(page);
        }
        var init = function () {
            $scope.$on('queryPage',function(event,queryPage){
                if(!$scope.queryPage){
                    $scope.queryPage=queryPage;
                }
            });
            $scope.searchOpts={
                pagination:{
                    pageSize:'10',
                    pageIndex:1,
                    maxText:5
                },
                url:'/crm/manage/autoRemind/getAutoRemindByEntity',
                method:'POST',
                params:$scope.searchObj,
                success:function(response){
                    if (response == undefined || response.data == undefined) {
                        return;
                    }
                    $scope.AutoRemindSendRows = response.data.list;
                }
            }

        }
        init();

	}

})();
