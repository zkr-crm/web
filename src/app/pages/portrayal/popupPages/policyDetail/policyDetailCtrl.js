(function () {
    'use strict';

    angular.module('BlurAdmin.pages.portrayal.perCusPortrayal')
        .controller('policyDetailCtrl', policyDetailCtrl);
    /** @ngInject */
    function policyDetailCtrl($scope, HttpService, EnumType,$uibModalInstance, $filter, $uibModal, Alert, $rootScope, policyNo, custNo, riskCode,subPolicyNo) {
    	$scope.endorseInfo = function (item) {
    		 var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'app/pages/portrayal/popupPages/endorList/endorList.html',
                    controller: 'endorListCtrl',
                    size: 'midle-900',
                    backdrop:'static',
                    scope:$scope,
                    resolve: {
                        'endorNo': function () {
                            return item.endorNo;
                        },
                        'seqNo':function(){
                            return item.endorSeqNo;
                        }
                    }
                });
                modalInstance.result.then(function(){
                });
    	}
    	$scope.ClaimDetail = function (policyNo,ClaimDetail) {
    		var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/portrayal/popupPages/claimList/claimList.html',
                controller: 'claimListCtrl',
                size: 'midle-1200',
                backdrop:'static',
                scope:$scope,
                resolve: {
                    'policyNo': function () {
                        return policyNo;
                    },
                    'ClaimDetail' : function () {
                        return ClaimDetail
                    }
                }
            });
            modalInstance.result.then(function(){
            });
    	}
    	var init = function () {
    	    $scope.riskCode=riskCode;
    		$scope.pagination = {
    			pageSize: '10',
                pageIndex: 1,
                maxText: 5
    		}
    		// 保单详情查询
    		$scope.policyDetailOpts = {
                pagination:{
                    pageSize: '10',
                    pageIndex: 1,
                    maxText: 5
                },
    			url:'/crm/query/custquery/getPolicyInfoByPolicy',
    			method:'POST',
    			data:{
    				// custNo:'I9900007751',
    				// custNo:custNo,
    				policyNo:policyNo,
                    riskCode:riskCode
    			}
    		}
    		HttpService.linkHttp($scope.policyDetailOpts).then(function(response){
    			if (response.status === '1') {
    				$scope.policyDetail = response.data[0]
    				$scope.policyDetail.reneWind = $scope.policyDetail.reneWind == '0'?'否':'是';
    			}
    		})
    		//险别列表
    		$scope.riskOpts = {
                pagination:{
                    pageSize: '100',
                    pageIndex: 1,
                    maxText: 5
                },
    			url:'/crm/query/custquery/getItemKindByPolicy',
    			method:'POST',
    			data:{
    				// policyNo:'P07012018999999000002'
    				policyNo:subPolicyNo|| policyNo
    			},
    			success:function successCallback(response){
    				if (response.status === '1') {
    					$scope.riskList = response.data.list;
    				}
    			}
    		}
            //特约列表
            $scope.clauseOpts = {
                pagination:{
                    pageSize: '100',
                    pageIndex: 1,
                    maxText: 5
                },
                url:'/crm/query/custquery/getSpecialClausesByPolicyNo',
                method:'POST',
                data:{
                    riskCode:riskCode,
                    policyNo:policyNo
                },
                success:function successCallback(response){
                    if (response.status === '1') {
                        $scope.clauseList = response.data.list;
                       
                    }
                }
            }
    		// 收付列表
    		$scope.payMentOpts = {
                pagination:{
                    pageSize: '100',
                    pageIndex: 1,
                    maxText: 5
                },
    			url:'/crm/query/custquery/getPayInfoPolicyByPolicyNo',
    			method:'POST',
    			data:{
    				policyNo:subPolicyNo|| policyNo,
                    seqNo:'000'
    			},
    			success:function successCallback(response){
    				if (response.status === '1'&&response.data) {
    					$scope.payMentList = response.data.list;
                        angular.forEach($scope.payMentList,function(item){
                            item.payDate = item.payDate.substr(0,10)
                        })
    				}
    			}
    		}
            // 收付列表
            $scope.endorPayMentOpts = {
                pagination:{
                    pageSize: '100',
                    pageIndex: 1,
                    maxText: 5
                },
                url:'/crm/query/custquery/getPayInfoPolicyByPolicyNo',
                method:'POST',
                data:{
                    policyNo:subPolicyNo|| policyNo,
                    seqNo:'' //区分批单批次
                },
                success:function successCallback(response){
                    if (response.status === '1'&&response.data) {
                        $scope.endorPayMentList = response.data.list;
                        angular.forEach($scope.endorPayMentList,function(item){
                            item.payDate = item.payDate.substr(0,10)
                        })
                    }
                }
            }
    		// 批单列表
    		$scope.endorOpts = {
                pagination:{
                    pageSize: '100',
                    pageIndex: 1,
                    maxText: 5
                },
    			url:'/crm/query/custquery/getEndorInfoByPolicy',
    			method:'POST',
    			data:{
    				policyNo:subPolicyNo|| policyNo
    				// policyNo:'P08012018999999000016'
    			},
    			success:function successCallback(response){
    				if (response.status === '1') {
    					$scope.endorList = response.data.list;
    					//车险有联合批改，批改商业险时，交强险会占号，去除无效批单
    					if(response.data.list.length>0){
                            $scope.endorList=response.data.list.filter(function(x){return x.endorType!="全单退保" || (x.endorType=="全单退保" && x.changepremium!=0)});
                        }

    				}
    			}
    		}
    		// 理赔列表
    		$scope.claimOpts = {
                pagination:{
                    pageSize: '100',
                    pageIndex: 1,
                    maxText: 5
                },
    			url:'/crm/query/custquery/getClaimInfoByPolicy',
    			method:'POST',
    			data:{
    				policyNo:subPolicyNo || policyNo,
    				riskCode:riskCode
    				// policyNo:'P0806201899999920000001',
    				// riskCode:'0806'
    			},
    			success:function successCallback(response){	
    				if (response.status === '1') {
    					$scope.ClaimList = response.data.list;
    				}
    			}
    		}


    	}
    	init()
    }
})();
