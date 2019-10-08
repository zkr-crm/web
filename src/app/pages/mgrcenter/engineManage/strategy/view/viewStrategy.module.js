(function() {
    'use strict';

    angular.module('mgrcenter.engineManage.strategy.view', []).config(
        function routeConfig($stateProvider) {
            $stateProvider.state('mgrcenter.viewStrategy', {
                params:{'strategy':null},
                url : '/viewStrategy',
                templateUrl : 'app/pages/mgrcenter/engineManage/strategy/view/viewStrategy.html',
                title : '模型配置查看'
            });
        });

})();