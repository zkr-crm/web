(function () {
    'use strict';

    angular.module('BlurAdmin.pages.portrayal.perCusPortrayal')
        .controller('addTrackTelCtrl', addTrackTelCtrl);

    /** @ngInject */
    function addTrackTelCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal) {
        $scope.resetTrackTel  = function() {
			initTrackTel();
			$scope.dyncTrackTel.nextFollowUpTm = "";
			$scope.dyncTrackTel.contacts = "";
			$scope.dyncTrackTel.trackContent = "";
		}

		$scope.addTrackTel = function() {
			var trackTelObj = angular.copy($scope.dyncTrackTel);
			if (trackTelObj == undefined) {
				Alert.error("参数不能为空");
				return;
			}
			if (custNo == undefined || custNo == '') {
				Alert.error("客户号不能为空");
				return;
			}
			if (trackTelObj.nextFollowUpTm == undefined || trackTelObj.nextFollowUpTm == '') {
				Alert.error("下次跟进日期不能为空");
				return;
			}
			if (trackTelObj.contacts == undefined || trackTelObj.contacts == '') {
				Alert.error("联系人不能为空");
				return;
			}
			if (trackTelObj.trackContent == undefined || trackTelObj.trackContent == '') {
				Alert.error("内容不能为空");
				return;
			}
			var nextFollowUpTm = new Date($scope.dyncTrackTel.nextFollowUpTm);
			var curDate = new Date();
			if(nextFollowUpTm < curDate){
				Alert.error("下次跟进日期必须在当前时间之后")
				}
			trackTelObj.nextFollowUpTm = $filter('date')(nextFollowUpTm, 'yyyy-MM-dd HH:mm:ss'); 
			trackTelObj.custNo = custNo;
			trackTelObj.trackSubTyp = trackTelObj.trackSubTyp.value;
			trackTelObj.whtThrough = trackTelObj.whtThrough.value;
			console.log(trackTelObj);
            HttpService.linkHttp({
                url: 'crm/ecif/cust/addDyncTrackTel',
                method: 'PUT',
                params: trackTelObj
            }).then(function (response) {
            	initTrackInfo(custNo);
            	$scope.resetTrackTel();
            	reflashLastFollowUp();
            });
		}
    }
})();
