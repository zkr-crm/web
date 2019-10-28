(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.engineManage.factorValueManage').controller(
			'factorValueManageCtrl', factorValueManageCtrl);
	/** @ngInject */
	function factorValueManageCtrl($scope, $filter, $uibModal,editableOptions, editableThemes,HttpService, toastr,Alert) {

		$scope.searchObj ={
				"valueType" : "",
				"valueDesc" : ""
		}
		
		$scope.sysValue ={
				"valueType" : "",
				"valueDesc" : ""
		}

		$scope.addValue = function() {
			
			 $uibModal.open({
				 animation: true,
				backdrop : 'static',
				 templateUrl: 'app/pages/mgrcenter/engineManage/factorValueManage/popupPages/addValue.html',
				 size : 'midle-600',
				 controller:'addValueCtrl',
				 scope:$scope,
				 resolve: {
				 }
			 });
		};
		// 查询事件
		$scope.searchValue = function() {

			var opts = {};
			opts.url = '/crm/manage/getValueListByEntity';
			opts.method = 'GET';
			opts.params = $scope.searchObj;
			HttpService.linkHttp(opts).then(function(response) {
				console.log("请求成功");
				console.log(response);
				$scope.valuesRowCollection = response.data;
				$scope.total=response.data.length;
			});
		}
		
		// 页面初始化查询
		$scope.searchValue();
		$scope.smartTablePageSize = 10;
		// 修改
		$scope.updateValue = function(index){
			$scope.updValue={};
			$scope.updValue.id = $scope.valuesRowCollection[index].id;
			$scope.updValue.valueType = $scope.valuesRowCollection[index].valueType;
			$scope.updValue.valueDesc = $scope.valuesRowCollection[index].valueDesc;
			$uibModal
			.open({
				animation : true,
				backdrop : 'static',
				templateUrl : 'app/pages/mgrcenter/engineManage/factorValueManage/popupPages/updValue.html',
				size : 'midle-600',
				controller : 'updValueCtrl',
				scope : $scope,
				resolve : {

				}
			});
		}
		// 删除
		$scope.removeValue=function(index){
			
			Alert.confirm("确定要删除该条记录？").then(function(){
				$scope.sysValue={};
				$scope.sysValue.id = $scope.valuesRowCollection[index].id;
				$scope.sysValue.valueType = $scope.valuesRowCollection[index].valueType;
				$scope.sysValue.valueDesc = $scope.valuesRowCollection[index].valueDesc;
				var opts = {};
				opts.url = '/crm/manage/delValue';
				opts.method = 'DELETE';
				opts.params = $scope.sysValue;
				HttpService.linkHttp(opts).then(function(response) {
					//toastr.success('提交完成!');
					console.log(response);
					if(response.status == 0){
						Alert.error(response.message);
					}
					$scope.searchValue();
				});
			});
		
		}
		
	}

}
)();
