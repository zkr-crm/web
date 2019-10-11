(function () {
  'use strict';

  angular.module('BlurAdmin.pages.demos.tableDemo2')
      .controller('TableDemo2Ctrl', TableDemo2Ctrl);
  /** @ngInject */
  function TableDemo2Ctrl($scope, $filter, $compile,DTOptionsBuilder, DTColumnDefBuilder,$uibModal) {
	  var vm = this;
	    vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(10);
	    vm.dtColumnDefs = [
	        DTColumnDefBuilder.newColumnDef(0),
	        DTColumnDefBuilder.newColumnDef(1).notVisible(),
	        DTColumnDefBuilder.newColumnDef(2).notSortable()
	    ];
	    
	    vm.persons =[{
	        "id": 860,
	        "firstName": "Superman",
	        "lastName": "Yoda"
	    }, {
	        "id": 870,
	        "firstName": "Foo",
	        "lastName": "Whateveryournameis"
	    }, {
	        "id": 590,
	        "firstName": "Toto",
	        "lastName": "Titi"
	    }, {
	        "id": 803,
	        "firstName": "Luke",
	        "lastName": "Kyle"
	    },
	    {
	        "id": 860,
	        "firstName": "Superman",
	        "lastName": "Yoda"
	    }, {
	        "id": 870,
	        "firstName": "Foo",
	        "lastName": "Whateveryournameis"
	    }, {
	        "id": 590,
	        "firstName": "Toto",
	        "lastName": "Titi"
	    }, {
	        "id": 803,
	        "firstName": "Luke",
	        "lastName": "Kyle"
	    },
	    {
	        "id": 860,
	        "firstName": "Superman",
	        "lastName": "Yoda"
	    }, {
	        "id": 870,
	        "firstName": "Foo",
	        "lastName": "Whateveryournameis"
	    }, {
	        "id": 590,
	        "firstName": "Toto",
	        "lastName": "Titi"
	    }, {
	        "id": 803,
	        "firstName": "Luke",
	        "lastName": "Kyle"
	    },
	    {
	        "id": 860,
	        "firstName": "Superman",
	        "lastName": "Yoda"
	    }, {
	        "id": 870,
	        "firstName": "Foo",
	        "lastName": "Whateveryournameis"
	    }, {
	        "id": 590,
	        "firstName": "Toto",
	        "lastName": "Titi"
	    }, {
	        "id": 803,
	        "firstName": "Luke",
	        "lastName": "Kyle"
	    },
	    {
	        "id": 860,
	        "firstName": "Superman",
	        "lastName": "Yoda"
	    }, {
	        "id": 870,
	        "firstName": "Foo",
	        "lastName": "Whateveryournameis"
	    }, {
	        "id": 590,
	        "firstName": "Toto",
	        "lastName": "Titi"
	    }, {
	        "id": 803,
	        "firstName": "Luke",
	        "lastName": "Kyle"
	    }
	    ];
	    
	    $scope.test = function (){
	    	 vm.persons =[{
	 	        "id": 860,
	 	        "firstName": "Superman",
	 	        "lastName": "Yoda"
	 	    }, {
	 	        "id": 870,
	 	        "firstName": "Foo",
	 	        "lastName": "Whateveryournameis"
	 	    },
	 	   {
		        "id": 860,
		        "firstName": "Superman",
		        "lastName": "Yoda"
		    }, {
		        "id": 870,
		        "firstName": "Foo",
		        "lastName": "Whateveryournameis"
		    }, {
		        "id": 590,
		        "firstName": "Toto",
		        "lastName": "Titi"
		    }, {
		        "id": 803,
		        "firstName": "Luke",
		        "lastName": "Kyle"
		    },
		    {
		        "id": 860,
		        "firstName": "Superman",
		        "lastName": "Yoda"
		    }, {
		        "id": 870,
		        "firstName": "Foo",
		        "lastName": "Whateveryournameis"
		    }, {
		        "id": 590,
		        "firstName": "Toto",
		        "lastName": "Titi"
		    }, {
		        "id": 803,
		        "firstName": "Luke",
		        "lastName": "Kyle"
		    },
		    {
		        "id": 860,
		        "firstName": "Superman",
		        "lastName": "Yoda"
		    }, {
		        "id": 870,
		        "firstName": "Foo",
		        "lastName": "Whateveryournameis"
		    }, {
		        "id": 590,
		        "firstName": "Toto",
		        "lastName": "Titi"
		    }, {
		        "id": 803,
		        "firstName": "Luke",
		        "lastName": "Kyle"
		    },
		    {
		        "id": 860,
		        "firstName": "Superman",
		        "lastName": "Yoda"
		    }, {
		        "id": 870,
		        "firstName": "Foo",
		        "lastName": "Whateveryournameis"
		    }, {
		        "id": 590,
		        "firstName": "Toto",
		        "lastName": "Titi"
		    }, {
		        "id": 803,
		        "firstName": "Luke",
		        "lastName": "Kyle"
		    }
	 	    ];
	    }
	    
	    $scope.add = function (){
	    	 vm.persons.push({
		 	        "id": 870,
		 	        "firstName": "Foo",
		 	        "lastName": "Whateveryournameis"
		 	    }) ;
	    }
  }
  
})();
