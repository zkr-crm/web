(function() {
    'use strict';

    angular.module('mgrcenter.engineManage.strategy.add', []).config(
        function routeConfig($stateProvider) {
            $stateProvider.state('mgrcenter.addStrategy', {
                url : '/addStrategy',
                templateUrl : 'app/pages/mgrcenter/engineManage/strategy/add/addStrategy.html',
                title : '模型配置新增'
            });
        });

})();