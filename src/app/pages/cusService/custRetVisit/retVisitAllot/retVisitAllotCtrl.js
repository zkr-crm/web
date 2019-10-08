(function() {
	'use strict';

	angular.module('BlurAdmin.pages.cusService.custRetVisit.retVisitAllot')
		.controller('retVisitAllotCtrl', function($scope, $http, $state,$stateParams,$uibModal, HttpService, EnumType,$filter, Alert,$sce, $rootScope) {
			$scope.smartTablePageSize = 10;
			$scope.retVisitData = {};
			$http.get('/app/pages/cusService/custRetVisit/json/retVisitAllotData.json').success(function(data) {
				if (data == undefined || data == null) {
					return;
				}
	            $scope.retVisitData = data.map(function (item) {
	                  // 案件类型
	                 item.caseTypNam = EnumType.CaseType.getLabelByValue(item.caseTyp);
	                  // 案件状态
	                 item.caseStsNam = EnumType.CaseStatus.getLabelByValue(item.caseSts);
	                  // 投诉类型
	                 item.retVisitTypNam = EnumType.retVisitType.getLabelByValue(item.retVisitTyp);
	                  // 投诉状态
	                 item.retVisitStsNam = EnumType.retVisitSts.getLabelByValue(item.retVisitSts);
	            	  return item;
	            });
			});

            // 客户画像查询
            $scope.openDetail = function (custNo) {
                console.log(custNo);
                $state.go('portrayal.perCusPortrayal',{'custNo':custNo});
            }

            // 回访详情
            $scope.getRetVisit = function(item) {
                console.log("cusService.custRetVisit.custRetVisitDet");
                $state.go('cusService.custRetVisit.custRetVisitDet', {
                    'touchItem' : item
                });
            };

            // 分配
            $scope.allotRetVisitOne = function (item) {
                console.log("allotRetVisitOne");

	            if(item == undefined){
	                Alert.error('选择分配的回访信息为空！');
	                return ;
	            }
                if (item.retVisitSts == EnumType.retVisitSts.wait_proces.value && item.agentNo != "") {
	                Alert.error('客户回访任务已经分配。回访编号：' + item.retVisitNo);
	                return ;
                }
                var modalInstance = $uibModal.open({
                    animation: true,
	                templateUrl: 'app/pages/cusService/custRetVisit/popupPages/allotRetVisit.html',
                    controller: 'allotRetVisitCtrl',
                    size: 'midle-900', // 
                    backdrop:'static',
                    resolve: {
                        'checkedRow': function () {
                            return $scope.checkedRow;
                        }
                    }
                });
                modalInstance.result.then(function(result){
                	$scope.searchRetVisit(null, null,result,item);
                });
	        
            }

            $scope.isFlg = true;
	        $scope.chkRetVisitStatus = function() {
	            $scope.isFlg = true;
                angular.forEach($scope.checkedRow, function(oo) {
                    if (oo.retVisitSts == EnumType.retVisitSts.wait_proces.value && oo.agentNo != "") {
                            $scope.isFlg = false;
        	                return ;
                    } 
                });
	        }
            // 分配多条
            $scope.allotRetVisit = function () {
                console.log("allotRetVisit");

	            if($scope.checkedRow == undefined || $scope.checkedRow.length == 0){
	                Alert.error('请选择分配的回访信息，至少一个条！');
	                return ;
	            }
	            $scope.chkRetVisitStatus();
	            if ($scope.isFlg) {
	                var modalInstance = $uibModal.open({
	                    animation: true,
		                templateUrl: 'app/pages/cusService/custRetVisit/popupPages/allotRetVisit.html',
	                    controller: 'allotRetVisitCtrl',
	                    size: 'midle-900', // 
	                    backdrop:'static',
	                    resolve: {
	                        'checkedRow': function () {
	                            return $scope.checkedRow;
	                        }
	                    }
	                });
	                modalInstance.result.then(function(result){
	                	$scope.searchRetVisit(result);
	                });
	            } else {
	                Alert.error('客户回访任务已经分配。回访编号：' + oo.retVisitNo);
	            }
            }

            // 取消
            $scope.cancelRetVisitOne = function (item) {
                console.log("cancelRetVisitOne");
	            if(item == undefined){
	                Alert.error('选择分配的回访信息为空！');
	                return ;
	            }
                if (item.retVisitSts == EnumType.retVisitSts.wait_proces.value && item.agentNo == "") {
	                Alert.error('客户回访任务未分配。回访编号：' + item.retVisitNo);
	                return ;
                }
	            var modalInstance = $uibModal.open({
	                animation: true,
	                templateUrl: 'app/pages/cusService/custRetVisit/popupPages/cancelRetVisit.html',
	                controller: 'cancelRetVisitCtrl',
	                size: 'midle-900',
	                backdrop:'static',
	                scope:$scope,
	                resolve: {
	                }
	            });
	            modalInstance.result.then(function(result){
	                $scope.searchRetVisit(null,null,null,null,item.consultNo);
	            });
            }

	        $scope.isExf = true;
	        $scope.chkExf = function() {
	            $scope.isExf = true;
                angular.forEach($scope.checkedRow, function(oo) {
                    if (oo.retVisitSts == EnumType.retVisitSts.wait_proces.value && oo.agentNo == "") {
                            $scope.isExf = false;
        	                return ;
                    } 
                });
	        }
            // 取消多条
            $scope.cancelRetVisit = function () {
                console.log("cancelRetVisit");

	            if($scope.checkedRow == undefined || $scope.checkedRow.length == 0){
	                Alert.error('请选择已分配的回访信息，至少一个条！');
	                return ;
	            }
	            $scope.chkExf();
	        	if ($scope.isExf) {
		            var modalInstance = $uibModal.open({
		                animation: true,
		                templateUrl: 'app/pages/cusService/custRetVisit/popupPages/cancelRetVisit.html',
		                controller: 'cancelRetVisitCtrl',
		                size: 'midle-900',
		                backdrop:'static',
		                scope:$scope,
		                resolve: {
		                }
		            });
		            modalInstance.result.then(function(result){
		                $scope.searchRetVisit(null,result);
		            });
	        	}
	        	else {
	                Alert.error('咨询信息未分配！');
	                return ;
	        	}
            }

            $scope.searchObj = {}

			//searchRetVisit()
	        $scope.searchRetVisit = function(allotAll, cancelData,allotUser,allotOne,cancelOne) {

            	$scope.retVisitData = {};
                console.log("searchRetVisit");
    			$http.get('/app/pages/cusService/custRetVisit/json/retVisitAllotData.json').success(function(data) {
                    if (data == undefined || data == null) {
                        return;
                    }
                    var tempData = [];

                    angular.forEach(data, function(ii) {

                        if (allotAll != undefined) {
                            angular.forEach($scope.checkedRow, function(oo) {
                                if (oo.retVisitNo == ii.retVisitNo) {
                                	 var dateAsString = $filter('date')(new Date(), "yyyy-MM-dd"); 
                                	 ii.caseRegiDate = dateAsString;
                                	 ii.caseNo = '12255221';
                                	 ii.caseTyp = '01';
                                	 ii.caseSts =  '0';
                                	 ii.agentNo =  allotAll.employeeId;
                                	 ii.agentNam =  allotAll.userName;
                                }
                            });
                        }
                        if (allotUser != undefined && allotOne != undefined) {
                            if (allotOne.retVisitNo == ii.retVisitNo) {
                            	 var dateAsString = $filter('date')(new Date(), "yyyy-MM-dd"); 
                            	 ii.caseRegiDate = dateAsString;
                            	 ii.caseNo = '12255221';
                            	 ii.caseTyp = '01';
                            	 ii.caseSts =  '0';
                            	 ii.agentNo =  allotUser.employeeId;
                            	 ii.agentNam =  allotUser.userName;
                            }
                        }
                        if (cancelData != null) {
                            angular.forEach($scope.checkedRow, function(oo) {
                                if (oo.retVisitNo == ii.retVisitNo) {
                                	 ii.caseRegiDate = '';
                                	 ii.caseNo = '';
                                	 ii.caseTyp = '';
                                	 ii.caseSts =  '';
                                	 ii.agentNo = '';
                                	 ii.agentNam =  '';
                                }
                            });
                        }
                        if (cancelOne != null) {
                            if (cancelOne == ii.retVisitNo) {
	                           	 ii.caseRegiDate = '';
	                           	 ii.caseNo = '';
	                           	 ii.caseTyp = '';
	                           	 ii.caseSts =  '';
	                           	 ii.agentNo = '';
	                           	 ii.agentNam =  '';
                           }
                        }
                    	var indexCustNo =ii.custNo.indexOf($scope.searchObj.custName);
                    	var indexCustNam =ii.custNam.indexOf($scope.searchObj.custName);
                    	var indexComplainNo =ii.retVisitNo.indexOf($scope.searchObj.retVisitNo);
                    	if ($scope.searchObj.custName == undefined 
                    			&& $scope.searchObj.retVisitNo == undefined) {
                                // 案件类型
                        		ii.caseTypNam = EnumType.CaseType.getLabelByValue(ii.caseTyp);
                                 // 案件状态
                        		ii.caseStsNam = EnumType.CaseStatus.getLabelByValue(ii.caseSts);
          	                  // 回访类型
           	                 ii.retVisitTypNam = EnumType.retVisitType.getLabelByValue(ii.retVisitTyp);
           	                  // 回访状态
           	                 ii.retVisitStsNam = EnumType.retVisitSts.getLabelByValue(ii.retVisitSts);
                        		tempData.push(ii);
                    	} else if ($scope.searchObj.custName != undefined 
                    			&& $scope.searchObj.retVisitNo == undefined) {
                        	if (indexCustNo != -1 || indexCustNam != -1) {
                                // 案件类型
                        		ii.caseTypNam = EnumType.CaseType.getLabelByValue(ii.caseTyp);
                                 // 案件状态
                        		ii.caseStsNam = EnumType.CaseStatus.getLabelByValue(ii.caseSts);
            	                  // 回访类型
              	                 ii.retVisitTypNam = EnumType.retVisitType.getLabelByValue(ii.retVisitTyp);
              	                  // 回访状态
              	                 ii.retVisitStsNam = EnumType.retVisitSts.getLabelByValue(ii.retVisitSts);
                        		tempData.push(ii);
                        	}
                    	} else if ($scope.searchObj.custName == undefined 
                    			&& $scope.searchObj.retVisitNo != undefined) {
                        	if (indexComplainNo != -1) {
                                // 案件类型
                        		ii.caseTypNam = EnumType.CaseType.getLabelByValue(ii.caseTyp);
                                 // 案件状态
                        		ii.caseStsNam = EnumType.CaseStatus.getLabelByValue(ii.caseSts);
            	                  // 回访类型
              	                 ii.retVisitTypNam = EnumType.retVisitType.getLabelByValue(ii.retVisitTyp);
              	                  // 回访状态
              	                 ii.retVisitStsNam = EnumType.retVisitSts.getLabelByValue(ii.retVisitSts);
                        		tempData.push(ii);
                        	}
                    	} else {
                        	if ((indexCustNo != -1 || indexCustNam != -1) && indexComplainNo != -1) {
                                // 案件类型
                        		ii.caseTypNam = EnumType.CaseType.getLabelByValue(ii.caseTyp);
                                 // 案件状态
                        		ii.caseStsNam = EnumType.CaseStatus.getLabelByValue(ii.caseSts);
            	                  // 回访类型
              	                 ii.retVisitTypNam = EnumType.retVisitType.getLabelByValue(ii.retVisitTyp);
              	                  // 回访状态
              	                 ii.retVisitStsNam = EnumType.retVisitSts.getLabelByValue(ii.retVisitSts);
                        		tempData.push(ii);
                        	}
                    	}

                    });
                    $scope.retVisitData = tempData;

                });
            
	        };

	        $scope.resetRetVisit = function() {
                $scope.searchObj = {};
                $scope.searchRetVisit();
	        };

            //---------------checkbox start-----------------
			$scope.checkedRow = [];
	        // 全选
	        $scope.selectAll = function() {
	            console.log("selectAll select_all=" + $scope.select_all);

	            if ($scope.select_all) {
	                angular.forEach($scope.retVisitData, function(i) {
	                    i.checked = false;
	                    $scope.checkedRow = [];
	                })
	                $scope.select_all = false;
	            } else {
	                $scope.checkedRow = [];
	                var count = 0;
	                angular.forEach($scope.retVisitData, function(i) {
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
	            angular.forEach($scope.retVisitData, function (i) {
	                var index = $scope.checkedRow.indexOf()
	                if (i.checked && index === -1) {
	                    $scope.checkedRow.push(i);
	                } else if (!i.checked && index !== -1) {
	                    $scope.checkedRow.splice(index, 1);
	                }
	            });

	            if ($scope.retVisitData.length === $scope.checkedRow.length) {
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
