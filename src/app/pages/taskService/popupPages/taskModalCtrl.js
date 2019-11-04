(function() {
	'use strict';

	angular.module('BlurAdmin.pages.taskService.allTask').controller(
			'taskTaskModalCtrl', allTaskTaskModalCtrl);
	/** @ngInject */
	function allTaskTaskModalCtrl($scope, $filter, $uibModal, $timeout, HttpService,
			toastr, EnumType, Alert, custNo) {
    	$scope.open = open;
        $scope.opened = false;
	     // 打开日期控件
	    function open() {
	        $scope.opened = true;
	    }

		$scope.endDateChange=function(){
			if ($scope.saveTask.taskEndDate != null && $scope.saveTask.taskEndDate != '') {
				var endDate = new Date($scope.saveTask.taskEndDate);
				var date=new Date();
				if(date>=endDate){
					$scope.saveTask.taskEndDate=null;
					Alert.error('任务截止日期必须大于当前日期');
				}
			}
		}

		$scope.onload = function(){
			$scope.isPerCusPortrayal = false;
			$scope.taskStatv = EnumType.TaskStat.getEnumByValue($scope.saveTask.taskStat||EnumType.TaskStat.in_progress.value);
			$scope.saveTask.taskStat = $scope.taskStatv;
			$scope.taskStat = EnumType.TaskStat;
            if($scope.saveTask.taskEndDate != null) {
            	var endTime = $scope.saveTask.taskEndDate ;
            	var v = new Date(endTime);
            	$scope.saveTask.taskEndDate = v;
            }
			$scope.taskTypev = EnumType.TaskType.getEnumByValue($scope.saveTask.taskType);
			$scope.saveTask.taskType = $scope.taskTypev;
			$scope.taskType = EnumType.TaskType;
			if (custNo) {
				$scope.saveTask.custName = custNo.custName;
				$scope.saveTask.custId = custNo.custNo;
				$scope.isPerCusPortrayal = true;
			}
			
		}
		
		$scope.onload();

		$scope.saveValue = function( isValid ) {
			if($scope.saveTask.taskDesc){
				if($scope.saveTask.taskDesc.length >500){
					Alert.error("任务说明最大不能超过500字");
					return
				}
			}
			if(!$scope.saveTask.taskType){
                 Alert.error("任务类别不能为空");
                 return
			}
			if(!$scope.saveTask.taskName){
                 Alert.error("任务名称不能为空");
                 return
			}
			if(!$scope.saveTask.taskStat){
                 Alert.error("任务状态不能为空");
                 return
			}
			if(!$scope.saveTask.taskType){
                 Alert.error("任务类别不能为空");
                 return
			}
			if(!$scope.saveTask.taskEndDate){
                 Alert.error("任务截止时间不能为空");
                 return
			}
			if(!$scope.saveTask.custName){
                 Alert.error("关联客户不能为空");
                 return
			}
			if(!$scope.saveTask.responsName){
                 Alert.error("负责人不能为空");
                 return
			}
			if (!isValid) {
				return;
			}
			if($scope.saveTask.taskType){
				$scope.v = $scope.saveTask.taskType.value;
				$scope.saveTask.taskType = "";
				$scope.saveTask.taskType = $scope.v;
			}
			if($scope.saveTask.taskStat){
				$scope.v2 = $scope.saveTask.taskStat.value;
				$scope.saveTask.taskStat = "";
				$scope.saveTask.taskStat = $scope.v2;
			}
			
			var opts = {};
			if($scope.isUpd == "true"){
				opts.url = '/crm/ocrm/task/putOne';
				opts.method = 'PUT';
			}else{
				opts.url = '/crm/ocrm/task/postOne';
				opts.method = 'POST';
			}
			opts.params = angular.copy($scope.saveTask);
			if ($scope.saveTask.taskEndDate != null) {
				var taskEndDate = new Date($scope.saveTask.taskEndDate);
				opts.params.taskEndDate = $filter('date')(taskEndDate, 'yyyy-MM-dd'); 
			}

			HttpService.linkHttp(opts).then(function(response) {
				toastr.success('提交完成!');
				$scope.saveTask = {};
				$scope.searchTask();
				$scope.closePage();
			});
		}

		$scope.closePage = function() {
			//modify by linbangbo 20190903 begin页面被重复调用，不一定存在父节点弹窗
			try{
                $scope.$parent.$dismiss();
			}catch(e){
                $scope.$dismiss();
			}
            //modify by linbangbo 20190903 end 页面被重复调用，不一定存在父节点弹窗

		}
        // 选择联系人
		$scope.selectCntrDlg = function() {
	          var modalInstance = $uibModal.open({
	              animation: true,
						              templateUrl : 'app/pages/customer/custContract/popupPages/selectCntrDlg.html',
	              controller: 'selectCntrDlgCtrl',
	              size: 'midle-900', // 
	              backdrop:'static',
	              resolve: {
	                  'checkedRow': function () {
	                      return '';
	                  }
	              }
	          });
	          modalInstance.result.then(function(result){
	        	  if (result == undefined || result == '') {
	        		  return;
	        	  }
	        	  // 回调
	        	  $scope.saveTask.contactId = result.contractNo; // 存放联系人编码
	        	  $scope.saveTask.contactName = result.contractName; // 显示名字
	          });
		}
		// 选择客户
        $scope.selectCustDlg = function() {
            var modalInstance = $uibModal.open({
                animation : true,
                backdrop : 'static',
                templateUrl : 'app/pages/customer/custMnt/popupPages/selectCustDlg.html',
                size : 'midle-900',
                controller : 'selectCustDlgCtrl',
                scope : $scope,
                resolve : {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
            modalInstance.result.then(function (result) {
                console.log(result); //result关闭是回传的值
	        	  if (result == undefined || result == '') {
	        		  return;
	        	  }
                $scope.saveTask.custName = result.custName;
                $scope.saveTask.custId = result.custNo;
            }, function (reason) {
                console.log(reason);//点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel
            });

        }

		// 选择商机
		$scope.selectBusiOppDlg = function() {
	          var modalInstance = $uibModal.open({
	              animation: true,
				  templateUrl : 'app/pages/busiopp/popupPages/selectBusiOppDlg.html',
	              controller: 'selectBusiOppDlgCtrl',
	              size: 'midle-900', // 
	              backdrop:'static',
	              resolve: {
	                  'checkedRow': function () {
	                      return '';
	                  }
	              }
	          });
	          modalInstance.result.then(function(result){
	        	  if (result == undefined || result == '') {
	        		  return;
	        	  }
	        	  // 回调
	        	  $scope.saveTask.oppertId = result.busiOppNo;
	        	  $scope.saveTask.oppertName = result.busiOppName;
	          });
		}

		// 选择负责人
        $scope.selectAgentDlg = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/mgrcenter/usermanagement/popupPages/selectAgentDlg.html',
                controller: 'selectAgentDlgCtrl',
                size: 'midle-900', // 
                backdrop:'static',
                resolve: {
                    'checkedRow': function () {
                        return '';
                    }
                }
            });
            modalInstance.result.then(function(result){
          	  // 返回调用
          	  //console.log(result); //result关闭是回传的值
          	  $scope.saveTask.responsId = result.employeeId;
          	  $scope.saveTask.responsName = result.userName;
            });
        
      }

	}

})();
