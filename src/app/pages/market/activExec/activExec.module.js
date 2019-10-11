(function () {
    'use strict';

    angular.module('BlurAdmin.pages.market.activExec', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('market.activExec', {
                url: '/activExec',
                params: {'tabOpen': null},
                templateUrl: 'app/pages/market/activExec/activExec.html',
                title: '营销活动执行',
                sidebarMeta: {
                    icon: 'ion-monitor',
                    order: 1,
                },
            });
    }
})();
