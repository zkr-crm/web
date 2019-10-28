(function() {
	'use strict';

	angular.module('BlurAdmin.pages.portrayal.perCusPortrayal')
		.controller('custCertMntCtrl', custCertMntCtrl);
    function custCertMntCtrl($scope, EnumType, $filter, $uibModal, $timeout, toastr,Alert,HttpService, custNo){
    	$scope.IdType  = EnumType.IdType;

        HttpService.linkHttp({
            url: 'crm/ecif/cust/custCertList',
            method: 'GET',
            params: {'custNo': custNo}
        }).then(function (response) {
            $scope.custCertList  = response.data.map(function (item) {
                item.certTyp = EnumType.IdType.getLabelByValue(item.certTyp);
                item.certSts = EnumType.ValidFlg.getLabelByValue(item.certSts);
                return item;
            });
            $scope.certTotal = response.data.length;
        });

        $scope.searchCertObj = {
        		'certTyp' : '',
                'certNo' : '',
                'custNo' : custNo
            };

        $scope.clearCustCertSearch = function() {
            $scope.searchCertObj = {
            		'certTyp' : '',
                    'certNo' : '',
                    'custNo' : custNo
                };

            $scope.searchCustCert();
        }
        // 查询事件
        $scope.searchCustCert = function() {
            var opts = {};
            opts.url = 'crm/ecif/cust/custCertList';
            opts.method = 'GET';
            opts.params =   {
            		'certTyp' : $scope.searchCertObj.certTyp.value,
                    'certNo' : $scope.searchCertObj.certNo,
                    'custNo' : custNo
                };
            HttpService.linkHttp(opts).then(function(response) {
                $scope.custCertList  = response.data.map(function (item) {
                    item.certTyp = EnumType.IdType.getLabelByValue(item.certTyp);
                    item.certSts = EnumType.ValidFlg.getLabelByValue(item.certSts);
                    return item;
                });
                $scope.certTotal = response.data.length;

            });
        }
    }
})();
