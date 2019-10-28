(function () {
    'use strict';

    angular.module('BlurAdmin.pages.portrayal.perCusPortrayal')
        .controller('claimListCtrl', claimListCtrl);
    /** @ngInject */
    function claimListCtrl($scope, HttpService, EnumType,$uibModalInstance, $filter, $uibModal, Alert, $rootScope, policyNo, ClaimDetail) {
    	var init = function () {
            $scope.ClaimDetail = ClaimDetail
            $scope.claimListOpts = {
                pagination:{
                    pageSize: '100',
                    pageIndex: 1,
                    maxText: 5
                },
                url:'/crm/query/custquery/getPayInfoClaimByPolicyNo',
                method:"POST",
                data:{
                    policyNo:policyNo,
                    claimNo: ClaimDetail.claimNo
                    // 'policyNo':"P08012019999999000426"
                },
                success:function successCallback(response){ 
                    if (response.status === '1') {
                        $scope.claimList = response.data.list;
                        $scope.ClaimDetail.indemnityMoney = 0;
                        if ($scope.claimList.length>0) {
                            $scope.claimList.forEach(function(item){
                                $scope.ClaimDetail.indemnityMoney += item.payFee?parseFloat(item.payFee):0;
                            })
                        }
                    }
                }
            }
        }
        init()
    }
})();
