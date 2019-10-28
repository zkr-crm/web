(function() {
  'use strict';

  angular.module('BlurAdmin.pages.home')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController($scope, $location, $stateParams) {
      $scope.realCusCountChart={};//真实客户
      $scope.cusChart={};//客户总数
      $scope.premiumChart={};//保费
      $scope.policyCharts={};//保单
      $scope.homeCharts=[];//饼图
      $scope.loyal={};//忠诚客户
  }

})();
