(function () {
    'use strict';

    angular.module('BlurAdmin.pages.portrayal.perCusPortrayal')
        .controller('addCustCareerCtrl', addCustCareerCtrl);

    /** @ngInject */
    function addCustCareerCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal) {
    	$scope.AgentKind  = EnumType.AgentKind;
    	$scope.BelongChannel = EnumType.BelongChannel;
    	$scope.Rating = EnumType.Rating;
    	$scope.PositionGrade = EnumType.PositionGrade;
    	$scope.CreditGrade = EnumType.CreditGrade;
    	$scope.AgentStat = EnumType.AgentStat;

    	$scope.selectAgentKind = function(selectAgentKind) {
			$scope.custAgent.agentKind = selectAgentKind;
		}

    	$scope.selectBlnChnl = function(selectBlnChnl) {
			$scope.custAgent.blnChnl = selectBlnChnl;
		}

    	$scope.selectPerfGrade = function(selectPerfGrade) {
			$scope.custAgent.perfGrade = selectPerfGrade;
		}

    	$scope.selectPositGrade = function(selectPositGrade) {
			$scope.custAgent.assetsTyp = selectPositGrade;
		}

    	$scope.selectCreditGrade = function(selectCreditGrade) {
			$scope.custAgent.creditGrade = selectCreditGrade;
		}

    	$scope.selectAgentSts = function(selectAgentSts) {
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
		//-------------新增开始--------------
		$scope.addAgent = function() {
			var agentObj = angular.copy($scope.custAgent);
			if ($scope.custAgent == null) {
				Alert.error("代理人参数不能为空");
				return;
			}
			if ($scope.custNo == null || $scope.custNo == '') {
				Alert.error("客户号不能为空");
				return;
			}
			if (agentObj.origSysAgentNo == null || agentObj.origSysAgentNo == '') {
				Alert.error("代理人编号不能为空");
				return;
			}
			agentObj.custNo = $scope.custNo;
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
            HttpService.linkHttp({
                url: 'crm/ecif/cust/addCustAgent',
                method: 'PUT',
                params: agentObj
            }).then(function (response) {
                $uibModalInstance.close();
            });
		}
        //-------------新增结束--------------

    }
})();
