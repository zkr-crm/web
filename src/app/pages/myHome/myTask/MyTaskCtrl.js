(function () {
  'use strict';

  angular.module('BlurAdmin.pages.myHome')
      .controller('MyTaskCtrl', MyTaskCtrl);
  /** @ngInject */
  function MyTaskCtrl($scope, $filter, $compile,$uibModal,Alert) {
	  $scope.smartTablePageSize = 5;
	  $scope.rowCollection = [];
	  var row =  {
		        id: '',
		        taskId:'',
		        name:'',
		        status:'',
		        time:''
		      };
	  
	  for(var i = 1;i<=50 ; i++){
		  var newRow = angular.copy(row);
		  newRow.id = i ;
		  newRow.taskId = randomNum(100000,999999);
		  newRow.name = '任务'+ i;
		  var status = getStatus();
		  newRow.status = status;
		  if(status == '已完成'){
			  newRow.time =  '2017-11-29 17:07:41';
		  }
		  $scope.rowCollection.push(newRow);
	  }
	  
	  $scope.total = 50;
	  
	  function getStatus(){
		  var status = ['未处理','处理中','已完成'];
		  var i = randomNum(0,2);
		  return status[i];
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
