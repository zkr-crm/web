(function() {
	'use strict';

	angular.module('BlurAdmin.pages.cusService.custConsult.consultProcess')
		.controller('consultProcessCtrl', function($scope, $http, $state,$stateParams,$uibModal, HttpService, EnumType,$filter, Alert,$sce, $rootScope) {

			$scope.smartTablePageSize = 10;
			$scope.ConsultData = {};
			$http.get('/app/pages/cusService/custConsult/json/consultProcData.json').success(function(data) {
				if (data == undefined || data == null) {
					return;
				}
	            $scope.ConsultData = data.map(function (item) {
	                  // 案件类型
	                 item.caseTypNam = EnumType.CaseType.getLabelByValue(item.caseTyp);
	                  // 案件状态
	                 item.caseStsNam = EnumType.CaseStatus.getLabelByValue(item.caseSts);
	                  // 投诉类型
	                 item.consultTypNam = EnumType.consultType.getLabelByValue(item.consultTyp);
	                  // 投诉状态
	                 item.consultStsNam = EnumType.consultSts.getLabelByValue(item.consultSts);
	            	  return item;
	            });
			});

            // 客户画像查询
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

            $scope.searchObj = {}

			//searchConsult()
	        $scope.searchConsult = function(allotAll, cancelData,allotUser,allotOne,cancelOne,yetAnswer) {

            	$scope.ConsultData = {};
                console.log("searchConsult");
    			$http.get('/app/pages/cusService/custConsult/json/consultProcData.json').success(function(data) {
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
                                	 ii.principalNam =  allotAll.custAgentNam;
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
                            	 ii.principalNam =  allotUser.custAgentNam;
                            }
                        }
                        if (cancelData != null) {
                            angular.forEach($scope.checkedRow, function(oo) {
                                if (oo.consultNo == ii.consultNo) {
                                	 ii.consultSts = '3';
                                }
                            });
                        }
                        if (cancelOne != null) {
                            if (cancelOne == ii.consultNo) {
                           	 	ii.consultSts = '3';
                           }
                        }
                        if (yetAnswer != null) {
                            if (yetAnswer == ii.consultNo) {
                           	 	ii.consultSts = '1';
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

	        // 重置
	        $scope.resetConsult = function() {
	            console.log("resetConsult");

                $scope.searchObj = {};
                $scope.searchConsult();
	        };

	        // 已答复
	        $scope.yetAnswerConsult = function(item) {
	            console.log("yetAnswerConsult");
                if (item == undefined || item == null) {
                    Alert.error("参数不能为空");
                    return;
                }
                if (item.consultSts != EnumType.consultSts.rising.value) {
                	if (item.consultSts != EnumType.consultSts.unAnswer.value) {
    	                Alert.error('只有咨询状态为问题上升/未答复，才能变更状态为已答复');
    	                return ;
                	}
                } 
                Alert.confirm("确定设置为已答复？").then(function() {
	                $scope.searchConsult(null,null,null,null,null,item.consultNo);
                });
	        };

	        // 取消
	        $scope.cancelConsult = function(item) {
	            console.log("cancelConsult");

                if (item == undefined || item == null) {
                    Alert.error("参数不能为空");
                    return;
                }
                if (item.consultSts != EnumType.consultSts.rising.value) {
	                Alert.error('只有咨询状态为问题上升才能取消');
	                return ;
                } 

                Alert.confirm("确定设置为取消？").then(function() {
    	            var modalInstance = $uibModal.open({
    	                animation: true,
    	                templateUrl: 'app/pages/cusService/custConsult/popupPages/procConsult.html',
    	                controller: 'procConsultCtrl',
    	                size: 'midle-900',
    	                backdrop:'static',
    	                scope:$scope,
    	                resolve: {
    	                    'custNo': function () {
    	                        return '';
    	                    }
    	                }
    	            });
    	            modalInstance.result.then(function(result){
		                $scope.searchConsult(null,null,null,null,item.consultNo);
    	            });
                });

	        };

	        // 校验转交
	        $scope.isDeliver = true;
	        $scope.chkConsultStatus = function() {
		        $scope.isDeliver = true;
                angular.forEach($scope.checkedRow, function(oo) {
                    if (oo.consultSts != EnumType.consultSts.rising.value) {
        		            $scope.isDeliver = false;
        	                return ;
                    } 
                });
	        }

	        // 多条转交
	        $scope.deliverConsult = function() {
	            console.log("deliverConsult");

	            if($scope.checkedRow == undefined || $scope.checkedRow.length == 0){
	                Alert.error('请选择分配的咨询信息，至少一个条！');
	                return ;
	            }
	            $scope.chkConsultStatus();
	            if ($scope.isDeliver) {
		            var modalInstance = $uibModal.open({
		                animation: true,
		                templateUrl: 'app/pages/cusService/custConsult/popupPages/deliverConsult.html',
		                controller: 'deliverConsultCtrl',
		                size: 'midle-900',
		                backdrop:'static',
		                scope:$scope,
		                resolve: {
		                    'custNo': function () {
		                        return '';
		                    }
		                }
		            });
		            modalInstance.result.then(function(result){
		                $scope.searchConsult(result);
		            });
	            } else {
	                Alert.error('只有咨询状态为问题上升才能转交');
	            }
	        };

	        // 单条转交
	        $scope.deliverConsultOne = function(item) {
	            console.log("deliverConsultOne");

	            if (item == undefined) {
	                Alert.error('选择咨询信息为空！');
	                return ;
	        	}
                if (item.consultSts != EnumType.consultSts.rising.value) {
	                Alert.error('只有咨询状态为问题上升才能转交');
	                return ;
                 } 

	            var modalInstance = $uibModal.open({
	                animation: true,
	                templateUrl: 'app/pages/cusService/custConsult/popupPages/deliverConsult.html',
	                controller: 'deliverConsultCtrl',
	                size: 'midle-900',
	                backdrop:'static',
	                scope:$scope,
	                resolve: {
	                    'custNo': function () {
	                        return '';
	                    }
	                }
	            });
	            modalInstance.result.then(function(result){
	                $scope.searchConsult(null,null,result,item);
	            });
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
