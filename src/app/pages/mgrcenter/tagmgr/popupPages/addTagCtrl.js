(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.tagMgr').controller(
			'addTagCtrl', addTagCtrl);
	/** @ngInject */
	function addTagCtrl($scope, $filter, $uibModal, $timeout, HttpService,
			toastr, EnumType, Alert) {

//		$scope.saveTag.recStat = "";
		//初始化标签类型下拉列表
		$scope.tagTypeT = [];
		var optsForST = {};
		optsForST.url = '/crm/manage/tagmng/tagTypes';
		optsForST.method = 'GET';
		HttpService.linkHttp(optsForST).then(function(response) {
			angular.forEach(response.data, function(item) {
				$scope.tagTypeT.push({ label : item.tagTypeName, value : item.tagTypeId });
				
				if( item.tagTypeName == $scope.saveTag.tagTypeId  ||  item.tagTypeId == $scope.saveTag.tagTypeId ){
					$scope.saveTag.tagTypeId = "";
					$scope.saveTag.tagTypeId = { label : item.tagTypeName, value : item.tagTypeId };
				}
				
			})
			
			$scope.tagTypeId = $scope.tagTypeT;
		});
		
		
		
		 $scope.showMenu = function() {
			// alert(1)
             var cityObj = $("#tagScopeVal");
             var cityOffset = $("#tagScopeVal").offset();
            
             $("#menuContent").css({left:cityOffset.left-cityObj.outerWidth()-12, top:cityOffset.top-cityObj.outerHeight()+2}).slideDown("fast");

             $("body").bind("mousedown", onBodyDown);
         }

         function hideMenu() {
             $("#menuContent").fadeOut("fast");
             $("body").unbind("mousedown", onBodyDown);
         }

         function onBodyDown(event) {
             if (!(event.target.id == "menuBtn" || event.target.id == "citySel" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
                 hideMenu();
             }
         }
		//初始化上级标签下拉列表
		$scope.tagT = [];
		var optsForTag = {};
		optsForTag.url = '/crm/manage/tagmng/tagDetials';
		optsForTag.method = 'GET';
		HttpService.linkHttp(optsForTag).then(function(response) {
			angular.forEach(response.data.list, function(item) {
				$scope.tagT.push({ label : item.tagName, value : item.tagId });
				
				if( item.tagName == $scope.saveTag.parentTagId  ||  item.tagId == $scope.saveTag.parentTagId ){
					$scope.saveTag.parentTagId = "";
					$scope.saveTag.parentTagId = { label : item.tagName, value : item.tagId };
				}
				
			})
			
			$scope.parentTagId = $scope.tagT;
		});
		
		//标签状态
//		$scope.recStatv = EnumType.RecStat.getEnumByValue($scope.saveTag.recStat);
//		$scope.saveTag.recStat = $scope.recStatv;
//		console.log($scope.saveTag.recStat);
//		$scope.recStat = EnumType.RecStat;
		

	$scope.searchStar = function() {
		var opts = {};
		opts.url = '/crm/manage/engine/getAllStraByEntity';
		opts.method = 'GET';
		opts.params = $scope.searchObj;
		HttpService.linkHttp(opts).then(function(response) {
			
			$scope.StratRowCollection = response.data;

			angular.forEach(response.data, function(item) {
				if(   item.strategyId ==  $scope.strategyName  ){

					$scope.strategyName = item.strategyName;
					$scope.searchObj.strategyName = item.strategyName;
					$scope.saveTag.strategyId =  item.strategyId;
				}
				
			})
			
			$scope.total = response.data.length;
		});
	};
		
$scope.searchStar();

$scope.pareTagChan = function(){
//	$scope.searchPare={};
//	$scope.searchPare.parentTagId = $scope.saveTag.parentTagId.value;
	var opts = {};
	opts.url = '/crm/manage/tagmng/tagDetail';
	opts.method = 'GET';
	opts.params ={"tagId":$scope.saveTag.parentTagId.value};
	HttpService.linkHttp(opts).then(function(response) {
		angular.forEach($scope.tagTypeT, function(item) {
			
			if( item.label == response.data.tagTypeId  ||  item.value == response.data.tagTypeId ){
//				$scope.saveTag.tagTypeId = {};
				$scope.saveTag.tagTypeId = item;
			}
			
		})
		
	});
	
}
		
		
$scope.tagTypeChan = function(){
	$scope.searchType={};
	$scope.searchType.tagTypeId = $scope.saveTag.tagTypeId.value;
	var opts = {};
	opts.url = '/crm/manage/tagmng/tagDetials';
	opts.method = 'GET';
	opts.params = $scope.searchType;
	HttpService.linkHttp(opts).then(function(response) {
		$scope.tagT = [];
		angular.forEach(response.data.list, function(item) {
			$scope.tagT.push({ label : item.tagName, value : item.tagId });
			
//			if( item.tagName == $scope.saveTag.parentTagId  ||  item.tagId == $scope.saveTag.parentTagId ){
//				$scope.saveTag.parentTagId = "";
//				$scope.saveTag.parentTagId = { label : item.tagName, value : item.tagId };
//			}
			
		})
		$scope.saveTag.parentTagId = { label : "请选择...", value : "" };
		$scope.parentTagId = $scope.tagT;
	});
	
}
		
		
		

	}

})();
