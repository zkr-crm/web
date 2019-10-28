(function () {
    'use strict';

    angular.module('BlurAdmin.pages.portrayal.perCusPortrayal')
        .controller('uptContactAddrCtrl', uptContactAddrCtrl);

    /** @ngInject */
    function uptContactAddrCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal, custNo, addrTyp) {

    	$scope.Nationality  = EnumType.Nationality;
    	$scope.AddrTyp  = EnumType.AddrTyp;

        //-------------查询回显开始--------------
        var initInfo = function() {
            HttpService.linkHttp({
                url: 'crm/ecif/cust/contactAddrOne',
                method: 'GET',
                params: {'custNo': custNo, 'addrTyp': addrTyp}
            }).then(function (response) {
                	$scope.contactAddr = response.data;
            });
        }

        $scope.reset = function() {
        	initInfo();
        }
        initInfo();
        //-------------查询回显结束--------------

        //-------------修改开始--------------
		$scope.uptConAddr = function() {
			var ccontactAddrbj = angular.copy($scope.contactAddr);
			if (contactAddrObj == undefined) {
				Alert.error("联系地址参数不能为空");
				return;
			}
			if (contactAddrObj.custNo == undefined || contactAddrObj.custNo == '') {
				Alert.error("客户号不能为空");
				return;
			}
			if (contactAddrObj.addrTyp == undefined || contactAddrObj.addrTyp == '') {
				Alert.error("联系地址类型不能为空");
				return;
			}
			
            HttpService.linkHttp({
                url: 'crm/ecif/cust/uptContactAddr',
                method: 'PUT',
                params: contactAddrObj
            }).then(function (response) {
                $uibModalInstance.close();
            });
		}
        //-------------修改结束--------------
    
    }
})();
