(function () {
  'use strict';

  angular.module('BlurAdmin.pages.home')
      .directive('homeChart', homeChart);

  /** @ngInject */
  function homeChart() {
    return {
      restrict: 'E',
      controller: 'HomeChartCtrl',
      templateUrl: 'app/pages/home/charts/homeChart.html'
    };
  }
})();