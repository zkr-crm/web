(function () {
    'use strict';

    angular.module('BlurAdmin').factory('CookieService', CookieService);

    function CookieService() {
        var service = {};

        service.setCookie = function(name,value,seconds,domain){
            var exp = new Date();
            seconds = (!!!seconds) ? 1*60*60*1000*24*30*12 : seconds*1000;
            exp.setTime(exp.getTime() + seconds);
            var data = name + "="+ escape (value) + ";path=/;expires=" + exp.toGMTString();
            if(!!domain){
                data = data + ";domain=" + domain;
            }
            document.cookie = data;
        }

        service.getCookie = function(name) {
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
            if(arr=document.cookie.match(reg)){
                return unescape(arr[2]);
            }
            else{
            	return null; 	
            } 
        }

        service.clearCookie = function(name){
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var data = name + "="+ escape ('') + ";path=/;expires=" + exp.toGMTString();
            document.cookie = data;
        }
        return service;
    }
})();
