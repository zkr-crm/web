(function () {
  'use strict';

  angular.module('BlurAdmin.pages.demos.testAngular')
      .controller('TestAngularCtrl', TestAngularCtrl);
  
  /** @ngInject */
  function TestAngularCtrl($scope, $q,$http,HttpService) {
	  $scope.test = 1;
	  
//	  $scope.rest = function(){
//		  $http.defaults.headers.common['Authorization'] = 'APPCODE e9b4d841b6ba4924bd718fecb9ad474a';
//		  $http({
//		        method: 'GET',
//		        url: 'http://api04.aliyun.venuscn.com/mobile?mobile=15917438091'
//		    }).then(function successCallback(response) {
//		    	console.log(response);
//		        }, function errorCallback(response) {
//		            // 请求失败执行代码
//		    });
//	  };
	  
	  $scope.rest2 = function(){
		var opts = {};
		opts.url = '/mobile';
		opts.method = 'GET';
		opts.params = {mobile : 15917438091};
		opts.success = function successCallback(response) {
        };
		HttpService.http(opts);
	  };
	  $scope.batch = function(){
			var opts = {};
			opts.url = '/crm/manage/engine/batch';
			opts.method = 'GET';
			opts.params = {};
			opts.success = function successCallback(response) {
	        };
			HttpService.http(opts);
		  };
	  
	  $scope.rest1 = function(){
			var opts = {};
			opts.url = '/mobile';
			opts.method = 'GET';
			opts.params = {mobile : 15917438091};
			HttpService.linkHttp(opts).then(function(response) {
	        });
		  };
		  
		  
	  $scope.localRest = function(){
			var opts = {};
			opts.url = '/crm/ecif/users';
			opts.method = 'POST';
			opts.params = {id : 111,username : 'wb'};
//			opts.data = {id : 111,username : 'wb'};
			HttpService.linkHttp(opts).then(function(response) {
	        });
		  };
		  
		  
	  $scope.localRest2 = function(){
		  var user = {};
		  user.id = 111;
		  user.username = 'wb';
		  
			var opts = {};
			opts.url = '/crm/ecif/users';
			//opts.method = 'GET';
			opts.method = 'PUT';
			opts.params = {'user' : user};
			HttpService.linkHttp(opts).then(function(response) {
	        });
		  };
	  
	  /*$scope.rest = function(){
		  $http.jsonp('https://www.runoob.com/try/angularjs/data/sites.php?jsonp=JSON_CALLBACK').then(function success(response) {
		  $scope.names = response.data.sites;
	      }, function error() {
	        console.log("GEO FAILED")
	      });
	  	}
	  var JSON_CALLBACK = function(data){
		  console.log(data);
	  }*/
	  
	  
	  $scope.tags = [
		    { id: 1, name: 'Tag1' },
		    { id: 2, name: 'Tag2' },
		    { id: 3, name: 'Tag3' }
		  ];
		   
		  $scope.loadTags = function(query) {
		    return [
		    	  { "id": 1, "name": "Tag1" },
		    	  { "id": 2, "name": "Tag2" },
		    	  { "id": 3, "name": "Tag3" },
		    	  { "id": 4, "name": "Tag4" },
		    	  { "id": 5, "name": "Tag5" },
		    	  { "id": 6, "name": "Tag6" },
		    	  { "id": 7, "name": "Tag7" },
		    	  { "id": 8, "name": "Tag8" },
		    	  { "id": 9, "name": "Tag9" },
		    	  { "id": 10, "name": "Tag10" }
		    	];
		  };
		  
		  
		  
		  
		  
		  
		  
		// An array of strings will be automatically converted into an 
		  // array of objects at initialization
		  $scope.superheroes = [
		    'Batman', 
		    'Superman', 
		    'Flash', 
		    'Iron Man', 
		    'Hulk', 
		    'Wolverine', 
		    'Green Lantern', 
		    'Green Arrow', 
		    'Spiderman'
		  ];
		  
		  $scope.log = [];
		   
		  $scope.loadSuperheroes = function(query) {
		    // An arrays of strings here will also be converted into an
		    // array of objects
		    return [
		        "Adam Strange",
		        "Ant-Man",
		        "Aquaman",
		        "Barbara Gordon",
		        "Batman",
		        "Beast",
		        "Black Canary",
		        "Black Lightning",
		        "Black Panther",
		        "Black Widow",
		    ];
		  };
		  
		  $scope.tagAdded = function(tag) {
		    $scope.log.push('Added: ' + tag.text);
		  };
		  
		  $scope.tagRemoved = function(tag) {
		    $scope.log.push('Removed: ' + tag.text);
		  };
	  
//	  var defer1 = $q.defer();
//	  var promise1 = defer1.promise;
//	  
//	  promise1.then(function(data){
//		  console.log("in promise1 ---- success  data:" + data);
//		  return $q.reject("no");
//	  },function(data){
//		  console.log("in promise1 ---- error  data:" + data);
//	  })
//	  .then(function(data){
//		  console.log("in promise1 then2 ---- success  data:" + data);
//		  return "finally";
//	  },function(data){
//		  console.log("in promise1 then2---- error  data:" + data);
//	  })
//	  .finally(function(data){
//		  console.log("in promise1 ---- finally  data:" + data);
//	  });
//	  
//	  defer1.resolve("hello");
////	  defer1.reject("reject");
//	  
//	  
//	  var funcA = function(){
//          console.log("funcA");
//          return "hello,funA";
//      }
//      var funcB = function(){
//          console.log("funcB");
//          return "hello,funB";
//      }
//      $q.all([funcA(),funcB()])
//      .then(function(result){
//          console.log(result);
//      });
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  $scope.tabs = [
              {index:1, title:'Dynamic Title 1', content:'Dynamic content 1' ,url : "app/pages/datasource/datasource.html"},
              {index:2, title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true ,url : "app/pages/home/home.html"}
          ];

          $scope.alertMe = function() {
              setTimeout(function() {
                  $window.alert('You\'ve selected the alert tab!');
              });
          };

          $scope.model = {
              name: 'Tabs'
          };
          $scope.addTab = function(){
        	  $scope.tabs.push({index:3, title:'Dynamic Title 33333333', content:'333333' ,url : "app/pages/report/report.html"});
        	  setTimeout(function() {
        		  $scope.active = 3;
        	  });
        	  
          }
  }
  
})();
