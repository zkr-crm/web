(function() {
	'use strict';

	angular.module('BlurAdmin.pages.taskService.allTask').controller('allTaskPeopleModalCtrl',
			allTaskPeopleModalCtrl);
	/** @ngInject */
	function allTaskPeopleModalCtrl($scope, $filter, $uibModal, $timeout, HttpService,$rootScope, 
			$uibModalInstance, toastr, EnumType, Alert) {

		$scope.totalcp = 0;
		$scope.totalcc = 0;
		$scope.totalr = 0;

		$scope.custShow = false;
		$scope.respShow = false;

		$scope.searchObj = {
			'userName' : '',
			'custName' : ''
		};

		$scope.closePage = function() {
			$uibModalInstance.close();
		}
		
		$scope.searchResp = function() {
			var optFR = {};
			optFR.url = '/crm/manage/usermng/usersByEntity';
			optFR.method = 'GET';
			optFR.params = $scope.searchObj;
			optFR.params.userStat = EnumType.UserStat.normal.value;
			HttpService.linkHttp(optFR).then(function(response) {
				$scope.RespDataRow = response.data;
				$scope.RespDataRow = response.data.map(function(item) {
					item.userStat = EnumType.UserStat.getLabelByValue(item.userStat);
					return item;
				});
				$scope.totalr = response.data.length;
			});

		}
		
		
		$scope.searchCust = function() {
			var custAgentList = [];

			var initOpts = {};
			initOpts.url = '/crm/manage/auth/getRoleDateAuth';
			initOpts.method = 'GET';
			initOpts.params = {
				userCode : $rootScope.global.user,
				tableCode : "T001"
			};
			HttpService.linkHttp(initOpts).then(function(result) {

				if (!(result.data === undefined || result.data.length == 0)) {

					angular.forEach(result.data, function(i) {
						if (i.employeeId !== undefined) {
							custAgentList.push(i.employeeId);
						}
					});

					var optFC = {};
					optFC.url = '/crm/ecif/cust/getPerCustListByRole';
					optFC.method = 'POST';
					optFC.params = $scope.searchObj;
					optFC.data = custAgentList;
					HttpService.linkHttp(optFC).then(function(response) {
						$scope.PCustDataRow = response.data;
						$scope.PCustDataRow = response.data.map(function(item) {
							item.custTyp = EnumType.CustType.getLabelByValue(item.custTyp);
							item.custSource = EnumType.DataSource.getLabelByValue(item.custSource);
							item.certTyp = EnumType.IdType.getLabelByValue(item.certTyp);
							return item;
						});
						$scope.totalcp = response.data.length;
					});
				}
			});
			
		}
		
		$scope.onload = function() {
			var showTip = $scope.openType;

			if (showTip == "resp") {
				$scope.custShow = false;
				$scope.respShow = true;
			}
			if (showTip == "cust") {
				$scope.custShow = true;
				$scope.respShow = false;
			}

			// /crm/ecif/cust/getPerCustListByRole 个人客户列表
			// /crm/manage/usermng/usersByEntity 用户列表

		}

		$scope.onload();
		$scope.searchCust();
		$scope.searchResp();

		$scope.saveValueP = function(item) {

			console.log(item);
			$scope.saveTask.custId = item.custNo;
			$scope.saveTask.custName = item.custName;
			//返回客户类型
			$scope.saveTask.custTyp = item.custTyp;
			angular.forEach(EnumType.CustType, function(i) {
				if ($scope.saveTask.custTyp === i.label) {
					$scope.saveTask.custTyp = i;
				}
			});
			
			$scope.closePage();

		}

		$scope.saveValueR = function(item) {
			
			console.log(item);
			$scope.saveTask.responsId = item.userId;
			$scope.saveTask.responsName = item.userName;
			
			$scope.closePage();
			
		}
		
		

		
		
		
		
	}

})();
