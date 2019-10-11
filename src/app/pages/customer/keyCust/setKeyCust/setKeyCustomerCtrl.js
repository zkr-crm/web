(function () {
  'use strict';

  angular.module('BlurAdmin.pages.profile')
    .controller('SetKeyCustomerCtrl', SetKeyCustomerCtrl);

  /** @ngInject */
  function SetKeyCustomerCtrl($scope, $http, HttpService,$uibModalInstance, Alert) {
      
      $scope.Cust = {};
      $scope.blacklistDts = {};
      $scope.blacklistDts.custNo = $scope.custNo;
      $scope.blacklistDts.reason = "";
      $scope.blacklistDts.custName = $scope.custName;
      $scope.blacklistDts.blacklistSts = "0";
      //弹出界面的撤销
      $scope.saveValue = function() {
          if($scope.blacklistDts.reason == null || $scope.blacklistDts.reason == ""){
              Alert.error('请录入登记原因！');
              return;
          }
          var opts = {};
          opts.url = '/crm/ecif/cust/importantCustomer/setkey';
          opts.method = 'PUT';
          opts.params = $scope.blacklistDts;
          HttpService.linkHttp(opts).then(function(response) {
              // 执行查询
              $scope.searchUser();
              //$scope.$parent.$dismiss();
              $uibModalInstance.close();

          });
          /*   modalInstance.result.then(function(){
                 $scope.searchUser();
             });*/
         // $uibModalInstance.close($scope.sendTemDts);



      }
      // 查询事件
      $scope.searchUser = function() {
          var opts = {};
          opts.url = 'crm/ecif/cust/blackperCustList';
          opts.method = 'GET';
          opts.params = $scope.searchObj;
          HttpService.linkHttp(opts).then(function(response) {
              $scope.custCollection = response.data;
              $scope.custCollection = response.data.map(function (item) {
                  //item.custTyp = EnumType.CustType.getLabelByValue(item.custTyp);
                  //item.custSource = EnumType.DataSource.getLabelByValue(item.custSource);
                  //item.certTyp = EnumType.IdType.getLabelByValue(item.certTyp);
                  return item;
              });
              $scope.total = response.data.length;
          });
      }

     //选择操作
    $scope.link = 'abc';
    $scope.ok = function () {
        $uibModalInstance.close($scope.sendTemDts);
        /*if($scope.radioRptOptions.select ==""){
            Alert.error('请选择模板！');
            return ;
        }
      $uibModalInstance.close($scope.sendTemDts);*/
    };

  }

})();