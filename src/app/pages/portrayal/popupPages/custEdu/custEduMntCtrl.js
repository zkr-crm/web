(function() {
	'use strict';

	angular.module('BlurAdmin.pages.portrayal.perCusPortrayal')
		.controller('custEduMntCtrl', custEduMntCtrl);
    function custEduMntCtrl($scope, EnumType, $filter, $uibModal, $timeout, toastr,Alert,HttpService, custNo){
    	$scope.Degree  = EnumType.Degree;

        HttpService.linkHttp({
            url: 'crm/ecif/cust/custEduList',
            method: 'GET',
            params: {'custNo': custNo}
        }).then(function (response) {
            $scope.custEduList  = response.data.map(function (item) {
                item.eduTyp = EnumType.Degree.getLabelByValue(item.eduTyp);
                return item;
            });
            $scope.eduTotal = response.data.length;
        });


        $scope.searchEduObj = {
        		'certTyp' : '',
                'certNo' : '',
                'custNo' : custNo
            };

        $scope.clearCustEduSearch = function() {
            $scope.searchEduObj = {
            		'certTyp' : '',
                    'certNo' : '',
                    'custNo' : custNo
                };

            $scope.searchCustEdu();
        }
        
        $scope.addCustEdu = function(){
        	$scope.custNo = custNo;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/portrayal/popupPages/custEdu/addCustEdu.html',
                controller: 'addCustAgentCtrl',
                size: 'midle-900',
                backdrop:'static',
                scope:$scope,
                resolve: {
                    'custNo': function () {
                        return custNo;
                    }
                }
            });
            modalInstance.result.then(function(){
                $scope.searchCustAgent();
            });
        };

        // 查询事件
        $scope.searchCustEdu = function() {
            var opts = {};
            opts.url = 'crm/ecif/cust/custEduList';
            opts.method = 'GET';
            opts.params =  $scope.searchCustEduObj;
            HttpService.linkHttp(opts).then(function(response) {
                console.log("请求成功");
                console.log(response);
                $scope.custEduList  = response.data.map(function (item) {
                    item.eduTyp = EnumType.Degree.getLabelByValue(item.eduTyp);
                    return item;
                });
                $scope.eduTotal = response.data.length;

            });
        }
    }
})();
