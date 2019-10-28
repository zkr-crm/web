(function () {
    'use strict';

    angular.module('BlurAdmin.pages.myCalendar', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('myCalendar', {
                url: '/myCalendar',
                params: {'tabOpen': null},
                templateUrl: 'app/pages/myCalendar/myCalendar.html',
                title: '工作日程',
                sidebarMeta: {
                    icon: 'ion-calendar',
                    order: 0,
                },
            });
    }
})();
