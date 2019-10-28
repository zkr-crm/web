(function () {
    'use strict';

    angular.module('BlurAdmin.pages.market.activJoin', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('market.activJoin', {
                url: '/activJoin',
                params: {'tabOpen': null},
                templateUrl: 'app/pages/market/activJoin/activJoin.html',
                title: '营销活动',
                sidebarMeta: {
                    icon: 'ion-monitor',
                    order: 1,
                },
            });
    }
})();
