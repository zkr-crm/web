(function () {
  'use strict';

  angular.module('BlurAdmin.pages.busiopp')
      .controller('busiOppDetailCtrl', busiOppDetailCtrl);
  
  function busiOppDetailCtrl($scope,$state,$stateParams,$uibModal, HttpService, EnumType,$filter, Alert,$sce,$rootScope) {
		var busiOppNo = $stateParams.busiOppNo;
		var busiOppStage = $stateParams.busiOppStage;
		var custNo = $stateParams.custNo;
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

    	$scope.nextFpOpen = nextFpOpen;
        $scope.nextFpOpened = false;

        var initBusiOppInfo = function() {
            HttpService.linkHttp({
                url: '/crm/ocrm/busiOpp/busiOppOne',
                method: 'GET',
                params: {'busiOppNo': busiOppNo}
            }).then(function (response) {
              	if (response == undefined || response.data == undefined) {
                		return;
                	}
                	$scope.busiOpp = response.data;
                    $scope.busiOpp.busiOppSrc = EnumType.BusiOppSrc.getLabelByValue(response.data.busiOppSrc);
                    $scope.busiOpp.busiOppType = EnumType.ProductType.getLabelByValue(response.data.busiOppType);
                    $scope.busiOpp.busiOppStage = EnumType.BusiOppStage.getLabelByValue(response.data.busiOppStage);
                    $scope.busiOpp.custNo = response.data.custNo;
                    if(response.data.estimateSuccDate != null) {
                        var v = new Date(response.data.estimateSuccDate);
                        $scope.busiOpp.estimateSuccDate = $filter('date')(v, 'yyyy-MM-dd'); 
                     }

                    if(response.data.firstFollowDate != null) {
                        var v = new Date(response.data.firstFollowDate);
                        $scope.busiOpp.firstFollowDate = $filter('date')(v, 'yyyy-MM-dd'); 
                     }
                    if(response.data.lastFollowDate != null) {
                        var v = new Date(response.data.lastFollowDate);
                        $scope.busiOpp.lastFollowDate = $filter('date')(v, 'yyyy-MM-dd'); 
                     }
                    var opts = {};
                    opts.url = 'crm/ecif/cust/perCustBaseInfo';
                    opts.method = 'GET';
                    opts.params = {'custNo': $scope.busiOpp.custNo};
                    HttpService.linkHttp(opts).then(function (response) {
                    	if (response == undefined || response.data == undefined) {
                    		return;
                    	}
                    	$scope.busiOpp.custSource = EnumType.DataSource.getLabelByValue(response.data.custSource);
                    	$scope.busiOpp.custSex = EnumType.Sex.getLabelByValue(response.data.sex);
                    	$scope.busiOpp.custType = EnumType.CustType.getLabelByValue(response.data.custTyp);
                    	$scope.busiOpp.custTel = response.data.phoneNumber;
                    	var birthDate = new Date(response.data.birthDate);
                    	$scope.busiOpp.birthDate = $filter('date')(birthDate, 'yyyy-MM-dd'); 
                    	// 轨迹发送对象和电话赋值
                    	$scope.dyncTrackTel.contacts = response.data.custName;
                    	$scope.dyncTrackTel.phoneNo = response.data.phoneNumber;
                    	$scope.dyncTrackSms.contacts = response.data.custName;
                    	$scope.dyncTrackVis.contacts = response.data.custName;
                    	$scope.dyncTrackSms.phoneNo = response.data.phoneNumber;
                    });
            });
        }

        // 取消
        var cancelBusiOppDet = function (busiOppNo,oldStage,newStage) {
			var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/busiopp/popupPages/cancelBusiOpp.html',
                controller: 'cancelBusiOppCtrl',
                size: 'midle-900', // 
                backdrop:'static',
                resolve: {
                    'busiOppNo': function () {
                        return busiOppNo;
                    },'oldStage': function () {
                        return oldStage;
                    },'newStage': function () {
                        return newStage;
                    }
                }
            });
            modalInstance.result.then(function(result){
            	if (result == false) {
                	busiOppStage = oldStage;
                	step.goStep(oldStage);//到指定步
            	} else {
                	busiOppStage = EnumType.BusiOppStage.cancel.value;
            	}
            	initBusiOppInfo();
            });
      }

        // 成功
        var succeedBusiOppDet = function (busiOppNo,oldStage,newStage, busiOppNam) {
			var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/busiopp/popupPages/succeedBusiOpp.html',
                controller: 'succeedBusiOppCtrl',
                size: 'midle-900', // 
                backdrop:'static',
                resolve: {
                    'busiOppNo': function () {
                        return busiOppNo;
                    },'oldStage': function () {
                        return oldStage;
                    },'newStage': function () {
                        return newStage;
                    },'busiOppNam': function () {
                        return busiOppNam;
                    }
                }
            });
            modalInstance.result.then(function(result){
            	if (result == false) {
                	busiOppStage = oldStage;
                	step.goStep(oldStage);//到指定步
            	} else {
                	busiOppStage = EnumType.BusiOppStage.succeed.value;
            	}
            	initBusiOppInfo();
            });
        }

        // 失败
        var failureBusiOppDet = function (busiOppNo,oldStage,newStage) {
			var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/busiopp/popupPages/failureBusiOpp.html',
                controller: 'failureBusiOppCtrl',
                size: 'midle-900', // 
                backdrop:'static',
                resolve: {
                    'busiOppNo': function () {
                        return busiOppNo;
                    },'oldStage': function () {
                        return oldStage;
                    },'newStage': function () {
                        return newStage;
                    }
                }
            });
            modalInstance.result.then(function(result){
            	if (result == false) {
                	busiOppStage = oldStage;
                	step.goStep(oldStage);//到指定步
            	} else {
                	busiOppStage = EnumType.BusiOppStage.failure.value;
            	}
            	initBusiOppInfo();
            });
        }

        $scope.stageInfo = {};
        // 跟进中
        var followUpBusiOppDet = function (busiOppNo,oldStage,newStage) {
    	  	if (busiOppNo == undefined || busiOppNo == '') {
                Alert.error('商机编码不能为空！');
                return ;
    	  	}
        	if (oldStage == undefined || oldStage == '') {
                Alert.error('商机原阶段状态不能为空！');
                return ;
    	  	}
    	  	if (newStage == undefined || newStage == '') {
                Alert.error('商机新阶段状态不能为空！');
                return ;
    	  	}
    	  	$scope.stageInfo.busiOppNo = busiOppNo;
    	  	$scope.stageInfo.oldStage = oldStage;
    	  	$scope.stageInfo.newStage = newStage;

            HttpService.linkHttp({
                url: '/crm/ocrm/busiOpp/setBusiOppStage',
                method: 'PUT',
                params: $scope.stageInfo
            }).then(function (response) {
            	if (response == undefined || response == '') {
                	busiOppStage = oldStage;
                	step.goStep(oldStage);//到指定步
            	} else {
                	busiOppStage = EnumType.BusiOppStage.follow_up.value;
            	}
            	initBusiOppInfo();
            });
        
      }
        //-----------进度条
            var step= $("#myStep").step();
            if (busiOppStage == undefined) {
            	return;
            }
            var yes=step.goStep(busiOppStage);
            $(".step-header ul li").click(function(event) {
            	var index = $(this).index();
                if (index == undefined) {
                	return;
                }
        		var yes=step.goStep(index+1);//到指定步
        		var newStage = "0"+(index+1);
        		var busiOppNam = $scope.busiOpp.busiOppName;
        		$scope.setBusiOppStage(busiOppNo, busiOppStage, newStage, busiOppNam);
            });
           //-----进度条完 	
        
            $scope.setBusiOppStage = function(busiOppNo, oldStage, newStage, busiOppNam){

                // 判空
                if (busiOppNo == undefined || oldStage == undefined || newStage == undefined) {
    				Alert.error("商机信息不能为空");
                	return;
                }
                // 状态信息相同，不能能操作
                if (oldStage == newStage) {
    				return;
                }

                if (oldStage == EnumType.BusiOppStage.intention.value) {// 意向
    				if (newStage == EnumType.BusiOppStage.cancel.value) {// 意向-取消
    					cancelBusiOppDet(busiOppNo,oldStage,newStage);
    				} else {
        				Alert.error("意向商机，只能变更取消或主管进行分配");
        				var yes=step.goStep(oldStage);//到指定步
        				return;
    				}
                } else if (oldStage == EnumType.BusiOppStage.allot.value) {// 分配
    				if (newStage == EnumType.BusiOppStage.follow_up.value) {// 分配-跟进中
    					if ($scope.busiOpp.custAgent != userId) {
            				var yes=step.goStep(oldStage);//到指定步
            				Alert.error("分配商机，只能由负责人变更跟进中");
    						return;
    					}
    					followUpBusiOppDet(busiOppNo,oldStage,newStage);
    				} else if (newStage == EnumType.BusiOppStage.failure.value) {// 分配-取消
    					cancelBusiOppDet(busiOppNo,oldStage,newStage);
    				} else {
        				Alert.error("分配商机，只能变更跟进中或取消");
        				var yes=step.goStep(oldStage);//到指定步
        				return;
    				}
                } else if (oldStage == EnumType.BusiOppStage.follow_up.value) {// 跟进中
    				if (newStage == EnumType.BusiOppStage.succeed.value) {// 跟进中-成功
    					succeedBusiOppDet(busiOppNo, oldStage, newStage, busiOppNam);
    				} else if (newStage == EnumType.BusiOppStage.failure.value) {// 跟进中-失败
    					failureBusiOppDet(busiOppNo, oldStage, newStage);
    				} else if (newStage == EnumType.BusiOppStage.cancel.value) {// 跟进中-取消
    					cancelBusiOppDet(busiOppNo,oldStage,newStage);
    				} else {
        				Alert.error("跟进中商机，只能变更为成功、失败、取消");
        				var yes=step.goStep(oldStage);//到指定步
        				return;
    				}
                } else if (oldStage == EnumType.BusiOppStage.succeed.value) { // 成功
    				Alert.error("成功商机，不能变更状态");
    				var yes=step.goStep(oldStage);//到指定步
    				return;
                } else if (oldStage == EnumType.BusiOppStage.failure.value) { // 失败
                	Alert.error("失败商机，不能变更状态，只能主管重新分配");
					var yes=step.goStep(oldStage);//到指定步
					return;
                } else if (oldStage == EnumType.BusiOppStage.cancel.value) { // 取消
                	Alert.error("失败商机，不能变更状态，只能主管重新分配");
    				var yes=step.goStep(oldStage);//到指定步
    				return;
                }
            };

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

        $scope.back = function(){
        	// $state.go('myHome',{'tabOpen':'cust'});
        	window.history.go(-1);
		};

        if (busiOppNo == undefined) {
        	Alert.error("商机编号不能为空");
        	return;
        }

    	//-------------查询回显开始--------------
      initBusiOppInfo();
    //-------------查询回显结束--------------
      //------时间轴开始------------

      var initTrackInfo = function(busiOppNo) {
          HttpService.linkHttp({
              url: 'crm/ocrm/busiOpp/dyncTrackList',
              method: 'GET',
              params: {'busiOppNo': busiOppNo}
          }).then(function (response) {
              for (var index in response.data) {
                  if (response.data[index].trackTyp == '01') {
                  	response.data[index].isContShow = false;
                  	response.data[index].isNextShow = false;
                  } else {
                  	response.data[index].isContShow = true;
                  	if (response.data[index].trackTyp == '05' || response.data[index].trackTyp == '03') {
                      	response.data[index].isNextShow = false;
                  	} else {
                      	response.data[index].isNextShow = true;
                  	}
                  }
              	response.data[index].trackTyp = EnumType.TrackType.getLabelByValue(response.data[index].trackTyp);
                  response.data[index].trackSubTypNam = EnumType.TrackSubType.getLabelByValue(response.data[index].trackSubTyp);
                  response.data[index].comtFlg = EnumType.YesNoFlg.getLabelByValue(response.data[index].comtFlg);
                  var nextFollowUpTm = new Date(response.data[index].nextFollowUpTm);
                  response.data[index].nextFollowUpTm = $filter('date')(nextFollowUpTm, 'yyyy-MM-dd'); 
              }
              $scope.timelineCollection = response.data;
          });
      }

      initTrackInfo(busiOppNo);

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
			if (busiOppNo == undefined || busiOppNo == '') {
				Alert.error("商机编号不能为空");
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
			trackTelObj.busiOppNo = busiOppNo;
			trackTelObj.trackSubTyp = trackTelObj.trackSubTyp.value;
			trackTelObj.whtThrough = trackTelObj.whtThrough.value;
          HttpService.linkHttp({
              url: 'crm/ocrm/busiOpp/addDyncTrackTel',
              method: 'PUT',
              params: trackTelObj
          }).then(function (response) {
          	initTrackInfo(busiOppNo);
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
			if (busiOppNo == undefined || busiOppNo == '') {
				Alert.error("商机编号不能为空");
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
			trackSmsObj.busiOppNo = busiOppNo;
          HttpService.linkHttp({
              url: 'crm/ocrm/busiOpp/addDyncTrackSms',
              method: 'PUT',
              params: trackSmsObj
          }).then(function (response) {
          	$scope.resetTrackSms();
          	initTrackInfo(busiOppNo);
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
          }, function (reason) {
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
			if (busiOppNo == undefined || busiOppNo == '') {
				Alert.error("商机编号不能为空");
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
			trackVisObj.busiOppNo = busiOppNo;
          HttpService.linkHttp({
              url: 'crm/ocrm/busiOpp/addDyncTrackVis',
              method: 'PUT',
              params: trackVisObj
          }).then(function (response) {
          	$scope.resetTrackVis();
          	initTrackInfo(busiOppNo);
          	//reflashLastFollowUp();
          });
		}
  
      //-------------拜访结束--------------
		
 	 // -------------轨迹筛选结束--------------
      $scope.searchDyncTrackObj = {
      		'trackTyp' : '',
              'busiOppNo' : busiOppNo
          };

      $scope.clearDyncTrackSearch = function() {
          $scope.searchDyncTrackObj = {
          		'trackTyp' : '',
                  'busiOppNo' : busiOppNo
              };

          $scope.searchDyncTrack();
      }
      // 查询事件
      $scope.searchDyncTrack = function() {
          var opts = {};
          opts.url = 'crm/ocrm/busiOpp/dyncTrackList';
          opts.method = 'GET';
          opts.params =  $scope.searchDyncTrackObj;
          HttpService.linkHttp(opts).then(function(response) {
              for (var index in response.data) {
                  if (response.data[index].trackTyp == '01') {
                  	response.data[index].isContShow = false;
                  	response.data[index].isNextShow = false;
                  } else {
                  	response.data[index].isContShow = true;
                  	if (response.data[index].trackTyp == '05' || response.data[index].trackTyp == '03') {
                      	response.data[index].isNextShow = false;
                  	} else {
                      	response.data[index].isNextShow = true;
                  	}
                  }
              	response.data[index].trackTyp = EnumType.TrackType.getLabelByValue(response.data[index].trackTyp);
                  response.data[index].trackSubTypNam = EnumType.TrackSubType.getLabelByValue(response.data[index].trackSubTyp);
                  response.data[index].comtFlg = EnumType.YesNoFlg.getLabelByValue(response.data[index].comtFlg);
                  var nextFollowUpTm = new Date(response.data[index].nextFollowUpTm);
                  response.data[index].nextFollowUpTm = $filter('date')(nextFollowUpTm, 'yyyy-MM-dd'); 
              }
              $scope.timelineCollection = response.data;

          });
      }
      // -------------轨迹筛选结束--------------
  	 // -------------轨迹信息结束--------------

   	 // -------------联系人信息开始--------------
      $scope.searchBusiOppCntr = {
              'contractCustNam' : '',
              'busiOppNo' : busiOppNo,
              'custNo' : custNo
          };

      HttpService.linkHttp({
          url: '/crm/ocrm/busiOpp/BusiOppCntrList',
          method: 'GET',
          params: {'busiOppNo': busiOppNo}
      }).then(function (response) {
          $scope.busiOppCntrList = response.data.map(function (item) {
              item.custRelation = EnumType.Relation.getLabelByValue(item.custRelation);
              var relaDate = new Date(item.relaDate);
              item.relaDate = $filter('date')(relaDate, 'yyyy-MM-dd'); 
          	  return item;
          });
      });

      $scope.openCntrDetail = function (item) {
          $state.go('customer.custContractDetail',{'contractNo':item.contractCustNo});
      }
      $scope.busiOppCntr = {};
      $scope.cntrList = [];
      //新增
      $scope.addBusiOppCntr = function(){
      	$scope.busiOppCntr.custNo = custNo;
      	$scope.busiOppCntr.busiOppNo = busiOppNo;
          var modalInstance = $uibModal.open({
              animation: true,
              templateUrl: 'app/pages/customer/custContract/popupPages/selectCustCntrDlg.html',
              controller: 'selectCustCntrDlgCtrl',
              size: 'midle-900',
              backdrop:'static',
              scope:$scope,
              resolve: {
                  'custNo': function () {
                      return custNo;
                  }
              }
          });
          modalInstance.result.then(function (result) {
              $scope.cntrList = [];
				angular.forEach(result, function(i) {
					$scope.cntrList.push(i.contractNo);
				});
              // contractNo
              var opts = {};
              opts.url = '/crm/ocrm/busiOpp/addBusiOppCntr';
              opts.method = 'PUT';
              opts.params = {
            		busiOppNo : busiOppNo,
            		custNo : custNo,
            		cntrList : $scope.cntrList
              };
              HttpService.linkHttp(opts).then(function(response) {
                  // 执行查询
                  $scope.searchBusiOppCntr();
              });
          }, function (reason) {
          });

      };

	      // 重置
	      $scope.clearBusiOppCntrSearch = function() {
	          $scope.searchObj = {
	                  'contractCustNam' : '',
	                  'busiOppNo' : busiOppNo,
	                  'custNo' : custNo
	              };
	          $scope.searchBusiOppCntr();
	      }

          // 查询事件
          $scope.searchBusiOppCntr = function() {
              var opts = {};
              opts.url = '/crm/ocrm/busiOpp/BusiOppCntrList';
              opts.method = 'GET';
              opts.params = $scope.searchObj;
              HttpService.linkHttp(opts).then(function(response) {
                $scope.busiOppCntrList = response.data.map(function (item) {
                    item.custRelation = EnumType.Relation.getLabelByValue(item.custRelation);
                    var relaDate = new Date(item.relaDate);
                    item.relaDate = $filter('date')(relaDate, 'yyyy-MM-dd'); 
                	return item;
                  });
              });
          }

       // 删除
      $scope.delBusiOppCntr = function(item) {

          Alert.confirm("确定删除？").then(function() {
              var opts = {};
              opts.url = '/crm/ocrm/busiOpp/delBusiOppCntr';
              opts.method = 'PUT';
              opts.params = {
            		busiOppNo : item.busiOppNo,
            		contractCustNo : item.contractCustNo
              };
              HttpService.linkHttp(opts).then(function(response) {
                  // 执行查询
                  $scope.searchBusiOppCntr();
              });
          });

      };
      
      // -------------联系人信息结束--------------


      // -------------协作人信息开始--------------
      HttpService.linkHttp({
          url: '/crm/ocrm/busiOpp/busiOppCollaboratorList',
          method: 'GET',
          params: {'busiOppNo': busiOppNo}
      }).then(function (response) {
          $scope.busiOppCollaboratorList = response.data.map(function (item) {
                item.userStatNam = EnumType.UserStat.getLabelByValue(item.userStat);
          	  return item;
          });
      });

      $scope.searchCollaboratorObj = {
    		'collrNam' : '',
    		'busiOppNo': busiOppNo
      }
      
      
      $scope.searchBusiOppCollaborator = function() {
          HttpService.linkHttp({
              url: '/crm/ocrm/busiOpp/busiOppCollaboratorList',
              method: 'GET',
              params: $scope.searchCollaboratorObj
          }).then(function (response) {
              $scope.busiOppCollaboratorList = response.data.map(function (item) {
                    item.userStatNam = EnumType.UserStat.getLabelByValue(item.userStat);
              	  return item;
              });
          });

      }

      $scope.clearBusiOppCollaboratorSearch = function() {
          $scope.searchCollaboratorObj = {
          		'collrNam' : '',
          		'busiOppNo': busiOppNo
            }
          $scope.searchBusiOppCollaborator();
      }

      $scope.userIdList = [];
      $scope.addBusiOppCollaborator = function() {

			var modalInstance = $uibModal
					.open({
						animation : true,
						backdrop : 'static',
						templateUrl : 'app/pages/mgrcenter/usermanagement/popupPages/getuserlist.html',
						size : 'midle-900',
						controller : 'getuserlistCtrl',
						scope : $scope,
						resolve : {
							items : function() {
								return $scope.items;
							}
						}
					});
			modalInstance.result.then(function(result) {
				angular.forEach(result, function(i) {
					$scope.userIdList.push(i.userId);
				});
	            HttpService.linkHttp({
	                url: '/crm/ocrm/busiOpp/addBusiOppCollaborator',
	                method: 'PUT',
	                params: {
	                	'busiOppNo' : busiOppNo,
	                	'custNo' : custNo,
	                	'userIdList' : $scope.userIdList
	                }
	            }).then(function (response) {
	            	$scope.clearBusiOppCollaboratorSearch();
	            	 $scope.searchBusiOppCollaborator();
	            });
			}, function(reason) {
			});
			
		}
      //----------------删除开始-----------------
      $scope.delBusiCollr = function(item) {

          if (item.busiOppNo  == undefined || item.busiOppNo  == '') {
              Alert.error('商机编码不能为空');
              return;
          }
          if (item.collaborator  == undefined || item.collaborator  == '') {
              Alert.error('商机协作人ID不能为空');
              return;
          }
          Alert.confirm("确定删除？").then(function() {
              var opts = {};
              opts.url = 'crm/ocrm/busiOpp/delBusiOppCollaborator';
              opts.method = 'PUT';
              opts.params = {
              		busiOppNo : item.busiOppNo,
              		collaborator : item.collaborator
              };
              HttpService.linkHttp(opts).then(function(response) {
                  // 执行查询
	            	$scope.clearBusiOppCollaboratorSearch();
	            	 $scope.searchBusiOppCollaborator();
              });
          });

      };
		//----------------删除结束-----------------
      // -------------协作人信息结束--------------

      // -------------任务信息开始--------------
		// 信息发送定义对象
		$scope.msg = {};
		// 查询条件对象
		$scope.searchObj = {
			'taskName' : '',
			'oppertId' : busiOppNo
		};
		// 信息发送定义对象数据集
		$scope.busiOppTaskList = [];

		// 重置
		$scope.clearBusiOppTaskSearch = function() {
			$scope.searchObj = {
					'taskName' : '',
					'oppertId' : busiOppNo
				};
			$scope.searchBusiOppTask();
		}
		// 查询事件
		$scope.searchBusiOppTask = function() {

			var opts = {};
			opts.url = '/crm/ocrm/task/getMulti';
			opts.method = 'GET';
			opts.params = $scope.searchObj;
			HttpService.linkHttp(opts).then(function(response) {
				angular.forEach(response.data, function(item) {
					item.taskStatNam = EnumType.TaskStat.getLabelByValue(item.taskStat);
				})
				$scope.busiOppTaskList = response.data;
              $scope.total = response.data==null?0:response.data.length;
			});
		}
		// 页面初始化查询
		$scope.searchBusiOppTask();
		
		// 新增事件
		$scope.addBusiOppTask = function() {
			$scope.saveTask = {};
			$scope.isUpd = "false";

			 var modalInstance = $uibModal
					.open({
						animation : true,
						backdrop : 'static',
				        templateUrl : 'app/pages/taskService/popupPages/taskModal.html',
				        size : 'midle-900',
				        controller : 'taskTaskModalCtrl',
						scope : $scope,
		                resolve: {
		                    'taskId': function () {
		                        return '';
		                    }, 'custNo': function () {
		                        return '';
		                    }
		                }
					});
            modalInstance.result.then(function(){
                $scope.clearBusiOppTaskSearch();
            });
		}
		$scope.getBusiOppTask = function(item) {
			 var modalInstance = $uibModal
					.open({
						animation : true,
						backdrop : 'static',
				        templateUrl : 'app/pages/taskService/popupPages/getTask.html',
				        size : 'midle-900',
				        controller : 'taskTaskModalCtrl',
						scope : $scope,
		                resolve: {
		                    'taskId': function () {
		                        return item.id;
		                    }
		                }
					});
		}
		// 修改事件
		$scope.uptbusiOppTask = function(item) {
			 var modalInstance = $uibModal
				.open({
					animation : true,
					backdrop : 'static',
					templateUrl : 'app/pages/taskService/popupPages/taskModal.html',
			        size : 'midle-900',
			        controller : 'taskTaskModalCtrl',
					scope : $scope,
	                resolve: {
	                    'taskId': function () {
	                        return item.id;
	                    }, 'custNo': function () {
	                        return '';
	                    }
	                }
				});
			     modalInstance.result.then(function(){
			         $scope.clearBusiOppTaskSearch();
			     });
		}

		// 物理删除事件（单行删除）
		$scope.delBusiOppTask = function(item) {

			Alert.confirm("确定删除？").then(function() {
				var taskIdVar = "";
				
				var optForId = {};
				optForId.url = '/crm/ocrm/task/getOne';
				optForId.method = 'GET';
				optForId.params = item;
				HttpService.linkHttp(optForId).then(function(response) {
					taskIdVar = response.data.id;
					
					var opts = {};
					opts.url = '/crm/ocrm/task/deleteOne';
					opts.method = 'DELETE';
					opts.params = {
							id : taskIdVar
					};
					HttpService.linkHttp(opts).then(function(response) {
						// 执行查询
						$scope.searchBusiOppTask();
					});
				});
			});
		};
      // -------------任务信息结束--------------
      


      
  }
})();
