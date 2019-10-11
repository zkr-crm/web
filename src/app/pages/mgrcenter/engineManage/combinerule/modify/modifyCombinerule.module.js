(function() {
    'use strict';

    angular.module('mgrcenter.engineManage.combinerule.modify', []).config(
        function routeConfig($stateProvider) {
            $stateProvider.state('mgrcenter.modifyCombinerule', {
                params:{'combineRule':null,'combineFactorRels':null,'isUsed':null},
                url : '/modifyCombinerule',
                templateUrl : 'app/pages/mgrcenter/engineManage/combinerule/modify/modifyCombinerule.html',
                title : '组合规则配置修改'
            });
        });

})();