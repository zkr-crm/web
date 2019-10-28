(function() {
	'use strict';

	angular.module('BlurAdmin.pages.interactmarket.smsgroupsend')
		.controller('selectMsgMouldCtrl', function($scope, $location, $uibModal, $state, HttpService, Alert,$uibModalInstance) {
		
			$scope.search = function (page) {
				$scope.queryMsgMouldOpts.params = $scope.searchObj;
				this.queryPage(page)
			}

			// 单个选中
            $scope.selectOne = function(i) {
                angular.forEach($scope.rowCollection, function(i) {
                    if($scope.radioRptOptions.select == i.tplNo){
                    	$scope.selectCustInfo = i;
                    	return ;
                    }
                });
            }

            //点击行选中
            $scope.selectRow = function(i) {
                $scope.radioRptOptions.select = i.tplNo;
            	$scope.selectCustInfo = i;

            }

            //确定
            $scope.ok = function () {
              $uibModalInstance.close($scope.selectCustInfo);
            };

            //初始化
			var init  = function () {
				$scope.radioRptOptions = {};
                $scope.radioRptOptions.select="";
				$scope.rowCollection = [];
				$scope.searchObj = {} 
				$scope.queryMsgMouldOpts = {
					pagination:{
						pageSize:'10',
                        pageIndex:1,
                        maxText:5
					},
					url : '/crm/manage/msgmng/getMsgTemplateByEntity',
					method:'GET',
					success:function(response){
						//	$scope.RowCollection = response.data.list;
						if (response == undefined || response.data == undefined) {
							return;
						}
						if(response.data.list.length > 0){
							$scope.RowCollection = response.data.list.filter(function(x){
								return x.tplType === '01';
							});
						}else{
							$scope.RowCollection = response.data.list;
						}
					}
				}
			}
			init()

	});
})();