(function() {
	'use strict';

	angular.module('BlurAdmin.theme.components').controller(
			'pageTopCtrl', pageTopCtrl);
	/** @ngInject */
	function pageTopCtrl($scope, $filter, $uibModal, $timeout, $state, HttpService,
			toastr, EnumType, Alert,$rootScope,$location) {
		// 用户对象
		$scope.userInfo = {
			'userId' : '',
			'userName' : '',
			'sex' : '',
			'password' : '',
			'password1' : '',
			'password2' : '',
			'userStat' : '',
			'enterCode' : '',
			'enterName' : '',
			'deptCode' : '',
			'deptName' : '',
			'posiCode' : '',
			'posiName' : '',
			'roleCode' : '',
			'roleName' : '',
			'telphone' : '',
			'email' : '',
			'date' : ''
		};

		// 页面跳转
		$scope.searchUser = function(userId) {
				 console.log(userId);
		            $state.go('personalInfo',{'userId':userId});
		}
		$scope.init = function() {
			var opts = {};
			opts.url = '/crm/manage/usermng/user';
			opts.method = 'GET';
			opts.params = {'userID':$rootScope.global.user};
			console.log($rootScope.global.user);
			HttpService.linkHttp(opts).then(function(response) {
				$scope.userInfo = response.data;
				$scope.userInfo.date = getNowFormatDate();
			});
		}
		// 获取当前日期YYYY-MM-DD
		function getNowFormatDate() {
		    var date = new Date();
		    var seperator1 = "-";
		    var month = date.getMonth() + 1;
		    var strDate = date.getDate();
		    if (month >= 1 && month <= 9) {
		        month = "0" + month;
		    }
		    if (strDate >= 0 && strDate <= 9) {
		        strDate = "0" + strDate;
		    }
		    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
		    return currentdate;
		}
		// 页面初始化查询
		$scope.init();
		
		//退出
		 $scope.log = function(){
			  var log;
			  log="退出成功";
			  // 登陆日志
			  var opts = {};
			  opts.url = '/crm/manage/logmng/addLoginLog';
			  opts.method = 'POST';
			  opts.params = {"userId" : $scope.userInfo.userId,
						"logType" : "2",
						"logContent" : log};
			  HttpService.linkHttp(opts).then(function(response) {
			  });	
			  $location.path('logout');
			  var curUrl = $location.absUrl();
		  };
		
	}
})();
