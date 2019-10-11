(function () {
    'use strict';

    angular.module('BlurAdmin.pages.portrayal.perCusPortrayal')
        .controller('addTrackSmsCtrl', addTrackSmsCtrl);

    /** @ngInject */
    function addTrackSmsCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal) {
		$scope.resetTrackSms  = function() {
			$scope.dyncTrackSms.phoneNo = "";
			$scope.dyncTrackSms.contacts = "";
			$scope.dyncTrackSms.trackContent = "";
			$scope.writCount = 200;
		}
		$scope.addTrackSms = function() {
			var trackSmsObj = angular.copy($scope.dyncTrackSms);
			if (trackSmsObj == undefined) {
				Alert.error("参数不能为空");
				return;
			}
			if (custNo == undefined || custNo == '') {
				Alert.error("客户号不能为空");
				return;
			}
			if (trackSmsObj.contacts == undefined || trackSmsObj.contacts == '') {
				Alert.error("发送对象不能为空");
				return;
			}
			if (trackSmsObj.phoneNo == undefined || trackSmsObj.phoneNo == '') {
				Alert.error("发送号码不能为空");
				return;
			}
			if (trackSmsObj.trackContent == undefined || trackSmsObj.trackContent == '') {
				Alert.error("发送内容不能为空");
				return;
			}
			trackSmsObj.custNo = custNo;
			console.log(trackSmsObj);
            HttpService.linkHttp({
                url: 'crm/ecif/cust/addDyncTrackSms',
                method: 'PUT',
                params: trackSmsObj
            }).then(function (response) {
            	$scope.resetTrackSms();
            	initTrackInfo(custNo);
            	reflashLastFollowUp();
            });
		}

        //模板选择
        $scope.selectTemplate = function() {
            var modalInstance = $uibModal.open({
                animation : true,
                backdrop : 'static',
                templateUrl : 'app/pages/mgrcenter/msgManage/msgSendAdd/selectOneMsgTmpt.html',
                size : 'midle-1200',
                controller : 'ProfileModalCtrl',
                scope : $scope,
                resolve : {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
            modalInstance.result.then(function (result) {
                $scope.dyncTrackSms.trackContent = result.tplCont;		//模板内容
                $scope.tolCount();
                console.log(result); //result关闭是回传的值
            }, function (reason) {
                console.log(reason);//点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel
            });

        }
		$scope.tolCount = function () {
			//console.log($scope.dyncTrackSms.trackContent.length);
			$scope.writCount = 200 - $scope.dyncTrackSms.trackContent.length;
		};
    }
})();
