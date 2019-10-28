(function() {
	'use strict';

angular.module('BlurAdmin.pages.taskService.myTask').controller('myTaskCtrl', myTaskCtrl);

/** @ngInject */
function myTaskCtrl($scope, $uibModal, $filter, $timeout, $http, HttpService, EnumType, $rootScope, Alert) {
		var userId = $rootScope.global.employeeId;

		// 查询条件对象
		$scope.searchTaskObj = {
			'responsId' : userId,
			'taskName' : ''
		};
		// 信息发送定义对象数据集
		$scope.myTaskList = [];

		// 查询事件
		$scope.searchTask = function() {

            $scope.search(1);
		}
		// 新增事件
		$scope.addMyTask = function() {
			$scope.saveTask = {};
			$scope.isUpd = "false";

			var modalInstance = $uibModal
					.open({
						animation : true,
						backdrop : 'static',
				        templateUrl : 'app/pages/taskService/popupPages/taskModal.html',
				        size : 'midle-900',
				        controller : 'taskTaskModalCtrl',
						scope : $scope,
		                resolve: {
		                    'taskId': function () {
		                        return '';
		                    }, 'custNo': function () {
		                        return '';
		                    }
		                }
					});
            modalInstance.result.then(function(){
                $scope.searchTask();
            });
		}

		// 修改事件
		$scope.uptMyTask = function(item) {
			var taskEndDate = new Date(item.taskEndDate);
			var optsForUpd = {};
			optsForUpd.url = '/crm/ocrm/task/getOne';
			optsForUpd.method = 'GET';
			optsForUpd.params = {
					"id":item.id,
					"taskName":item.taskName,
					"taskType":item.taskType,
					"taskStat":item.taskStat,
					"taskEndDate":taskEndDate,
					"custName":item.custName,
					"oppertName":item.oppertName,
					"oppertId":item.oppertId,
					"contactName":item.contactName,
					"responsName":item.responsName,
					"responsId":item.responsId,
					"taskDesc":item.taskDesc					
			};
			angular.forEach(EnumType.TaskStat, function(eItem) {
				if(eItem.label == item.taskStat || eItem.value == item.taskStat ){
					optsForUpd.params.taskStat = eItem.value;
				}
			})
			HttpService.linkHttp(optsForUpd).then(function(response) {
				$scope.saveTask = {};
				$scope.saveTask = response.data;
				$scope.isUpd = "true";
				
				var modalInstance = $uibModal.open({
					animation : true,
					backdrop : 'static',
					templateUrl : 'app/pages/taskService/popupPages/taskModal.html',
					size : 'midle-900',
					controller : 'taskTaskModalCtrl',
					scope : $scope,
	                resolve: {
	                    'taskId': function () {
	                        return item.id;
	                    }, 'custNo': function () {
	                        return '';
	                    }
	                }
				});
	            modalInstance.result.then(function(){
	                $scope.searchTask();
	            });
			});
		}

		//按钮查询
		$scope.index_ = 9;
		$scope.initData = function(index) {
			$scope.index_ = index ;
            if( index == 0 ){
                //console.log("0全部任务");
                $scope.searchTaskObj.taskStat='';
            }
            if( index == 1 ){
                //console.log("1进行中的任务");
                $scope.searchTaskObj.taskStat = EnumType.TaskStat.in_progress.value;
            }
            if( index == 2 ){
                //console.log("2完成的任务");
                $scope.searchTaskObj.taskStat = EnumType.TaskStat.done.value;
            }
            if( index == 3 ){
                //console.log("3取消的任务");
                $scope.searchTaskObj.taskStat = EnumType.TaskStat.cancel.value;
            }
            if( index == 4 ){
                //console.log("4重新打开的任务");
                $scope.searchTaskObj.taskStat = EnumType.TaskStat.reopen.value;
            }
			$scope.searchTask();
		}

		// 物理删除事件（单行删除）
		$scope.delMyTask = function(item) {

			Alert.confirm("确定删除！").then(function() {
				var taskIdVar = "";
				
				var optForId = {};
				optForId.url = '/crm/ocrm/task/getOne';
				optForId.method = 'GET';
				optForId.params = item;
				HttpService.linkHttp(optForId).then(function(response) {
					taskIdVar = response.data.id;
					
					var opts = {};
					opts.url = '/crm/ocrm/task/deleteOne';
					opts.method = 'DELETE';
					opts.params = {
							id : taskIdVar
					};
					HttpService.linkHttp(opts).then(function(response) {
						console.log("请求成功");
						console.log(response);
						// 执行查询
						$scope.searchTask();
					});
				});
			});
		};

		// 多选完成事件
		$scope.batchFinishMyTask = function() {

            if($scope.checkedRow == undefined || $scope.checkedRow.length == 0){
                Alert.error('请选择要完成的任务信息，至少一个条！');
                return ;
            }

			Alert.confirm("确定完成所选任务？").then(function() {
				var opts = {};
				opts.url = '/crm/ocrm/task/putMultiDone';
				opts.method = 'PUT';
				opts.params = {};
				opts.data = $scope.checkedRow;
				HttpService.linkHttp(opts).then(function(response) {
					console.log("请求成功");
					console.log(response);
					// 执行查询
					$scope.searchTask();
				});
				$scope.checkedRow = [];
			});
		
		};

		$scope.checkedRow = [];
		// 全选
		$scope.selectAll = function() {
			if (!$scope.select_all) {
				$scope.checkedRow = [];
				var count = 0;
				angular.forEach($scope.myTaskList, function(i) {
					i.checked = true;

					// 删除条件对象
					$scope.delObj = {
							"id":i.id,
							"taskName":i.taskName,
							"taskType":i.taskType,
							"taskStat":i.taskStat,
							"taskEndDate":i.taskEndDate,
							"custName":i.custName,
							"oppertName":i.oppertName,
							"contactName":i.contactName,
							"responsName":i.responsName,
							"taskDesc":i.taskDesc					
						};
					$scope.checkedRow.push($scope.delObj);
				})
				$scope.select_all = true;
			} else {
				angular.forEach($scope.myTaskList, function(i) {
					i.checked = false;
					$scope.checkedRow = [];
				})
				$scope.select_all = false;
			}
		};

		// 单个选中
		$scope.selectOne = function() {
			$scope.checkedRow = [];
			angular.forEach($scope.myTaskList, function(i) {
				var index = $scope.checkedRow.indexOf(i);
				if (i.checked && index === -1) {
					// 删除条件对象
					$scope.delObj = {
							"id":i.id,
							"taskName":i.taskName,
							"taskType":i.taskType,
							"taskStat":i.taskStat,
							"taskEndDate":i.taskEndDate,
							"custName":i.custName,
							"oppertName":i.oppertName,
							"contactName":i.contactName,
							"responsName":i.responsName,
							"taskDesc":i.taskDesc					
						};
					$scope.checkedRow.push($scope.delObj);
				} else if (!i.checked && index !== -1) {
					$scope.checkedRow.splice(index, 1);
				}
			});

			if ($scope.myTaskList.length === $scope.checkedRow.length) {
				$scope.select_all = true;
			} else {
				$scope.select_all = false;
			}
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
			$scope.myTaskOpts={
				pagination:{
					pageSize:'10',
					pageIndex:1,
					maxText:5
				},
				url:'/crm/ocrm/task/getMulti',
				method:'GET',
				params:$scope.searchTaskObj,
				success:function(response){
					if (response == undefined || response.data == undefined) {
						return;
					}
                    $scope.myTaskList = response.data.list.map(function (item) {
                        item.taskStatNam = EnumType.TaskStat.getLabelByValue(item.taskStat);
                        return item;
                    });
				}
			}

		}
		init();

	}

})();
