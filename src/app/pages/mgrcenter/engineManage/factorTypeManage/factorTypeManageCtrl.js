(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.engineManage.factorTypeManage').controller(
			'factorTypeManageCtrl', factorTypeManageCtrl);
	/** @ngInject */
	function factorTypeManageCtrl($scope, $filter, $uibModal,editableOptions, editableThemes,HttpService, toastr,Alert) {

		$scope.searchObj ={
				"operateType" : "",
				"operateDesc" : ""
		}
		
		
		$scope.sysOper ={
				"operateType" : "",
				"operateValue" : "",
				"operateDesc" : ""
		}

		$scope.addOper = function() {
			
			 $uibModal.open({
				 animation: true,
				backdrop : 'static',
				 templateUrl: 'app/pages/mgrcenter/engineManage/factorTypeManage/popupPages/addOper.html',
				 size : 'midle-600',
				 controller:'addOperCtrl',
				 scope:$scope,
				 resolve: {
				 }
			 });
		};
		// 查询事件
		$scope.searchOper = function() {

			var opts = {};
			opts.url = '/crm/manage/getOperListByEntity';
			opts.method = 'GET';
			opts.params = $scope.searchObj;
			HttpService.linkHttp(opts).then(function(response) {
				console.log("请求成功");
				console.log(response);
				$scope.OpersRowCollection = response.data;
				$scope.total=response.data.length;
			});
		}
		
		// 页面初始化查询
		$scope.searchOper();
		$scope.smartTablePageSize = 10;
		// 修改
		$scope.updateOper = function(index){
			$scope.updOper={};
			$scope.updOper.id = $scope.OpersRowCollection[index].id;
			$scope.updOper.operateType = $scope.OpersRowCollection[index].operateType;
			$scope.updOper.operateValue = $scope.OpersRowCollection[index].operateValue;
			$scope.updOper.operateDesc = $scope.OpersRowCollection[index].operateDesc;
			$uibModal
			.open({
				animation : true,
				backdrop : 'static',
				templateUrl : 'app/pages/mgrcenter/engineManage/factorTypeManage/popupPages/updOper.html',
				size : 'midle-600',
				controller : 'updOperCtrl',
				scope : $scope,
				resolve : {

				}
			});
		}
		// 删除
		$scope.removeOper=function(index){
			
			Alert.confirm("确定要删除该条记录？").then(function(){
				$scope.sysOper={};
				$scope.sysOper.operateType = $scope.OpersRowCollection[index].operateType;
				$scope.sysOper.operateValue = $scope.OpersRowCollection[index].operateValue;
				$scope.sysOper.operateDesc = $scope.OpersRowCollection[index].operateDesc;
				var opts = {};
				opts.url = '/crm/manage/delOper';
				opts.method = 'DELETE';
				opts.params = $scope.sysOper;
				HttpService.linkHttp(opts).then(function(response) {
					
					//toastr.success('提交完成!');
					console.log(response);
					if(response.status == 0){
						Alert.error(response.message);
					}
					$scope.searchOper();
				});
			});
		}
		

	}

}
)();
