(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.department')
      .controller('modPosiCtrl', modPosiCtrl);
  /** @ngInject */
  function modPosiCtrl($scope, $filter,$uibModal,$timeout,toastr,Alert,HttpService) {
	  
	  $scope.modPosi = {};
	  $scope.modPosi.posiCode = $scope.modObj.posiCode;
	  $scope.modPosi.posiName = $scope.modObj.posiName;
	  $scope.modPosi.deptName = $scope.modObj.deptName;
	  $scope.modPosi.deptCode = $scope.modObj.deptCode;
	  $scope.modPosi.superPosi = $scope.modObj.superPosi;
	  $scope.modPosi.superPosiCode = $scope.modObj.superPosiCode;
	  $scope.modPosi.posiDesc = $scope.modObj.posiDesc;
	  
	  
	  $scope.modValue = function(isValid){
		  
		  if( !isValid ){
			  return;
		  }
		  
			var opts = {};
			opts.url = '/crm/manage/posi';
			opts.method = 'PUT';
			opts.params = $scope.modPosi;
			HttpService.linkHttp(opts).then(function(response) {
				$scope.searchPosis();
		  	Alert.success('提交完成!');
				console.log("请求成功");
				console.log(response);
				console.log(response.data);
			});

		  $scope.searchPosis();
		  
	  }
      
  }
  
})();
