(function () {
    'use strict';

    angular.module('BlurAdmin.pages.market.activAnalys', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('market.activAnalys', {
                url: '/activAnalys',
                params: {'tabOpen': null},
                templateUrl: 'app/pages/market/activAnalys/activAnalys.html',
                title: '营销活动分析',
                sidebarMeta: {
                    icon: 'ion-monitor',
                    order: 4,
                },
            }).state('market.aftifAnalys', {
                url: '/activAnalys',
                params: {'tabOpen': null},
                templateUrl: 'app/pages/market/activAnalys/analys/artifAnalys.html',
                title: '人工活动分析',
                sidebarMeta: {
                    icon: 'ion-monitor',
                    order: 2,
                },
            }).state('market.autoAnalys', {
                url: '/activAnalys',
                params: {'tabOpen': null},
                templateUrl: 'app/pages/market/activAnalys/analys/autoAnalys.html',
                title: '自动活动分析',
                sidebarMeta: {
                    icon: 'ion-monitor',
                    order: 3,
                },
            });
    }
})();
