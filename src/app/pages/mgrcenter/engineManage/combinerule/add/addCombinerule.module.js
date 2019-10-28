(function() {
    'use strict';

    angular.module('mgrcenter.engineManage.combinerule.add', []).config(
        function routeConfig($stateProvider) {
            $stateProvider.state('mgrcenter.addCombinerule', {
                url : '/addCombinerule',
                templateUrl : 'app/pages/mgrcenter/engineManage/combinerule/add/addCombinerule.html',
                title : '组合规则配置添加'
            });
        });

})();