(function() {
	'use strict';

	angular.module('BlurAdmin.pages.custGroup').controller('staticCtrl',
		staticCtrl);

	/** @ngInject */
	function staticCtrl($scope, $element, $stateParams, $uibModal, $state,
						EnumType, layoutPaths, baConfig, HttpService, Alert) {

		// 群组ID
		$scope.groupId = $stateParams.groupId;

		if ($scope.groupId == '' || $scope.groupId == undefined) {
			window.history.go(-1);
			return;
		}

		// 页面数据初始化
		$scope.initData = function() {

			var opts = {}
			opts.url = '/crm/ocrm/CustGroupMng/getCustGroupInfoByGroupId';
			opts.method = 'GET';
			opts.params = {
				'groupId' : $scope.groupId
			};
			HttpService.linkHttp(opts).then(function(response){
				var data = response.data;
				$scope.custGrop = data.custGrp;
				$scope.custList = data.custGrpMemberList;
			})

			$scope.queryCust = {}
			$scope.queryCustObj = {}
			$scope.queryCust.pagination = {
				pageSize:'10',
				pageIndex:1,
				maxText:5
			}
			$scope.queryCustObj.groupId = $scope.groupId;
			$scope.queryCust.url = '/crm/ocrm/CustGroupMng/getCustListByEntity';
			$scope.queryCust.method = 'GET';
			$scope.queryCust.params = $scope.queryCustObj;
			$scope.queryCust.success = function successCallback (response) {
				if (response.status === '1') {
					if (!!!$scope.custList) {
						$scope.changeFlag('queryCust')
					}
					$scope.custList = response.data.list;
				}
			}
		}
		$scope.initData();

		// 客户分布图类型下拉列表初始化
		$scope.custChartType = [];
		$scope.selected = {};
		angular.forEach(EnumType.CustChartType, function(i) {
			if (i.value == '1' || i.value == '3') {
				$scope.custChartType.push(i);
			}
		});
		// 客户分布图类型下拉列表选中事件
		$scope.selectCustChartType = function(selected) {
			$scope.selected.value = selected.value;
		}

		// 客户组类型
		$scope.showCustGroupTyp = function(value) {
			var xxx = "";
			angular.forEach(EnumType.CustGroupTyp, function(i) {
				if (value === i.value) {
					xxx = i.label;
				}
			});
			return xxx;
		}
		// 群组创建类型
		$scope.showEstablishType = function(value) {
			var xxx = "";
			angular.forEach(EnumType.EstablishType, function(i) {
				if (value === i.value) {
					xxx = i.label;
				}
			});
			return xxx;
		}

		// 客户类型
		$scope.showCustTyp = function(value) {
			var xxx = "";
			angular.forEach(EnumType.CustType, function(i) {
				if (value === i.value) {
					xxx = i.label;
				}
			});
			return xxx;
		}

		// 群成员类型
		$scope.showGroupMemberType = function(value) {
			var xxx = "";
			angular.forEach(EnumType.GroupMemberType, function(i) {
				if (value === i.value) {
					xxx = i.label;
				}
			});
			return xxx;
		}

		// 时间类型格式化
		$scope.dateFormate=function(value){
			if(value!=undefined && value !=null && value!="" ){
				return value.substring(0,10);
			}
			return value;
		}

		// 选中行对象
		$scope.checkedRow = [];
		// 全选
		$scope.selectAll = function() {
			if (!$scope.select_all) {
				$scope.checkedRow = [];
				var count = 0;
				angular.forEach($scope.custList, function(i) {
					i.isChecked = true;

					// 选中对象
					$scope.checkedRow.push(i);
				})
				$scope.select_all = true;
			} else {
				angular.forEach($scope.custList, function(i) {
					i.isChecked = false;
					$scope.checkedRow = [];
				})
				$scope.select_all = false;
			}
		};

		// 单个选中
		$scope.selectOne = function() {
			angular.forEach($scope.custList, function(i) {
				var index = $scope.checkedRow.indexOf(i);
				if (i.isChecked && index === -1) {

					// 选中对象
					$scope.checkedRow.push(i);
				} else if (!i.isChecked && index !== -1) {
					$scope.checkedRow.splice(index, 1);
				}
			});

			if ($scope.custList.length === $scope.checkedRow.length) {
				$scope.select_all = true;
			} else {
				$scope.select_all = false;
			}
		}

		// 成员页签中默认显示客户群组成员列表,及列表和图表的切换
		$scope.type = 0;
		$scope.showData = function(args) {

			$scope.index_ = args ; // 控制按钮样式变色

			if (args == 1) {
				$scope.type = 1;
			} else {
				$scope.type = 0;
			}
		}

		// 打开客户详情页面
		$scope.openCustDetail = function(custNo) {
			$state.go('portrayal.perCusPortrayal', {
				'custNo' : custNo
			});
		}

		// 查询客户信息
		// $scope.queryCustObj = {};
		// $scope.queryCust = function() {

		// 	$scope.queryCustObj.groupId = $scope.groupId;

		// 	var opts = {};
		// 	opts.url = '/crm/ocrm/CustGroupMng/getCustListByEntity';
		// 	opts.method = 'GET';
		// 	opts.params = $scope.queryCustObj;
		// 	HttpService.linkHttp(opts).then(function(response) {

		// 		$scope.custList = response.data;

		// 	});
		// }
		// $scope.queryCust()

		// 修改群组名称
		$scope.editGroupName = function() {
			$uibModal.open({
				animation : true,
				backdrop : 'static',
				templateUrl : 'app/pages/custGroup/popupPage/editGroup.html',
				size : 'midle-900',
				controller : 'editGroupCtrl',
				scope : $scope,
				resolve : {

				}
			});
		}

		// 打开客户列表页面
		$scope.openCustListPage = function() {
			$scope.addGroupMemberModal = $uibModal
				.open({
					animation : true,
					backdrop : 'static',
					templateUrl : 'app/pages/custGroup/popupPage/showCustList.html',
					size : 'midle-900',
					controller : 'groupSelectCustListCtrl',
					scope : $scope,
					resolve : {

					}
				});
		}

		// 删除群组成员
		$scope.delGroupMember = function() {

			if ($scope.checkedRow.length == 0) {
				Alert.error("请选择要从客群中移除的客户！");
				return;
			}
			Alert.confirm("确定移除？").then(function() {
				var opts = {};
				opts.url = '/crm/ocrm/CustGroupMng/delMultiGroupMember';
				opts.method = 'POST';
				opts.params = {};
				opts.data = $scope.checkedRow;
				HttpService.linkHttp(opts).then(function(response) {

					Alert.success("删除群组成员成功,删除成员个数：[" + response.data + "]!");
					$scope.initData();
				});
			});
		}
		$scope.delGroupOneMember = function(item) {

			Alert.confirm("确定移除？").then(function() {
				var opts = {};
				opts.url = '/crm/ocrm/CustGroupMng/delMultiGroupMember';
				opts.method = 'POST';
				opts.params = {};
				opts.data = [item];
				HttpService.linkHttp(opts).then(function(response) {
					$scope.initData();
				});
			});
		}
		// 运营任务查询条件对象
		$scope.obj = {
			'queryCondition' : '',
			'groupId' : $scope.groupId
		};
		// 分页查询运营任务列表
		$scope.queryGroupOper = {};
		$scope.queryGroupOper.pagination = {
			pageSize:'10',
			pageIndex:1,
			maxText:5
		}
		$scope.queryGroupOper.url = '/crm/ocrm/CustGroupMng/selectOnFuzzy';
		$scope.queryGroupOper.method = 'GET';
		$scope.queryGroupOper.params = $scope.obj;
		$scope.queryGroupOper.success = function successCallback(response) {
			$scope.GroupOperList = response.data.list;
		};

		// 查询运营任务列表
		// $scope.doQueryGroupOper = function() {
		// 	$scope.queryGroupOper.params = $scope.obj;
		// 	this.queryPage(1);
		// }

		// 显示运营任务详细信息
		$scope.showOperDetail = function(item) {

			$scope.groupOperId = item.groupOperId;

			$uibModal
				.open({
					animation : true,
					backdrop : 'static',
					templateUrl : 'app/pages/custGroup/popupPage/showOperCustList.html',
					size : 'midle-900',
					controller : 'showOperCustCtrl',
					scope : $scope,
					resolve : {

					}
				});
		}

		// 短信群发窗口
		$scope.msgGroupSend = function() {

			if ($scope.checkedRow.length == 0) {
				Alert.error('请选择发送短信的客户！');
				return;
			}
			$uibModal
				.open({
					animation : true,
					backdrop : 'static',
					templateUrl : 'app/pages/custGroup/popupPage/msgGroupSend.html',
					size : 'midle-900',
					controller : 'msgGroupSendCtrl',
					scope : $scope,
					resolve : {}
				});
		}

		// 打开外呼任务生成页面
		$scope.openOutboundTask = function() {

			if ($scope.checkedRow.length == 0) {
				Alert.error('请选择创建外呼任务的客户！');
				return;
			}
			$uibModal
				.open({
					animation : true,
					backdrop : 'static',
					templateUrl : 'app/pages/custGroup/popupPage/OutboundTask.html',
					size : 'midle-900',
					controller : 'OutboundTaskCtrl',
					scope : $scope,
					resolve : {}
				});
		}
		$scope.search = function (page) {
			var page = page || '1';
			// $scope.queryCust.pageSize = $scope.pagination.pageSize;
			// $scope.queryGroupOper.pageSize = $scope.pagination.pageSize;
			$scope.queryCust.params = $scope.queryCustObj;
			$scope.queryGroupOper.params = $scope.obj;
			this.queryPage(page)
		}
		// 切换tab时分页组件初始化
		$scope.changeFlag = function (pageFlag) {
			$scope.pageFlag = pageFlag;
			// $scope.pagination.pageSize = $scope[$scope.pageFlag].pageSize || '10';
			// $scope.pagination.totalItems = $scope[$scope.pageFlag].totalItems;
			// $scope.pagination.pageIndex = $scope[$scope.pageFlag].pageIndex || '1';
		}
	}
})();
