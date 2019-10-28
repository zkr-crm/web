(function() {
  'use strict';

  angular.module('BlurAdmin.pages.busiopp.allotBusiOppList')
    .controller('allotBusiOppListCtrl', allotBusiOppListCtrl);

  /** @ngInject */
  function allotBusiOppListCtrl($scope,$location,$state,$stateParams,$uibModal, HttpService, EnumType,$filter, Alert,$sce,$rootScope) {
	  var userId = $rootScope.global.user;

	  $scope.checkedRow = [];
	  $scope.busiOppNoList = [];

	  $scope.openDetail = function(item){
			$state.go('busiopp.busiOppDetail', {
				'busiOppNo' : item.busiOppNo,
				'busiOppStage' : item.busiOppStage,
				'custNo' : item.custNo
			});
	}
//      $scope.select_all = false;

		// 初始化
		var initBusiOpp = function() {
	        HttpService.linkHttp({
	            url: '/crm/ocrm/busiOpp/busiOppList',
	            method: 'GET',
	            //params: {'custNo': custNo}
	            params: {}

	        }).then(function (response) {
            	if(response == undefined || response == null) {
            		return;
            	}
	            $scope.busiOppList = response.data.map(function (item) {

	                  item.busiOppType = EnumType.ProductType.getLabelByValue(item.busiOppType);
	                  item.custType = EnumType.CustType.getLabelByValue(item.custType);
	            	  item.busiOppSrc = EnumType.BusiOppSrc.getLabelByValue(item.busiOppSrc);
	                  item.busiOppStageNam = EnumType.BusiOppStage.getLabelByValue(item.busiOppStage);
	                  item.custSource = EnumType.DataSource.getLabelByValue(item.custSource);
	                  return item;
	            });
	              $scope.total = response.data.length;
	        });
		}

		initBusiOpp();

		//----------------查询开始-----------------
        $scope.searchObj = {
                'busiOppName' : '',
                'custAgent' : '',
                'collaborator' : '',
                'busiOppStage' : ''
            };

        $scope.selectBusiOppByStage = function(busiOppStage) {
        	$scope.index_ = busiOppStage; // 控制按钮样式变色
            $scope.searchObj.busiOppStage = busiOppStage;
            $scope.selectBusiOpp();
        }

        $scope.selectBusiOppList = function() {
            $scope.searchObj.custAgent = '';
            $scope.searchObj.collaborator = '';
            $scope.selectBusiOpp();
        }

        $scope.selectBusiOpp = function() {
            var opts = {};
            opts.url = 'crm/ocrm/busiOpp/busiOppList';
            opts.method = 'GET';
            opts.params =  $scope.searchObj;
            HttpService.linkHttp(opts).then(function(response) {
	              $scope.busiOppList = response.data.map(function (item) {
	                  item.busiOppType = EnumType.ProductType.getLabelByValue(item.busiOppType);
	                  item.custType = EnumType.CustType.getLabelByValue(item.custType);
	            	  item.busiOppSrc = EnumType.BusiOppSrc.getLabelByValue(item.busiOppSrc);
	                  item.busiOppStageNam = EnumType.BusiOppStage.getLabelByValue(item.busiOppStage);
	                  item.custSource = EnumType.DataSource.getLabelByValue(item.custSource);
	                  return item;
                });
	              $scope.total = response.data.length;
            });
        }
		//----------------查询结束-----------------

        //----------------重置开始-----------------

        $scope.resetSelectBusiOpp = function(){
            $scope.searchObj = {
                    'busiOppName' : '',
                    'custAgent' : '',
                    'collaborator' : '',
                    'busiOppStage' : ''
                };
            $scope.selectBusiOpp();
		}
		//----------------重置结束-----------------

        //----------------添加开始-----------------
        $scope.addBusiOpp = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/busiopp/popupPages/addBusiOpp.html',
                controller: 'addBusiOppCtrl',
                size: 'midle-900',
                backdrop:'static',
                scope:$scope,
                resolve: {
                    'optTyp': function () {
                        return 'local';
                    }, 'custNo': function () {
                        return '';
                    }
                }
            });
            modalInstance.result.then(function(){
                $scope.selectBusiOpp();
            });
        };
		//----------------添加结束-----------------

        //----------------修改开始-----------------
        $scope.uptBusiOpp = function(item){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/busiopp/popupPages/uptBusiOpp.html',
                controller: 'uptBusiOppCtrl',
                size: 'midle-900', // 
                backdrop:'static',
                resolve: {
                    'busiOppNo': function () {
                        return item.busiOppNo;
                    }
                }
            });
            modalInstance.result.then(function(){
                $scope.selectBusiOpp();
            });
        };
		//----------------修改结束-----------------

        //----------------删除开始-----------------
        $scope.delBusiOpp = function(item) {
            if (item.busiOppStage != '01') {
                Alert.error('删除商机时，商机阶段状态必须为[意向]。商机编码：' + item.busiOppNo);
                return;
            }
            if (item.createUser != userId) {
                Alert.error('只能删除本人创建的商机，并且商机阶段状态为[意向]');
                return;
            }
            Alert.confirm("确定删除？").then(function() {
                var opts = {};
                opts.url = 'crm/ocrm/busiOpp/delBusiOpp';
                opts.method = 'PUT';
                opts.params = {
                		busiOppNo : item.busiOppNo
                };
                HttpService.linkHttp(opts).then(function(response) {
                    // 执行查询
                    initBusiOpp();
                });
            });

        };
		//----------------删除结束-----------------
		//---------------分配开始-----------------
        var checkAllotBusiOppStat = function () {
        	$scope.busiOppNoList = [];
            angular.forEach($scope.checkedRow, function (i) {
            	if (i.busiOppStage != '01') {
                    Alert.error('分配商机时，商机阶段状态必须为[意向]。商机编码：' + i.busiOppNo);
                    return;
            	}
                $scope.busiOppNoList.push(i.busiOppNo);
            });
        }

        var checkCancelBusiOppStat = function () {
        	$scope.busiOppNoList = [];
            angular.forEach($scope.checkedRow, function (i) {
            	if (i.busiOppStage == '01' || i.busiOppStage == '02' ||i.busiOppStage == '03') {
                    $scope.busiOppNoList.push(i.busiOppNo);
            	} else {
                    Alert.error('分配商机时，商机阶段状态必须为[意向]。商机编码：' + i.busiOppNo);
                    return;
            	}
            });
        }

        $scope.allotBusiOpp = function(){
            if($scope.checkedRow == undefined || $scope.checkedRow.length == 0){
                Alert.error('请选择分配的商机信息，至少一个条！');
                return ;
            }
            // chk allot busi opp
            checkAllotBusiOppStat();
            if ($scope.checkedRow.length == $scope.busiOppNoList.length) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'app/pages/busiopp/popupPages/allotBusiOpp.html',
                    controller: 'allotBusiOppCtrl',
                    size: 'midle-900', // 
                    backdrop:'static',
                    resolve: {
                        'checkedRow': function () {
                            return $scope.busiOppNoList;
                        }
                    }
                });
                modalInstance.result.then(function(){
                	initBusiOpp();
                });
            }

        };
        //---------------分配结束-----------------
  		//---------------取消开始-----------------
        $scope.cancelBusiOpp = function(){
            if($scope.checkedRow == undefined || $scope.checkedRow.length == 0){
                Alert.error('请选择分配的商机信息，至少一个条！');
                return ;
            }
            // chk cancel busi opp
            checkCancelBusiOppStat();
            if ($scope.checkedRow.length == $scope.busiOppNoList.length) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'app/pages/busiopp/popupPages/cancelBusiOpp.html',
                    controller: 'cancelBusiOppCtrl',
                    size: 'midle-900', // 
                    backdrop:'static',
                    resolve: {
                        'checkedRow': function () {
                            return $scope.busiOppNoList;
                        }
                    }
                });
                modalInstance.result.then(function(){
                	initBusiOpp();
                });
            }

        };
        //---------------取消结束-----------------
        
        //---------------checkbox start-----------------
        
        
        // 全选
        $scope.selectAll = function() {

            if ($scope.select_all) {
                angular.forEach($scope.busiOppList, function(i) {
                    i.checked = false;
                    $scope.checkedRow = [];
                })
                $scope.select_all = false;
            } else {
                $scope.checkedRow = [];
                var count = 0;
                angular.forEach($scope.busiOppList, function(i) {
                    i.checked = true;
                    $scope.checkObj = {
                            'custNo' : '',
                            'busiOppNo' : '',
                            'busiOppStage' : ''
                        };
                        $scope.checkObj.custNo = i.custNo;
                        $scope.checkObj.busiOppNo =  i.busiOppNo;
                        $scope.checkObj.busiOppStage =  i.busiOppStage;
                        $scope.checkedRow.push($scope.checkObj);
                })
                $scope.select_all = true;
            }
        };
        // 单个选中
        $scope.selectOne = function() {

        	$scope.checkedRow = [];
            angular.forEach($scope.busiOppList, function (i) {
                var index = $scope.checkedRow.indexOf()
                if (i.checked && index === -1) {

                    $scope.checkObj = {
                            'custNo' : '',
                            'busiOppNo' : '',
                            'busiOppStage' : ''
                        };
                        $scope.checkObj.custNo = i.custNo;
                        $scope.checkObj.busiOppNo =  i.busiOppNo;
                        $scope.checkObj.busiOppStage =  i.busiOppStage;
                        $scope.checkedRow.push($scope.checkObj);
                } else if (!i.checked && index !== -1) {
                    $scope.checkedRow.splice(index, 1);
                }
            });

            if ($scope.busiOppList.length === $scope.checkedRow.length) {
                $scope.select_all = true;
            } else {
                $scope.select_all = false;
            }
        }
        //---------------checkbox end-----------------

        
        
  }

})();
