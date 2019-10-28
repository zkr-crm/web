(function () {
    'use strict';

    angular.module('BlurAdmin.pages.market.activCreat', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('market.activCreat', {
                url: '/activCreat',
                params: {'tabOpen': null},
                templateUrl: 'app/pages/market/activCreat/activCreat.html',
                title: '新建营销活动',
                sidebarMeta: {
                    icon: 'ion-monitor',
                    order: 1,
                },
            });
    }
})();
