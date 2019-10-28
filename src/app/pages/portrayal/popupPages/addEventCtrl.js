(function () {
    'use strict';

    angular.module('BlurAdmin.pages.portrayal.perCusPortrayal')
        .controller('addEventCtrl', addEventCtrl);

    /** @ngInject */
    function addEventCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal) {
    	console.log("custNo=" + $scope.custNo);
        $scope.EventType = EnumType.EventType;

        $scope.selectEventTyp = function(selectEventTyp) {
			console.log(selectEventTyp);
			$scope.custEvent.eventType = selectEventTyp;
		}

    	$scope.eventOpen = eventOpen;
        $scope.eventOpened = false;

        // 打开日期控件
        function eventOpen() {
            $scope.eventOpened = true;
        }
		//-------------新增开始--------------
		$scope.addEvent = function() {
			
			var assetsObj = angular.copy($scope.custEvent);
			if ($scope.custEvent == null) {
				Alert.error("事件信息不能为空");
				return;
			}
			if($scope.custEvent.eventType == null || $scope.custEvent.eventType==""){
                Alert.error("事件类型不能为空");
                return;
            }
            if($scope.custEvent.eventDate == null || $scope.custEvent.eventDate==""){
                Alert.error("事件日期不能为空");
                return;
            }
			if ($scope.custNo == null || $scope.custNo == '') {
				Alert.error("客户号不能为空");
				return;
			}
			assetsObj.custNo = $scope.custNo;
			assetsObj.eventType = $scope.custEvent.eventType.value;
			if ($scope.custEvent.eventDate != '' 
					&& $scope.custEvent.eventDate != null) {
				 var eventDate = new Date($scope.custEvent.eventDate);
				 assetsObj.eventDate = $filter('date')(eventDate, 'yyyy-MM-dd'); 
			}
			console.log(assetsObj);
            HttpService.linkHttp({
                url: 'crm/ecif/cust/addCustEvent',
                method: 'PUT',
                params: assetsObj
            }).then(function (response) {
                $uibModalInstance.close();
            });
		}
        //-------------新增结束--------------

    }
})();
