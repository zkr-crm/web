(function () {
    'use strict';

    angular.module('BlurAdmin.pages.market.autoActivCreat', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('market.autoActivCreat2', {
                url: '/autoActivCreat',
                params: {'tabOpen': null},
                templateUrl: 'app/pages/market/autoActivCreat/autoActivCreat2.html',
                title: '新建自动营销',
                sidebarMeta: {
                    icon: 'ion-monitor',
                    order: 1,
                },
            });
    }
})();
