(function () {
    'use strict';

    angular.module('BlurAdmin.pages.myCalendar')
        .controller('addCalendarCtrl', addCalendarCtrl);

    /** @ngInject */
    function addCalendarCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal,startDate) {
            $scope.Rating = EnumType.Rating;
            $scope.CalSts = EnumType.CalSts;
            $scope.CalType = EnumType.CalType;
        	var startDate = new Date(startDate);
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
            $scope.calendar.startDate = startDate;

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
				console.log(calendarObj);
                $uibModalInstance.close(calendarObj);
	    	}
    }
})();
