(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('dashboardLineChart', dashboardLineChart);

  /** @ngInject */
  function dashboardLineChart() {
    return {
      restrict: 'E',
      controller: 'DashboardLineChartCtrl',
      templateUrl: 'app/pages/dashboard/dashboardLineChart/dashboardLineChart.html'
    };
  }
})();