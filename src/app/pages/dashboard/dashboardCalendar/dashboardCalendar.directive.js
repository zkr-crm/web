(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('dashboardCalendar', dashboardCalendar);

  /** @ngInject */
  function dashboardCalendar() {
    return {
      restrict: 'E',
      controller: 'DashboardCalendarCtrl',
      templateUrl: 'app/pages/dashboard/dashboardCalendar/dashboardCalendar.html'
    };
  }
})();