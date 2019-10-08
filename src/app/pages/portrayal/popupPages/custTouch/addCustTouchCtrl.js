(function () {
    'use strict';

    angular.module('BlurAdmin.pages.portrayal.perCusPortrayal')
        .controller('addCustTouchCtrl', addCustTouchCtrl);

    /** @ngInject */
        function addCustTouchCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal, optTyp, custNo) {
 	       console.log("addCustTouchCtrl optTyp= " + optTyp);
	       console.log("addCustTouchCtrl custNo= " + custNo);
	      $scope.CustType = EnumType.CustType;
	      $scope.Sex = EnumType.Sex;
	      $scope.DataSource = EnumType.DataSource;
	      $scope.CustInteracType = EnumType.CustInteracType;
	      $scope.InteractionType = EnumType.InteractionType;
	      $scope.ComplainType = EnumType.ComplainType;
	      $scope.ComplainStatus = EnumType.ComplainStatus;
	      $scope.ConsultSts = EnumType.consultSts;
	      $scope.ConsultType = EnumType.consultType;
	      $scope.InteracMode = EnumType.InteracMode;
			$scope.isComplt = true;
			$scope.isConsult = true;
	      
	      $scope.custTouch = {};
	      	$scope.selectInteracMode = function(selectInteracMode) {
				console.log(selectInteracMode);
				$scope.custTouch.interacMode = selectInteracMode;
			}
//  			return_visits("return_visits","0","回访"),
//  			complain("complain","1","投诉"),
//  			consult("consult","2","咨询"),
	      	$scope.selectInteractionType = function(selectInteractionType) {
				console.log(selectInteractionType);
				$scope.custTouch.custInteracType = selectInteractionType;
				if (selectInteractionType.value == '0') {
					Alert.error("不能手动创建回访信息");
					return;
				} else if (selectInteractionType.value == '1') {
					$scope.isComplt = false;
					$scope.isConsult = true;
				} else if (selectInteractionType.value == '2') {
					$scope.isComplt = true;
					$scope.isConsult = false;
				}
			}
	      	$scope.selectCustType = function(selectCustType) {
				console.log(selectCustType);
				$scope.custTouch.custType = selectCustType;
			}

	    	$scope.selectCustSource = function(selectCustSource) {
				console.log(selectCustSource);
				$scope.custTouch.custSource = selectCustSource;
			}
	    	$scope.selectCustSex = function(selectCustSex) {
				console.log(selectCustSex);
				$scope.custTouch.custSex = selectCustSex;
			}

	    	$scope.selectComplainTyp = function(selectComplainTyp) {
				console.log(selectComplainTyp);
				$scope.custTouch.complainTyp = selectComplainTyp;
			}
	    	$scope.selectComplainSts = function(selectComplainSts) {
				console.log(selectComplainSts);
				$scope.custTouch.complainSts = selectComplainSts;
			}
	    	$scope.selectConsultTyp = function(selectConsultTyp) {
				console.log(selectConsultTyp);
				$scope.custTouch.consultTyp = selectConsultTyp;
			}
	    	$scope.selectConsultSts = function(selectConsultSts) {
				console.log(selectConsultSts);
				$scope.custTouch.consultSts = selectConsultSts;
			}

	    	$scope.birthDateOpen = birthDateOpen;
	        $scope.birthDateOpened = false;

	        $scope.interacDateOpen = interacDateOpen;
	        $scope.interacDateOpened = false;
	        // 打开日期控件
	        function birthDateOpen() {
	            $scope.birthDateOpened = true;
	        }

	        function interacDateOpen() {
	            $scope.interacDateOpened = true;
	        }
	        $scope.recDateOpen = recDateOpen;
	        $scope.recDateOpened = false;

	        function recDateOpen() {
	            $scope.recDateOpened = true;
	        }
	        
	        $scope.initPrtlCustInfo = function(optTyp) {
		        if (optTyp == 'prtl') {
		        	$scope.custTouch.custNo = custNo;
		        	$scope.isDisabled =true;

	                var opts = {};
	                opts.url = 'crm/ecif/cust/perCustBaseInfo';
	                opts.method = 'GET';
	                opts.params = {'custNo': $scope.custTouch.custNo};
	                HttpService.linkHttp(opts).then(function (response) {
	                	if (response == undefined || response.data == undefined) {
	                		return;
	                	}
	                	$scope.custTouch.custNam = response.data.custName;
	                	$scope.custTouch.custSource = EnumType.DataSource.getEnumByValue(response.data.custSource);
	                    $scope.custTouch.custSex = EnumType.Sex.getEnumByValue(response.data.sex);
	                    $scope.custTouch.custType = EnumType.CustType.getEnumByValue(response.data.custTyp);
	                    $scope.custTouch.custTel = response.data.phoneNumber;
	                    var birthDate = new Date(response.data.birthDate);
	                    $scope.custTouch.birthDate = birthDate;
	                });
                    $scope.isCustDisabled = true;
		        } else {
                    $scope.isCustDisabled = false;
		        }
	        }
	        $scope.initPrtlCustInfo(optTyp);
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
	                $scope.custTouch.custNo = result.custNo;
	                $scope.custTouch.custNam = result.custName;
                 var birthDate = new Date(result.birthDate);
                 $scope.custTouch.birthDate = birthDate;
	                $scope.custTouch.custTel = result.phoneNumber;
             	$scope.custTouch.custSource = EnumType.DataSource.getEnumByValue(result.custSource);
                 $scope.custTouch.custSex = EnumType.Sex.getEnumByValue(result.sex);
                 $scope.custTouch.custType = EnumType.CustType.getEnumByValue(result.custTyp);
                 $scope.isDisabled = true;
	            }, function (reason) {
	                console.log(reason);//点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel
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
	            	  $scope.custTouch.dealPerson = result.userId;
	            	  $scope.custTouch.dealPersonNam = result.userName;

	              });
	          
	        }

 
    	
    }
})();
