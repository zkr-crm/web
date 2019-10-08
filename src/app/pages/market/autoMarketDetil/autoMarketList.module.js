(function () {
    'use strict';

    angular.module('BlurAdmin.pages.market.autoMarketDetil', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('market.autoMarketList', {
                url: '/autoMarketDetil',
                templateUrl: 'app/pages/market/autoMarketDetil/autoMarketList.html',
                title: '自动营销',
                params: {'tabOpen': null},
                sidebarMeta: {
                    icon: 'ion-monitor',
                    order: 1,
                },
            }).state('market.autoMarketDetil', {
                url: '/autoMarketDetil',
                templateUrl: 'app/pages/market/autoMarketDetil/autoMarketDetil.html',
                title: '自动营销详细',
                params:{'activInfo':null},
                sidebarMeta: {
                    icon: 'ion-monitor',
                    order: 2,
                },
            }).state('market.editAutoMarketInfo', {
                url: '/autoMarketDetil/popUps',
                templateUrl: 'app/pages/market/autoMarketDetil/popUps/editMarketInfo.html',
                title: '修改活动信息',
                params:{'activInfo':null},
                sidebarMeta: {
                    icon: 'ion-monitor',
                    order: 3,
                },
            });
    }
})();
