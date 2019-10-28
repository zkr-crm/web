(function () {
  'use strict';

  angular.module('BlurAdmin.pages.demos.tableDemo1')
      .controller('TableDemo1Ctrl', TableDemo1Ctrl);
  /** @ngInject */
  function TableDemo1Ctrl($scope, $filter, $compile,DTOptionsBuilder, DTColumnBuilder,$uibModal) {
	  /////////////////////////////////////////////
	  
	  $scope.dtInstance = null;
	  
	  $scope.dtOptions = DTOptionsBuilder
					      .fromSource('app/pages/demos/tableDemo1/data.json')
					      .withPaginationType('full_numbers')
					      .withDisplayLength(10)
					      .withOption('createdRow', function(row, data, dataIndex) {
                              $compile(angular.element(row).contents())($scope);
                          });
	  $scope.dtColumns = [
	        DTColumnBuilder.newColumn('id').withTitle('id').renderWith(
	            function(data, type, full, meta) {return '<a href="">'+data+ '</a>';}
	        ),
	        DTColumnBuilder.newColumn('firstName').withTitle('姓').renderWith(
	            function(data, type, full, meta) {return data;}
	        ),
	        DTColumnBuilder.newColumn('lastName').withTitle('名').renderWith(
	            function(data, type, full, meta) {return data;}
	        ),
	        DTColumnBuilder.newColumn('username').withTitle('姓名').renderWith(
	            function(data, type, full, meta) {return data;}
	        ),
	        DTColumnBuilder.newColumn('email').withTitle('邮箱').renderWith(
	            function(data, type, full, meta) {return data;}
	        ),
	        DTColumnBuilder.newColumn('age').withTitle('年龄').renderWith(
	            function(data, type, full, meta) {return data;}
	        ),
	        DTColumnBuilder.newColumn(null).withTitle('操作').renderWith(actionsHtml)
	      ];
	  
	 
	  
	  $scope.removeUser = function(demo){
		  $scope.dtInstance.reloadData();
//		  $scope.dtInstance.rerender();
	  };
	  function callback(json) {
	    }
	  $scope.demos = {};
	  
	  function actionsHtml(data, type, full, meta) {
		  $scope.demos[data.id] = data;
		   
		  return '<div class="buttons">'+
		  '<button class="btn btn-primary editable-table-button btn-xs" ng-click="editUser(demos[' + data.id + '])">修改</button>'+
	      '<button class="btn btn-danger editable-table-button btn-xs" ng-click="removeUser(demos[' + data.id + '])">删除</button>'+
	      '</div>';
	      }
  }
  
})();
