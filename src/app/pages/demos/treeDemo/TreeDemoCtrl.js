(function () {
  'use strict';

  angular.module('BlurAdmin.pages.demos.treeDemo')
      .controller('TreeDemoCtrl', TreeDemoCtrl);
  /** @ngInject */
  function TreeDemoCtrl($scope, $timeout) {


	    var newId = 0;
	    $scope.newNode = {};

	    $scope.basicConfig = {
	      core: {
	        multiple: true,
	        check_callback: true,
	        worker: true
	      },
	      'types': {
	        'folder': {
	          'icon': 'ion-ios-folder'
	        },
	        'default': {
	          'icon': 'ion-document-text'
	        }
	      },
	      'plugins': ['types','checkbox'],
	      'version': 1
	    };

	    $scope.show = function(){
	    	/*console.log(this.basicTree.jstree(true).get_selected());*/
	    }

	    $scope.addNewNode = function () {
	      var selected = this.basicTree.jstree(true).get_selected()[0];
	      if (selected)
	        $scope.treeData.push({
	          id: (newId++).toString(),
	          parent: selected,
	          text: "New node " + newId,
	          state: {opened: true}
	        });
	      $scope.basicConfig.version++;
	    };


	    $scope.refresh = function () {
	      newId = 0;
	      $scope.treeData = getDefaultData();
	      $scope.basicConfig.version++;
	    };

	    $scope.expand = function () {
	      $scope.treeData.forEach(function (n) {
	        n.state.opened = true;
	      });
	      $scope.basicConfig.version++;
	    };

	    $scope.collapse = function () {
	      $scope.treeData.forEach(function (n) {
	        n.state.opened = false;
	      });
	      $scope.basicConfig.version++;
	    };



	    $scope.applyModelChanges = function() {
	      return true;
	    };

	    $scope.treeData = getDefaultData();

	    function getDefaultData() {
	      return [
	        {
	          "id": "n1",
	          "parent": "#",
	          "type": "folder",
	          "text": "wb",
	          "state": {
	            "opened": true
	          }
	        },
	        {
	          "id": "n2",
	          "parent": "#",
	          "type": "folder",
	          "text": "Node 2",
	          "state": {
	            "opened": true
	          }
	        },
	        {
	          "id": "n3",
	          "parent": "#",
	          "type": "folder",
	          "text": "Node 3",
	          "state": {
	            "opened": true
	          }
	        },
	        {
	          "id": "n5",
	          "parent": "n1",
	          "text": "Node 1.1",
	          "state": {
	            "opened": true
	          }
	        },
	        {
	          "id": "n6",
	          "parent": "n1",
	          "text": "Node 1.2",
	          "state": {
	            "opened": true
	          }
	        },
	        {
	          "id": "n7",
	          "parent": "n1",
	          "text": "Node 1.3",
	          "state": {
	            "opened": true
	          }
	        },
	        {
	          "id": "n8",
	          "parent": "n1",
	          "text": "Node 1.4",
	          "state": {
	            "opened": true
	          }
	        },
	        {
	          "id": "n9",
	          "parent": "n2",
	          "text": "Node 2.1",
	          "state": {
	            "opened": true
	          }
	        },
	        {
	          "id": "n10",
	          "parent": "n2",
	          "text": "Node 2.2 (Custom icon)",
	          "icon": "ion-help-buoy",
	          "state": {
	            "opened": true
	          }
	        },
	        {
	          "id": "n12",
	          "parent": "n3",
	          "text": "Node 3.1",
	          "state": {
	            "opened": true
	          }
	        },
	        {
	          "id": "n13",
	          "parent": "n3",
	          "type": "folder",
	          "text": "Node 3.2",
	          "state": {
	            "opened": true
	          }
	        },
	        {
	          "id": "n14",
	          "parent": "n13",
	          "text": "Node 3.2.1",
	          "state": {
	            "opened": true
	          }
	        },
	        {
	          "id": "n15",
	          "parent": "n13",
	          "text": "Node 3.2.2",
	          "state": {
	            "opened": true
	          }
	        },
	        {
	          "id": "n16",
	          "parent": "n3",
	          "text": "Node 3.3",
	          "state": {
	            "opened": true
	          }
	        },
	        {
	          "id": "n17",
	          "parent": "n3",
	          "text": "Node 3.4",
	          "state": {
	            "opened": true
	          }
	        },
	        {
	          "id": "n18",
	          "parent": "n3",
	          "text": "Node 3.5",
	          "state": {
	            "opened": true
	          }
	        },
	        {
	          "id": "n19",
	          "parent": "n3",
	          "text": "Node 3.6",
	          "state": {
	            "opened": true
	          }
	        }
	      ]
	    }


	  }
  
})();
