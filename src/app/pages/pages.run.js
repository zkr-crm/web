(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages').run(appRun).config(appConfig);

  /** @ngInject */
  function appRun($rootScope, $http, CookieService, EncodeService, LocationConfig, $location, RightsService,EnumType) {
      var global = JSON.parse(CookieService.getCookie('global'));
      if (!! global){
          $http.defaults.headers.common['token'] = global.token;
          RightsService.loadPermissions(global.user).then(function(){
              $rootScope.global = global;
              LocationConfig.addEventHandle();
              EnumType.init();
          }, function(){
              LocationConfig.addEventHandle();
          });
      } else {
          LocationConfig.addEventHandle();
      }
      
      $rootScope.goPage = function(path){
        $location.path(path);
      }
  }

    function appConfig( $httpProvider) {
      //此处可对$httpProvider 进行序列化
        $httpProvider.interceptors.push(['$rootScope', '$q','$location', function ($rootScope, $q,$location) {
            return {
                request:function(config){
                    //此处可以对config.data 和config.params分别进行处理,如加密
                    //此处也可以对请求进行分类以及操作事件处理，如 请求时转圈
                    //注意：系统中有部分请求直接在URL中拼写了 param，此参数在 config.params 中获取不到，只能处理url
                    if(config.params!=null &&!angular.equals(config.params,{})){
                        config.params=angular.copy(config.params);
                        config.params={
                            t_params: encodeURIComponent(rsaEncode(JSON.stringify(config.params)))
                        };
                    }
                    return config;
                },
                response:function(resq){
                    //处理返回报文，同请求
                    return resq;
                },
                responseError: function(rejection) {
                    //处理请求失败，如token失效时，直接回到登录页面。
                    if (rejection.status === 999 && !rejection.config.ignoreAuthModule) {
                        $location.path('logout');
                        // LocationConfig.addEventHandle();
                        $rootScope.loading = false;
                        $rootScope.loadingNum = 0;
                        var deferred = $q.defer();
                        // return deferred.promise;
                    }
                    return $q.reject(rejection);
                }
            };
        }]);




        var key="MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDSUmOXyQmYYSnZacp0btvAZCOvCNPtzixAp7eJmzmAG4mgy/VgrY/s1BDLh9qTNHIRWXepUtwMrf1kYul/A45qE/2oxIbeeq4238YDWQ7ModOVXR9ytEHsT0jpCFvoYfYXYZnnoWRrLIBylQeXzqxbLDxxBxGCs4AjoRKh5S7nNQIDAQAB";
        var JSON_PROTECTION_PREFIX = /^\)\]\}',?\n/;
        var APPLICATION_JSON = 'application/json';
        var TEXT_JSON='text/json';
        var JSON_START = /^\[|^\{(?!\{)/;
        var JSON_ENDS = {
            '[': /]$/,
            '{': /}$/
    };
        var isObject=function(value) {
            return value !== null && typeof value === 'object';
        };
        var isString=function(value) {
            return typeof value === 'string';
        };
        var isUndefined=function (value) {return typeof value === 'undefined';};
        var isNumber=function (value) {return typeof value === 'number';};
        var toJson=function (obj, pretty) {
            if (isUndefined(obj)) return undefined;
            if (!isNumber(pretty)) {
                pretty = pretty ? 2 : null;
            }
            return JSON.stringify(obj, toJsonReplacer, pretty);
        };
        var isWindow=function (obj) {
            return obj && obj.window === obj;
        };
        var isScope= function (obj) {
            return obj && obj.$evalAsync && obj.$watch;
        };
        var toJsonReplacer=function (key, value) {
            var val = value;

            if (typeof key === 'string' && key.charAt(0) === '$' && key.charAt(1) === '$') {
                val = undefined;
            } else if (isWindow(value)) {
                val = '$WINDOW';
            } else if (value &&  document === value) {
                val = '$DOCUMENT';
            } else if (isScope(value)) {
                val = '$SCOPE';
            }

            return val;
        };
        var fromJson=function (json) {
            return isString(json) ? JSON.parse(json) : json;
        };
        var isJsonLike=function (str) {
            var jsonStart = str.match(JSON_START);
            return jsonStart && JSON_ENDS[jsonStart[0]].test(str);
        };
        $httpProvider.defaults.transformRequest=function(d) {
            var obj=isObject(d) && toString.call(d) != '[object File]' && toString.call(d) != '[object Blob]' && toString.call(d) != '[object FormData]' ? toJson(d) : d;
            var returnObj=obj;
            if(typeof obj==="string"){
                returnObj = rsaEncode(obj);
            }
            return returnObj;
        };
        function rsaEncode(obj){
            var returnObj = "";
            var encrypt = new JSEncrypt();
            encrypt.setPublicKey(key);
            var strArr = new Array();
            var strRes = "";
            strArr = splitStringForRSA(obj,34);
            for(var i=0;i<strArr.length;i++){
                strRes += strArr[i];
                strArr[i] = encrypt.encrypt(strArr[i]);
                returnObj += strArr[i]+";;;;";
            }
            return returnObj;
        }
        function splitStringForRSA(str,length){
            var strArr = [];
            for (var i = 0, l = str.length; i < l/length; i++)
            {
                var a = str.substring(length*i, length*(i+1));
                strArr.push(a);
            }
            return strArr;
        }

    };

})();