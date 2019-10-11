(function() {
	'use strict';

	angular.module('BlurAdmin.pages.portrayal.perCusPortrayal')
		.controller('custCareerMntCtrl', custCareerMntCtrl);
    function custCareerMntCtrl($scope, EnumType, $filter, $uibModal, $timeout, toastr,Alert,HttpService, custNo){
    	$scope.IdType  = EnumType.IdType;

        HttpService.linkHttp({
            url: 'crm/ecif/cust/custCareerList',
            method: 'GET',
            params: {'custNo': custNo}
        }).then(function (response) {
            	$scope.custCareerList  = response.data.map(function (item) {
                item.trade = EnumType.BusinessType.getLabelByValue(item.trade);
                item.unitNature = EnumType.GrpNature.getLabelByValue(item.unitNature);
                item.workNature = EnumType.WorkNature.getLabelByValue(item.workNature);

                return item;
            });
            $scope.careerTotal = response.data.length;
        });

        $scope.searchCustCareerObj = {
        		'unitName' : '',
                'position' : '',
                'custNo' : custNo
            };

        $scope.clearCustCareerSearch = function() {
            $scope.searchCustCareerObj = {
            		'unitName' : '',
                    'position' : '',
                    'custNo' : custNo
                };

            $scope.searchCustCareer();
        }
        // 查询事件
        $scope.searchCustCareer = function() {
            var opts = {};
            opts.url = 'crm/ecif/cust/custCareerList';
            opts.method = 'GET';
            opts.params =  $scope.searchCustCareerObj;
            HttpService.linkHttp(opts).then(function(response) {
                $scope.custCareerList  = response.data.map(function (item) {
                    item.trade = EnumType.BusinessType.getLabelByValue(item.trade);
                    item.unitNature = EnumType.GrpNature.getLabelByValue(item.unitNature);
                    item.workNature = EnumType.WorkNature.getLabelByValue(item.workNature);

                    return item;
                });
                $scope.careerTotal = response.data.length;
            });
        }
    }
})();
