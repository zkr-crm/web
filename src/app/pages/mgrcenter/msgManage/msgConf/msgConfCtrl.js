(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.msgManage.msgConf').controller(
			'msgConfCtrl', msgConfCtrl);
	/** @ngInject */
	function msgConfCtrl($scope, $uibModal, $filter, $timeout, $http,
			HttpService, EnumType, Alert,toastr) {

		// 查询条件对象
		//$scope.searchObj = {};
		// 短信自动发送定义对象数据集
		$scope.MsgConfRows = [];
		// 重置
		$scope.clearMsgConfSearch = function() {
			$scope.searchObj = {
				'msgId' : '',
				'msgEventType' : '',
				'msgDescrption' : ''
			};
		}
		// 获取任务状态列表
		$scope.getTaskStates = function() {
			if (!!EnumType.EventType) {
				$scope.EventTypeList.push(EnumType.EventType.birthday);
				$scope.EventTypeList.push(EnumType.EventType.renewal_insurance);
				//$scope.EventTypeList.push(EnumType.EventType.memorial_day);
				//$scope.EventTypeList.push(EnumType.EventType.bad_weather);
			}
		}

		// 获取短信定义列表
		$scope.getAllMsgConf = function() {
			$scope.search(1);
		}
		// 新增短信发送定义
		$scope.addMsgConf = function() {
			$uibModal
				.open({
					animation : true,
					backdrop : 'static',
					templateUrl : 'app/pages/mgrcenter/msgManage/msgConf/popup/addMsgConf.html',
					size : 'midle-900',
					controller : 'addMsgConfCtrl',
					scope : $scope,
					resolve : {

					}
				});
		}


		// 修改短信发送定义
		$scope.updMsgConf = function(item) {

			$scope.updateDate = angular.copy(item);

			$uibModal
				.open({
					animation : true,
					backdrop : 'static',
					templateUrl : 'app/pages/mgrcenter/msgManage/msgConf/popup/updMsgConf.html',
					size : 'midle-900',
					controller : 'updMsgConfCtrl',
					scope : $scope,
					resolve : {

					}
				});
		}

		// 删除提醒发送定义
		$scope.removeMsgConf = function(item) {

			Alert.confirm("确定删除？").then(function() {
				var opts = {};
				opts.url = '/crm/manage/msgConf/deleteByPrimaryKey';
				opts.method = 'DELETE';
				opts.params = {
					msgId : item.msgId
				};
				HttpService.linkHttp(opts).then(function(response) {
                    toastr.success("删除成功！");
					// 刷新主页面
					$scope.getAllMsgConf();
				});
			});
		}
        $scope.search =function(page){
			//$scope.searchOpts.params = angular.copy($scope.searchObj);
			//$scope.searchOpts.params.msgEventType = $scope.searchObj.msgEventType?$scope.searchObj.msgEventType.value:"";
			$scope.searchOpts.params ={
				'msgId': $scope.searchObj.msgId,
				'msgEventType': $scope.searchObj.msgEventType?$scope.searchObj.msgEventType.value:"",
				'msgDescrption': $scope.searchObj.msgDescrption
			};
			page=page||1;
            $scope.queryPage(page);
        }
        var init = function () {
            $scope.$on('queryPage',function(event,queryPage){
                if(!$scope.queryPage){
                    $scope.queryPage=queryPage;
                }
            });
			$scope.searchObj = {};
			$scope.searchOpts = {};
            $scope.searchOpts={
                pagination:{
                    pageSize:'10',
                    pageIndex:1,
                    maxText:5
                },
                url:'/crm/manage/msgConf/getMsgConfByEntity',
                method:'POST',
                params:$scope.searchObj,
                success:function(response){
                    if (response == undefined || response.data == undefined) {
                        return;
                    }
                    $scope.MsgConfRows = response.data.list;
                }
            }
			$scope.EventTypeList = [];
			$scope.getTaskStates();
        }
        init();
	}

})();
