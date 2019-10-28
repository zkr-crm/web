(function() {
    'use strict';

    angular.module('BlurAdmin.pages.cusService.custComplt.compltProcess')
        .controller('compltProcessCtrl', function($scope, $http, $state,$stateParams,$uibModal, HttpService, EnumType,$filter, Alert,$sce, $rootScope) {
            // 分页数量设置
            $scope.smartTablePageSize = 10;
            // 页面数据结果集
            $scope.compltData = {};

            // init
            var initData = function() {
                $http.get('/app/pages/cusService/custComplt/json/compltProcData.json').success(function(data) {
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
            }

            // init
            initData();

            // 根据id、状态设置投诉案件状态
            $scope.setCompltSts = function(id,status,compltsts) {
                $http.get('/app/pages/cusService/custComplt/json/compltProcData.json').success(function(data) {
                    if (data == undefined || data == null) {
                        return;
                    }
                    $scope.compltData = data.map(function (item) {
                        if (item.complainNo == id) {
                            item.caseSts = status;
                            if (compltsts != undefined) {
                                item.complainSts = compltsts;
                            }
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

            // 客户画像查询
            $scope.openDetail = function (custNo) {
                $state.go('portrayal.perCusPortrayal',{'custNo':custNo});
            }

            $scope.searchObj = {}

            //searchComplt()
            $scope.searchComplt = function(allotAll, dataComplt, allotUser) {
            	$scope.compltData = {};
                $http.get('/app/pages/cusService/custComplt/json/compltProcData.json').success(function(data) {
                    if (data == undefined || data == null) {
                        return;
                    }
                    var tempData = [];
                    angular.forEach(data, function(ii) {
                    	if (dataComplt != undefined && allotUser != undefined) {
                    		if (ii.complainNo == dataComplt.complainNo) {
	                           	 var dateAsString = $filter('date')(new Date(), "yyyy-MM-dd"); 
	                        	 ii.caseRegiDate = dateAsString;
	                        	 ii.caseNo = '12255221';
	                        	 ii.caseTyp = '01';
	                        	 ii.caseSts =  '0';
	                        	 ii.principal =  allotUser.employeeId;
	                        	 ii.principalNam =  allotUser.custAgentNam;
                    		}
                    	}
                        if (allotAll != undefined) {
                            angular.forEach($scope.checkedRow, function(oo) {
                                if (oo.complainNo == ii.complainNo) {
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
                    	var indexCustNo =ii.custNo.indexOf($scope.searchObj.custName);
                    	var indexCustNam =ii.custNam.indexOf($scope.searchObj.custName);
                    	var indexComplainNo =ii.complainNo.indexOf($scope.searchObj.complainNo);
                    	if ($scope.searchObj.custName == undefined && $scope.searchObj.complainNo == undefined) {
                            // 案件类型
                    		ii.caseTypNam = EnumType.CaseType.getLabelByValue(ii.caseTyp);
                             // 案件状态
                    		ii.caseStsNam = EnumType.CaseStatus.getLabelByValue(ii.caseSts);
                             // 投诉类型
                    		ii.complainTypNam = EnumType.ComplainType.getLabelByValue(ii.complainTyp);
                             // 投诉状态
                        		ii.complainStsNam = EnumType.ComplainStatus.getLabelByValue(ii.complainSts);
                        		tempData.push(ii);
                    	} else if ($scope.searchObj.custName != undefined && $scope.searchObj.complainNo == undefined) {
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
                    	} else if ($scope.searchObj.custName == undefined && $scope.searchObj.complainNo != undefined) {
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

            //resetComplt()
            $scope.resetComplt = function() {
                $scope.searchObj = {}
                $scope.setCompltSts();
            };

	        $scope.deliverComplt = function() {
	            if($scope.checkedRow == undefined || $scope.checkedRow.length == 0){
	                Alert.error('请选择分配的投诉信息，至少一个条！');
	                return ;
	            }
	            var modalInstance = $uibModal.open({
	                animation: true,
	                templateUrl: 'app/pages/cusService/custComplt/popupPages/deliverComplt.html',
	                controller: 'deliverCompltCtrl',
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
	                $scope.searchComplt(result);
	            });
	        };
//	        wait_proces	待处理
//	        processing	处理中
//	        closed	已关闭
//	        canceled	已取消

	        $scope.deliverCompltOne = function(item) {
	        	console.log("deliverComplt");
	            if(item == undefined){
	                Alert.error('选择的投诉信息不能为空！');
	                return ;
	            }
	            if(item.caseSts != EnumType.CaseStatus.wait_proces.value){
		            if(item.caseSts != EnumType.CaseStatus.processing.value){
		                Alert.error('投诉信息未解决、待处理/处理中才能流转！');
		                return ;
		            }
	            }
	            var modalInstance = $uibModal.open({
	                animation: true,
	                templateUrl: 'app/pages/cusService/custComplt/popupPages/deliverComplt.html',
	                controller: 'deliverCompltCtrl',
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
	                $scope.searchComplt(null, item,result);
	            });
	        };
	        
            // 处理中
            $scope.processComplt = function(item) {
                if (item == undefined || item == null) {
                    Alert.error("参数不能为空");
                    return;
                }
                if (item.caseSts == EnumType.CaseStatus.processing.value) {
                	Alert.error("不能重复变更案件状态");
                	return;
                }
                if (item.complainSts == EnumType.ComplainStatus.unsolved.value) {
                    if (item.caseSts == EnumType.CaseStatus.wait_proces.value) {
                        Alert.confirm("确定设置为处理中？").then(function() {
            	            var modalInstance = $uibModal.open({
            	                animation: true,
            	                templateUrl: 'app/pages/cusService/custComplt/popupPages/procComplt.html',
            	                controller: 'procCompltCtrl',
            	                size: 'midle-900',
            	                backdrop:'static',
            	                scope:$scope,
            	                resolve: {
            	                    'custNo': function () {
            	                        return '';
            	                    }
            	                }
            	            });
            	            modalInstance.result.then(function(){
                                $scope.setCompltSts(item.complainNo, EnumType.CaseStatus.processing.value);
            	            });
                        });
                    } else {
                    	Alert.error("只有投诉状态为未解决、案件状态为待处理时，才能变更案件状态为处理中");
                    	return;
                    }
                }
                if (item.complainSts == EnumType.ComplainStatus.solved.value) {
                	Alert.error("投诉状态为已解决时，不能变更案件状态为处理中");
                	return;
                }
                if (item.complainSts == EnumType.ComplainStatus.canceled.value) {
                	Alert.error("投诉状态为已取消时，不能变更案件状态为处理中");
                	return;
                }

            };

//          ComplainStatus    投诉状态    0    未解决    unsolved    0-未解决
//          ComplainStatus    投诉状态    1    已解决    solved    1-已解决
//          ComplainStatus    投诉状态    2    已取消    canceled    2-已取消
//          CaseStatus	案件状态	0	待处理	wait_proces	0-待处理
//          CaseStatus	案件状态	1	处理中	processing	1-处理中
//          CaseStatus	案件状态	2	已关闭	closed	2-已关闭
//          CaseStatus	案件状态	3	已取消	canceled	3-已取消
            // 关闭
            $scope.closeComplt = function(item) {
                if (item == undefined || item == null) {
                    Alert.error("参数不能为空");
                    return;
                }
                if (item.caseSts == EnumType.CaseStatus.closed.value) {
                	Alert.error("不能重复变更案件状态");
                	return;
                }
                if (item.complainSts == EnumType.ComplainStatus.unsolved.value) {
                    if (item.caseSts == EnumType.CaseStatus.wait_proces.value || item.caseSts == EnumType.CaseStatus.processing.value) {
                        Alert.confirm("确定设置为已关闭？").then(function() {

            	            var modalInstance = $uibModal.open({
            	                animation: true,
            	                templateUrl: 'app/pages/cusService/custComplt/popupPages/procComplt.html',
            	                controller: 'procCompltCtrl',
            	                size: 'midle-900',
            	                backdrop:'static',
            	                scope:$scope,
            	                resolve: {
            	                    'custNo': function () {
            	                        return '';
            	                    }
            	                }
            	            });
            	            modalInstance.result.then(function(){
                                $scope.setCompltSts(item.complainNo, EnumType.CaseStatus.closed.value, EnumType.ComplainStatus.solved.value);
            	            });
                        
                        });
                    } else {
                    	Alert.error("只有投诉状态为未解决、案件状态为待处理、处理中时，才能变更案件状态为已关闭");
                    	return;
                    }
                }
                if (item.complainSts == EnumType.ComplainStatus.solved.value) {
                	Alert.error("投诉状态为已解决时，不能变更案件状态为已关闭");
                	return;
                }
                if (item.complainSts == EnumType.ComplainStatus.canceled.value) {
                	Alert.error("投诉状态为已取消时，不能变更案件状态为已关闭");
                	return;
                }

            };

            // 取消
            $scope.cancelComplt = function(item) {
                if (item == undefined || item == null) {
                    Alert.error("参数不能为空");
                    return;
                }
                if (item.caseSts == EnumType.CaseStatus.canceled.value) {
                	Alert.error("不能重复变更案件状态");
                	return;
                }
                if (item.complainSts == EnumType.ComplainStatus.unsolved.value) {
                    if (item.caseSts == EnumType.CaseStatus.wait_proces.value || item.caseSts == EnumType.CaseStatus.processing.value) {
                        Alert.confirm("确定设置为已取消？").then(function() {
            	            var modalInstance = $uibModal.open({
            	                animation: true,
            	                templateUrl: 'app/pages/cusService/custComplt/popupPages/procComplt.html',
            	                controller: 'procCompltCtrl',
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
                                $scope.setCompltSts(item.complainNo, EnumType.CaseStatus.canceled.value, EnumType.ComplainStatus.canceled.value);
            	            });
                        
                        
                        });
                    } else {
                    	Alert.error("只有投诉状态为未解决、案件状态为待处理、处理中时，才能变更案件状态为已取消");
                    	return;
                    }
                }
                if (item.complainSts == EnumType.ComplainStatus.solved.value) {
                	Alert.error("投诉状态为已解决时，不能变更案件状态为已取消");
                	return;
                }
                if (item.complainSts == EnumType.ComplainStatus.canceled.value) {
                	Alert.error("投诉状态为已取消时，不能变更案件状态为已取消");
                	return;
                }

            };

            // 跳转到详情页面
            $scope.getComplt = function(item) {
                console.log("cusService.custComplt.custCompltDet");
                $state.go('cusService.custComplt.custCompltDet', {
                    'touchItem' : item
                });
            };
			//---------------checkbox start-----------------
			$scope.checkedRow = [];
	        // 全选
	        $scope.selectAll = function() {
	            console.log("selectAll select_all=" + $scope.select_all);

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
	            console.log($scope.checkedRow);
	            console.log("selectAll select_all=" + $scope.select_all);
	        };
	        // 单个选中
	        $scope.selectOne = function() {
	            console.log("selectOne select_all=" + $scope.select_all);

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
	            console.log($scope.checkedRow);
	            console.log("selectOne select_all=" + $scope.select_all);
	        }
	        //---------------checkbox end-----------------
        });

})();
