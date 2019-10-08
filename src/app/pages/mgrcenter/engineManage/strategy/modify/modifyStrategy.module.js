(function() {
    'use strict';

    angular.module('mgrcenter.engineManage.strategy.modify', []).config(
        function routeConfig($stateProvider) {
            $stateProvider.state('mgrcenter.modifyStrategy', {
                params:{'strategy':null,'strategyCombineRels':null},
                url : '/modifyStrategy',
                templateUrl : 'app/pages/mgrcenter/engineManage/strategy/modify/modifyStrategy.html',
                title : '模型配置修改'
            });
        });

})();