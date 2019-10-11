(function () {
    'use strict';

    angular.module('BlurAdmin.pages.mgrcenter.usermanagement')
        .controller('selectAgentDlgCtrl', selectAgentDlgCtrl);

    /** @ngInject */
    function selectAgentDlgCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal, checkedRow) {
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
			//delete by linbangbo 1期需求不含商机，所有负责人不与商机关联
			/*var opts = {};
			opts.url = '/crm/manage/usermng/usersBusiOppByEntity';
			opts.method = 'GET';
			opts.params = $scope.searchObj;
			HttpService.linkHttp(opts).then(function(response) {
				console.log("请求成功");
				console.log(response);
				$scope.UserRowCollection = response.data;
				$scope.total = response.data.length;
			});*/

		}
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

        $scope.ok = function () {
			console.log(angular.toJson($scope.selectUserInfo));
            if($scope.radioRptOptions.select == undefined || $scope.radioRptOptions.select ==""){
                Alert.error('请选择负责人！');
                return ;
            }
           	if ($scope.selectUserInfo.userStat != '0') {
                Alert.error('分配负责人状态必须为正常！');
        		return ;
        	}
            $uibModalInstance.close($scope.selectUserInfo);
        };
        $scope.search = function(page) {
            var page = page||'1';
            $scope.searchUsersOpts.params = $scope.searchObj;
            if (this.queryPage) {
                this.queryPage(page)
            }else{
                this.$$childHead.$$childHead.queryPage(page)
            }
        }
		$scope.init=function(){
            $scope.searchUsersOpts = {
                pageSize:'10',
                pageIndex:1,
                maxText:5
            }
            // 机构查询
            $scope.searchUsersOpts.url = '/crm/manage/usermng/usersWithPage';
            $scope.searchUsersOpts.method = 'GET';
            $scope.searchUsersOpts.params = $scope.searchObj;
            $scope.searchUsersOpts.success = function successCallBack(response) {
                $scope.UserRowCollection = response.data.list;
            }
		}
		$scope.init();
        // ----------------选择客户结束--------------------
	
    }
})();
