(function() {
	'use strict';

	angular.module('BlurAdmin.pages.customer.custLifeCycleDef').controller(
			'distributeCtrl', distributeCtrl);
	/** @ngInject */
	function distributeCtrl($scope, $filter, toastr, HttpService, EnumType,$uibModal,$rootScope, Alert) {
		$scope.custSaleChgTrace={};
		$scope.custSaleChgTrace.dealUser=$rootScope.global.user;
		//$scope.custper={};
		//$scope.checkedRow=[];
		if ($scope.typeaaa==1){
			$scope.show = false;
			$scope.custList = $scope.checkedRow;
		}else{
			$scope.show = true;
			$scope.custList = $scope.checkedRow2;
		}
		
		// 用户对象
		$scope.userInfo = {};
		// 查询条件对象
		$scope.searchObj = {};

		// 用户对象数据集
		$scope.UserRowCollection = [];
		
        $scope.radioRptOptions = {};
        $scope.radioRptOptions.select="";
        $scope.showOtherReason = false;
        
        $scope.chgReasonItems = EnumType.chgReason;
		// 性别下拉框初始化
		$scope.genders = EnumType.Sex;

		// 性别下拉框显示
		$scope.ShowGender = function(item) {
			
			var sexLabel="";
			angular.forEach(EnumType.Sex, function(i) {
				if (item.sex === i.value) {
					sexLabel=i.label;
				}
			});

			return sexLabel;
		};

		// 用户状态下拉框初始化
		$scope.userStates = EnumType.UserStat;
		// 用户状态下拉框显示
		$scope.ShowUserStat = function(item) {

			var userStatLabel="";
			angular.forEach(EnumType.UserStat, function(i) {
				if (item.userStat === i.value) {
					userStatLabel=i.label;
				}
			});

			return userStatLabel;
		};
		// 保存轨迹&修改客户信息
		$scope.saveValue = function(isValid) {
			if(!($scope.custSaleChgTrace != undefined && $scope.custSaleChgTrace != "")
					&& $scope.radioRptOptions.select ==""){
	            Alert.error('请选择用户！');
	            return ;
	        }
			if (!isValid) {
				return;
			}
			if ($scope.custSaleChgTrace != undefined && $scope.custSaleChgTrace != "") {
				//$scope.custSaleChgTrace.chgReason = $scope.custSaleChgTrace.chgReason.value;
			}
			var opts = {};
			opts.url = '/crm/ecif/cust/custDistribute';
			opts.method = 'PUT';
			opts.params = $scope.custSaleChgTrace;
			opts.data = $scope.custList;
			HttpService.linkHttp(opts).then(function(response) {
//				console.log("请求成功");
//				console.log(response);
				$scope.custSaleChgTrace = {};
				// 执行查询
				$scope.$dismiss();
				$scope.search1();
				$scope.search2();
			})			
		}

		// 查询事件
		$scope.searchUser = function() {
			var opts = {};
			opts.url = '/crm/manage/usermng/usersByEntity';
			opts.method = 'GET';
			opts.params = $scope.searchObj;
			HttpService.linkHttp(opts).then(function(response) {
				$scope.UserRowCollection = response.data;
				$scope.total=response.data.length;
			});
		}
		$scope.searchUser();
		
		$scope.eitherShow = function(chgReason) {
            if (chgReason == '99') {
            	//其他原因
                $scope.showOtherReason = true;
            }else{
                $scope.showOtherReason = false;
            }
        }
        
		// 关闭新增页面
		$scope.closePage = function() {
			$scope.$dismiss();
		}
		// 单个选中
		$scope.select = function(item) {
			if($scope.radioRptOptions.select == item.userId){
                //alert("radioOptions.frequency");
				$scope.custSaleChgTrace.currentAgent = item.employeeId; // 分配应该使用员工编号
            }
		}
			
		// 选择客户经理 开始
        $scope.selectAgentDlg = function() {
              var modalInstance = $uibModal.open({
                  animation: true,
                  templateUrl: 'app/pages/mgrcenter/usermanagement/popupPages/selectAgentDlg.html',
                  controller: 'selectAgentDlgCtrl',
                  size: 'midle-900', // 
                  backdrop:'static',
                  resolve: {
                      'checkedRow': function () {
                          return '';
                      }
                  }
              });
              modalInstance.result.then(function(result){
            	  // 返回调用
            	  $scope.custSaleChgTrace.currentAgent = result.employeeId;
            	  $scope.custSaleChgTrace.custAgentNam = result.userName;
              });
          
        }
	  // 选择客户经理 结束
		
		
	}
})();
