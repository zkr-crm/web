(function() {
  'use strict';

  angular.module('BlurAdmin.pages.scheduler')
    .controller('SchedulerController', SchedulerController);

  /** @ngInject */
  function SchedulerController($scope, HttpService,Alert,$uibModal) {
      var queryJobs = function () {
          HttpService.linkHttp({
              url: 'crm/scheduler/job',
              method: 'GET',
          }).then(function (response) {
              $scope.jobCollection = response.data;
          });
      };
      queryJobs();

      var queryStatus = function () {
          HttpService.linkHttp({
              url: 'crm/scheduler/status',
              method: 'GET',
          }).then(function (response) {
              if(response.data){
                  $scope.status = "暂停";
                  $scope.isRunning = false;
              }else{
                  $scope.status = "运行";
                  $scope.isRunning = true;
              }
          });
      };
      queryStatus();


      // window.setInterval(queryJobs,1000*10);
      $scope.refresh = function () {
          queryJobs();
          queryStatus();
      };

      $scope.start = function(){
          HttpService.linkHttp({
              url: 'crm/scheduler/status/start',
              method: 'PUT',
          }).then(function (response) {
              Alert.success("启动成功！");
              queryStatus();
          });
      };

      $scope.standby = function(){
          HttpService.linkHttp({
              url: 'crm/scheduler/status/standby',
              method: 'PUT',
          }).then(function (response) {
              Alert.success("暂停成功！");
              queryStatus();
          });
      };

      $scope.addJob = function(){
          var modalInstance = $uibModal.open({
              animation: true,
              templateUrl: 'app/pages/scheduler/add/newJob.html',
              controller: 'NewJobCtrl',
              backdrop:'static',
              size:'md'
              // resolve: {
              //     'custNo': function () {
              //         return custNo;
              //     }
              // }
          });
          modalInstance.result.then(function(){
              queryJobs();
          });
      };
      
      $scope.delete = function (job) {
          Alert.confirm("确定删除【"+job.desc+"】作业吗？").then(function () {
              HttpService.linkHttp({
                  url: 'crm/scheduler/job',
                  method: 'DELETE',
                  params:{jobId:job.name,jobGroup:job.group}
              }).then(function (response) {
                  Alert.success("删除成功！");
                  queryJobs();
              });
          });
      };

      $scope.pause = function (job) {
          Alert.confirm("确定暂停【"+job.desc+"】作业吗？").then(function () {
              HttpService.linkHttp({
                  url: 'crm/scheduler/job/pause',
                  method: 'PUT',
                  params:{jobId:job.name,jobGroup:job.group}
              }).then(function (response) {
                  Alert.success("暂停成功！");
                  queryJobs();
              });
          });
      };

      $scope.resume = function (job) {
          Alert.confirm("确定恢复【"+job.desc+"】作业吗？").then(function () {
              HttpService.linkHttp({
                  url: 'crm/scheduler/job/resume',
                  method: 'PUT',
                  params:{jobId:job.name,jobGroup:job.group}
              }).then(function (response) {
                  Alert.success("恢复成功！");
                  queryJobs();
              });
          });
      };
  }

})();
