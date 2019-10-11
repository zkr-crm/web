(function () {
    'use strict';

    angular.module('BlurAdmin.pages.myCalendar')
        .controller('getCalendarCtrl', getCalendarCtrl);

    /** @ngInject */
    function getCalendarCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal, eventData) {
            $scope.Rating = EnumType.Rating;
            $scope.CalSts = EnumType.CalSts;
            $scope.CalType = EnumType.CalType;
            //selectRating(calendar.calRating)
        	$scope.selectRating = function(selectRating) {
    			console.log(selectRating);
    			$scope.calendar.calRating = selectRating;
    		}

            //selectCalType(calendar.calSts)
        	$scope.selectCalSts = function(selectCalSts) {
    			console.log(selectCalSts);
    			$scope.calendar.calSts = selectCalSts;
    		}

            //selectCalType(calendar.calType)
        	$scope.selectCalType = function(selectCalType) {
    			console.log(selectCalType);
    			$scope.calendar.calType = selectCalType;
    		}

            $scope.calendar = {};
	    	$scope.startDateOpen = startDateOpen;
	        $scope.startDateOpened = false;
	        $scope.endDateOpen = endDateOpen;
	        $scope.endDateOpened = false;
	        // 打开日期控件
	        function startDateOpen() {
	            $scope.startDateOpened = true;
	        }
	        function endDateOpen() {
	            $scope.endDateOpened = true;
	        }
	        if ($scope.calendar != undefined) {
	        	$scope.calendar.id = eventData.id;
	        	$scope.calendar.calendarTitle= eventData.title;
	        	$scope.calendar.custAgent =  eventData.custAgent == undefined ? "ecif" : eventData.custAgent;
	        	$scope.calendar.custAgentNam = eventData.custAgentNam == undefined ? "ecif" : eventData.custAgentNam;
	        	$scope.calendar.custNo = eventData.custNo == undefined ? "423130347380498432" : eventData.custNo;
	        	$scope.calendar.custNam = eventData.custNam == undefined ? "王初冬" : eventData.custNam;
	        	$scope.calendar.custTel = eventData.custTel == undefined ? "15982002020" : eventData.custTel;
//	        	$scope.calendar.startDate = eventData.start;
//	        	$scope.calendar.endDate = eventData.end;
	        	var startDate = new Date(eventData.start);
	        	$scope.calendar.startDate = startDate; 
				var endDate = new Date(eventData.end);
				$scope.calendar.endDate = endDate; 
	        	$scope.calendar.calRating = eventData.calRating == undefined ? "1" : eventData.calRating;
	        	$scope.calendar.calRating = EnumType.Rating.getEnumByValue($scope.calendar.calRating);

	        	$scope.calendar.calSts = eventData.className == 'done' ? "1" : '0';
	        	$scope.calendar.calSts = EnumType.CalSts.getEnumByValue($scope.calendar.calSts);

	        	$scope.calendar.saleActiv = eventData.saleActiv == undefined ? "10002" : eventData.saleActiv;
	        	$scope.calendar.saleActivNam = eventData.saleActivNam == undefined ? "活动一" : eventData.saleActivNam;
	        	$scope.calendar.calType = eventData.calType == '0';
	        	$scope.calendar.calType = EnumType.CalType.getEnumByValue($scope.calendar.calType);

	        	$scope.calendar.busiOppNo = eventData.busiOppNo == undefined ? "10002" : eventData.busiOppNo;
	        	$scope.calendar.busiOppNam = eventData.busiOppNam == undefined ? "测试商机2" : eventData.busiOppNam;
	        	$scope.calendar.calendarDesc = eventData.calendarDesc == undefined ? "日程说明": eventData.calendarDesc;
	        }

	        $scope.selectCust = function() {
	            var modalInstance = $uibModal.open({
	                animation : true,
	                backdrop : 'static',
	                templateUrl : 'app/pages/customer/custMnt/popupPages/selectCustDlg.html',
	                size : 'midle-900',
	                controller : 'selectCustDlgCtrl',
	                scope : $scope,
	                resolve : {
	                    items: function () {
	                        return $scope.items;
	                    }
	                }
	            });
	            modalInstance.result.then(function (result) {
	                console.log(result); //result关闭是回传的值
	                $scope.calendar.custNo = result.custNo;
	                $scope.calendar.custNam = result.custName;
                    var startDate = new Date(result.startDate);
                    $scope.calendar.startDate = startDate;
	                $scope.calendar.custTel = result.phoneNumber;
                    $scope.isDisabled = true;
	            }, function (reason) {
	                console.log(reason);//点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel
	            });

	        }

			// 选择商机
			$scope.selectBusiOppDlg = function() {
		          var modalInstance = $uibModal.open({
		              animation: true,
							              templateUrl : 'app/pages/busiopp/popupPages/selectBusiOppDlg.html',
		              controller: 'selectBusiOppDlgCtrl',
		              size: 'midle-900', // 
		              backdrop:'static',
		              resolve: {
		                  'checkedRow': function () {
		                      return '';
		                  }
		              }
		          });
		          modalInstance.result.then(function(result){
		        	  if (result == undefined || result == '') {
		        		  return;
		        	  }
		        	  // 回调
		        	  $scope.calendar.busiOppNo = result.busiOppNo;
		        	  $scope.calendar.busiOppNam = result.busiOppName;

		          });
		      
			}
	        $scope.selectAgentDlg = function() {
	              var modalInstance = $uibModal.open({
	                  animation: true,
	                  templateUrl: 'app/pages/mgrcenter/usermanagement/popupPages/selectAgentDlg.html',
	                  controller: 'selectAgentDlgCtrl',
	                  size: 'midle-900', // 
	                  backdrop:'static',
	                  resolve: {
	                      'checkedRow': function () {
	                          return '';
	                      }
	                  }
	              });
	              modalInstance.result.then(function(result){
	            	  // 返回调用
	            	  console.log(result); //result关闭是回传的值
	            	  $scope.calendar.custAgent = result.userId;
	            	  $scope.calendar.custAgentNam = result.userName;

	              });
	        }

	        $scope.ok = function() {
				var calendarObj = angular.copy($scope.calendar);
				calendarObj.optFlg = 'upt';
				console.log(calendarObj);
                $uibModalInstance.close(calendarObj);
	    	}

	        $scope.del = function() {
				var calendarObj = angular.copy($scope.calendar);
				calendarObj.optFlg = 'del';
				console.log(calendarObj);
                $uibModalInstance.close(calendarObj);
	    	}

    }
})();
