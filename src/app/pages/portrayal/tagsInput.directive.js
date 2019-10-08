(function () {
  'use strict';

  angular.module('BlurAdmin.pages.portrayal')
      .directive('tagInput', tagInput);

  /** @ngInject */
  function tagInput() {
    return {
      restrict: 'A',
      link: function( $scope, elem, attr) {
    	  console.log("-----------");
    	  console.log(elem);
        $(elem).tagsinput({
          tagClass:  'label label-' + attr.tagInput
        });
      }
    };
  }
})();