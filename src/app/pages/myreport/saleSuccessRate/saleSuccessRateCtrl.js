(function() {
	'use strict';

	angular.module('BlurAdmin.pages.myreport.saleSuccessRate').controller(
			'saleSuccessRateCtrl', saleSuccessRateCtrl);
	/** @ngInject */
	function saleSuccessRateCtrl($scope, $filter, $uibModal) {

		 $scope.saleData=[
	    	 {
	 			"policyNo" : "No.001",
	 			"busiOpportNo" : "商机1",
	 			"custManager" : "客户经理1",
	 			"affilTeam" : "团队1",
	 			"signDate" : "20170213"
	 		},{
	 			"policyNo" : "No.001",
	 			"busiOpportNo" : "商机2",
	 			"custManager" : "客户经理2",
	 			"affilTeam" : "团队2",
	 			"signDate" : "20170213"
	 		},{
	 			"policyNo" : "No.001",
	 			"busiOpportNo" : "商机3",
	 			"custManager" : "客户经理3",
	 			"affilTeam" : "团队3",
	 			"signDate" : "20170213"
	 		},{
	 			"policyNo" : "No.001",
	 			"busiOpportNo" : "商机4",
	 			"custManager" : "客户经理4",
	 			"affilTeam" : "团队4",
	 			"signDate" : "20170213"
	 		},{
	 			"policyNo" : "No.001",
	 			"busiOpportNo" : "商机5",
	 			"custManager" : "客户经理5",
	 			"affilTeam" : "团队5",
	 			"signDate" : "20170213"
	 		},{
	 			"policyNo" : "No.001",
	 			"busiOpportNo" : "商机6",
	 			"custManager" : "客户经理6",
	 			"affilTeam" : "团队6",
	 			"signDate" : "20170213"
	 		},{
	 			"policyNo" : "No.001",
	 			"busiOpportNo" : "商机7",
	 			"custManager" : "客户经理7",
	 			"affilTeam" : "团队7",
	 			"signDate" : "20170213"
	 		},{
	 			"policyNo" : "No.001",
	 			"busiOpportNo" : "商机8",
	 			"custManager" : "客户经理8",
	 			"affilTeam" : "团队8",
	 			"signDate" : "20170213"
	 		},{
	 			"policyNo" : "No.001",
	 			"busiOpportNo" : "商机9",
	 			"custManager" : "客户经理9",
	 			"affilTeam" : "团队9",
	 			"signDate" : "20170213"
	 		},{
	 			"policyNo" : "No.001",
	 			"busiOpportNo" : "商机10",
	 			"custManager" : "客户经理10",
	 			"affilTeam" : "团队10",
	 			"signDate" : "20170213"
	 		},{
	 			"policyNo" : "No.001",
	 			"busiOpportNo" : "商机11",
	 			"custManager" : "客户经理11",
	 			"affilTeam" : "团队11",
	 			"signDate" : "20170213"
	 		},{
	 			"policyNo" : "No.001",
	 			"busiOpportNo" : "商机12",
	 			"custManager" : "客户经理12",
	 			"affilTeam" : "团队12",
	 			"signDate" : "20170213"
	 		}
	 		
	    ];

		$scope.addUser = function() {
			
			 $uibModal.open({
				 animation: true,
				 templateUrl: 'app/pages/mgrcenter/paramManage/popupPages/addParam.html',
				 size: 'lg',
				 controller:'addParamCtrl',
				 scope:$scope,
				 resolve: {
				 }
			 });
		};
	}

})();
