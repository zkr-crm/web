(function () {
    'use strict';

    angular.module('BlurAdmin.pages.mgrcenter.msgManage.appMsgMng', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('mgrcenter.msgManage.appMsgMng', {
                url: '/appMsgMng',
                params:{'activeTab':null,'selected':""},
                abstract: false,
                templateUrl: 'app/pages/mgrcenter/msgManage/appMsgMng/appMsgMng.html',
                title: '站内信管理',
                sidebarMeta: {
                    order: 3,
                },
            });
    }
})();
