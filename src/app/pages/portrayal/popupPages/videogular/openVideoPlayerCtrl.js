(function () {
    'use strict';

    angular.module('BlurAdmin.pages.portrayal.perCusPortrayal')
        .controller('openVideoPlayerCtrl', openVideoPlayerCtrl);

    /** @ngInject */
    function openVideoPlayerCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal, fileUrl, fileTyp, audioVideoCd) {
    	$scope.fileUrl = fileUrl;
    	if (fileTyp == '0') {
        	$scope.audioinit = "assets/img/audio.jpg";
    	} else {
        	$scope.audioinit = "";
    	}
//    	$scope.loadAv = function() {
//        	$scope.fileUrl = fileUrl;
//    	}
//            HttpService.linkHttp({
//                url: 'crm/ecif/cust/custAudioVideoOne',
//                method: 'GET',
//                params: {'audioVideoCd': audioVideoCd}
//            }).then(function (response) {
//            	if (response == undefined || response.data == undefined) {
//            		Alert.error("无视频/音频信息");
//            		return;
//            	}
//                $scope.audioVideo = response.data;
//            });
//    	}

    }
})();
