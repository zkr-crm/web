(function () {
    'use strict';

    angular.module('BlurAdmin.pages.portrayal.perCusPortrayal')
        .controller('uptContactWayCtrl', uptContactWayCtrl);

    /** @ngInject */
    function uptContactWayCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal, phoneList, contactSqn) {
        var init = function () {
            $scope.phoneList = phoneList;
        }
        init()
        //-------------查询回显开始--------------
        // var initInfo = function() {
        //     HttpService.linkHttp({
        //         url: 'crm/ecif/cust/contactWayOne',
        //         method: 'GET',
        //         params: {'custNo': custNo, 'contactSqn': contactSqn}
        //     }).then(function (response) {
        //         	$scope.contactWay = response.data;
        //     });
        // }

        // $scope.reset = function() {
        // 	initInfo();
        // }
        // initInfo();
        //-------------查询回显结束--------------

        //-------------修改开始--------------
		// $scope.uptConWay = function() {
		// 	var contactWayObj = angular.copy($scope.contactWay);
		// 	if (contactWayObj == undefined) {
		// 		Alert.error("联系方式参数不能为空");
		// 		return;
		// 	}
		// 	if (contactWayObj.custNo == undefined || contactWayObj.custNo == '') {
		// 		Alert.error("客户号不能为空");
		// 		return;
		// 	}
//			if (contactWayObj.contactSqn == undefined || contactWayObj.contactSqn == '') {
//				Alert.error("联系方式序号不能为空");
//				return;
//			}
			
		// 	console.log(contactWayObj);
  //           HttpService.linkHttp({
  //               url: 'crm/ecif/cust/uptContactWay',
  //               method: 'PUT',
  //               params: contactWayObj
  //           }).then(function (response) {
  //               $uibModalInstance.close();
  //           });
		// }
        //-------------修改结束--------------
    
    	
    	
    	
    }
})();
