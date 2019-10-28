(function () {
    'use strict';

    angular.module('BlurAdmin.pages.portrayal.perCusPortrayal')
        .controller('endorListCtrl', endorListCtrl);
    /** @ngInject */
    function endorListCtrl($scope, HttpService, EnumType,$uibModalInstance, $filter, $uibModal, Alert, $rootScope, endorNo,seqNo) {
    	var init = function () {
            $scope.endorListOpts = {
                pagination:{
                    pageSize: '5',
                    pageIndex: 1,
                    maxText: 5
                },
                url:'/crm/query/custquery/getEndorInfoKindByEndorNo',
                method:"POST",
                data:{
                    // 'endorNo':"E08012018999999000006"
                    endorNo:endorNo
                },
                success:function successCallback(response){ 
                    if (response.status === '1') {
                        $scope.endorList = response.data.list;
                    }
                }
            }
            $scope.endorPayMentOpts.data.seqNo=seqNo;
        }
        init();
    }
})();
