(function() {
	'use strict';

	angular.module('BlurAdmin.pages.market.marketDetil').controller('addTaskCtrl', addTaskCtrl);
	/** @ngInject */
	function addTaskCtrl($scope, $filter, $uibModal, $timeout, HttpService, toastr, EnumType, Alert) {
		$scope.open = open;
		$scope.opened = false;
		// 打开日期控件
		function open() {
			$scope.opened = true;
		}

		$scope.saveValue = function(isValid) {

		}

		$scope.closePage = function() {
			$scope.$parent.$dismiss();
		}
		// 选择联系人
		$scope.selectCntrDlg = function() {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'app/pages/customer/custContract/popupPages/selectCntrDlg.html',
				controller : 'selectCntrDlgCtrl',
				size : 'midle-900', // 
				backdrop : 'static',
				resolve : {
					'checkedRow' : function() {
						return '';
					}
				}
			});
			modalInstance.result.then(function(result) {
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
					items : function() {
						return $scope.items;
					}
				}
			});
			modalInstance.result.then(function(result) {
				//console.log(result); // result关闭是回传的值
				if (result == undefined || result == '') {
					return;
				}
				$scope.saveTask.custName = result.custName;
				$scope.saveTask.custId = result.custNo;
			}, function(reason) {
				//console.log(reason);// 点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel
			});

		}

		// 选择商机
		$scope.selectBusiOppDlg = function() {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'app/pages/busiopp/popupPages/selectBusiOppDlg.html',
				controller : 'selectBusiOppDlgCtrl',
				size : 'midle-900', // 
				backdrop : 'static',
				resolve : {
					'checkedRow' : function() {
						return '';
					}
				}
			});
			modalInstance.result.then(function(result) {
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
				animation : true,
				templateUrl : 'app/pages/mgrcenter/usermanagement/popupPages/selectAgentDlg.html',
				controller : 'selectAgentDlgCtrl',
				size : 'midle-900', // 
				backdrop : 'static',
				resolve : {
					'checkedRow' : function() {
						return '';
					}
				}
			});
			modalInstance.result.then(function(result) {
				// 返回调用
				// console.log(result); //result关闭是回传的值
				$scope.saveTask.responsId = result.userId;
				$scope.saveTask.responsName = result.userName;
			});

		}

		// 选择负责人
		$scope.selectAgentDlg = function() {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'app/pages/mgrcenter/usermanagement/popupPages/selectAgentDlg.html',
				controller : 'selectAgentDlgCtrl',
				size : 'midle-900', // 
				backdrop : 'static',
				resolve : {
					'checkedRow' : function() {
						return '';
					}
				}
			});
			modalInstance.result.then(function(result) {
				// 返回调用
				// console.log(result); //result关闭是回传的值
				$scope.saveTask.responsId = result.userId;
				$scope.saveTask.responsName = result.userName;
			});

		}

	}

})();
