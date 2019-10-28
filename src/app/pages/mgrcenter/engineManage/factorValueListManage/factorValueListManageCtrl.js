(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.engineManage.factorValueListManage').controller(
			'factorValueListManageCtrl', factorValueListManageCtrl);
	/** @ngInject */
	function factorValueListManageCtrl($scope, $stateParams, $filter, $uibModal,editableOptions, editableThemes,HttpService, toastr,Alert) {
        var vParamName = $stateParams.paramName;
        $scope.searchObj ={
        		"itemName" : "",
        		"itemCode" : "",
        		"paramName" : ""
        }
        
        $scope.sysParam ={
        		"itemName" : "",
        		"itemCode" : "",
        		"paramName" : ""
        }
		
        if( vParamName ){
        	$scope.searchObj.paramName = vParamName;
        }
        

		$scope.addParam = function() {
			
			 $uibModal.open({
				 animation: true,
				 templateUrl: 'app/pages/mgrcenter/engineManage/factorValueListManage/popupPages/addParam.html',
				 size : 'midle-600',
				 controller:'addParamCtrl',
				 scope:$scope,
				 resolve: {
				 }
			 });
		};
		// 查询事件
		$scope.searchParam = function() {

			var opts = {};
			opts.url = '/crm/manage/getParamListByEntity';
			opts.method = 'GET';
			opts.params = $scope.searchObj;
			HttpService.linkHttp(opts).then(function(response) {
				$scope.ParamsRowCollection = response.data;
				$scope.total=response.data.length;
			});
		}
		
		// 页面初始化查询
		$scope.searchParam();
		$scope.smartTablePageSize = 10;
		// 修改
		$scope.updateParam = function(index){
			$scope.sysParam={};
			$scope.sysParam.itemCode = $scope.ParamsRowCollection[index].itemCode;
			$scope.sysParam.paramName = $scope.ParamsRowCollection[index].paramName;
			$scope.sysParam.itemName = $scope.ParamsRowCollection[index].itemName;
			$uibModal
			.open({
				animation : true,
				backdrop : 'static',
				templateUrl : 'app/pages/mgrcenter/engineManage/factorValueListManage/popupPages/updParam.html',
				size : 'midle-600',
				controller : 'updParamCtrl',
				scope : $scope,
				resolve : {

				}
			});
		}
		// 删除
		$scope.removeParam=function(index){
			
			Alert.confirm("确定要删除该条记录？").then(function(){
				$scope.sysParam={};
				$scope.sysParam.itemCode = $scope.ParamsRowCollection[index].itemCode;
				$scope.sysParam.paramName = $scope.ParamsRowCollection[index].paramName;
				$scope.sysParam.itemName = $scope.ParamsRowCollection[index].itemName;
				var opts = {};
				opts.url = '/crm/manage/delParam';
				opts.method = 'DELETE';
				opts.params = $scope.sysParam;
				HttpService.linkHttp(opts).then(function(response) {
					toastr.success('提交完成!');
					$scope.searchParam();
				});
			});
			
			
			
		}
		
	}

}
)();
