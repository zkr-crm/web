(function() {
	'use strict';

	angular.module('BlurAdmin.pages.interactmarket.blacklist')
		.controller('setBlackDlgCtrl', setBlackDlgCtrl);
	/** @ngInject , Alert,custNo $scope, $filter, $uibModal, $timeout, toastr, */
    function setBlackDlgCtrl($scope, $filter, $uibModal, $timeout, toastr,Alert,HttpService){
		$scope.Cust = {};
        $scope.blacklistDts = {};
        $scope.blacklistDts.custNo = $scope.custNo;
        $scope.blacklistDts.reason = "";
        $scope.blacklistDts.blacklistSts = "0";
        //弹出界面的新增，设置传入后台参数
		$scope.saveValue = function() {
            var opts = {};
            opts.url = '/crm/ecif/cust/setBlacklist';
            opts.method = 'PUT';
            opts.params = $scope.blacklistDts;
            HttpService.linkHttp(opts).then(function(response) {

               $scope.userInfo = {};
                // 执行查询
               $scope.searchUser();
               $scope.$parent.$dismiss();
            });
		}

	}

})();
