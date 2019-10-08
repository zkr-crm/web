(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.tagMgr').controller(
			'updTagTypeCtrl', updTagTypeCtrl);
	/** @ngInject */
	function updTagTypeCtrl($scope, $filter, $uibModal, $timeout, HttpService,toastr, EnumType, Alert) {
		
		//初始化上级标签下拉列表
		$scope.superTagTypeT = [];
		var optsForST = {};
		optsForST.url = '/crm/manage/tagmng/tagTypes';
		optsForST.method = 'GET';
		HttpService.linkHttp(optsForST).then(function(response) {
			angular.forEach(response.data, function(item) {
				$scope.superTagTypeT.push({ label : item.tagTypeName, value : item.tagTypeId });
				if( item.tagTypeName == $scope.updType.superTagTypeId  ||  item.tagTypeId == $scope.updType.superTagTypeId ){
					$scope.updType.superTagTypeId = { label : item.tagTypeName, value : item.tagTypeId };
				}
			})
			
			$scope.superTagTypeId = $scope.superTagTypeT;
		});
		
		$scope.saveValue = function(isValid) {
			
			if (!isValid) {
				return;
			}

			$scope.v = $scope.updType.superTagTypeId.value;
			$scope.updType.superTagTypeId = "";
			$scope.updType.superTagTypeId = $scope.v;
			
			var optsForUpd = {};
			optsForUpd.url = '/crm/manage/tagmng/tagType';
			optsForUpd.method = 'GET';
			optsForUpd.params = {
					"tagTypeId":$scope.v
			};
			
			HttpService.linkHttp(optsForUpd).then(function(response) {
				$scope.updType.tagTypeLevel = parseInt(response.data.tagTypeLevel) + 1;
				
				var opts = {};
				opts.url = '/crm/manage/tagmng/tagType';
				opts.method = 'PUT';
				opts.params = $scope.updType;
				HttpService.linkHttp(opts).then(function(response) {
					$scope.updType = {};
					// 执行查询
					$scope.refresh();
					$scope.$parent.$dismiss();
				});
				
			});
			
		}
		
		// 关闭页面
		$scope.closePage = function() {
			$scope.$parent.$dismiss();
		}

	}

})();
