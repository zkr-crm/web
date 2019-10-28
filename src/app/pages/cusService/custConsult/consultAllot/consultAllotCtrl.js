(function() {
	'use strict';

	angular.module('BlurAdmin.pages.cusService.custConsult.consultAllot')
		.controller('consultAllotCtrl', function($scope, $http, $state,$stateParams,$uibModal, HttpService, EnumType,$filter, Alert,$sce, $rootScope) {
			$scope.smartTablePageSize = 10;
			$scope.ConsultData = {};
			$http.get('/app/pages/cusService/custConsult/json/consultAllotData.json').success(function(data) {
				if (data == undefined || data == null) {
					return;
				}
	            $scope.ConsultData = data.map(function (item) {
	                  // 案件类型
	                 item.caseTypNam = EnumType.CaseType.getLabelByValue(item.caseTyp);
	                  // 案件状态
	                 item.caseStsNam = EnumType.CaseStatus.getLabelByValue(item.caseSts);
	                  // 咨询类型
	                 item.consultTypNam = EnumType.consultType.getLabelByValue(item.consultTyp);
	                  // 咨询状态
	                 item.consultStsNam = EnumType.consultSts.getLabelByValue(item.consultSts);
	            	  return item;
	            });
			});

            // 客户画像
            $scope.openDetail = function (custNo) {
                console.log(custNo);
                $state.go('portrayal.perCusPortrayal',{'custNo':custNo});
            }

            // 咨询详情
            $scope.getConsult = function(item) {
                console.log("cusService.custConsult.custConsultDet");
                $state.go('cusService.custConsult.custConsultDet', {
                    'touchItem' : item
                });
            };

	        $scope.chkConsultStatus = function() {
                angular.forEach($scope.checkedRow, function(oo) {
                    if (oo.consultSts != EnumType.consultSts.rising.value || oo.principal != undefined) {
        	                Alert.error('客户咨询问题已经分配。咨询编号：' + oo.consultNo);
        	                return ;
                    } 
                });
	        }

	        // 分配
	        $scope.allotConsult = function(){
	            if($scope.checkedRow == undefined || $scope.checkedRow.length == 0){
	                Alert.error('请选择分配的咨询信息，至少一个条！');
	                return ;
	            }
	            $scope.chkConsultStatus();

                var modalInstance = $uibModal.open({
                    animation: true,
	                templateUrl: 'app/pages/cusService/custConsult/popupPages/allotConsult.html',
                    controller: 'allotConsultCtrl',
                    size: 'midle-900', // 
                    backdrop:'static',
                    resolve: {
                        'checkedRow': function () {
                            return $scope.checkedRow;
                        }
                    }
                });
                modalInstance.result.then(function(result){
                	$scope.searchConsult(result);
                });
            
	        };

            $scope.searchObj = {}

			//searchConsult()
	        $scope.searchConsult = function(allotAll, cancelData,allotUser,allotOne,cancelOne) {

            	$scope.ConsultData = {};
                console.log("searchConsult");
    			$http.get('/app/pages/cusService/custConsult/json/consultAllotData.json').success(function(data) {
                    if (data == undefined || data == null) {
                        return;
                    }
                    var tempData = [];

                    angular.forEach(data, function(ii) {

                        if (allotAll != undefined) {
                            angular.forEach($scope.checkedRow, function(oo) {
                                if (oo.consultNo == ii.consultNo) {
                                	 var dateAsString = $filter('date')(new Date(), "yyyy-MM-dd"); 
                                	 ii.caseRegiDate = dateAsString;
                                	 ii.caseNo = '12255221';
                                	 ii.caseTyp = '01';
                                	 ii.caseSts =  '0';
                                	 ii.principal =  allotAll.employeeId;
                                	 ii.principalNam =  allotAll.userName;
                                }
                            });
                        }
                        if (allotUser != undefined && allotOne != undefined) {
                            if (allotOne.consultNo == ii.consultNo) {
                            	 var dateAsString = $filter('date')(new Date(), "yyyy-MM-dd"); 
                            	 ii.caseRegiDate = dateAsString;
                            	 ii.caseNo = '12255221';
                            	 ii.caseTyp = '01';
                            	 ii.caseSts =  '0';
                            	 ii.principal =  allotUser.employeeId;
                            	 ii.principalNam =  allotUser.userName;
                            }
                        }
                        if (cancelData != null) {
                            angular.forEach($scope.checkedRow, function(oo) {
                                if (oo.consultNo == ii.consultNo) {
                                	 ii.caseRegiDate = '';
                                	 ii.caseNo = '';
                                	 ii.caseTyp = '';
                                	 ii.caseSts =  '';
                                	 ii.principal = '';
                                	 ii.principalNam =  '';
                                }
                            });
                        }
                        if (cancelOne != null) {
                            if (cancelOne == ii.consultNo) {
	                           	 ii.caseRegiDate = '';
	                           	 ii.caseNo = '';
	                           	 ii.caseTyp = '';
	                           	 ii.caseSts =  '';
	                           	 ii.principal = '';
	                           	 ii.principalNam =  '';
                           }
                        }
                    	var indexCustNo =ii.custNo.indexOf($scope.searchObj.custName);
                    	var indexCustNam =ii.custNam.indexOf($scope.searchObj.custName);
                    	var indexComplainNo =ii.consultNo.indexOf($scope.searchObj.consultNo);
                    	if ($scope.searchObj.custName == undefined 
                    			&& $scope.searchObj.consultNo == undefined) {
                                // 案件类型
                        		ii.caseTypNam = EnumType.CaseType.getLabelByValue(ii.caseTyp);
                                 // 案件状态
                        		ii.caseStsNam = EnumType.CaseStatus.getLabelByValue(ii.caseSts);
          	                  // 咨询类型
           	                 ii.consultTypNam = EnumType.consultType.getLabelByValue(ii.consultTyp);
           	                  // 咨询状态
           	                 ii.consultStsNam = EnumType.consultSts.getLabelByValue(ii.consultSts);
                        		tempData.push(ii);
                    	} else if ($scope.searchObj.custName != undefined 
                    			&& $scope.searchObj.consultNo == undefined) {
                        	if (indexCustNo != -1 || indexCustNam != -1) {
                                // 案件类型
                        		ii.caseTypNam = EnumType.CaseType.getLabelByValue(ii.caseTyp);
                                 // 案件状态
                        		ii.caseStsNam = EnumType.CaseStatus.getLabelByValue(ii.caseSts);
            	                  // 咨询类型
              	                 ii.consultTypNam = EnumType.consultType.getLabelByValue(ii.consultTyp);
              	                  // 咨询状态
              	                 ii.consultStsNam = EnumType.consultSts.getLabelByValue(ii.consultSts);
                        		tempData.push(ii);
                        	}
                    	} else if ($scope.searchObj.custName == undefined 
                    			&& $scope.searchObj.consultNo != undefined) {
                        	if (indexComplainNo != -1) {
                                // 案件类型
                        		ii.caseTypNam = EnumType.CaseType.getLabelByValue(ii.caseTyp);
                                 // 案件状态
                        		ii.caseStsNam = EnumType.CaseStatus.getLabelByValue(ii.caseSts);
            	                  // 咨询类型
              	                 ii.consultTypNam = EnumType.consultType.getLabelByValue(ii.consultTyp);
              	                  // 咨询状态
              	                 ii.consultStsNam = EnumType.consultSts.getLabelByValue(ii.consultSts);
                        		tempData.push(ii);
                        	}
                    	} else {
                        	if ((indexCustNo != -1 || indexCustNam != -1) && indexComplainNo != -1) {
                                // 案件类型
                        		ii.caseTypNam = EnumType.CaseType.getLabelByValue(ii.caseTyp);
                                 // 案件状态
                        		ii.caseStsNam = EnumType.CaseStatus.getLabelByValue(ii.caseSts);
            	                  // 咨询类型
              	                 ii.consultTypNam = EnumType.consultType.getLabelByValue(ii.consultTyp);
              	                  // 咨询状态
              	                 ii.consultStsNam = EnumType.consultSts.getLabelByValue(ii.consultSts);
                        		tempData.push(ii);
                        	}
                    	}

                    });
                    $scope.ConsultData = tempData;

                });
            
	        };

	        $scope.resetConsult = function() {
                $scope.searchObj = {};
                $scope.searchConsult();
	        };

	        $scope.isExf = true;
	        $scope.chkExf = function() {
	        	$scope.isExf = true;
                angular.forEach($scope.checkedRow, function(oo) {
                    if (oo.consultSts == EnumType.consultSts.unAnswer.value) {
                    	if (oo.caseSts == undefined || oo.caseSts == "") {
                    		$scope.isExf = false;
        	                return ;
                    	}
                    }
                });
	        }
	        
	        // 分配
	        $scope.allotConsultOne = function(item){
	            if(item == undefined){
	                Alert.error('选择分配的咨询信息为空！');
	                return ;
	            }
                if (item.consultSts != EnumType.consultSts.rising.value || item.principal != '') {
	                Alert.error('客户咨询问题已经分配。咨询编号：' + item.consultNo);
	                return ;
                }
                var modalInstance = $uibModal.open({
                    animation: true,
	                templateUrl: 'app/pages/cusService/custConsult/popupPages/allotConsult.html',
                    controller: 'allotConsultCtrl',
                    size: 'midle-900', // 
                    backdrop:'static',
                    resolve: {
                        'checkedRow': function () {
                            return $scope.checkedRow;
                        }
                    }
                });
                modalInstance.result.then(function(result){
                	$scope.searchConsult(null, null,result,item);
                });
	        };

	        $scope.cancelConsultOne = function(item) {
	            if(item == undefined){
	                Alert.error('选择分配的咨询信息为空！');
	                return ;
	            }
                if (item.consultSts == EnumType.consultSts.unAnswer.value) {
                	if (item.caseSts == undefined || item.caseSts == "") {
    	                Alert.error('客户咨询未分配 咨询编号：' + item.consultNo);
    	                return ;
                	}
                } else {
	                Alert.error('分配客户咨询状态必须是问题上升、已分配');
	                return ;
                }
	            var modalInstance = $uibModal.open({
	                animation: true,
	                templateUrl: 'app/pages/cusService/custConsult/popupPages/cancelConsult.html',
	                controller: 'cancelConsultCtrl',
	                size: 'midle-900',
	                backdrop:'static',
	                scope:$scope,
	                resolve: {
	                }
	            });
	            modalInstance.result.then(function(result){
	                $scope.searchConsult(null,null,null,null,item.consultNo);
	            });
        	
	        };
	        
	        $scope.cancelConsult = function(item) {
	            if($scope.checkedRow == undefined || $scope.checkedRow.length == 0){
	                Alert.error('请选择分配的咨询信息，至少一个条！');
	                return ;
	            }
	            $scope.chkExf();
	        	if ($scope.isExf) {
		            var modalInstance = $uibModal.open({
		                animation: true,
		                templateUrl: 'app/pages/cusService/custConsult/popupPages/cancelConsult.html',
		                controller: 'cancelConsultCtrl',
		                size: 'midle-900',
		                backdrop:'static',
		                scope:$scope,
		                resolve: {
		                }
		            });
		            modalInstance.result.then(function(result){
		                $scope.searchConsult(null,result);
		            });
	        	}
	        	else {
	                Alert.error('咨询信息未分配！');
	                return ;
	        	}
	        	
	        };
			//---------------checkbox start-----------------
			$scope.checkedRow = [];
	        // 全选
	        $scope.selectAll = function() {
	            console.log("selectAll select_all=" + $scope.select_all);

	            if ($scope.select_all) {
	                angular.forEach($scope.ConsultData, function(i) {
	                    i.checked = false;
	                    $scope.checkedRow = [];
	                })
	                $scope.select_all = false;
	            } else {
	                $scope.checkedRow = [];
	                var count = 0;
	                angular.forEach($scope.ConsultData, function(i) {
	                    i.checked = true;
	                    $scope.checkedRow.push(i);
	                })
	                $scope.select_all = true;
	            }
	            console.log($scope.checkedRow);
	            console.log("selectAll select_all=" + $scope.select_all);
	        };
	        // 单个选中
	        $scope.selectOne = function() {
	            console.log("selectOne select_all=" + $scope.select_all);

	        	$scope.checkedRow = [];
	            angular.forEach($scope.ConsultData, function (i) {
	                var index = $scope.checkedRow.indexOf()
	                if (i.checked && index === -1) {
	                    $scope.checkedRow.push(i);
	                } else if (!i.checked && index !== -1) {
	                    $scope.checkedRow.splice(index, 1);
	                }
	            });

	            if ($scope.ConsultData.length === $scope.checkedRow.length) {
	                $scope.select_all = true;
	            } else {
	                $scope.select_all = false;
	            }
	            console.log($scope.checkedRow);
	            console.log("selectOne select_all=" + $scope.select_all);
	        }
	        //---------------checkbox end-----------------
			
		});

})();
