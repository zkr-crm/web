(function () {
    'use strict';

    angular.module('BlurAdmin.pages.portrayal.perCusPortrayal')
        .controller('addContactAddrCtrl', addContactAddrCtrl);

    /** @ngInject */
    function addContactAddrCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal, custNo) {
    	$scope.Nationality  = EnumType.Nationality;


    	//-------------新增开始--------------
		$scope.addConAddr = function() {
			var conAddrObj = angular.copy($scope.contactAddr);
			if (conAddrObj == undefined) {
				Alert.error("联系方式参数不能为空");
				return;
			}
			if (custNo == undefined || custNo == '') {
				Alert.error("客户号不能为空");
				return;
			}
			conAddrObj.custNo = custNo;
            HttpService.linkHttp({
                url: 'crm/ecif/cust/addContactAddr',
                method: 'PUT',
                params: conAddrObj
            }).then(function (response) {
                $uibModalInstance.close();
            });
		}
        //-------------新增结束--------------
    
    	
    }
})();
