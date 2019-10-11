(function() {
    'use strict';

    angular.module('mgrcenter.engineManage.baserule.view', []).config(
        function routeConfig($stateProvider) {
            $stateProvider.state('mgrcenter.viewBaserule', {
                params:{'baseRule':null},
                url : '/viewBaserule',
                templateUrl : 'app/pages/mgrcenter/engineManage/baserule/view/viewBaserule.html',
                title : '基本规则配置查看'
            });
        });

})();