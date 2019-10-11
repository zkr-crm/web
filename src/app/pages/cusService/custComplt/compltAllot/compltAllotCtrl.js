(function() {
	'use strict';

	angular.module('BlurAdmin.pages.cusService.custComplt.compltAllot')
		.controller('compltAllotCtrl', function($scope, $http, $state,$stateParams,$uibModal, HttpService, EnumType,$filter, Alert,$sce, $rootScope) {
			$scope.smartTablePageSize = 10;
			$scope.compltData = {};
			$http.get('/app/pages/cusService/custComplt/json/compltAllotData.json').success(function(data) {
				if (data == undefined || data == null) {
					return;
				}
	            $scope.compltData = data.map(function (item) {
	                  // 案件类型
	                 item.caseTypNam = EnumType.CaseType.getLabelByValue(item.caseTyp);
	                  // 案件状态
	                 item.caseStsNam = EnumType.CaseStatus.getLabelByValue(item.caseSts);
	                  // 投诉类型
	                 item.complainTypNam = EnumType.ComplainType.getLabelByValue(item.complainTyp);
	                  // 投诉状态
	                 item.complainStsNam = EnumType.ComplainStatus.getLabelByValue(item.complainSts);
	            	  return item;
	            });
			});

            $scope.searchObj = {}

			//searchComplt()
	        $scope.searchComplt = function(allotAll, cancelData,allotUser,allotOne,cancelOne) {

            	$scope.compltData = {};
                $http.get('/app/pages/cusService/custComplt/json/compltAllotData.json').success(function(data) {
                    if (data == undefined || data == null) {
                        return;
                    }
                    var tempData = [];

                    angular.forEach(data, function(ii) {

                        if (allotAll != undefined) {
                            angular.forEach($scope.checkedRow, function(oo) {
                                if (oo.complainNo == ii.complainNo) {
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
                            if (allotOne.complainNo == ii.complainNo) {
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
                                if (oo.complainNo == ii.complainNo) {
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
                            if (cancelOne == ii.complainNo) {
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
                    	var indexComplainNo =ii.complainNo.indexOf($scope.searchObj.complainNo);
                    	if ($scope.searchObj.custName == undefined 
                    			&& $scope.searchObj.complainNo == undefined) {
                                // 案件类型
                        		ii.caseTypNam = EnumType.CaseType.getLabelByValue(ii.caseTyp);
                                 // 案件状态
                        		ii.caseStsNam = EnumType.CaseStatus.getLabelByValue(ii.caseSts);
                                 // 投诉类型
                        		ii.complainTypNam = EnumType.ComplainType.getLabelByValue(ii.complainTyp);
                                 // 投诉状态
                        		ii.complainStsNam = EnumType.ComplainStatus.getLabelByValue(ii.complainSts);
                        		tempData.push(ii);
                    	} else if ($scope.searchObj.custName != undefined 
                    			&& $scope.searchObj.complainNo == undefined) {
                        	if (indexCustNo != -1 || indexCustNam != -1) {
                                // 案件类型
                        		ii.caseTypNam = EnumType.CaseType.getLabelByValue(ii.caseTyp);
                                 // 案件状态
                        		ii.caseStsNam = EnumType.CaseStatus.getLabelByValue(ii.caseSts);
                                 // 投诉类型
                        		ii.complainTypNam = EnumType.ComplainType.getLabelByValue(ii.complainTyp);
                                 // 投诉状态
                        		ii.complainStsNam = EnumType.ComplainStatus.getLabelByValue(ii.complainSts);
                        		tempData.push(ii);
                        	}
                    	} else if ($scope.searchObj.custName == undefined 
                    			&& $scope.searchObj.complainNo != undefined) {
                        	if (indexComplainNo != -1) {
                                // 案件类型
                        		ii.caseTypNam = EnumType.CaseType.getLabelByValue(ii.caseTyp);
                                 // 案件状态
                        		ii.caseStsNam = EnumType.CaseStatus.getLabelByValue(ii.caseSts);
                                 // 投诉类型
                        		ii.complainTypNam = EnumType.ComplainType.getLabelByValue(ii.complainTyp);
                                 // 投诉状态
                        		ii.complainStsNam = EnumType.ComplainStatus.getLabelByValue(ii.complainSts);
                        		tempData.push(ii);
                        	}
                    	} else {
                        	if ((indexCustNo != -1 || indexCustNam != -1) && indexComplainNo != -1) {
                                // 案件类型
                        		ii.caseTypNam = EnumType.CaseType.getLabelByValue(ii.caseTyp);
                                 // 案件状态
                        		ii.caseStsNam = EnumType.CaseStatus.getLabelByValue(ii.caseSts);
                                 // 投诉类型
                        		ii.complainTypNam = EnumType.ComplainType.getLabelByValue(ii.complainTyp);
                                 // 投诉状态
                        		ii.complainStsNam = EnumType.ComplainStatus.getLabelByValue(ii.complainSts);
                        		tempData.push(ii);
                        	}
                    	}

                    });
                    $scope.compltData = tempData;

                });
            
	        };

	        $scope.isChkShow = true;
	        $scope.chkStatus = function() {
	        	$scope.isChkShow = true;
                angular.forEach($scope.checkedRow, function(oo) {
                    if (oo.complainSts == EnumType.ComplainStatus.unsolved.value) {
                    	if (oo.caseSts != undefined && oo.caseSts != "") {
                    		$scope.isChkShow = false;
        	                //Alert.error('客户投诉已分配 投诉编号：' + oo.complainNo);
        	                return ;
                    	}
                    	
                    } else {
                		$scope.isChkShow = false;
    	                //Alert.error('分配客户投诉状态必须为未解决！');
    	                return ;
                    } 
                });
	        }
	        // 分配
	        $scope.allotComplt = function(){
	            if($scope.checkedRow == undefined || $scope.checkedRow.length == 0){
	                Alert.error('请选择分配的投诉信息，至少一个条！');
	                return ;
	            }
	            $scope.chkStatus();
	            if ($scope.isChkShow) {
	                var modalInstance = $uibModal.open({
	                    animation: true,
		                templateUrl: 'app/pages/cusService/custComplt/popupPages/allotComplt.html',
	                    controller: 'allotCompltCtrl',
	                    size: 'midle-900', // 
	                    backdrop:'static',
	                    resolve: {
	                        'checkedRow': function () {
	                            return $scope.checkedRow;
	                        }
	                    }
	                });
	                modalInstance.result.then(function(result){
	                	$scope.searchComplt(result);
	                });
	            } else {
	                Alert.error('客户投诉状态必须未解决/未分配');
	            	return;
	            }


	        };
	        $scope.yn = true;
	        $scope.allotCompltOne = function(item){
	        	$scope.yn = true;
                if (item.complainSts == EnumType.ComplainStatus.unsolved.value) {
                	if (item.caseSts != undefined && item.caseSts != "") {
                		$scope.yn = false;
    	                Alert.error('客户投诉已分配 投诉编号：' + item.complainNo);
    	                return ;
                	}
                } else {
            		$scope.yn = false;
	                Alert.error('分配客户投诉状态必须为未解决！');
	                return ;
                } 
	            if ($scope.yn) {
	                var modalInstance = $uibModal.open({
	                    animation: true,
		                templateUrl: 'app/pages/cusService/custComplt/popupPages/allotComplt.html',
	                    controller: 'allotCompltCtrl',
	                    size: 'midle-900', // 
	                    backdrop:'static',
	                    resolve: {
	                        'checkedRow': function () {
	                            return item;
	                        }
	                    }
	                });
	                modalInstance.result.then(function(result){
	                	$scope.searchComplt(null,null,result,item);
	                });
	            }


	        };
            // 根据id、状态设置投诉状态
            $scope.setCompltSts = function(id,status) {
                $http.get('/app/pages/cusService/custComplt/json/compltProcData.json').success(function(data) {
                    if (data == undefined || data == null) {
                        return;
                    }
                    $scope.compltData = data.map(function (item) {
                        if (item.complainNo == id) {
                            item.complainSts = status;
                        }
                          // 案件类型
                         item.caseTypNam = EnumType.CaseType.getLabelByValue(item.caseTyp);
                          // 案件状态
                         item.caseStsNam = EnumType.CaseStatus.getLabelByValue(item.caseSts);
                          // 投诉类型
                         item.complainTypNam = EnumType.ComplainType.getLabelByValue(item.complainTyp);
                          // 投诉状态
                         item.complainStsNam = EnumType.ComplainStatus.getLabelByValue(item.complainSts);
                          return item;
                    });
                });
            }

	        //resetComplt()
	        $scope.resetComplt = function() {
                $scope.searchObj = {};
                $scope.searchComplt();
	        };

            // 客户画像查询
            $scope.openDetail = function (custNo) {
                $state.go('portrayal.perCusPortrayal',{'custNo':custNo});
            }
			//cancelComplt()
	        $scope.cancelCompltOne = function(item) {
	        	$scope.yn = true;
                if (item.complainSts == EnumType.ComplainStatus.unsolved.value) {
                	if (item.caseSts == undefined || item.caseSts == "") {
                		Alert.error('客户投诉未分配 投诉编号：' + item.complainNo);
                		$scope.yn = false;
    	                return ;
                	}
                } else {
            		Alert.error('只有已分配的客户投诉才能取消，投诉状态必须为未解决/案件状态为待处理');
            		$scope.yn = false;
	                return ;
                }
                if ($scope.yn) {
    	            var modalInstance = $uibModal.open({
    	                animation: true,
    	                templateUrl: 'app/pages/cusService/custComplt/popupPages/cancelComplt.html',
    	                controller: 'cancelCompltCtrl',
    	                size: 'midle-900',
    	                backdrop:'static',
    	                scope:$scope,
    	                resolve: {
    	                }
    	            });
    	            modalInstance.result.then(function(cancelOne){
		                $scope.searchComplt(null,null,null,null,item.complainNo);
    	            });
                }
	        };

	        //getComplt(item)
            $scope.getComplt = function(item) {
                $state.go('cusService.custComplt.custCompltDet', {
                    'touchItem' : item
                });
            };

	        $scope.isExf = true;
	        $scope.chkExf = function() {
                angular.forEach($scope.checkedRow, function(oo) {
                    if (oo.complainSts == EnumType.ComplainStatus.unsolved.value) {
                    	if (oo.caseSts == undefined || oo.caseSts == "") {
                    		$scope.isExf = false;
        	                return ;
                    	}
                    }
                });
	        }
	        //cancelCompltOne(item)
	        $scope.cancelComplt = function(item) {
	            if($scope.checkedRow == undefined || $scope.checkedRow.length == 0){
	                Alert.error('请选择分配的投诉信息，至少一个条！');
	                return ;
	            }
	            $scope.chkExf();
	        	if ($scope.isExf) {
		            var modalInstance = $uibModal.open({
		                animation: true,
		                templateUrl: 'app/pages/cusService/custComplt/popupPages/cancelComplt.html',
		                controller: 'cancelCompltCtrl',
		                size: 'midle-900',
		                backdrop:'static',
		                scope:$scope,
		                resolve: {
		                }
		            });
		            modalInstance.result.then(function(result){
		            	
		                $scope.searchComplt(null,result);
		            });
	        	} 
	        	else {
	                Alert.error('投诉信息未分配！');
	                return ;
	        	}
	        	
	        };
			//turnBusioppOne(item)

			//---------------checkbox start-----------------
			$scope.checkedRow = [];
	        // 全选
	        $scope.selectAll = function() {

	            if ($scope.select_all) {
	                angular.forEach($scope.compltData, function(i) {
	                    i.checked = false;
	                    $scope.checkedRow = [];
	                })
	                $scope.select_all = false;
	            } else {
	                $scope.checkedRow = [];
	                var count = 0;
	                angular.forEach($scope.compltData, function(i) {
	                    i.checked = true;
	                    $scope.checkedRow.push(i);
	                })
	                $scope.select_all = true;
	            }
	        };
	        // 单个选中
	        $scope.selectOne = function() {

	        	$scope.checkedRow = [];
	            angular.forEach($scope.compltData, function (i) {
	                var index = $scope.checkedRow.indexOf()
	                if (i.checked && index === -1) {
	                    $scope.checkedRow.push(i);
	                } else if (!i.checked && index !== -1) {
	                    $scope.checkedRow.splice(index, 1);
	                }
	            });

	            if ($scope.compltData.length === $scope.checkedRow.length) {
	                $scope.select_all = true;
	            } else {
	                $scope.select_all = false;
	            }
	        }
	        //---------------checkbox end-----------------
			
		});

})();
