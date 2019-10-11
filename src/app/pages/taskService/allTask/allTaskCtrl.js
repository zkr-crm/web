(function() {
	'use strict';

	angular.module('BlurAdmin.pages.taskService.allTask').controller('allTaskCtrl', allTaskCtrl);
	/** @ngInject */
	function allTaskCtrl($scope, $uibModal, $filter, $timeout, $http,HttpService, EnumType, $rootScope, Alert) {
		$scope.$on('pagination',function(event,pagination){
                $scope.pagination=pagination;
		});
		// 查询条件对象
		$scope.searchTaskObj = {};
		// 信息发送定义对象数据集
		$scope.allTaskList = [];

		// 新增事件
		$scope.addAllTask = function() {
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
						resolve : {
							'custNo': function () {
								return ''
							}
						}
					});
            modalInstance.result.then(function(){
                $scope.searchTask();
            });
		}

		// 修改事件
		$scope.uptAllTask = function(item) {
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
					"contactName":item.contactName,
					"responsName":item.responsName,
					"taskDesc":item.taskDesc					
			};
			angular.forEach(EnumType.TaskStat, function(eItem) {
				if(eItem.label == item.taskStat || eItem.value == item.taskStat ){
					optsForUpd.params.taskStat = eItem.value;
				}
			})
			HttpService.linkHttp(optsForUpd).then(function(response) {
				if (response == undefined || response.data == undefined) {
					return;
				}
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
					resolve : {
						'custNo': function () {
							return ''
						}
					}
				});
	            modalInstance.result.then(function(){
	                $scope.searchTask();
	            });
			});
			
		}

		// 查询事件
		$scope.searchTasks = function() {

			$scope.search(1);
		}

		//按钮查询
		$scope.index_ = 0;
        $scope.search =function(page){
            page=page||1;
            $scope.queryPage(page);
        }
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
			if( index == 9 ){
				//console.log("9我负责的任务");
                $scope.searchTaskObj.responsId = $rootScope.global.user;
			}

			$scope.searchTask();
		}
		// 物理删除事件（单行删除）
		$scope.delAllTask = function(item) {

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
		$scope.batchFinishAllTask = function() {

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
				angular.forEach($scope.allTaskList, function(i) {
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
				angular.forEach($scope.allTaskList, function(i) {
					i.checked = false;
					$scope.checkedRow = [];
				})
				$scope.select_all = false;
			}
			console.log($scope.checkedRow);
		};

		// 单个选中
		$scope.selectOne = function() {
			$scope.checkedRow = [];
			angular.forEach($scope.allTaskList, function(i) {
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

			if ($scope.allTaskList.length === $scope.checkedRow.length) {
				$scope.select_all = true;
			} else {
				$scope.select_all = false;
			}
		}
		$scope.searchTask = function () {
			var opts = {};
			
			opts.url = '/crm/ocrm/task/getMulti';
            opts.method = 'GET';
            opts.params = $scope.searchTaskObj;
			$scope.pagination.allTaskOpts = {
				pageSize:'10'
			}
            HttpService.linkHttp(opts).then(function(response){
            	$scope.pagination.allTaskOpts.totalItems = response.data.total;
                $scope.pagination.allTaskOpts.maxText = Math.ceil($scope.pagination.allTaskOpts.totalItems / $scope.pagination.allTaskOpts.pageSize); //计算最大页数
                $scope.pagination.allTaskOpts.pageIndex = !$scope.pagination.allTaskOpts.pageNewIndex ?  $scope.pagination.allTaskOpts.pageIndex : ( $scope.pagination.allTaskOpts.pageIndex > $scope.pagination.allTaskOpts.maxText ? $scope.pagination.allTaskOpts.maxText : $scope.pagination.allTaskOpts.pageNewIndex);
                $scope.pagination.allTaskOpts.pageNewIndex = ''; //清空跳转数
            	if (response == undefined || response.data == undefined) {
                    return;
                }
                $scope.allTaskList = response.data.list.map(function (item) {
                    item.taskStatNam = EnumType.TaskStat.getLabelByValue(item.taskStat);
                    return item;
                });
            })
		}
        $scope.init=function(){
			$scope.$on('queryPage',function(event,queryPage){
				if(!$scope.queryPage){
					$scope.queryPage=queryPage;
				}
			});
            $scope.allTaskOpts={
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
                    $scope.allTaskList = response.data.list.map(function (item) {
                        item.taskStatNam = EnumType.TaskStat.getLabelByValue(item.taskStat);
                        if (item.taskDesc&&item.taskDesc.length>3) {
	                    	item.taskDescNew = item.taskDesc.substr(0,3)+'...';
	                    } else {
	                    	item.taskDescNew = item.taskDesc
	                    }
                        return item;
                    });
                }
            }
        }
        $scope.init();

	}

})();
