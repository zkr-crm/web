(function() {
    'use strict';

    angular.module('mgrcenter.engineManage.baserule.modify', []).config(
        function routeConfig($stateProvider) {
            $stateProvider.state('mgrcenter.modifyBaserule', {
                params:{'baseRule':null,'baseFactorRels':null,'isUsed':null},
                url : '/modifyBaserule',
                templateUrl : 'app/pages/mgrcenter/engineManage/baserule/modify/modifyBaserule.html',
                title : '基本规则配置添加'
            });
        });

})();