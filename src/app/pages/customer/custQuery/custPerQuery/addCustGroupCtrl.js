(function() {
	'use strict';

	angular.module('BlurAdmin.pages.customer.custQuery.custPerQuery').controller(
			'addCustGroupCtrl', addCustGroupCtrl);
	/** @ngInject */
	function addCustGroupCtrl($scope, $filter, toastr, HttpService, EnumType,$uibModal,$rootScope, Alert, checkedRow) {
//		$scope.custSaleChgTrace={};
//		$scope.dealUser=$rootScope.global.user;
		$scope.custList = checkedRow
		// 查询条件对象
		$scope.searchObj = {
            groupName:'',
			createUser:$rootScope.global.user
		};
		// 编辑群组类型下拉框
		$scope.custGroupTyp = [];
		var initCustGroupTyp = {
			'value' : '',
			'label' : '-请选择-'
		};
		$scope.custGroupTyp.push(initCustGroupTyp);
		angular.forEach(EnumType.CustGroupTyp, function(i) {
			$scope.custGroupTyp.push(i);
		});
		// 群组类型选择事件
		$scope.selectCustGroupTyp = function(selected) {
			$scope.searchObj.groupType = selected.value;
		}        
		// 客户组类型
		$scope.showCustGroupTyp = function(item) {
			var xxx = "";
			angular.forEach(EnumType.CustGroupTyp, function(i) {
				if (item.groupType === i.value) {
					xxx = i.label;
				}
			});
			return xxx;
		}
		// 群组创建类型
		$scope.showEstablishType = function(item) {
			var xxx = "";
			angular.forEach(EnumType.EstablishType, function(i) {
				if (item.establishType === i.value) {
					xxx = i.label;
				}
			});
			return xxx;
		}
		// 群成员类型
		$scope.showGroupMemberType = function(item) {
			var xxx = "";
			angular.forEach(EnumType.GroupMemberType, function(i) {
				if (item.memberType === i.value) {
					xxx = i.label;
				}
			});
			return xxx;
		}
		
		// 分页查询客群信息列表
		$scope.queryGroupList = {};
		$scope.queryGroupList.pagination = {
	      	pageSize:'10',
	        pageIndex:1,
	        maxText:5
	    }
		$scope.queryGroupList.url = '/crm/ocrm/CustGroupMng/getCustGrpByEntity';
		$scope.queryGroupList.method = 'GET';
		$scope.searchObj.groupType = '1';
		$scope.queryGroupList.params = $scope.searchObj;
		$scope.queryGroupList.success = function successCallback(response) {
			$scope.rowCollection = response.data.list;
			$scope.searchObj.groupType = '';
			$scope.searchObj.groupName = '';
			$scope.selected = $scope.custGroupTyp[0];
		};
		// 查询当前登录用户的任务列表
		$scope.search = function(page) {
			$scope.searchObj.groupType = '1';
			//$scope.searchObj.groupName = '';delete by linbangbo 查询条件清空，导致条件失效
			$scope.queryGroupList.params = $scope.searchObj;
			// $scope.queryGroupList.pagesize = $scope.pagination.pageSize;
		    // var page = page||1;
			this.queryPage(page);
		};
     // 添加群组成员
		$scope.addGroupMember = function(groupId) {

			var groupMemberObj = [];
			angular.forEach($scope.custList, function(item) {
				var obj = {};
				obj.groupId = groupId;
				obj.custNo = item.custNo;
				obj.custType = item.custTyp;
				obj.groupType = EnumType.CustGroupTyp.staticGroup.value;// 静态群组
				groupMemberObj.push(obj);
			});

			var opts = {};
			opts.url = '/crm/ocrm/CustGroupMng/addGroupMember';
			opts.method = 'POST';
			opts.params = {};
			opts.data = groupMemberObj;
			HttpService.linkHttp(opts).then(function(response) {
				if (response.status === '1') {
					Alert.success("添加群组成员成功,添加成员个数：[" + response.data + "]!");
					$scope.chooseTypeModal.close();
					$scope.addTypeModal.close();
				} else {
					Alert.error(response.message)
				}
				// $scope.initData();
			});
		}
		// 保存至新增群组
		$scope.addNewGroupMember = function () {
			$scope.modalInstance = $uibModal.open({
			                templateUrl:'app/pages/customer/custMnt/popupPages/addCustGroup.html',
							animation : true,
			                backdrop:'static',
			                size:'midle-900',
			                scope:$scope,
			                resolve : {
			                    
			                }
		            });
		}
		 // 单个选中
		 $scope.radioRptOptions = {}
	      $scope.selectOne = function(i) {
	          angular.forEach($scope.rowCollection, function(i) {
	              if($scope.radioRptOptions.select == i.groupId){
	                  //alert("radioOptions.frequency");
	            	  $scope.groupId = i.groupId ; 
	              }

	          });
	      }

	    $scope.writCount = 200;
	    $scope.groupData = {}
		// 输入字数限定200字
		$scope.tolCount = function() {
			if ($scope.groupData.groupDesc.length > 200) {
				Alert.error('字数不能超过200字！');
			} else {
				$scope.writCount = 200 - $scope.groupData.groupDesc.length;
			}
		};

		// 关闭新增页面
		$scope.closePage = function() {
			$uibModal.$dismiss();
		}	
		$scope.closePage1 = function() {

			$scope.modalInstance.close();
			$scope.groupData = {}
		}
		$scope.addCustGroup = function() {

			if ($scope.groupData.groupName == ''|| $scope.groupData.groupName == undefined) {
				Alert.error('客群名称不能为空！');
				return;
			}
			if ($scope.groupData.groupDesc == ''|| $scope.groupData.groupDesc == undefined) {
				Alert.error('客群描述不能为空！');
				return;
			}

			// 群组创建方式：直接创建
			$scope.groupData.establishType = EnumType.EstablishType.establish.value;

			var opts = {};
			opts.url = '/crm/ocrm/CustGroupMng/addCustGroup';
			opts.method = 'POST';
			$scope.groupData.groupType = '1';//创建静态客群
			opts.params = $scope.groupData;
			HttpService.linkHttp(opts).then(function(response) {
				if (response.status == "1") {
					// Alert.success("新增客户群组成功,群组Id：[" + response.data + "]!");
					var groupId = response.data;
					$scope.addGroupMember(groupId)
					$scope.modalInstance.close();
					$scope.chooseTypeModal.close();
				} else {
					Alert.error('新增客户群组失败！');
				}
			});
		}
		$scope.dateFormat=function(date,formatType){
			if(date==null){
				return "";
			}
			return $filter('date')(new Date(date),formatType);
		}
	}
})();
