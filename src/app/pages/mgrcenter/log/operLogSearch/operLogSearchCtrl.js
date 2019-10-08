(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.log.operLogSearch').controller(
			'operLogSearchCtrl', operLogSearchCtrl);
	/** @ngInject */
	function operLogSearchCtrl($scope, $uibModal, $filter, $timeout, $http,
			HttpService, EnumType, Alert) {
        $scope.pagination = {
            pageSize:'10',
            pageIndex:1,
            maxText:5
        }
		// html查询条件对象
		$scope.searchOper = {};
		// 参数 查询条件对象
		$scope.searchOper1 = {};

		// 对象数据集
		$scope.OperRowCollection = [];


		// 查询操作日志
		$scope.search = function(page) {
			$scope.searchOper1 = {
					'userId' : $scope.searchOper.userId
			};
			if($scope.searchOper.startDate !=null && $scope.searchOper.startDate!=''){
				var startDate = new Date($scope.searchOper.startDate);
				$scope.searchOper1.startDate = $filter('date')(startDate, 'yyyyMMdd');
			}
			if($scope.searchOper.endDate !=null && $scope.searchOper.endDate!=''){
				var endDate = new Date($scope.searchOper.endDate);
				$scope.searchOper1.endDate = $filter('date')(endDate, 'yyyyMMdd');
			}
			  $scope.queryOperLogOptions.params = $scope.searchOper1;
            // page=page||1;
            this.queryPage(page);
		}
			

		  $scope.queryOperLogOptions = $scope.pagination;
		  $scope.queryOperLogOptions.url = '/crm/manage/logmng/selOperLog';
		  $scope.queryOperLogOptions.method = 'GET';
		  $scope.queryOperLogOptions.params = $scope.searchOper1;
		  $scope.queryOperLogOptions.success = function successCallback(response) {
			  $scope.OperRowCollection = response.data.list;
		  };

		// 查看明细
		$scope.operLogDetail = function(item) {

			$scope.msgTpl = item;

			$uibModal
					.open({
						animation : true,
						backdrop : 'static',
						templateUrl : 'app/pages/mgrcenter/log/operLogSearch/operLogDetail.html',
						size : 'midle-900',
						//controller : 'updUserCtrl',
						scope : $scope,
						resolve : {

						}
					});
		}
		// 关闭弹出页面
		$scope.closePage = function() {

			$scope.$parent.$dismiss();
		}
		
		// 日期控件
        $scope.opened5 = {
            opened : false
        }
        $scope.opened6 = {
            opened : false
        }

        // 打开日期控件
        $scope.open5 = function() {
            $scope.opened5.opened = !$scope.opened5.opened;
        }

        $scope.open6 = function () {
            $scope.opened6.opened = !$scope.opened6.opened;
        }
	}
})();
