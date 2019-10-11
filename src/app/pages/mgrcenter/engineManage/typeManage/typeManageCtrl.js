(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.engineManage.typeManage').controller(
			'typeManageCtrl', typeManageCtrl);
	/** @ngInject */
	function typeManageCtrl($scope, $filter, $uibModal,editableOptions, editableThemes,HttpService, toastr,Alert) {

		$scope.searchObj ={
				"factorType" : "",
				"typeDesc" : ""
		}
		
		$scope.sysType ={
				"factorType" : "",
				"typeDesc" : ""
		}

		$scope.addType = function() {
			
			 $uibModal.open({
				 animation: true,
				backdrop : 'static',
				 templateUrl: 'app/pages/mgrcenter/engineManage/typeManage/popupPages/addType.html',
				 size : 'midle-600',
				 controller:'addTypeCtrl',
				 scope:$scope,
				 resolve: {
				 }
			 });
		};
		// 查询事件
		$scope.searchType = function() {

			var opts = {};
			opts.url = '/crm/manage/getTypeListByEntity';
			opts.method = 'GET';
			opts.params = $scope.searchObj;
			HttpService.linkHttp(opts).then(function(response) {
				console.log("请求成功");
				console.log(response);
				$scope.TypesRowCollection = response.data;
				$scope.total=response.data.length;
			});
		}
		
		// 页面初始化查询
		$scope.searchType();
		$scope.smartTablePageSize = 10;
		// 修改
		$scope.updateType = function(index){
			$scope.updType={};
			$scope.updType.id = $scope.TypesRowCollection[index].id;
			$scope.updType.factorType = $scope.TypesRowCollection[index].factorType;
			$scope.updType.typeDesc = $scope.TypesRowCollection[index].typeDesc;
			$uibModal
			.open({
				animation : true,
				backdrop : 'static',
				templateUrl : 'app/pages/mgrcenter/engineManage/typeManage/popupPages/updType.html',
				size : 'midle-600',
				controller : 'updTypeCtrl',
				scope : $scope,
				resolve : {

				}
			});
		}
		// 删除
		$scope.removeType=function(index){
			
			Alert.confirm("确定要删除该条记录？").then(function(){
				$scope.sysType={};
				$scope.sysType.id = $scope.TypesRowCollection[index].id;
				$scope.sysType.factorType = $scope.TypesRowCollection[index].factorType;
				$scope.sysType.typeDesc = $scope.TypesRowCollection[index].typeDesc;
				var opts = {};
				opts.url = '/crm/manage/delType';
				opts.method = 'DELETE';
				opts.params = $scope.sysType;
				HttpService.linkHttp(opts).then(function(response) {
					//toastr.success('提交完成!');
					console.log(response);
					if(response.status == 0){
						Alert.error(response.message);
					}
					$scope.searchType();
				}
				
				
				
				);
			});
		}
		

	}

}
)();
