(function () {
  'use strict';

  angular.module('BlurAdmin.common.config')
    .service('Constant', Constant)
    .service('GlobalConfig', GlobalConfig);
    
  function Constant(){
    this.server_host = "http://127.0.0.1:10000";
    this.debug = false;
    this.merchantId = '1';
  }
  
  function GlobalConfig(){
    var services = {};
    services.role = '';
    services.setUserRole = function(role){
      this.role = role;
    }
    services.userRole = function(){
      return this.role;
    }
    return services;
  }

})();
