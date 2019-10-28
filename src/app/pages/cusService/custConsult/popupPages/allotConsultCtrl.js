(function () {
    'use strict';
    angular.module('BlurAdmin.pages.cusService.custConsult')
        .controller('allotConsultCtrl', allotConsultCtrl);

    /** @ngInject */
    function allotConsultCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal, checkedRow) {
        console.log("allotConsultCtrl checkedRow= " + checkedRow);

    	// 分页默认
    	$scope.smartTablePageSize = 5;
		$scope.searchObj = {};
		// 用户对象数据集
		$scope.UserRowCollection = [];

		// 状态显示
		$scope.ShowUserStat = function(item) {
			var userStatLabel = "";
			angular.forEach(EnumType.UserStat, function(i) {
				if (item.userStat === i.value) {
					userStatLabel = i.label;
				}
			});
			return userStatLabel;
		};

		// 重置查询
		$scope.resetSearchUser = function() {
			$scope.searchObj = {};
			$scope.searchUser();
		}

		// 查询事件
		$scope.searchUser = function() {
			var opts = {};
			opts.url = '/crm/manage/usermng/usersByEntity';
			opts.method = 'GET';
			opts.params = $scope.searchObj;
			HttpService.linkHttp(opts).then(function(response) {
				console.log("请求成功");
				console.log(response);
				$scope.UserRowCollection = response.data;
				$scope.total = response.data.length;
			});
		}
		// 页面初始化查询
		$scope.searchUser();
        // ----------------选择客户开始--------------------
        $scope.radioRptOptions = {};
        $scope.radioRptOptions.select="";
        // 单个选中
        $scope.selectRptOne = function(i) {
            angular.forEach($scope.UserRowCollection, function(i) {
                if($scope.radioRptOptions.select == i.userId){
                	$scope.selectUserInfo = i;
                	return ;
                }
            });
        }
        $scope.selectRptRow = function(item) {
            $scope.radioRptOptions.select = item.userId;
        	$scope.selectUserInfo = item;

        }

        $scope.allotCommit = function () {
            if($scope.radioRptOptions.select == undefined || $scope.radioRptOptions.select ==""){
                Alert.error('请选择分配负责人！');
                return ;
            }
            var isFlg = false;
            angular.forEach($scope.UserRowCollection, function(i) {
                if($scope.radioRptOptions.select == i.userId){
                	if (i.userStat != '0') {
                		isFlg = true;
                		return ;
                	}
                	return;
                }
            });
            if (isFlg) {
                Alert.error('分配负责人状态必须为正常！');
                return;
            }
//            if(checkedRow == undefined || checkedRow ==""){
//                Alert.error('请选择分配投诉信息！');
//                return ;
//            }
			console.log($scope.radioRptOptions.select);
			console.log(angular.toJson(checkedRow));

            $uibModalInstance.close($scope.selectUserInfo);
        };
        // ----------------选择客户结束--------------------

	
    
    }
})();
