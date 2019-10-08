(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.paramManage').controller(
			'paramManageCtrl', paramManageCtrl);
	/** @ngInject */
	function paramManageCtrl($scope, $filter, $uibModal,editableOptions, editableThemes,HttpService, toastr,Alert) {

		$scope.searchObj ={
				"paramType" : "",
				"paramCode" : "",
				"paramValue" : ""
		}
		
		$scope.sysParam ={
			"paramType" : "",
			"paramCode" : "",
			"paramValue" : "",
			"paramDesc" : ""
		}
		// 参数对象数据集
		$scope.ParamsRowCollection = [ {
			"paramType" : "",
			"paramCode" : "",
			"paramValue" : "",
			"paramDesc" : ""
		} ];

		$scope.addParam = function() {
			
			 $uibModal.open({
				 animation: true,
				 templateUrl: 'app/pages/mgrcenter/paramManage/popupPages/addParam.html',
				 size: 'midle-900',
				 controller:'addParamCtrl',
				 scope:$scope,
				 resolve: {
				 }
			 });
		};
		// 查询事件
		$scope.searchParam = function() {

			var opts = {};
			opts.url = '/crm/manage/paramng/selectByEntity';
			opts.method = 'GET';
			opts.params = $scope.searchObj;
			HttpService.linkHttp(opts).then(function(response) {
				$scope.ParamsRowCollection = response.data;
			});
		}
		
		// 页面初始化查询
		$scope.searchParam();
		$scope.smartTablePageSize = 10;
		// 修改
		$scope.updateParam = function(index){
			$scope.sysParam={};
			$scope.sysParam.paramType = $scope.ParamsRowCollection[index].paramType;
			$scope.sysParam.paramCode = $scope.ParamsRowCollection[index].paramCode;
			$scope.sysParam.paramValue = $scope.ParamsRowCollection[index].paramValue;
			$scope.sysParam.paramDesc = $scope.ParamsRowCollection[index].paramDesc;
			$uibModal
			.open({
				animation : true,
				backdrop : 'static',
				templateUrl : 'app/pages/mgrcenter/paramManage/popupPages/updParam.html',
				size : 'midle-900',
				controller : 'updParamCtrl',
				scope : $scope,
				resolve : {

				}
			});
		}
		// 删除
		$scope.removeParam=function(index){
			$scope.sysParam={};
			$scope.sysParam.paramType = $scope.ParamsRowCollection[index].paramType;
			$scope.sysParam.paramCode = $scope.ParamsRowCollection[index].paramCode;
			$scope.sysParam.paramValue = $scope.ParamsRowCollection[index].paramValue;
			$scope.sysParam.paramDesc = $scope.ParamsRowCollection[index].paramDesc;
			var opts = {};
			opts.url = '/crm/manage/paramng/param';
			opts.method = 'POST';
			opts.params = $scope.sysParam;
			HttpService.linkHttp(opts).then(function(response) {
				toastr.success('提交完成!');
				$scope.searchParam();
			});
		}
		
		// 物理删除事件（多行删除）
		$scope.batchRemoveParam = function() {

			if ($scope.count == 0) {
				Alert.error('请选择要删除的行！');
			} else {

				Alert.confirm("确定删除？").then(function() {
					var opts = {};
					opts.url = 'crm/manage/paramng/delParamsByKey';
					opts.method = 'POST';
					opts.params = {};
					opts.data = $scope.checkedRow;
					HttpService.linkHttp(opts).then(function(response) {
						// 执行查询
						$scope.searchParam();
					});
					$scope.checkedRow = [];
				});

				// if (Alert.confirm("确定删除？") == true) {
				//					
				// } else {
				// // 无处理
				// }
			}
		};

		$scope.checkedRow = [];
		// 全选
		$scope.selectAll = function() {
			if (!$scope.select_all) {
				$scope.checkedRow = [];
				var count = 0;
				angular.forEach($scope.ParamsRowCollection, function(i) {
					i.checked = true;

					// 删除条件对象
					$scope.delObj = {
							'paramType' : '',
							'paramCode' : ''
						};
						$scope.delObj.paramType = i.paramType;
						$scope.delObj.paramCode = i.paramCode;

					$scope.checkedRow.push($scope.delObj);
				})
				$scope.select_all = true;
			} else {
				angular.forEach($scope.ParamsRowCollection, function(i) {
					i.checked = false;
					$scope.checkedRow = [];
				})
				$scope.select_all = false;
			}
		};

		// 单个选中
		$scope.selectOne = function() {
			$scope.checkedRow = [];
			angular.forEach($scope.ParamsRowCollection, function(i) {
				var index = $scope.checkedRow.indexOf(i);
				if (i.checked && index === -1) {

					// 删除条件对象
					$scope.delObj = {
						'paramType' : '',
						'paramCode' : ''
					};
					$scope.delObj.paramType = i.paramType;
					$scope.delObj.paramCode = i.paramCode;

					$scope.checkedRow.push($scope.delObj);
				} else if (!i.checked && index !== -1) {
					$scope.checkedRow.splice(index, 1);
				}
			});

			if ($scope.ParamsRowCollection.length === $scope.checkedRow.length) {
				$scope.select_all = true;
			} else {
				$scope.select_all = false;
			}
		}
	}

}
)();
