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
			};

			HttpService.linkHttp($scope.myCusOptions);
		}
	    // 事件提醒列表
		$scope.myEventOptions =function(){
			$scope.myEventOptions.url = '/crm/query/homeCenterCtrl/getMyEventByEntity';
			$scope.myEventOptions.method = 'POST';
			$scope.myEventOptions.params = {};
			$scope.myEventOptions.success = function successCallback(response) {
				$scope.eventList = response.data;
			};

			HttpService.linkHttp($scope.myEventOptions);
		}
	    // 续保列表
		$scope.myRenewalOptions =function(){
			$scope.myRenewalOptions.url = '/crm/query/homeCenterCtrl/getMyRenewalByEntity';
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
        $scope.openRenewDetail = function (item) {
            /*$state.go('portrayal.perCusPortrayal',{'custNo':item.clientCode});*/
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
