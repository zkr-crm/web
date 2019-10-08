(function () {
    'use strict';

    angular.module('BlurAdmin.pages.busiopp')
        .controller('allotBusiOppCtrl', allotBusiOppCtrl);

    /** @ngInject */
    function allotBusiOppCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal, checkedRow) {
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
			opts.url = '/crm/manage/usermng/usersBusiOppByEntity';
			opts.method = 'GET';
			opts.params = $scope.searchObj;
			HttpService.linkHttp(opts).then(function(response) {
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
            angular.forEach($scope.UserRowCollection, function(i) {
                if($scope.radioRptOptions.select == i.userId){
                	if (i.userStat != '0') {
                        Alert.error('分配负责人状态必须为正常！');
                		return ;
                	}
                	return;
                }
            });
            
            if(checkedRow == undefined || checkedRow ==""){
                Alert.error('请选择分配商机信息！');
                return ;
            }

            HttpService.linkHttp({
                url: '/crm/ocrm/busiOpp/allotBusiOpp',
                method: 'PUT',
                params: {
                    'custAgent' : $scope.radioRptOptions.select,
                    'busiOppNoList' : checkedRow
                }
            }).then(function (response) {
                $uibModalInstance.close();
            });
        };
        // ----------------选择客户结束--------------------

	
    }
})();
