(function () {
    'use strict';

    angular.module('BlurAdmin.pages.myHome')
        .controller('MyCustomCtrl', MyCustomCtrl);

    /** @ngInject */
    function MyCustomCtrl($scope, $state, HttpService,EnumType,$rootScope) {
    	
    	// 查询条件对象
        $scope.searchObj = {
            'custName' : '',
            'custTyp' : ''
        };
        
        $scope.custTypes = EnumType.CustType;
    	
        /*HttpService.linkHttp({
            url: 'crm/ecif/cust/perCustList',
            method: 'GET',
        }).then(function (response) {
            $scope.custCollection = response.data.map(function (item) {
                item.custTyp = EnumType.CustType.getLabelByValue(item.custTyp);
                item.custSource = EnumType.DataSource.getLabelByValue(item.custSource);
                return item;
            });
            $scope.total = response.data.length;
        });*/
        
        /*******************************开始***********************************/
    	var custAgentList =[];
    	
    	var initOpts = {};
		initOpts.url = '/crm/manage/auth/getRoleDateAuth';
		initOpts.method = 'GET';
		initOpts.params = {
			userCode : $rootScope.global.user,
			tableCode : "T001"
		};
		HttpService.linkHttp(initOpts).then(function(result) {
			
			if(!(result.data===undefined || result.data.length==0)){
				
            	angular.forEach(result.data, function(i) {
            		if(i.employeeId!==undefined){
            			custAgentList.push(i.employeeId);	                			
            		}
            	});
				
                var opts = {};
                opts.url = '/crm/ecif/cust/getPerCustListByRole';
                opts.method = 'POST';
                opts.params ={};
                opts.data =custAgentList;
                HttpService.linkHttp(opts).then(function(response) {
                    $scope.custCollection = response.data;
                    $scope.custCollection = response.data.map(function (item) {
                       item.custTyp = EnumType.CustType.getLabelByValue(item.custTyp);
                        item.custSource = EnumType.DataSource.getLabelByValue(item.custSource);
                        item.certTyp = EnumType.IdType.getLabelByValue(item.certTyp);
                        return item;
                    });
                    $scope.total = response.data.length;
                });
			}
		});

		// 重置
		$scope.resetSearchUser = function() {
	        $scope.searchObj = {
	                'custName' : '',
	                'custTyp' : ''
	            };
	        $scope.searchUser();
		}
        // 查询事件
        $scope.searchUser = function() {
        	
        	if(!(custAgentList===undefined || custAgentList.length==0)){
        		if ($scope.searchObj != '') {
        			$scope.searchObj.custTyp = $scope.searchObj.custTyp.value;
        		}
                var opts = {};
                opts.url = '/crm/ecif/cust/getPerCustListByRole';
                opts.method = 'POST';
                opts.params = $scope.searchObj;
                opts.data =custAgentList;
                HttpService.linkHttp(opts).then(function(response) {
                    $scope.custCollection = response.data;
                    $scope.custCollection = response.data.map(function (item) {
                       item.custTyp = EnumType.CustType.getLabelByValue(item.custTyp);
                        item.custSource = EnumType.DataSource.getLabelByValue(item.custSource);
                        item.certTyp = EnumType.IdType.getLabelByValue(item.certTyp);
                        return item;
                    });
                    $scope.total = response.data.length;
                    if ($scope.searchObj.custTyp != undefined) {
            			$scope.searchObj.custTyp = EnumType.CustType.getEnumByValue($scope.searchObj.custTyp);
                    }

                });
        	}
        }
		/*******************************结束***********************************/
        
        // 查询事件
/*        $scope.searchUser = function() {
            var opts = {};
            opts.url = 'crm/ecif/cust/perCustList';
            opts.method = 'GET';
            opts.params = {"custName":$scope.searchObj.custName,"custTyp":$scope.searchObj.custTyp.value}
            HttpService.linkHttp(opts).then(function(response) {
            	$scope.custCollection = response.data.map(function (item) {
                    item.custTyp = EnumType.CustType.getLabelByValue(item.custTyp);
                    item.custSource = EnumType.DataSource.getLabelByValue(item.custSource);
                    return item;
                });
                $scope.total = response.data.length;
            });
        }*/


        $scope.openDetail = function (custNo) {
            $state.go('portrayal.perCusPortrayal',{'custNo':custNo});
           // $location.path('/portrayal/perCusPortrayal').search({'custNo':custNo});
        }

        $scope.smartTablePageSize = 10;




    }

})();
