(function () {
    'use strict';

    angular.module('BlurAdmin.pages.myHome', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('myHome', {
                url: '/myHome',
                params: {'tabOpen': null},
                templateUrl: 'app/pages/myHome/MyHome.html',
                title: '工作台',
                sidebarMeta: {
                    icon: 'ion-monitor',
                    order: 1,
                },
            });
    }
})();
