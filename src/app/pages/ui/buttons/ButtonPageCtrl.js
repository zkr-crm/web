(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ui.buttons')
      .controller('ButtonPageCtrl', ButtonPageCtrl);

  /** @ngInject */
  function ButtonPageCtrl($scope, $timeout) {
    $scope.progressFunction = function() {
      return $timeout(function() {}, 3000);
    };
  }

})();
