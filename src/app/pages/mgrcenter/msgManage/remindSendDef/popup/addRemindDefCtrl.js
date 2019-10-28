(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.msgManage.remindSendDef')
			.controller('addRemindDefCtrl', addRemindDefCtrl);
	/** @ngInject */
	function addRemindDefCtrl($scope, $uibModal, $filter, $timeout, $http,
			HttpService, EnumType, Alert) {

		$scope.remindDef={};
		
		//是否标志
		$scope.YesNoFlg = EnumType.YesNoFlg;
		$scope.selectYesNo = function(selectedYesNo){
			$scope.remindDef.isSameDay=selectedYesNo.value;
		}
		//提醒级别
		$scope.Rating=EnumType.Rating;
		$scope.selectRating=function(selectedRating){
			$scope.remindDef.remindLevel=selectedRating.value;
		}
		
		// 保存
		$scope.saveValue = function() {
			var opts = {};
			opts.url = '/crm/manage/msgmng/updRemindDefMsg';
			opts.method = 'POST';
			opts.params = $scope.remindDef;
			HttpService.linkHttp(opts).then(function(response) {
				Alert.success("请求成功");
				$scope.$parent.$dismiss();
				// 刷新主页面
				$scope.getAllRemindDef();
			});
		}

		// 关闭页面
		$scope.closePage = function() {
			$scope.$parent.$dismiss();
		}

		// 模板选择
		$scope.selectTemplate = function() {
			var modalInstance = $uibModal
					.open({
						animation : true,
						backdrop : 'static',
						templateUrl : 'app/pages/mgrcenter/msgManage/msgSendAdd/selectOneMsgTmpt.html',
						size : 'midle-1200',
						controller : 'ProfileModalCtrl',
						scope : $scope,
						resolve : {
							items : function() {
								return $scope.items;
							}

						}
					});
			modalInstance.result.then(function(result) {
				$scope.remindDef.remindTpl = result.tplNo; // 模板代码
				$scope.remindDef.remindContent = result.tplCont; // 模板内容

				console.log(result); // result关闭是回传的值
			}, function(reason) {
				console.log(reason);// 点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel

			});

		}
	}

})();
