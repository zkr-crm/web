(function () {
  'use strict';

  angular.module('BlurAdmin.common')
    .service('EnumType', EnumType)
    
  function EnumType(HttpService,toastr){
	  var service = {};
      var localEnumType=localStorage.getItem("EnumType");
      if(localEnumType!==null){
          service=switchService(service,JSON.parse(localEnumType));
	  }
	  service.init = function(){
		  var opts = {};
		  opts.url = '/crm/manage/enum';
		  opts.method = 'GET';
		  opts.error = function(){
	        	 toastr.error('查询码表请求失败');
	        };
		  HttpService.linkHttp(opts).then(function(response) {
              service=switchService(service,response.data);
			  localStorage.setItem("EnumType",JSON.stringify(response.data));
	        });
	  }
	  return service;
  }
  function switchService(service,data){
      for(var id in data){
          service[id] = data[id];
          service[id]['getLabelByValue'] = function(value){
              for(var index in this){
                  if(this[index].value == value){
                      return this[index].label;
                  }
              }
          };
          service[id]['getEnumByValue'] = function(value){
              for(var index in this){
                  if(this[index].value == value){
                      return this[index];
                  }
              }
          };
          for(var index in data[id]){
              if(!!data[id][index].code_name){
                  service[id][data[id][index].code_name] =data[id][index];
              }
          }
      }
      return service;
	}
  
})();
