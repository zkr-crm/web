(function () {
    'use strict';

    angular.module('BlurAdmin.pages.busiopp')
        .controller('uptBusiOppCtrl', uptBusiOppCtrl);

    /** @ngInject */
    function uptBusiOppCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal, busiOppNo) {
	      $scope.CustType = EnumType.CustType;
	      $scope.BusiOppSrc = EnumType.BusiOppSrc;
	      $scope.BusiOppStage = EnumType.BusiOppStage;
	      $scope.Sex = EnumType.Sex;
	      $scope.DataSource = EnumType.DataSource;
	      $scope.ProductType = EnumType.ProductType;

	    	$scope.selectCustType = function(selectCustType) {
				$scope.busiOpp.custType = selectCustType;
			}

	    	$scope.selectCustSource = function(selectCustSource) {
				$scope.busiOpp.custSource = selectCustSource;
			}
	    	$scope.selectCustSex = function(selectCustSex) {
				$scope.busiOpp.custSex = selectCustSex;
			}
	    	$scope.selectBusiOppType = function(selectBusiOppType) {
				$scope.busiOpp.busiOppType = selectBusiOppType;
			}
	    	
	    	$scope.selectBusiOppSrc = function(selectBusiOppSrc) {
				$scope.busiOpp.busiOppSrc = selectBusiOppSrc;
			}

	    	$scope.selectBusiOppStage = function(selectBusiOppStage) {
				$scope.busiOpp.busiOppStage = selectBusiOppStage;
			}

	    	$scope.birthDateOpen = birthDateOpen;
	        $scope.birthDateOpened = false;

	        $scope.estimateSuccDateOpen = estimateSuccDateOpen;
	        $scope.estimateSuccDateOpened = false;
	        // 打开日期控件
	        function birthDateOpen() {
	            $scope.birthDateOpened = true;
	        }

	        function estimateSuccDateOpen() {
	            $scope.estimateSuccDateOpened = true;
	        }

	        //-------------查询回显开始--------------
	        var initBusiOppInfo = function() {
	            HttpService.linkHttp({
	                url: '/crm/ocrm/busiOpp/busiOppOne',
	                method: 'GET',
	                params: {'busiOppNo': busiOppNo}
	            }).then(function (response) {
	                	$scope.busiOpp = response.data;
	                    $scope.busiOpp.busiOppSrc = EnumType.BusiOppSrc.getEnumByValue(response.data.busiOppSrc);
	                	$scope.busiOpp.busiOppType = EnumType.ProductType.getEnumByValue(response.data.busiOppType);
	                    $scope.busiOpp.busiOppStage = EnumType.BusiOppStage.getEnumByValue(response.data.busiOppStage);
	                    if(response.data.estimateSuccDate != null) {
	                    	var v = new Date(response.data.estimateSuccDate);
	                        $scope.busiOpp.estimateSuccDate = v;
	                    }


	        			var opts = {};
	        			opts.url = '/crm/manage/usermng/user';
	        			opts.method = 'GET';
	        			opts.params = {'userID':$scope.busiOpp.custAgent};
	        			HttpService.linkHttp(opts).then(function(response) {
	        				$scope.busiOpp.custAgentNam = response.data.userName;
	        			});
	        		
	                    var opts = {};
	                    opts.url = 'crm/ecif/cust/perCustBaseInfo';
	                    opts.method = 'GET';
	                    opts.params = {'custNo': $scope.busiOpp.custNo};
	                    HttpService.linkHttp(opts).then(function (response) {
	                    	if (response == undefined || response.data == undefined) {
	                    		return;
	                    	}
	                    	$scope.busiOpp.custSource = EnumType.DataSource.getEnumByValue(response.data.custSource);
	                        $scope.busiOpp.custSex = EnumType.Sex.getEnumByValue(response.data.sex);
		                    $scope.busiOpp.custType = EnumType.CustType.getEnumByValue(response.data.custTyp);
		                    $scope.busiOpp.custTel = response.data.phoneNumber;
	                        var birthDate = new Date(response.data.birthDate);
	                        $scope.busiOpp.birthDate = birthDate;
	                    });
	            });
	        }

	        initBusiOppInfo();

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
	            	  $scope.busiOpp.custAgent = result.userId;
	            	  $scope.busiOpp.custAgentNam = result.userName;
	              });
	          
	        }

	    	$scope.saveBusiOpp = function() {
				var busiOppObj = angular.copy($scope.busiOpp);
				if ($scope.busiOpp == null) {
					Alert.error("商机参数不能为空");
					return;
				}
				busiOppObj.busiOppType = $scope.busiOpp.busiOppType.value;
				busiOppObj.busiOppSrc = $scope.busiOpp.busiOppSrc.value;
				busiOppObj.busiOppStage = $scope.busiOpp.busiOppStage.value;
				busiOppObj.custType = $scope.busiOpp.custType.value;

				if ($scope.busiOpp.birthDate != undefined 
						&& $scope.busiOpp.birthDate != null) {
					var birthDate = new Date($scope.busiOpp.birthDate);
					busiOppObj.birthDate = $filter('date')(birthDate, 'yyyy-MM-dd'); 
				}

				if ($scope.busiOpp.estimateSuccDate == undefined 
						|| $scope.busiOpp.estimateSuccDate == null) {
					Alert.error("商机预期成单日不能为空");
				}
				var estimateSuccDate = new Date($scope.busiOpp.estimateSuccDate);
				busiOppObj.estimateSuccDate = $filter('date')(estimateSuccDate, 'yyyy-MM-dd'); 
				
	            HttpService.linkHttp({
	                url: '/crm/ocrm/busiOpp/uptBusiOpp',
	                method: 'PUT',
	                params: busiOppObj
	            }).then(function (response) {
	                $uibModalInstance.close();
	            });
	    	}

	    	
	    	
    }
})();
