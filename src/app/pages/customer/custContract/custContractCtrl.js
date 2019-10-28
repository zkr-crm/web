(function() {
	'use strict';

	angular.module('BlurAdmin.pages.customer.custContract').controller(
			'custContractCtrl', custContractCtrl);
	/** @ngInject */
	function custContractCtrl($scope, $uibModal, $filter, $timeout, $http, HttpService, EnumType, Alert, $state) {

		// 对象
		$scope.custContract = {};
		// 查询条件对象
		$scope.searchObj = {};

		// 对象数据集
		$scope.RowCollection = [];
		
		// 枚举类型显示
		$scope.showblnCustType = function(item) {
			
			var Label="";
			angular.forEach(EnumType.CustType, function(i) {
				if (item.blnCustType === i.value) {
					Label=i.label;
				}
			});
			return Label;
		};
		
		$scope.showblnBusiness = function(item) {
			
			var Label="";
			angular.forEach(EnumType.BusinessType, function(i) {
				if (item.blnBusiness === i.value) {
					Label=i.label;
				}
			});
			return Label;
		};
		$scope.showeduDegree = function(item) {
			
			var Label="";
			angular.forEach(EnumType.Degree, function(i) {
				if (item.eduDegree === i.value) {
					Label=i.label;
				}
			});
			return Label;
		};
		
		$scope.search = function(page) {
		      $scope.queryOptions.params = $scope.searchObj;
		      // $scope.queryOptions.pagesize = $scope.pagination.pageSize;
              this.queryPage(page);
		};

		      $scope.queryOptions = {};
		      $scope.queryOptions.url = '/crm/ocrm/CustContractmng/getAllCustContracts';
		      $scope.queryOptions.method = 'GET';
		      $scope.queryOptions.params = {};
		      $scope.queryOptions.pagination = {
				pageSize:'10',
				pageIndex:1,
				maxText:5
			  }
		      $scope.queryOptions.pagesize = $scope.pagination.pageSize;
		      $scope.queryOptions.success = function successCallback(response) {
		          	angular.forEach(response.data.list,function(item) {
			          var birthDate = new Date(item.birthDate);
			          item.birthDate = $filter('date')(birthDate, 'yyyy-MM-dd');				
				})
		          $scope.RowCollection = response.data.list;
		          
		      };
		// 新增
		$scope.add = function() {
			$uibModal
					.open({
						animation : true,
						templateUrl : 'app/pages/customer/custContract/popupPages/addCustContract.html',
                        size: 'midle-900', 
                        backdrop:'static',
						controller : 'addCustContractCtrl',
						scope : $scope,
	                    resolve: {}
					});

		};
		$scope.cusDetail = function (item){
			$scope.custContract.contractNo = item.contractNo;
			$uibModal
			.open({
				animation : true,
				templateUrl : 'app/pages/customer/custContract/popupPages/updateCustContract.html',
                size: 'midle-900', 
                backdrop:'static',
				controller : 'updateCustContractCtrl',
				scope : $scope,
				resolve : {}
			});
		}
		
        $scope.openDetail = function (item) {
            $state.go('customer.custContractDetail',{'contractNo':item.contractNo});
            }

		// 物理删除事件（单行删除）
		$scope.removeUser = function(item) {

			Alert.confirm("确定删除？").then(function() {
				var opts = {};
				opts.url = '/crm/ocrm/CustContractmng/delCustContract';
				opts.method = 'DELETE';
				opts.params = {
					'contractNo' : item.contractNo
				};
				HttpService.linkHttp(opts).then(function(response) {
					// 执行查询
					$scope.search();
				});
			});

		};

	}
})();

