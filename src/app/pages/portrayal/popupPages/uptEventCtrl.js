(function () {
    'use strict';

    angular.module('BlurAdmin.pages.portrayal.perCusPortrayal')
        .controller('uptEventCtrl', uptEventCtrl);

    /** @ngInject */
    function uptEventCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal, custNo, eventType, eventDate) {
        console.log("uptEventCtrl custNo=" + custNo);
        console.log("uptEventCtrl eventType=" + eventType);
        console.log("uptEventCtrl eventDate=" + eventDate);

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

        //-------------查询回显开始--------------
        // getEvent(item.custNo, item.eventDate, item.eventType)
        var initEventInfo = function() {
            HttpService.linkHttp({
                url: 'crm/ecif/cust/custEventOne',
                method: 'GET',
                params: {'custNo': custNo, 'eventType': eventType, 'eventDate': eventDate}
            }).then(function (response) {
                response.data.eventType = EnumType.EventType.getEnumByValue(response.data.eventType);
                $scope.custEvent = response.data;
                if(response.data.eventDate != null) {
                	var v = new Date(response.data.eventDate);
                    $scope.custEvent.eventDate = v;
                }
            });
        }

        $scope.reset = function() {
        	initEventInfo();
        }
        initEventInfo();
        //-------------查询回显结束--------------

        //-------------修改开始--------------
		$scope.save = function() {
			if ($scope.custEvent == null) {
				Alert.error("资产信息不能为空");
				return;
			}
			if ($scope.custEvent.custNo == null || $scope.custEvent.custNo == '') {
				Alert.error("客户号不能为空");
				return;
			}
			if ($scope.custEvent.eventType == null || $scope.custEvent.eventType == '') {
				Alert.error("事件类型不能为空");
				return;
			}
			if ($scope.custEvent.eventDate == null || $scope.custEvent.eventDate == '') {
				Alert.error("事件日期不能为空");
				return;
			}
			var eventObj = angular.copy($scope.custEvent);
			eventObj.eventType = $scope.custEvent.eventType.value;
			var eventDate = new Date($scope.custEvent.eventDate);
			eventObj.eventDate = $filter('date')(eventDate, 'yyyy-MM-dd'); 

			console.log(eventObj);
            HttpService.linkHttp({
                url: 'crm/ecif/cust/uptCustEvent',
                method: 'PUT',
                params: eventObj
            }).then(function (response) {
                $uibModalInstance.close();
            });
		}
        //-------------修改结束--------------
    }
})();
