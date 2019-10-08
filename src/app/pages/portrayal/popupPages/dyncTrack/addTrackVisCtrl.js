(function () {
    'use strict';

    angular.module('BlurAdmin.pages.portrayal.perCusPortrayal')
        .controller('addTrackVisCtrl', addTrackVisCtrl);

    /** @ngInject */
    function addTrackVisCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal) {
		$scope.resetTrackVis  = function() {
			$scope.dyncTrackVis.nextFollowUpTm = "";
			$scope.dyncTrackVis.contacts = "";
			$scope.dyncTrackVis.trackContent = "";
			$scope.dyncTrackVis.location = "";
		}
		$scope.addTrackVis = function() {
			var trackVisObj = angular.copy($scope.dyncTrackVis);
			if (trackVisObj == undefined) {
				Alert.error("参数不能为空");
				return;
			}
			if (custNo == undefined || custNo == '') {
				Alert.error("客户号不能为空");
				return;
			}
			if (trackVisObj.nextFollowUpTm == undefined || trackVisObj.nextFollowUpTm == '') {
				Alert.error("下次跟进日期不能为空");
				return;
			}
			if (trackVisObj.contacts == undefined || trackVisObj.contacts == '') {
				Alert.error("联系人不能为空");
				return;
			}
			if (trackVisObj.location == undefined || trackVisObj.location == '') {
				Alert.error("摆放地点不能为空");
				return;
			}
			if (trackVisObj.trackContent == undefined || trackVisObj.trackContent == '') {
				Alert.error("内容不能为空");
				return;
			}

			var nextFollowUpTm = new Date($scope.dyncTrackVis.nextFollowUpTm);
			var curDate = new Date();
			if(nextFollowUpTm < curDate){
				Alert.error("下次跟进日期必须在当前时间之后")
				}
			trackVisObj.nextFollowUpTm = $filter('date')(nextFollowUpTm, 'yyyy-MM-dd HH:mm:ss'); 
			trackVisObj.custNo = custNo;
			console.log(trackVisObj);
            HttpService.linkHttp({
                url: 'crm/ecif/cust/addDyncTrackVis',
                method: 'PUT',
                params: trackVisObj
            }).then(function (response) {
            	$scope.resetTrackVis();
            	initTrackInfo(custNo);
            	reflashLastFollowUp();
            });
		}
    }
})();
