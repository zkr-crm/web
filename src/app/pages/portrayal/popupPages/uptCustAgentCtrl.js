(function () {
    'use strict';

    angular.module('BlurAdmin.pages.portrayal.perCusPortrayal')
        .controller('uptCustAgentCtrl', uptCustAgentCtrl);

    /** @ngInject */
    function uptCustAgentCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal, custNo, origSysAgentNo) {
        console.log("uptCustAgentCtrl custNo=" + custNo);
        console.log("uptCustAgentCtrl origSysAgentNo=" + origSysAgentNo);

    	$scope.AgentKind  = EnumType.AgentKind;
    	$scope.BelongChannel = EnumType.BelongChannel;
    	$scope.Rating = EnumType.Rating;
    	$scope.PositionGrade = EnumType.PositionGrade;
    	$scope.CreditGrade = EnumType.CreditGrade;
    	$scope.AgentStat = EnumType.AgentStat;

    	$scope.selectAgentKind = function(selectAgentKind) {
			console.log(selectAgentKind);
			$scope.custAgent.agentKind = selectAgentKind;
		}

    	$scope.selectBlnChnl = function(selectBlnChnl) {
			console.log(selectBlnChnl);
			$scope.custAgent.blnChnl = selectBlnChnl;
		}

    	$scope.selectPerfGrade = function(selectPerfGrade) {
			console.log(selectPerfGrade);
			$scope.custAgent.perfGrade = selectPerfGrade;
		}

    	$scope.selectPositGrade = function(selectPositGrade) {
			console.log(selectPositGrade);
			$scope.custAgent.assetsTyp = selectPositGrade;
		}

    	$scope.selectCreditGrade = function(selectCreditGrade) {
			console.log(selectCreditGrade);
			$scope.custAgent.creditGrade = selectCreditGrade;
		}

    	$scope.selectAgentSts = function(selectAgentSts) {
			console.log(selectAgentSts);
			$scope.custAgent.agentSts = selectAgentSts;
		}
    	$scope.inworkOpen = inworkOpen;
        $scope.inworkOpened = false;

        $scope.outworkOpen = outworkOpen;
        $scope.outworkOpened = false;
        // 打开日期控件
        function inworkOpen() {
            $scope.inworkOpened = true;
        }

        function outworkOpen() {
            $scope.outworkOpened = true;
        }
        //-------------查询回显开始--------------
        var initAgentInfo = function() {
            HttpService.linkHttp({
                url: 'crm/ecif/cust/custAgentOne',
                method: 'GET',
                params: {'custNo': custNo, 'origSysAgentNo': origSysAgentNo}
            }).then(function (response) {
                	$scope.custAgent = response.data;
                	$scope.custAgent.perfGrade = EnumType.Rating.getEnumByValue(response.data.perfGrade);
                    $scope.custAgent.creditGrade = EnumType.CreditGrade.getEnumByValue(response.data.creditGrade);
                    $scope.custAgent.agentSts = EnumType.AgentStat.getEnumByValue(response.data.agentSts);
                    $scope.custAgent.agentKind = EnumType.AgentKind.getEnumByValue(response.data.agentKind);
                    $scope.custAgent.blnChnl = EnumType.BelongChannel.getEnumByValue(response.data.blnChnl);
                    $scope.custAgent.positGrade = EnumType.PositionGrade.getEnumByValue(response.data.positGrade);
                    if(response.data.inworkDate != null) {
                    	var v = new Date(response.data.inworkDate);
                        $scope.custAgent.inworkDate = v;
                    }
                    if(response.data.outworkDate != null) {
                    	var v = new Date(response.data.outworkDate);
                        $scope.custAgent.outworkDate = v;
                    }

            });
        }

        $scope.reset = function() {
        	initAgentInfo();
        }
        initAgentInfo();
        //-------------查询回显结束--------------

        //-------------修改开始--------------
		$scope.uptAgent = function() {
			var agentObj = angular.copy($scope.custAgent);
			if (agentObj == null) {
				Alert.error("代理人参数不能为空");
				return;
			}
			if (agentObj.custNo == null || agentObj.custNo == '') {
				Alert.error("客户号不能为空");
				return;
			}
			if (agentObj.origSysAgentNo == null || agentObj.origSysAgentNo == '') {
				Alert.error("代理人编号不能为空");
				return;
			}
			agentObj.agentKind = $scope.custAgent.agentKind.value;
			agentObj.blnChnl = $scope.custAgent.blnChnl.value;
			agentObj.perfGrade = $scope.custAgent.perfGrade.value;
			agentObj.positGrade = $scope.custAgent.positGrade.value;
			agentObj.creditGrade = $scope.custAgent.creditGrade.value;
			agentObj.agentSts = $scope.custAgent.agentSts.value;
			if ($scope.custAgent.inworkDate != undefined 
					&& $scope.custAgent.inworkDate != null) {
				var inworkDate = new Date($scope.custAgent.inworkDate);
				agentObj.inworkDate = $filter('date')(inworkDate, 'yyyy-MM-dd'); 
			}

			if ($scope.custAgent.outworkDate != undefined 
					&& $scope.custAgent.outworkDate != null) {
				 var outworkDate = new Date($scope.custAgent.outworkDate);
				 agentObj.outworkDate = $filter('date')(outworkDate, 'yyyy-MM-dd'); 
			}
			console.log(agentObj);
            HttpService.linkHttp({
                url: 'crm/ecif/cust/uptCustAgent',
                method: 'PUT',
                params: agentObj
            }).then(function (response) {
                $uibModalInstance.close();
            });
		}
        //-------------修改结束--------------
    }
})();
