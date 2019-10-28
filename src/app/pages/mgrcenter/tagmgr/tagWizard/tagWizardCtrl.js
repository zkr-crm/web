(function() {
  'use strict';

  angular.module('BlurAdmin.pages.interactmarket.tagMgr')
    .controller('tagWizardCtrl', tagWizardCtrl);

  /** @ngInject */
  function tagWizardCtrl($scope, $filter, $uibModal, $timeout, HttpService,	toastr, EnumType, Alert) {
	  

		//标签状态
//	  	$scope.saveTag.recStat = {label:"",value""};
		$scope.recStatv = EnumType.RecStat.getEnumByValue($scope.saveTag.recStat);
		$scope.saveTag.recStat = $scope.recStatv;
		$scope.recStat = EnumType.RecStat;

		$scope.tagScopev = EnumType.TagScope.getEnumByValue($scope.saveTag.tagScope);
		$scope.saveTag.tagScope = $scope.tagScopev;
		$scope.tagScope = EnumType.TagScope;

		$scope.getStrategyId = function(item){
			$scope.strategyName = item.strategyName;
			$scope.saveTag.strategyId =  item.strategyId;
		}
		
		
		$scope.saveValue = function() {
			
			/*if (!isValid) {
				return;
			}*/
			if($scope.saveTag.tagTypeId){
				$scope.v = $scope.saveTag.tagTypeId.value;
				$scope.saveTag.tagTypeId = "";
				$scope.saveTag.tagTypeId = $scope.v;
			}
			if($scope.saveTag.parentTagId){
				$scope.v2 = $scope.saveTag.parentTagId.value;
				$scope.saveTag.parentTagId = "";
				$scope.saveTag.parentTagId = $scope.v2;
			}
			if($scope.saveTag.recStat){
				$scope.v3 = $scope.saveTag.recStat.value;
				$scope.saveTag.recStat = "";
				$scope.saveTag.recStat = $scope.v3;
			}
			if($scope.saveTag.tagScope){
				$scope.v4 = $scope.saveTag.tagScope.value;
				$scope.saveTag.tagScope = "";
				$scope.saveTag.tagScope = $scope.v4;
			}
			
			
			if($scope.isUpd == "true"){


				var opts = {};
				opts.url = '/crm/manage/tagmng/tagDetial';
				opts.method = 'PUT';
				opts.params = $scope.saveTag;
				HttpService.linkHttp(opts).then(function(response) {
					$scope.saveTag = {};
					// 执行查询
					$scope.searchTag();
					$scope.refresh();
//					$scope.$parent.$dismiss();
				      vm.selectTab(vm.tabNum + 1);
				});
			
			}else{
				var opts = {};
				opts.url = '/crm/manage/tagmng/tagDetial';
				opts.method = 'POST';
				opts.params = $scope.saveTag;
				HttpService.linkHttp(opts).then(function(response) {
					toastr.success('提交完成!');
					$scope.saveTag = {};
					$scope.searchTag();
					$scope.refresh();
					// 执行查询
//					$scope.$parent.$dismiss();
				      vm.selectTab(vm.tabNum + 1);
				});
			
			}
			
			
			/*var opts = {};
			opts.url = '/crm/manage/tagmng/tagDetial';
			opts.method = 'POST';
			opts.params = $scope.saveTag;
			HttpService.linkHttp(opts).then(function(response) {
				toastr.success('提交完成!');
				console.log(response);
				$scope.searchTag();
				// 执行查询
				$scope.$parent.$dismiss();
			});*/

//		      vm.selectTab(vm.tabNum + 1);
		}
		
		$scope.closePage = function() {
			$scope.$parent.$dismiss();
		}
		
    var vm = this;
    vm.tabs = [];

    vm.tabNum = 0;
    vm.progress = 0;

    vm.addTab = function(tab) {
      tab.setPrev(vm.tabs[vm.tabs.length - 1]);
      vm.tabs.push(tab);
      vm.selectTab(0);
    };

    $scope.$watch(angular.bind(vm, function () {return vm.tabNum;}), calcProgress);

    vm.selectTab = function (tabNum) {
      vm.tabs[vm.tabNum].submit();
      if (vm.tabs[tabNum].isAvailiable()) {
        vm.tabNum = tabNum;
        vm.tabs.forEach(function (t, tIndex) {
          tIndex == vm.tabNum ? t.select(true) : t.select(false);
        });
      }
    };

    vm.getTabNum = function () {
      return vm.tabNum ;
    };
    
    vm.isFirstTab = function () {
    	return vm.tabNum == 0;
    };

    vm.isLastTab = function () {
      return vm.tabNum == vm.tabs.length - 1 ;
    };

    vm.nextTab = function () {
      vm.selectTab(vm.tabNum + 1)
    };

    vm.previousTab = function () {
      vm.selectTab(vm.tabNum - 1)
    };

    function calcProgress() {
      vm.progress = ((vm.tabNum + 1) / vm.tabs.length) * 100;
    }
  }
})();

