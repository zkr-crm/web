(function () {
  'use strict';

  angular.module('BlurAdmin.pages.mgrcenter.department')
      .controller('addPosiCtrl', addPosiCtrl);
  /** @ngInject */
  function addPosiCtrl($scope, $filter,$uibModal,$timeout,toastr,Alert,HttpService) {
	  /*联动查询*/
		var paramInAP = {};
		paramInAP.url = '/crm/manage/deptsByEntity';
		paramInAP.method = 'GET';
		HttpService.linkHttp(paramInAP).then(function(response) {
			console.log(response.data);
			$scope.deptsInAPForShow=response.data;
			console.log($scope.deptsInAPForShow);
		});
	  
		  /*联动查询*/
		var SPparamInAP = {};
		SPparamInAP.url = '/crm/manage/posisByEntity';
		SPparamInAP.method = 'GET';
		HttpService.linkHttp(SPparamInAP).then(function(response) {
			console.log(response.data);
			$scope.posisInAPForShow=response.data;
			console.log($scope.posisInAPForShow);
		});
		
		  $scope.getChangeDVal = function(){    
			  $scope.getDeptCode = $('#deptCode').find('option:selected').text();
			  $scope.savePosi.deptCode = $scope.getDeptCode;
			  
			  $scope.getDept = {};
			  $scope.getDept.deptCode = $scope.getDeptCode;
					var opts = {};
					opts.url = '/crm/manage/deptsByEntity';
					opts.method = 'GET';
					opts.params = $scope.getDept;
					HttpService.linkHttp(opts).then(function(response) {
						console.log(response.data);
						$scope.savePosi.deptName = response.data[0].deptName;
					});
			  console.log($scope.savePosi);
		  }
		  
		  $scope.getChangePVal = function(){    
			  $scope.getPosiCode = $('#superPosiCode').find('option:selected').text();
			  $scope.savePosi.superPosiCode = $scope.getPosiCode;
			  
			  $scope.getSPosi = {};
			  $scope.getSPosi.posiCode = $scope.getPosiCode;
					var opts = {};
					opts.url = '/crm/manage/posisByEntity';
					opts.method = 'GET';
					opts.params = $scope.getSPosi;
					HttpService.linkHttp(opts).then(function(response) {
						console.log(response.data);
						$scope.savePosi.superPosi = response.data[0].posiName;
					});
			  console.log($scope.savePosi);
		  }
		  
	  $scope.savePosi = {};
	  $scope.savePosi.posiCode = "";
	  $scope.savePosi.posiName = "";
	  $scope.savePosi.deptName = "";
	  $scope.savePosi.deptCode = "";
	  $scope.savePosi.superPosi = "";
	  $scope.savePosi.superPosiCode = "";
	  $scope.savePosi.posiDesc = "";
	  
	  
	  $scope.saveValue = function(isValid){
		  
		  if( !isValid ){
			  return;
		  }
		  
			var opts = {};
			opts.url = '/crm/manage/posi';
			opts.method = 'POST';
			opts.params = $scope.savePosi;
			HttpService.linkHttp(opts).then(function(response) {
				console.log("请求成功");
				console.log(response);
				console.log(response.data);
				$scope.searchPosis();
				Alert.success('提交完成!');
			});


		  
	  }
      
  }
  
})();
