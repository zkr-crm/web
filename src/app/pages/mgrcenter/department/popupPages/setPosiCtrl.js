(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.department').controller(
			'setPosiCtrl', setPosiCtrl);
	/** @ngInject */
	function setPosiCtrl($scope, $timeout, HttpService, Alert, EnumType) {

		// 岗位枚举列表
		// $scope.PosiTypes = EnumType.PosiType;

		// 未设置岗位
//		$scope.notSetPosi = EnumType.PosiType;
		// 已设置岗位
//		$scope.onSetPosi = EnumType.PosiType;

		//按钮状态
		$scope.state = {};
		$scope.state.addPosi=false;
		$scope.state.delPosi=false;
		$scope.state.addAllPosi=false;
		$scope.state.delAllPosi=false;
		// 左侧列表集合
		$scope.LeftRowCollection = [];
		// 右侧列表集合
		$scope.RightRowCollection = [];
		// 左侧选中行
		$scope.checkedRowLeft = [];
		// 右侧选中行
		$scope.checkedRowRight = [];

		// 左侧列表单个选中
		$scope.selectLeftOne = function() {
			//获取选中的行
			angular.forEach($scope.LeftRowCollection, function(i) {
				var index = $scope.checkedRowLeft.indexOf(i);
				if (i.checked && index === -1) {
					$scope.checkedRowLeft.push(i);
				} else if (!i.checked && index !== -1) {
					$scope.checkedRowLeft.splice(index, 1);
				}
			});
		}

		// 右侧列表单个选中
		$scope.selectRightOne = function() {

			//获取选中的行
			angular.forEach($scope.RightRowCollection, function(i) {
				var index = $scope.checkedRowRight.indexOf(i);
				if (i.checked && index === -1) {

					$scope.checkedRowRight.push(i);
				} else if (!i.checked && index !== -1) {
					$scope.checkedRowRight.splice(index, 1);
				}
			});
		}

		$scope.initData = function(index) {
			
			//获取已有的部门岗位信息
			var opts = {};
			opts.url = '/crm/manage/getPosiByDept';
			opts.method = 'GET';
			opts.params = {
				deptCode : $scope.deptCode
			};
			HttpService.linkHttp(opts).then(function(response) {
				if(response.data==undefined){
					
				}else{
					//将获取到的数据添加到右侧列表中
					angular.forEach(response.data, function(i) {
						
						var obj={};
						obj.value=i.posiCode;
						obj.label=i.posiName;
						$scope.RightRowCollection.push(obj);
					});
					
					//初始化左右两侧的列表
					angular.forEach(EnumType.PosiType, function(i) {
						var obj={};
						obj.value=i.value;
						obj.label=i.label;
						$scope.LeftRowCollection.push(obj);
					});

					//将右侧列表中存在的行从左侧列表中去除
					angular.forEach($scope.RightRowCollection, function(i) {

						angular.forEach($scope.LeftRowCollection, function(j) {
						
							if(j.label===i.label && j.value===i.value){
								var index = $scope.LeftRowCollection.indexOf(j);
								$scope.LeftRowCollection.splice(index, 1);
							}
							
						});
					});
				}
				
				//判断左右两侧列表长度，确定增加、删除、增加全部、删除全部是否可操作
				$scope.disableButtons();
			});
		}
		
		//新增选中的岗位
		$scope.addPosi = function() {
			
			//删除左侧列表中的被选中项
			angular.forEach($scope.checkedRowLeft, function(i) {
				var index = $scope.LeftRowCollection.indexOf(i);
				if (index === -1) {
					
				}else{
					$scope.LeftRowCollection.splice(index, 1);
				}
			});
			//将被选中项添加到右侧列表中
			angular.forEach($scope.checkedRowLeft, function(i) {
				var index = $scope.RightRowCollection.indexOf(i);
				if (index === -1) {
					i.checked=false;
					$scope.RightRowCollection.push(i);
				}
			});

			//将右侧所有已选中的行置为未选中
			angular.forEach($scope.RightRowCollection, function(i) {
				i.checked=false;
			});
			// 左侧选中行
			$scope.checkedRowLeft = [];
			// 右侧选中行
			$scope.checkedRowRight = [];
			
			//判断左右两侧列表长度，确定增加、删除、增加全部、删除全部是否可操作
			$scope.disableButtons();
		}
		
		//删除选中的岗位
		$scope.delPosi = function() {

			//删除右侧列表中的被选中项
			angular.forEach($scope.checkedRowRight, function(i) {
				var index = $scope.RightRowCollection.indexOf(i);
				if (index === -1) {
					
				}else{
					$scope.RightRowCollection.splice(index, 1);
				}
			});
			//将被选中项添加到左侧列表中
			angular.forEach($scope.checkedRowRight, function(i) {
				var index = $scope.LeftRowCollection.indexOf(i);
				if (index === -1) {
					i.checked=false;
					$scope.LeftRowCollection.push(i);
				}
			});
			
			//将左侧所有已选中的行置为未选中
			angular.forEach($scope.LeftRowCollection, function(i) {
				i.checked=false;
			});
			// 右侧选中行
			$scope.checkedRowRight = [];
			// 左侧选中行
			$scope.checkedRowLeft = [];

			//判断左右两侧列表长度，确定增加、删除、增加全部、删除全部是否可操作
			$scope.disableButtons();
		}
		
		//新增全部的岗位
		$scope.addAllPosi = function() {

			angular.forEach($scope.LeftRowCollection, function(i) {
				$scope.RightRowCollection.push(i);
			});

			$scope.LeftRowCollection=[];
			// 右侧选中行
			$scope.checkedRowRight = [];
			// 左侧选中行
			$scope.checkedRowLeft = [];
			
			//判断左右两侧列表长度，确定增加、删除、增加全部、删除全部是否可操作
			$scope.disableButtons();
		}
		
		//删除全部的岗位
		$scope.delAllPosi = function() {
			angular.forEach($scope.RightRowCollection, function(i) {
				$scope.LeftRowCollection.push(i);
			});
			$scope.RightRowCollection=[];
			// 右侧选中行
			$scope.checkedRowRight = [];
			// 左侧选中行
			$scope.checkedRowLeft = [];

			//判断左右两侧列表长度，确定增加、删除、增加全部、删除全部是否可操作
			$scope.disableButtons();
		}
		
		//保存部门岗位列表
		$scope.saveDeptPosi=function(){
			
			//编辑保存列表对象
			var saveObjList=[];
			angular.forEach($scope.RightRowCollection, function(i) {
				
				var saveObj={};
				saveObj.deptCode=$scope.deptCode;
				saveObj.posiCode=i.value;
				saveObj.posiName=i.label;
				saveObjList.push(saveObj);
			});
			
			//更新部门岗位表数据
			var opts = {};
			opts.url = '/crm/manage/updDeptPosi';
			opts.method = 'PUT';
			opts.params = {
					"deptCode":$scope.deptCode
			};
			opts.data = saveObjList;
			HttpService.linkHttp(opts).then(function(response) {
				console.log("请求成功");
				console.log(response);
				Alert.success("岗位设置成功！");
				$scope.$parent.$dismiss();
			});
		}
		
		//判断左右两侧列表长度，确定增加、删除、增加全部、删除全部是否可操作
		$scope.disableButtons=function(){
			if($scope.RightRowCollection.length==0){
				$scope.state.delPosi=true;
				$scope.state.delAllPosi=true;
			}else{
				$scope.state.delPosi=false;
				$scope.state.delAllPosi=false;				
			}
			
			if($scope.LeftRowCollection.length==0){
				$scope.state.addPosi=true;
				$scope.state.addAllPosi=true;
			}else{
				$scope.state.addPosi=false;
				$scope.state.addAllPosi=false;
			}		
		}
		
		//执行初始化
		$scope.initData();
	}
})();
