(function () {
  'use strict';

  angular.module('BlurAdmin.pages.login').controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($scope, $urlRouter, $location ,AuthService, HttpService, $rootScope) {
	  $scope.user = {};
	  $scope.user.id = "";
	  $scope.user.password = "";
	  
	  $scope.loginSubmit = function(){
		  var log;
		  AuthService.login($scope.user.id, $scope.user.password).then(function(response) {
			  log="登录成功";
			  // 登陆日志
			  var opts = {};
				opts.url = '/crm/manage/logmng/addLoginLog';
				opts.method = 'POST';
				opts.params = {"userId" : $scope.user.id,
							"logType" : "1",
							"logContent" : log};
				HttpService.linkHttp(opts).then(function(response) {				
				});	
		  	  $rootScope.loading = false
              $location.path('/home');
              //获取权限
	            var initOpts = {};
	            var custAgentList = [];
	            initOpts.url = '/crm/manage/auth/getRoleDateAuth';
	            initOpts.method = 'GET';
	            initOpts.params = {
	                userCode : $rootScope.global.user,
	                tableCode : "T001"
	            };
	            HttpService.linkHttp(initOpts).then(function(result) {
	                if(!(result.data===undefined)){
	                    angular.forEach(result.data, function(i) {
	                        if(i.employeeId!==undefined){
	                            custAgentList.push(i.employeeId);
	                        }
	                    });
                        localStorage.setItem('custAgentList',JSON.stringify(custAgentList))
	                }
	            });
          }, function(){
        	  log="登录失败：输入的用户名或密码错误";
        	// 登陆日志
    		  var opts = {};
    			opts.url = '/crm/manage/logmng/addLoginLog';
    			opts.method = 'POST';
    			opts.params = {"userId" : $scope.user.id,
    						"logType" : "1",
    						"logContent" : log};
    			HttpService.linkHttp(opts).then(function(response) {				
    			});	
    			$rootScope.loading = false
              $scope.loginError = '输入的用户名或密码错误';
          });
		  	  
	  };
	  
  }

})();
