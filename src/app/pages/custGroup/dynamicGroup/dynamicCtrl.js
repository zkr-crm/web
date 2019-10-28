(function() {
	'use strict';

	angular.module('BlurAdmin.pages.custGroup').controller('dynamicCtrl',
			dynamicCtrl);

	/** @ngInject */
	function dynamicCtrl($scope, $element, $stateParams, $state, $uibModal,
			$window, layoutPaths, baConfig, EnumType, HttpService, Alert) {

		// 群组ID
		$scope.groupId = $stateParams.groupId;

		$scope.custGrop = {};
		$scope.custList = [];
		// 页面数据初始化
		$scope.initData = function() {

			var opts = {};
			opts.url = '/crm/ocrm/CustGroupMng/getCustGroupInfoByGroupId';
			opts.method = 'GET';
			opts.params = {
				'groupId' : $scope.groupId
			};
			HttpService.linkHttp(opts).then(function(response) {

				var data = response.data;
				$scope.custGrop = data.custGrp;
				$scope.custList = data.custGrpMemberList;//群组成员列表
				$scope.custTotal=$scope.custList.length;
				
				//获取客户名、客户类型等信息
				var custNoStr="";
				angular.forEach($scope.custList, function(i) {
					custNoStr=custNoStr+i.custNo+",";
				});
				$scope.getCustInfo(custNoStr);
				
			});
		}
		$scope.initData();

		//根据客户号获取客户信息
		$scope.getCustInfo=function(custNoStr){
			
			var obj = {
				'custNoStr':custNoStr
			}
			
			var opts = {};
			opts.url = '/crm/ecif/cust/mng/getPerCustInfoByCustNoStr';
			opts.method = 'GET';
			opts.params = obj;
			HttpService.linkHttp(opts).then(function(response) {
				var custInfoArray = response.data;
				
				angular.forEach(custInfoArray, function(custInfo) {

					angular.forEach($scope.custList, function(i) {
						if(custInfo.custNo==i.custNo){
							i.custName=custInfo.custName;//客户姓名
							i.custType=custInfo.custTyp;//客户类型
						}
					});
				});
				
			});
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

		$scope.groupTaskStatus = EnumType.TaskStat;

		// 群组创建类型
		$scope.showGroupTaskStat = function(value) {
			var xxx = "";
			angular.forEach(EnumType.TaskStat, function(i) {
				if (value === i.value) {
					xxx = i.label;
				}
			});
			return xxx;
		}
		
		// 群成员类型
		$scope.showEstablishType=function(value){
			return EnumType.EstablishType.getLabelByValue(value);
		}
		
		// 群组运营任务类型
		$scope.showGroupTaskType=function(value){
			return EnumType.GroupTaskType.getLabelByValue(value);
		}
		
		// 群组运营任务状态
		$scope.showGroupTaskStat=function(value){
			return EnumType.TaskStat.getLabelByValue(value);
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
		
		$scope.dateFormate=function(value){
			if(value!=undefined && value !=null && value!="" ){
				return value.substring(0,10);
			}
			return value;
		}

		// 成员页签中默认显示客户群组成员列表,及列表和图表的切换
		$scope.type = 0;
		$scope.showData = function(args) {
			
			$scope.index_ = args ; // 控制按钮样式变色
			
			if (args == 1) {
				$scope.type = 1;
			} else {

				// 显示客户群组列表
				$scope.type = 0;
			}
		}

		// 选中行对象
		$scope.checkedRow = [];
		$scope.select_all = false;
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

		// 打开客户详情页面
		$scope.openCustDetail = function(custNo) {
			$state.go('portrayal.perCusPortrayal', {
				'custNo' : custNo
			});
		}

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

		// 查询客户信息
		$scope.queryCustObj = {};
		$scope.queryCust = function() {

			$scope.queryCustObj.groupId = $scope.groupId;

			var opts = {};
			opts.url = '/crm/ocrm/CustGroupMng/getCustListByEntity';
			opts.method = 'GET';
			opts.params = $scope.queryCustObj;
			HttpService.linkHttp(opts).then(function(response) {

				$scope.custList = response.data;
				$scope.custTotal=$scope.custList.length;
				
				//获取客户名、客户类型等信息
				var custNoStr="";
				angular.forEach($scope.custList, function(i) {
					custNoStr=custNoStr+i.custNo+",";
				});
				$scope.getCustInfo(custNoStr);
			});
		}

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

		// 运营任务查询条件对象
		$scope.obj = {
			'queryCondition' : '',
			'groupId' : $scope.groupId
		};
		// 分页查询运营任务列表
		$scope.queryGroupOper = {};
		$scope.queryGroupOper.url = '/crm/ocrm/CustGroupMng/selectOnFuzzy';
		$scope.queryGroupOper.method = 'GET';
		$scope.queryGroupOper.params = $scope.obj;
		$scope.queryGroupOper.success = function successCallback(response) {
			$scope.GroupOperList = response.data;
		};

		// 查询运营任务列表
		$scope.doQueryGroupOper = function() {
			$scope.queryGroupOper.params = $scope.obj;
			this.queryPage(1);
		}
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

		// 显示快照详细信息
		$scope.showSnapDetail = function(item) {
			// 跳转至快照生成的静态群
			$state.go('staticGroup', {
				'groupId' : item.newGroupId
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

		// 快照信息查询条件对象
		$scope.snapShotObj = {};
		$scope.snapShotObj.groupId = $scope.groupId;
		$scope.querySnapShotPage = {};
		$scope.querySnapShotPage.url = '/crm/ocrm/CustGroupMng/selectSnapOnFuzzy';
		$scope.querySnapShotPage.method = 'GET';
		$scope.querySnapShotPage.params = $scope.snapShotObj;
		$scope.querySnapShotPage.success = function successCallback(response) {
			$scope.snapCollection = response.data;
		};
		// 快照信息查询
		$scope.doQuerySnapShot = function() {
			$scope.querySnapShotPage.params = $scope.snapShotObj;
			this.queryPage(1);
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

		/** *******策略设置相关******************************************************************* */
		$scope.searchStarObj = {};

		// 查询当前使用的策略
		$scope.searchCurrentStar = function() {
			var opts = {};
			opts.url = '/crm/ocrm/CustGroupMng/queryGrpRuleRela';
			opts.method = 'GET';
			opts.params = {
				'groupId' : $scope.groupId
			};
			HttpService.linkHttp(opts).then(function(response) {

				angular.forEach(response.data, function(item) {
					angular.forEach($scope.StratRowCollection, function(item1) {

						if (item.strategyId == item1.strategyId) {
							$scope.strategyName = item1.strategyName;
						}
					});
				});
			});
		}

		// 查询基本策略信息
		$scope.searchStar = function() {
			$scope.searchStarObj.channel = 'POBS01';// 场景编码：动态客群场景
			var opts = {};
			opts.url = '/crm/manage/engine/getAllStraByEntity';
			opts.method = 'GET';
			opts.params = $scope.searchStarObj;
			HttpService.linkHttp(opts).then(function(response) {

				$scope.StratRowCollection = response.data;
				$scope.total = response.data.length;

				$scope.searchCurrentStar();
			});
		};
		$scope.searchStar();

		/* 更新当前策略，应用选中策略 */
		$scope.updateCurrentStar = function(item) {
			Alert.confirm("确定应用当前策略？").then(function() {
				var opts = {};
				opts.url = '/crm/ocrm/CustGroupMng/modifGrpRuleRela';
				opts.method = 'POST';
				opts.params = {
					'groupId' : $scope.groupId,
					'strategyId' : item.strategyId
				};
				HttpService.linkHttp(opts).then(function(response) {

					$scope.strategyName = item.strategyName;
				});
			});
		}

		/* 根据客户号获取客户最近消费信息 */
		

	}
})();
