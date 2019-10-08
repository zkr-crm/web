(function () {
  'use strict';

  angular.module('BlurAdmin.common')
    .service('EnumType', EnumType)
    
  function EnumType(HttpService,toastr){
	  var service = {};
	  service.init = function(){
		  var opts = {};
		  opts.url = '/crm/manage/enum';
		  opts.method = 'GET';
		  opts.error = function(){
	        	 toastr.error('查询码表请求失败');
	        };
		  HttpService.linkHttp(opts).then(function(response) {
			  for(var id in response.data){
				  service[id] = response.data[id];
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
				  for(var index in response.data[id]){
					  if(!!response.data[id][index].code_name){
						  service[id][response.data[id][index].code_name] = response.data[id][index]; 
					  }
				  }
			  }
			  
	        });
//		  service._total = {
//				  'sex':[
//					        {label: '男', value: 1},
//					        {label: '女', value: 2}
//					     ],
//				  'level':[
//					        {label: 'a级', value: 'a'},
//					        {label: 'b级', value: 'b'}
//				         ]	      
//		  };
	  }
	  //console.log(service);
	  return service;
  }
  
})();
