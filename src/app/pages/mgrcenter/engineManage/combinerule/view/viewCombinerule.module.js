(function() {
    'use strict';

    angular.module('mgrcenter.engineManage.combinerule.view', []).config(
        function routeConfig($stateProvider) {
            $stateProvider.state('mgrcenter.viewCombinerule', {
                params:{'combinerule':null},
                url : '/viewCombinerule',
                templateUrl : 'app/pages/mgrcenter/engineManage/combinerule/view/viewCombinerule.html',
                title : '组合规则配置查看'
            });
        });

})();