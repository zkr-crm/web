(function () {
    'use strict';

    angular.module('BlurAdmin').factory('HttpService', HttpService);

    function HttpService($http, $timeout, $q,Constant,Alert,$rootScope) {
        var setCookie = function(name,value,seconds,domain){
            var exp = new Date();
            seconds = (!!!seconds) ? 1*60*60*1000*24*30*12 : seconds*1000;
            exp.setTime(exp.getTime() + seconds);
            var data = name + "="+ escape (value) + ";path=/;expires=" + exp.toGMTString();
            if(!!domain){
                data = data + ";domain=" + domain;
            }
            document.cookie = data;
        }

        var HOST_URL = Constant.security_base_url;
        // 默认参数
        var _httpDefaultOpts = {
            method: 'POST', // GET/DELETE/HEAD/JSONP/POST/PUT
            url: '',
            params: {}, // 拼接在url的参数
            data: {},
            headers:{},
            error: function(data,status,headers,config){
            	console.log(data);
            	if(status == 504){
            		Alert.error("504  Gateway Time-out");
            	}else if(status != 999){
            		Alert.error(data.message);
            	}
            }, // ajax 执行失败 执行函数
            success: function(data){}, // ajax 执行成功 执行函数
        };
        $rootScope.loadingNum=0

        var _http = function (opts, deferred) {
            $rootScope.loading = true;
            $rootScope.loadingNum++;
            opts = $.extend({}, _httpDefaultOpts, opts);
            if(!opts.params.sys){
                opts.params.sys = {};
            }
            opts.params.sys.userId = $rootScope.global.user||opts.params.userId;
            opts.params.sys.employeeId = $rootScope.global.employeeId;
            $http({
                method: opts.method,
                url: opts.url,
                params: opts.params,
                data: opts.data,
                headers: opts.headers
            }).success(function(data,status,headers,config){ //响应成功
                $rootScope.loadingNum--;
                if($rootScope.loadingNum<=0){
                    $rootScope.loading = false;
                    $rootScope.loadingNum=0;
                }

                if(!!headers("token")){
                    $rootScope.global.token = headers("token");
                    setCookie('global', JSON.stringify($rootScope.global));
                    $http.defaults.headers.common['token'] = $rootScope.global.token;
                }
                if (data.status === '0') {
                    Alert.error(data.message);
                    return
                }
                // 请求成功回调函数
                if(opts.success) {
                    opts.success(data,status,headers,config);
                }
                if (deferred) {
                    deferred.resolve(data,status,headers,config);  //任务被成功执行
                }
            }).error(function(data,header,config,status){ //处理响应失败
                $rootScope.loadingNum--;
                if($rootScope.loadingNum<=0){
                    $rootScope.loading = false;
                    $rootScope.loadingNum=0;
                }
                opts.error(data,header,config,status);
                if (deferred) {
                    deferred.reject(data,header,config,status); //任务未被成功执行
                }
            });
        };



        return {
            /**
             * http请求
             * @param opts
             */
            http: function (opts) {
                _http(opts);
            },
            /**
             * http链式请求
             * @param opts
             * @param deferred
             * @returns {deferred.promise|{then, catch, finally}}
             */
            linkHttp : function (opts, deferred) {
                deferred = deferred || $q.defer();
                _http(opts, deferred);
                return deferred.promise;
            }
        };
    }
})();