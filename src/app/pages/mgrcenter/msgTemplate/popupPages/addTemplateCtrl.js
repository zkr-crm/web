(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.msgTemplate').controller(
			'addTemplateCtrl', addTemplateCtrl);
	/** @ngInject */
	function addTemplateCtrl($scope, $filter, toastr, HttpService, EnumType) {
		
		$scope.msgTpl={};
		
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
			opts.url = '/crm/manage/msgmng/addTemplate';
			opts.method = 'POST';
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
