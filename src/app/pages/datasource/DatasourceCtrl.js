(function () {
  'use strict';

  angular.module('BlurAdmin.pages.datasource')
      .controller('DatasourceCtrl', DatasourceCtrl);
  /** @ngInject */
  function DatasourceCtrl($scope) {
	  $scope.smartTablePageSize = 4;
	  $scope.rowCollection = [];
	  var row =  {
		        id: 1,
		        name:'客户导入模板1.xlsx',
			    time:'2017-11-29 17:07:41',
			    type:'xlsx',
			    count:'12',
			    status:'导入完成',
			    successCount:'12',
			    importType:'客户'
		      };
	  
	  for(var i = 1;i<30 ; i++){
		  var newRow = angular.copy(row);
		  if(i < 10){
			  i = "0"+i;
		  }
		  newRow.id = i ;
		  newRow.name = '客户导入模板'+i+'.xlsx';
		  newRow.time = '2017-11-29 17:07:41';
		  newRow.type = 'xlsx';
		  var random = randomNum(50,500);
		  newRow.count = random;
		  newRow.status = '导入完成';
		  newRow.successCount = random;
		  newRow.importType = '客户';
		  $scope.rowCollection.push(newRow);
	  }
	  
	  function randomNum(minNum,maxNum){ 
		  switch(arguments.length){ 
		  case 1: 
		   return parseInt(Math.random()*minNum+1); 
		  break; 
		  case 2: 
		   return parseInt(Math.random()*(maxNum-minNum+1)+minNum); 
		  break; 
		  default: 
		   return 0; 
		  break; 
		  } 
		 } 
	  
  }
  
})();
