(function() {
	'use strict';

	angular.module('BlurAdmin.pages.myHome').controller('MyHomeCtrl', MyHomeCtrl);

	/** @ngInject */
	function MyHomeCtrl($scope, $state, $stateParams, $rootScope, $uibModal, EnumType, HttpService) {

		// 获取待审批任务
		$scope.myQueryOptions =function(){

			$scope.myQueryOptions.url = '/crm/ecif/homeCenterCtrl/getMyTaskByEntity';
			$scope.myQueryOptions.method = 'POST';
			$scope.myQueryOptions.params = {};
            $scope.myQueryOptions.data={
                "dealUser":$rootScope.global.employeeId,
                taskState: EnumType.SimTaskState.merge_apply.value + ","
                + EnumType.SimTaskState.close_apply.value+ ","
				+EnumType.SimTaskState.split_apply.value
			}
			$scope.myQueryOptions.success = function successCallback(response) {
				$scope.approvalList = response.data.list.map(function (item) {
                    item.taskStateName = EnumType.SimTaskState.getLabelByValue(item.taskState);
                    if(item.taskState==EnumType.SimTaskState.split_apply.value){
                        item.applyUser=item.splitDealUser;
					}else{
                        item.applyUser=item.dealUser;
					}
                    return item;
                });
				// 审批列表申请时间截取年月日
				angular.forEach($scope.approvalList, function(
					i) {
					if(i.taskCreateTime!=null && i.taskCreateTime.length>=10) {
						i.taskCreateTime = i.taskCreateTime.substring(0, 10);
					}
				});
			};

			HttpService.linkHttp($scope.myQueryOptions);
		}
		// 客户地址不详的客户列表
		$scope.myCusOptions =function(){
			$scope.myCusOptions.url = '/crm/ecif/homeCenterCtrl/getMyCusByEntity';
			$scope.myCusOptions.method = 'POST';
			$scope.myCusOptions.params = {};
			$scope.myCusOptions.success = function successCallback(response) {
				$scope.cusList = response.data;
				// 客户地址不详的客户列表日期截取年月日
				angular.forEach($scope.cusList, function(
					i) {
					if(i.createDate!=null && i.createDate.length>=10) {
						i.createDate = i.createDate.substring(0, 10);
					}
				});
			};
			HttpService.linkHttp($scope.myCusOptions);
		}
	    // 事件提醒列表
		$scope.myEventOptions =function(){
			$scope.myEventOptions.url = '/crm/manage/homeCenterCtrl/getMyEventByEntity';
			$scope.myEventOptions.method = 'POST';
			$scope.myEventOptions.params = {isRead:0};
			$scope.myEventOptions.success = function successCallback(response) {
				$scope.eventList = response.data;
			};

			HttpService.linkHttp($scope.myEventOptions);
		}
	    // 续保列表
		$scope.myRenewalOptions =function(){
			$scope.myRenewalOptions.url = '/crm/manage/homeCenterCtrl/getMyRenewalByEntity';
			$scope.myRenewalOptions.method = 'POST';
			$scope.myRenewalOptions.params = {};
			$scope.myRenewalOptions.success = function successCallback(response) {
				$scope.renwalList = response.data;
			};

			HttpService.linkHttp($scope.myRenewalOptions);
		}
        $scope.openCustemDetail = function (item) {
            $state.go('portrayal.perCusPortrayal',{'custNo':item.custNo});
        }
        $scope.openRenewDetail = function (item, type) {
            $scope.remindDetail = item;
            $scope.remindDetail.isRead = '0';
            $scope.remindDetail.source = 'myHome';
            $scope.remindDetail.type = type;
            $uibModal.open({
                    animation : true,
                    backdrop : 'static',
                    templateUrl : 'app/pages/mgrcenter/msgManage/appMsgMng/popup/remindDetail.html',
                    size : 'midle-900',
                    controller : 'remindDetailCtrl',
                    scope : $scope
                });
        }
        $scope.showTaskDetail = function (item) {
			if(item.taskState!=EnumType.SimTaskState.split_apply.value){
                $state.go('similar.mergeDetail', {
                    'taskId' : item.taskId
                });
			}else{
                $state.go('similar.splitApproveDetail', {
                    'taskId' : item.taskId
                });
			}
        }
		$scope.init=function(){
			// 获取待审批任务
			$scope.myQueryOptions();
			// 客户地址不详的客户列表
			$scope.myCusOptions();
			// 事件提醒列表
			$scope.myEventOptions();
			//续保
			$scope.myRenewalOptions();
		}
		$scope.init();

	}

})();
