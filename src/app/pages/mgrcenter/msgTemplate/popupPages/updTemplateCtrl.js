(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.msgTemplate').controller(
			'updTemplateCtrl', updTemplateCtrl);
	/** @ngInject */
	function updTemplateCtrl($scope, $filter, toastr, HttpService, EnumType) {
		
    	$scope.effOpen = effOpen;
        $scope.effOpened = false;

        $scope.expOpen = expOpen;
        $scope.expOpened = false;
        // 打开日期控件
        function effOpen() {
            $scope.effOpened = true;
        }

        function expOpen() {
            $scope.expOpened = true;
        }

        $scope.init = function(){

    			var opts = {};
    			opts.url = '/crm/manage/msgmng/getOneMsgTemplate';
    			opts.method = 'GET';
				console.log($scope.msgTpl.tplNo);
    			opts.params = {'tplNo':$scope.msgTpl.tplNo};
    			HttpService.linkHttp(opts).then(function(response) {
    				$scope.msgTpl = response.data;
    				console.log($scope.msgTpl.effectDt);   				
    				var effectDt = new Date($scope.msgTpl.effectDt);
    				$scope.msgTpl.effectDt = effectDt; 
    				var expDt = new Date($scope.msgTpl.expDt);
    				$scope.msgTpl.expDt = expDt;
    				$scope.initSelect();
    			});

        }
        $scope.init();
		// 初始化下拉列表的值
		$scope.initSelect = function() {

			// 业务类型下拉列表初始化
			angular.forEach(EnumType.busiType, function(i) {
				if ($scope.msgTpl.busiType === i.value) {
					$scope.selectedBusiType = i;
				}
			});
			angular.forEach(EnumType.tplType, function(i) {
				if ($scope.msgTpl.tplType === i.value) {
					$scope.selectedTplType = i;
				}
			});
		}
		// 业务类型列表
		$scope.busiTypeList = EnumType.busiType;
		// 业务类型选中事件
		$scope.selectBusiType = function(selectedBusiType) {
			$scope.msgTpl.busiType = selectedBusiType.value;
		}

		// 模板类型列表
		$scope.tplTypeList = EnumType.tplType;
		// 模板类型选中事件
		$scope.selectTplType = function(selectedTplType) {
			$scope.msgTpl.tplType = selectedTplType.value;
		}

		// 保存用户信息
		$scope.saveValue = function(isValid) {

			if (!isValid) {
				return;
			}			
			var opts = {};
			opts.url = '/crm/manage/msgmng/modTemplate';
			opts.method = 'PUT';
			opts.params = $scope.msgTpl;
			// 日期格式转换
			if($scope.msgTpl.effectDt !=null && $scope.msgTpl.effectDt!=''){
				var effectDt = new Date($scope.msgTpl.effectDt);
				opts.params.effectDt = $filter('date')(effectDt, 'yyyy-MM-dd'); 
			}
			if($scope.msgTpl.expDt !=null && $scope.msgTpl.expDt!=''){
				var expDt = new Date($scope.msgTpl.expDt);
				opts.params.expDt = $filter('date')(expDt, 'yyyy-MM-dd'); 
			}
			HttpService.linkHttp(opts).then(function(response) {
				console.log("请求成功");
				console.log(response);
				$scope.msgTpl = {};
				// 执行查询
				$scope.$dismiss();
				$scope.search();
			});
		}
		// 关闭新增页面
		$scope.closePage = function() {

			$scope.$dismiss();
		}
	}
})();
