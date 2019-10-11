(function () {
  'use strict';

  angular.module('BlurAdmin.pages.demos.tableDemo5')
      .controller('tableDemo5Ctrl', tableDemo5Ctrl);
  /** @ngInject */
  function tableDemo5Ctrl($scope, $filter, $compile,$uibModal,Alert,HttpService) {

      // $scope.queryUsers = function () {
      //     HttpService.linkHttp({
      //         url: 'crm/ecif/test/users',
      //         method: 'GET',
      //     }).then(function (response) {
      //         $scope.rowCollection = response.data;
      //     });
      // };


      $scope.queryUsersOptions = {};
      $scope.queryUsersOptions.url = 'crm/ecif/test/users';
      $scope.queryUsersOptions.method = 'GET';
      $scope.queryUsersOptions.params = {};
      $scope.queryUsersOptions.success = function successCallback(response) {
          $scope.rowCollection = response.data;
      };

      $scope.queryAgain = function () {
       $scope.queryPage(1);
      };

      // $scope.queryUsers();
  }
  
})();
