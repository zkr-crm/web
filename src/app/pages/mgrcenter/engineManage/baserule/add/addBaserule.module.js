(function() {
    'use strict';

    angular.module('mgrcenter.engineManage.baserule.add', []).config(
        function routeConfig($stateProvider) {
            $stateProvider.state('mgrcenter.addBaserule', {
                url : '/addBaserule',
                templateUrl : 'app/pages/mgrcenter/engineManage/baserule/add/addBaserule.html',
                title : '基本规则配置添加'
            });
        });

})();