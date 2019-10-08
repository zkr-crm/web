(function () {
    'use strict';

    angular.module('BlurAdmin').factory('AuthService', AuthService);

    function AuthService($http, $q, $rootScope, EncodeService, RightsService, CookieService, Constant, $timeout,EnumType,Alert) {
        var service = {};
        service.cacheCredentials = function(userId,employeeId, token, expire) {
            $rootScope.global = {'user': userId,"employeeId":employeeId, 'token': token};
            CookieService.setCookie('global', JSON.stringify($rootScope.global), expire);
        }

        service.addHeaderToken = function(userId, token) {
           // $http.defaults.headers.common['Authorization'] = 'Basic '+  EncodeService.base64(userId + ':' + token);
            $http.defaults.headers.common['userId'] = userId;
            $http.defaults.headers.common['token'] = token;
        }

        service.checkTokenValid = function(){
            var deferred = $q.defer();
            var cache = JSON.parse(CookieService.getCookie('global'));
            if (!cache) {
                deferred.reject();
            }
            AuthService.isTokenExpired(cache.user, cache.token).then(function(){
                deferred.resolve();
            }, function(){
                deferred.reject();
            });
            return deferred.promise;
        }

        service.clearCredentials = function() {
            $rootScope.global = {};
            localStorage.removeItem('global');
        }
        
        service.checkTokenExist = function() {
            return !!CookieService.getCookie('global')
        }

        service.isTokenExpired = function(userId, token) {
            var deferred = $q.defer();
            var params = {userId: userId, token: token}; 
            if (Constant.debug){
                deferred.resolve();
            } else {
                $http.post(Constant.server_host + '/api/token', params).then(function(resp){
                    deferred.resolve();
                }, function(err) {
                    deferred.reject(err);
                });
            }
            return deferred.promise;
        }
        
        service.login = function(userId, password) {
            if(userId==null || userId==""){
                Alert.error("请输入用户名!");
                return;
            }
            if(password==null || password==""){
                Alert.error("请输入密码!");
                return;
            }
            var deferred = $q.defer();
            if (Constant.debug){
                service.addHeaderToken(userId, '123456789');
                 RightsService.loadPermissions(userId).then(function(){
                	
                    service.cacheCredentials(userId,"", '123456789', 30*60);
                    EnumType.init();
                    deferred.resolve();
                 }, function(err){
                     deferred.reject(err);
                 });
            } else {
            	var params = { "userId": userId, "password": password };
                $http.post('/crm/manage/usermng/userLoginChk', params).then(function(resp){
                    $rootScope.loading = false
                    if (!!(resp.data.data && resp.headers("token"))) {
                        service.addHeaderToken(userId, resp.headers("token"));
                        RightsService.loadPermissions(userId).then(function(){
                            service.cacheCredentials(userId,resp.data.data.employeeId, resp.headers("token")/*, resp.data.expire*/);
                            EnumType.init();
                            deferred.resolve();
                        }, function(err){
                            deferred.reject(err);
                        });
                    } else {
                        Alert.error(resp.data.message);
                        deferred.reject();
                    }
                }, function(err,header,config,status) {
                    $rootScope.loading = false
                	console.log(err.data);
                	Alert.error(err.data.message); 
                    deferred.reject(err);
                });
            }
            return deferred.promise;
        }

        return service;
    }
})();