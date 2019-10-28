(function() {
  'use strict';

  angular.module('BlurAdmin.pages.busiopp.traceBusiOppList')
    .controller('traceBusiOppListCtrl', traceBusiOppListCtrl);
// $scope,$state
  /** @ngInject */
  function traceBusiOppListCtrl($scope,$location,$state,$stateParams,$uibModal, HttpService, EnumType,$filter, Alert,$sce,$rootScope) {
	  var userId = $rootScope.global.user;
		$scope.openDetail = function(item){
			$state.go('busiopp.busiOppDetail', {
				'busiOppNo' : item.busiOppNo,
				'busiOppStage' : item.busiOppStage,
				'custNo' : item.custNo
			});
		}

		// 初始化
		var initBusiOpp = function() {
	        HttpService.linkHttp({
	            url: '/crm/ocrm/busiOpp/busiOppList',
	            method: 'GET',
	            //params: {'custNo': custNo}
	            params: {}

	        }).then(function (response) {
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

        $scope.selectBusiOppByFz = function() {
        	$scope.index_ = 0 ; // 控制按钮样式变色
            $scope.searchObj.custAgent = userId;
            $scope.searchObj.collaborator = '';
            $scope.searchObj.busiOppStage = ''; 
            $scope.selectBusiOpp();
        }

        $scope.selectBusiOppByXz = function() {
        	$scope.index_ = 1 ; // 控制按钮样式变色
            $scope.searchObj.collaborator = userId;
            $scope.searchObj.custAgent = '';
            $scope.searchObj.busiOppStage = '';
            $scope.selectBusiOpp();
        }

        $scope.selectBusiOppByAll = function() {
        	$scope.index_ = 2 ; // 控制按钮样式变色
        	$scope.resetSelectBusiOpp();
            $scope.selectBusiOpp();
        }

        $scope.selectBusiOppList = function() {
            //$scope.searchObj.custAgent = '';
            $scope.searchObj.busiOppStage = '';
            //$scope.searchObj.collaborator = '';
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
                    },'custNo': function () {
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

	}

})();
