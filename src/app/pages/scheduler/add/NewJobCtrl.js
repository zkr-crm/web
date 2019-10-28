(function () {
    'use strict';

    angular.module('BlurAdmin.pages.scheduler')
        .controller('NewJobCtrl', NewJobCtrl);

    /** @ngInject */
    function NewJobCtrl($scope, HttpService,$uibModalInstance,Alert) {
        $scope.job = {'jobDescription':null,'jobId':null,'jobGroup':null,'cron':null,'targetUrl':null,'params':null};
        $scope.save = function () {
            HttpService.linkHttp({
                url: 'crm/scheduler/job',
                method: 'POST',
                params: $scope.job,
                headers: {'Content-type':'application/x-www-form-urlencoded'}
            }).then(function (response) {
                Alert.success("保存成功！");
                $uibModalInstance.close();
            });
        }
    }

})();
