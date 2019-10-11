(function() {
	'use strict';

	angular.module('BlurAdmin.pages.knowledge.publicRepository').controller(
			'addKnowledgeCtrl', addKnowledgeCtrl);
	/** @ngInject */
	function addKnowledgeCtrl($scope, $filter, $uibModal, $timeout, toastr, Alert, HttpService,$uibModalInstance) {
		//用户信息对象
		$scope.saveType = {
				"knowledgeTypeName":"",
				"superKnowledgeType":"",
				"knowledgeTypeLevel":"",
				"remark":""
		};
		
		//初始化上级标签下拉列表
		$scope.superTagTypeT = [];
		var optsForST = {};
		optsForST.url = '/crm/manage/tagmng/tagTypes';
		optsForST.method = 'GET';
		HttpService.linkHttp(optsForST).then(function(response) {
			angular.forEach(response.data, function(item) {
				$scope.superTagTypeT.push({ label : item.knowledgeTypeName, value : item.tagTypeId });
			})
			
			$scope.superKnowledgeType = $scope.superTagTypeT;
		});
		
		/*保存数据*/
		$scope.saveValue = function() {
			$uibModalInstance.close({"text":"新增节点"});
		}
		
		// 关闭页面
		$scope.closePage = function() {
			$scope.$parent.$dismiss();
		}

	}

})();
