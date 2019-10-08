(function() {
	'use strict';

	angular.module('BlurAdmin.pages.interactmarket.smsgroupsend')
		.controller('addsmsgroupCtrl', function($scope, $location, $uibModal, $state, HttpService, Alert) {
			$scope.selectMsgMould = function () {
				var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'app/pages/interactmarket/smsgroupsend/selectMsgMould.html',
                    controller: 'selectMsgMouldCtrl',
                    size: 'midle-900',
                    backdrop:'static',
                    scope:$scope,
                    resolve: {
                        items: function () {
                        	return $scope.items;
                    	}
                    }
                });
                modalInstance.result.then(function (result) {
	                if (result == undefined) {
	                	return;
	                }
	                $scope.roleObj.msgTopic = result.tplTitle;
	                $scope.roleObj.msgContent = result.tplCont;
	            }, function (reason) {
	            });
			};
			
			$scope.selectGroup = function () {
				var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'app/pages/interactmarket/smsgroupsend/selectGroup.html',
                    controller: 'selectGroupCtrl',
                    size: 'midle-900',
                    backdrop:'static',
                    scope:$scope,
                    resolve: {
                        items: function () {
                        	return $scope.items;
                    	}
                    }
                });
                modalInstance.result.then(function (result) {
	                if (result == undefined) {
	                	return;
	                }
	                $scope.roleObj.groupNameList = []
	                console.log(result)
	                $scope.roleObj.sendObj = result;
	                $scope.roleObj.sendObj.forEach(function(item){
	                	$scope.roleObj.groupNameList.push(item.groupName) 
	                })
	                $scope.roleObj.groupName = $scope.roleObj.groupNameList.join()
	            }, function (reason) {
	            });
			}


			// $scope.chooseModal = function (role) {
			// 	$scope.roleObj.msgTopic = role.tplTitle
			// 	$scope.roleObj.msgContent = role.tplCont
			// }
			$scope.search = function (page) {
				// var page = page || 1;
				// $scope.queryOptions.pageSize = $scope.pagination.pageSize;
				this.queryPage(page)
			}
			$scope.groupSend = function () {
				if (!!!$scope.roleObj.msgTopic) {
					Alert.error('请填写短信标题');
					return
				}
				if (!!!$scope.roleObj.msgContent) {
					Alert.error('请填写短信内容');
					return
				}
				if (!$scope.roleObj.sendObj||$scope.roleObj.sendObj.length===0) {
					Alert.error('请选择群组');
					return
				}
				var sendOpts = {};
				var sendOptsObj = [];
				angular.forEach($scope.roleObj.sendObj,function(item){
					var itemObj = {}
					itemObj.msgTopic = $scope.roleObj.msgTopic;
					itemObj.msgContent = $scope.roleObj.msgContent;
					itemObj.sendObj = item.groupId;
					itemObj.bizNo = item.groupName;
					sendOptsObj.push(itemObj)
				})
				// sendOptsObj.groupIdList = $scope.roleObj.groupIdList;
				// sendOptsObj.tplCont = $scope.roleObj.tplCont;
				sendOpts.url = '/crm/supply/sendMsg';
				sendOpts.method = 'POST';
				sendOpts.data = sendOptsObj;
				HttpService.linkHttp(sendOpts).then(function (response) {
					if (response.status === '1') {
						Alert.success('发送成功')
						$scope.roleObj = {}
					}
				})

			}
			var init  = function () {
				$scope.rowCollection = [];
				$scope.roleObj = {}	
				$scope.searchObj = {} // 群组查询对象
				

				$scope.queryOptions = {} // 短信记录查询对象
				$scope.queryOptions.pagination = {
                    pageSize:'10',
                    pageIndex:1,
                    maxText:5
                }
				$scope.queryOptions.url = '/crm/supply/getSmsSendList';
				$scope.queryOptions.method = 'POST';
				$scope.queryOptions.params = {}
				$scope.queryOptions.data = []
				$scope.queryOptions.params.sys = {};
				$scope.queryOptions.success = function successCallback (response) {
					if (response.status === '1') {
						$scope.rowCollection = response.data.list;
					}
				}

			}
			init()

	});
})();