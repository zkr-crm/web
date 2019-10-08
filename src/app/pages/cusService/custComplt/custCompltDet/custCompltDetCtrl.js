(function () {
  'use strict';

  angular.module('BlurAdmin.pages.cusService.custComplt.compltAllot')
      .controller('custCompltDetCtrl', custCompltDetCtrl);
  
  function custCompltDetCtrl($scope,$state,$stateParams,$uibModal, HttpService, EnumType,$filter, Alert,$sce,$rootScope) {
	$scope.touchItem = $stateParams.touchItem;
	$scope.caseSts = $scope.touchItem.caseSts;
	if ($scope.touchItem == undefined || $scope.touchItem.custNo == undefined) {
		return;
	}
	var custNo = $scope.touchItem.custNo;
	var userId = $rootScope.global.user;

    $scope.dyncTrackTel = {};
    $scope.dyncTrackVis = {};
    $scope.dyncTrackSms = {};
    $scope.dyncTrackSms.trackContent = "";
	$scope.TrackSubType  = EnumType.TrackSubType;
	$scope.YesNoFlg  = EnumType.YesNoFlg;
	$scope.writCount = 200;
	$scope.trackEnum = [];
	angular.forEach(
			$scope.TrackSubType,
			function(item) {
				if (item.value == '41' || item.value == '42' ) {
					$scope.trackEnum.push(item);
				}
			});
     console.log($scope.trackEnum);

	$scope.nextFpOpen = nextFpOpen;
    $scope.nextFpOpened = false;

    //-----------进度条
    var step= $("#myStep").step();
    var stepInt = 0;
    if ($scope.caseSts == undefined || $scope.caseSts == '') {
    	stepInt = 0;
    } else {
    	stepInt = $scope.caseSts + 1;
    }
    var yes=step.goStep(stepInt);
    $(".step-header ul li").click(function(event) {
    	var index = $(this).index();
        if (index == undefined) {
        	return;
        }
		var yes=step.goStep(index+1);//到指定步
		var newStage = "0"+(index+1);
    });
   //-----进度条完 	

    var initCustTouchInfo = function() {
        var opts = {};
        opts.url = 'crm/ecif/cust/perCustBaseInfo';
        opts.method = 'GET';
        opts.params = {'custNo': $scope.touchItem.custNo};
        HttpService.linkHttp(opts).then(function (response) {
        	if (response == undefined || response.data == undefined) {
        		return;
        	}
        	// 轨迹发送对象和电话赋值
        	$scope.dyncTrackTel.contacts = response.data.custName;
        	$scope.dyncTrackTel.phoneNo = response.data.phoneNumber;
        	$scope.dyncTrackSms.contacts = response.data.custName;
        	$scope.dyncTrackVis.contacts = response.data.custName;
        	$scope.dyncTrackSms.phoneNo = response.data.phoneNumber;
        });
    }
    initCustTouchInfo();

    //电话 短信 拜访选项卡
   // $scope.c = 0;
    $scope.show=function(e){
		$scope.c=e;
		$scope.True = false ;
	}
	$scope.information=[
		'电话','短信','拜访'
	]
	$scope.True = true ;
    $scope.z_show=function(){
    	$scope.True=!$scope.True;
		if($scope.True == true){
			$scope.c = 4;
		}else{
			$scope.c = 0;
		}
	}

    // 打开日期控件
    function nextFpOpen() {
        $scope.nextFpOpened = true;
    }

	$scope.nextFpVisOpen = nextFpVisOpen;
    $scope.nextFpVisOpened = false;

    // 打开日期控件
    function nextFpVisOpen() {
        $scope.nextFpVisOpened = true;
    }
    
    //------时间轴开始------------

    var timelineBlocks = $('.cd-timeline-block'),
        offset = 0.8;

    //hide timeline blocks which are outside the viewport
    hideBlocks(timelineBlocks, offset);

    //on scolling, show/animate timeline blocks when enter the viewport
    $(window).on('scroll', function () {
        if (!window.requestAnimationFrame) {
            setTimeout(function () {
                showBlocks(timelineBlocks, offset);
            }, 100);
        } else {
            window.requestAnimationFrame(function () {
                showBlocks(timelineBlocks, offset);
            });
        }
    });

    function hideBlocks(blocks, offset) {
        blocks.each(function () {
            ($(this).offset().top > $(window).scrollTop() + $(window).height() * offset) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
        });
    }

    function showBlocks(blocks, offset) {
        blocks.each(function () {
            ($(this).offset().top <= $(window).scrollTop() + $(window).height() * offset && $(this).find('.cd-timeline-img').hasClass('is-hidden')) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
        });
    }
  //-------------时间轴结束--------------
    // -------------轨迹信息开始--------------
	//-------------电话开始--------------

    $scope.resetTrackTel  = function() {
			$scope.dyncTrackTel.nextFollowUpTm = "";
			$scope.dyncTrackTel.trackSubTyp = "";
			$scope.dyncTrackTel.trackContent = "";
			$scope.dyncTrackTel.whtThrough = "";
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
//			if (busiOppNo == undefined || busiOppNo == '') {
//				Alert.error("商机编号不能为空");
//				return;
//			}
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
//			trackTelObj.busiOppNo = busiOppNo;
			trackTelObj.trackSubTyp = trackTelObj.trackSubTyp.value;
			trackTelObj.whtThrough = trackTelObj.whtThrough.value;
			console.log(trackTelObj);
        HttpService.linkHttp({
            url: 'crm/ocrm/busiOpp/addDyncTrackTel',
            method: 'PUT',
            params: trackTelObj
        }).then(function (response) {
//        	initTrackInfo(busiOppNo);
        	$scope.resetTrackTel();
        	//reflashLastFollowUp();
        });
		}

    //-------------电话结束--------------
	//-------------短信开始--------------


		$scope.resetTrackSms  = function() {
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
//			if (busiOppNo == undefined || busiOppNo == '') {
//				Alert.error("商机编号不能为空");
//				return;
//			}
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
//			trackSmsObj.busiOppNo = busiOppNo;
			console.log(trackSmsObj);
        HttpService.linkHttp({
            url: 'crm/ocrm/busiOpp/addDyncTrackSms',
            method: 'PUT',
            params: trackSmsObj
        }).then(function (response) {
        	$scope.resetTrackSms();
//        	initTrackInfo(busiOppNo);
        	//reflashLastFollowUp();
        });
		}

    //模板选择
    $scope.selectTemplate = function() {
        var modalInstance = $uibModal.open({
            animation : true,
            backdrop : 'static',
            templateUrl : 'app/pages/mgrcenter/msgManage/msgSendAdd/selectOneMsgTmpt.html',
            size : 'midle-900',
            controller : 'ProfileModalCtrl',
            scope : $scope,
            resolve : {
                items: function () {
                    return $scope.items;
                }
            }
        });
        modalInstance.result.then(function (result) {
      	  if (result == undefined || result == '') {
      		  return;
      	  }
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


    //-------------短信结束--------------
	//-------------拜访开始--------------

		$scope.resetTrackVis  = function() {
			$scope.dyncTrackVis.nextFollowUpTm = "";
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
//			if (busiOppNo == undefined || busiOppNo == '') {
//				Alert.error("商机编号不能为空");
//				return;
//			}
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
//			trackVisObj.busiOppNo = busiOppNo;
			console.log(trackVisObj);
        HttpService.linkHttp({
            url: 'crm/ocrm/busiOpp/addDyncTrackVis',
            method: 'PUT',
            params: trackVisObj
        }).then(function (response) {
        	$scope.resetTrackVis();
//        	initTrackInfo(busiOppNo);
        	//reflashLastFollowUp();
        });
		}

    //-------------拜访结束--------------

    
    
    
    
  }
})();
