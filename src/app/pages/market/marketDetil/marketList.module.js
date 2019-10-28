(function () {
    'use strict';

    angular.module('BlurAdmin.pages.market.marketDetil', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('market.marketList', {
                url: '/marketDetil',
                templateUrl: 'app/pages/market/marketDetil/marketList.html',
                title: '人工营销',
                params: {'tabOpen': null},
                sidebarMeta: {
                    icon: 'ion-monitor',
                    order: 1,
                },
            }).state('market.marketDetil', {
                url: '/marketDetil',
                templateUrl: 'app/pages/market/marketDetil/marketDetil.html',
                title: '人工营销详细',
                params:{'activInfo':null},
                sidebarMeta: {
                    icon: 'ion-monitor',
                    order: 2,
                },
            }).state('market.editMarketInfo', {
                url: '/marketDetil/popUps',
                templateUrl: 'app/pages/market/marketDetil/popUps/editMarketInfo.html',
                title: '修改活动信息',
                params:{'activInfo':null},
                sidebarMeta: {
                    icon: 'ion-monitor',
                    order: 3,
                },
            });
    }
})();
