(function () {
    'use strict';

    angular.module('BlurAdmin.pages.customer.custContractDetail')
        .controller('custContractDetailCtrl', custContractDetailCtrl);

    /** @ngInject */
    function custContractDetailCtrl($scope,$state,$stateParams,$uibModal, $rootScope, HttpService, EnumType,$filter, Alert,$sce) {
        var contractNo = $stateParams.contractNo;
        // 用户初始化
        $scope.userInfo = {
    			'userId' : '',
    			'userName' : ''
    		};
        $scope.init = function() {
			var opts = {};
			opts.url = '/crm/manage/usermng/user';
			opts.method = 'GET';
			opts.params = {'userID':$rootScope.global.user};
			//console.log($rootScope.global.user);
			HttpService.linkHttp(opts).then(function(response) {
				$scope.userInfo = response.data;
			});
		}
        $scope.init();
        // -------------联系人基本信息开始--------------
        $scope.getOneContract = function(){
        	var opts = {};
			opts.url = '/crm/ocrm/CustContractmng/getCustContracts';
			opts.method = 'GET';
			opts.params = {'contractNo':contractNo};
			HttpService.linkHttp(opts).then(function(response) {
				$scope.custContract = response.data;
				//日期处理
	            var birthDate = new Date(response.data.birthDate);
	            $scope.custContract.birthDate = $filter('date')(birthDate, 'yyyy-MM-dd');
	            var certEffDate = new Date(response.data.certEffDate);
	            $scope.custContract.certEffDate = $filter('date')(certEffDate, 'yyyy-MM-dd');
	            var passportEffDate = new Date(response.data.passportEffDate);
	            $scope.custContract.passportEffDate = $filter('date')(passportEffDate, 'yyyy-MM-dd');
	            // 初始化下拉列表的值
	            $scope.custContract.eduDegree = EnumType.Degree.getLabelByValue(response.data.eduDegree);
	            $scope.custContract.sex = EnumType.Sex.getLabelByValue(response.data.sex);
	            $scope.custContract.blnCustType = EnumType.CustType.getLabelByValue(response.data.blnCustType);
	            $scope.custContract.blnBusiness = EnumType.BusinessType.getLabelByValue(response.data.blnBusiness);
				
				 $scope.initProvCityCty($scope.custContract.blnProvince, $scope.custContract.blnCity, $scope.custContract.blnCounty);

			});
        }
        $scope.getOneContract();
     // 地址初始化
        $scope.provList = [];
        $scope.provListObj = [];
        $scope.liveCityListObj = [];
        $scope.liveCountyListObj = [];
        var provOpt = {};
		provOpt.url = '/crm/manage/cm/getProv';
		provOpt.method = 'GET';
		HttpService.linkHttp(provOpt).then(function(response) {
			angular.forEach(
					response.data,
					function(item) {
						$scope.provListObj.push({
									label : item.provinceName,
									value : item.provinceCode
								});
					})
			$scope.provList=$scope.provListObj;
		});

        $scope.initProvCityCty = function(provCd, cityCd, countyCd){
//		console.log("provCd=" + provCd);
//		console.log("cityCd=" + cityCd);
//		console.log("countyCd=" + countyCd);
		if (provCd == null || provCd == undefined) {
			//console.log("省份代码为空");
			return;
		}
			angular.forEach(
					$scope.provList,
			function(item) {
				if (item.value == provCd) {
					// 省赋值
					$scope.custContract.blnProvince = item.label;
					$scope.p = item;

					var cityOpt = {};
					cityOpt.url = '/crm/manage/cm/getCityByProv';
					cityOpt.method = 'GET';
					cityOpt.params = {provinceCode : provCd};
						HttpService.linkHttp(cityOpt).then(function(response) {
							if (response.data == null || response.data == undefined) {
								//console.log("获取市信息为空");
								return;
							}
							//console.log(response.data);
							angular.forEach(
									response.data,
									function(item) {
										$scope.liveCityListObj.push({
													label : item.cityName,
													value : item.cityCode
												});
									})
							$scope.blnCityList=$scope.liveCityListObj;
							angular.forEach(
									$scope.blnCityList,
									function(item) {
										if (item.value == cityCd) {
											// 市赋值
											$scope.custContract.blnCity = item.label;
											$scope.c = item;
											var ctyOpt = {};
											ctyOpt.url = '/crm/manage/cm/getCountyByProvCity';
											ctyOpt.method = 'GET';
											ctyOpt.params = {
														provinceCode : $scope.p.value,
														cityCode : $scope.c.value
												};
												HttpService.linkHttp(ctyOpt).then(function(response) {
													if (response.data == null || response.data == undefined) {
														//console.log("获取区县信息为空");
														return;
													}
													angular.forEach(
															response.data,
															function(item) {
																$scope.liveCountyListObj.push({
																			label : item.countyName,
																			value : item.countyCode
																		});
															})
													$scope.liveCountyList=$scope.liveCountyListObj;
													angular.forEach(
															$scope.liveCountyList,
															function(item) {
																if (item.value == countyCd) {
																	$scope.custContract.blnCounty = item.label;
																	return;
																}
															})
												});

										}
									})
						});
				}
			})

	}
        $scope.cusDetail = function (){
			$scope.custContract.contractNo = contractNo;
			$uibModal
			.open({
				animation : true,
				templateUrl : 'app/pages/customer/custContract/popupPages/updateCustContract.html',
                size: 'midle-900', 
                backdrop:'static',
				controller : 'updateCustContractCtrl',
				scope : $scope,
				resolve : {}
			});
		}
        // -------------联系人基本信息结束--------------
        
        // -------------动态轨迹开始------------------------------------------------------
        $scope.dyncTrackTel = {};
        $scope.dyncTrackVis = {};
        $scope.dyncTrackSms = {};
        $scope.TrackSubType  = EnumType.TrackSubType;//轨迹类型
        $scope.trackEnum = [];
		angular.forEach(
				$scope.TrackSubType,
				function(item) {
					if (item.value == '41' || item.value == '42' ) {
						$scope.trackEnum.push(item);
					}
				});
    	$scope.YesNoFlg  = EnumType.YesNoFlg;
    	$scope.writCount = 200;
    	$scope.selectTrackSubTyp = function(selectTrackSubTyp) {
			$scope.dyncTrackTel.trackSubTyp = selectTrackSubTyp;
		}

    	$scope.selectWhtThrough = function(selectWhtThrough) {
			$scope.dyncTrackTel.whtThrough = selectWhtThrough;
		}
    	
    	var initTrackTel = function() {
    		angular.forEach(
    				$scope.trackEnum,
    				function(item) {
    					if (item.value == '41') {
    						$scope.dyncTrackTel.trackSubTyp = item;
    					}
    				});
    		angular.forEach(
    				$scope.YesNoFlg,
    				function(item) {
    					if (item.value == '1') {
    						$scope.dyncTrackTel.whtThrough = item;
    					}
    				});
    	};

    	//  初始化
    	initTrackTel();
        //电话 短信 拜访选项卡
        $scope.c = 0;
        $scope.show=function(e){
			$scope.c=e;
		}
		$scope.information=[
			'电话','短信','拜访'
		]

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
        
    	$scope.nextFpOpen = nextFpOpen;
        $scope.nextFpOpened = false;
    	//-------------电话开始--------------

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
			if (contractNo == undefined || contractNo == '') {
				Alert.error("客户号不能为空");
				return;
			}
			
			if (trackTelObj.trackContent == undefined || trackTelObj.trackContent == '') {
				Alert.error("内容不能为空");
				return;
			}
			var curDate = new Date();
			if (trackTelObj.nextFollowUpTm != undefined && trackTelObj.nextFollowUpTm != '') {
				var nextFollowUpTm = new Date($scope.dyncTrackTel.nextFollowUpTm);
				trackTelObj.nextFollowUpTm = $filter('date')(nextFollowUpTm, 'yyyy-MM-dd HH:mm:ss'); 
			}
			trackTelObj.contractNo = contractNo;
			trackTelObj.trackType = trackTelObj.trackSubTyp.value;
			trackTelObj.contractCustNo = contractNo; //$scope.custContract.blnCustNo;
			trackTelObj.trackTime = $filter('date')(curDate, 'yyyy-MM-dd HH:mm:ss');
			trackTelObj.whtThrough = trackTelObj.whtThrough.value;
			trackTelObj.recordUser = $rootScope.global.user;

            HttpService.linkHttp({
                url: '/crm/ocrm/ContractTrackmng/addContractTrack',
                method: 'POST',
                params: trackTelObj
            }).then(function (response) {
            	$scope.searchDyncTrack();
            	$scope.resetTrackTel();
            	//reflashLastFollowUp();
            });
			if (trackTelObj.nextFollowUpTm != undefined && trackTelObj.nextFollowUpTm != '') {
				var nextFollowUpTm = new Date(trackTelObj.nextFollowUpTm);
				if(nextFollowUpTm < curDate){
					Alert.error("下次跟进日期必须在当前时间之后");
				}
				var trackTelObj2 = angular.copy(trackTelObj);
				trackTelObj2.nextFollowUpTm = $filter('date')(nextFollowUpTm, 'yyyy-MM-dd HH:mm:ss'); 
				trackTelObj2.trackType = '21';
				trackTelObj2.trackContent = '上次跟进记录：'+trackTelObj.trackContent;
				HttpService.linkHttp({
	                url: '/crm/ocrm/ContractTrackmng/addContractTrack',
	                method: 'POST',
	                params: trackTelObj2
	            }).then(function (response) {
	            	$scope.resetTrackVis();
	            	//reflashLastFollowUp();
	            });
				
				var opts = {};
				$scope.saveTask = {
						'taskName':'回防电话',
						'taskType':'3',//回访
						'taskStat':'1',
						'contactName':$scope.custContract.contractName,
						'contactId':contractNo,
						'responsName':$scope.userInfo.userName,
						'responsId':$rootScope.global.user,
						'taskDesc':trackTelObj2.trackContent
				}
				opts.url = '/crm/ocrm/task/postOne';
				opts.method = 'POST';
				opts.params = $scope.saveTask;
				opts.params.taskEndDate = $filter('date')(nextFollowUpTm, 'yyyyMMdd');
				HttpService.linkHttp(opts).then(function(response) {
					//console.log(response);
					$scope.saveTask = {};
					$scope.searchDyncTrack();
				});
			}

		}
    
        //-------------电话结束--------------
    	//-------------短信开始--------------


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
			if (contractNo == undefined || contractNo == '') {
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
			var curDate = new Date();

			trackSmsObj.contractNo = contractNo;
			trackSmsObj.trackType = '31';
			trackSmsObj.recordUser = $rootScope.global.user;
			trackSmsObj.contractCustNo = contractNo;//$scope.custContract.blnCustNo;
			trackSmsObj.trackTime = $filter('date')(curDate, 'yyyy-MM-dd HH:mm:ss');

			//console.log(trackSmsObj);
            HttpService.linkHttp({
                url: '/crm/ocrm/ContractTrackmng/addContractTrack',
                method: 'POST',
                params: trackSmsObj
            }).then(function (response) {
            	$scope.resetTrackSms();
            	$scope.searchDyncTrack();
            	//reflashLastFollowUp();
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
            }, function (reason) {
            });

        }
		$scope.tolCount = function () {
			//console.log($scope.dyncTrackSms.trackContent.length);
			$scope.writCount = 200 - $scope.dyncTrackSms.trackContent.length;
		};
		$scope.dyncTrackSms.contacts = 
    
        //-------------短信结束--------------
    	//-------------拜访开始--------------

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
			if (trackVisObj.location == undefined || trackVisObj.location == '') {
				Alert.error("拜访地点不能为空");
				return;
			}
			if (trackVisObj.trackContent == undefined || trackVisObj.trackContent == '') {
				Alert.error("内容不能为空");
				return;
			}
			if (trackVisObj.nextFollowUpTm != undefined && trackVisObj.nextFollowUpTm != '') {
				var nextFollowUpTm = new Date($scope.dyncTrackVis.nextFollowUpTm);
				trackVisObj.nextFollowUpTm = $filter('date')(nextFollowUpTm, 'yyyy-MM-dd HH:mm:ss'); 
			}			
			var curDate = new Date();
			trackVisObj.contractNo = contractNo;
			trackVisObj.recordUser = $rootScope.global.user;
			trackVisObj.trackType = '59';
			trackVisObj.contractCustNo = contractNo; //$scope.custContract.blnCustNo;
			trackVisObj.trackTime = $filter('date')(curDate, 'yyyy-MM-dd HH:mm:ss');
            HttpService.linkHttp({
                url: '/crm/ocrm/ContractTrackmng/addContractTrack',
                method: 'POST',
                params: trackVisObj
            }).then(function (response) {
            	$scope.resetTrackVis();
            	//reflashLastFollowUp();
            });
            // 任务的轨迹
			if (trackVisObj.nextFollowUpTm != undefined && trackVisObj.nextFollowUpTm != '') {
				var nextFollowUpTm = new Date($scope.dyncTrackVis.nextFollowUpTm);
				if(nextFollowUpTm < curDate){
					Alert.error("下次跟进日期必须在当前时间之后");
				}
				var trackVisObj2 = angular.copy(trackVisObj);

				trackVisObj2.nextFollowUpTm = $filter('date')(nextFollowUpTm, 'yyyy-MM-dd HH:mm:ss'); 
				trackVisObj2.trackType = '21';// 任务创建
				trackVisObj2.trackContent = '地点：'+trackVisObj2.location+'，上次跟进记录：'+trackVisObj2.trackContent;
				HttpService.linkHttp({
	                url: '/crm/ocrm/ContractTrackmng/addContractTrack',
	                method: 'POST',
	                params: trackVisObj2
	            }).then(function (response) {
	            	$scope.resetTrackVis();
	            	$scope.searchDyncTrack();
	            	//reflashLastFollowUp();
	            });
				// 新增任务
				var opts = {};
				$scope.saveTask = {
						'taskName':'上门拜访',
						'taskType':'3',//回访
						'taskStat':'1',
						'contactName':$scope.custContract.contractName,
						'contactId':contractNo,
						'responsName':$scope.userInfo.userName,
						'responsId':$rootScope.global.user,
						'taskDesc':trackVisObj2.trackContent
				}
				opts.url = '/crm/ocrm/task/postOne';
				opts.method = 'POST';
				opts.params = $scope.saveTask;
				opts.params.taskEndDate = $filter('date')(nextFollowUpTm, 'yyyyMMdd');
				HttpService.linkHttp(opts).then(function(response) {
					$scope.saveTask = {};
					$scope.searchDyncTrack();
				});
			}

		}
    
        //-------------拜访结束--------------
		
        $scope.searchDyncTrackObj = {
                'contractCustNo' : contractNo
            };

        $scope.clearDyncTrackSearch = function() {
            $scope.searchDyncTrackObj = {
                    'contractCustNo' : contractNo
                };

            $scope.searchDyncTrack();
        }
        // 查询事件
        $scope.searchDyncTrack = function() {
        	//trackType 31 41 42 59 21
            var opts = {};
            opts.url = '/crm/ocrm/ContractTrackmng/getAllContractTracks';
            opts.method = 'GET';
            opts.params =  {'contractCustNo' : contractNo};
            HttpService.linkHttp(opts).then(function(response) {
                for (var index in response.data) {
                    if (response.data[index].nextFollowUpTm == undefined||response.data[index].nextFollowUpTm == '') {
                    	response.data[index].show = false;
                    }else{
                    	response.data[index].show = true; 
                    }
                	
                }
                $scope.timelineCollection = response.data;
                //console.log($scope.timelineCollection);
                
            });
        }
        $scope.searchDyncTrack();
        $scope.showType = function(trackType){
        	var Label="";
			angular.forEach(EnumType.TrackSubType, function(i) {
				if (trackType == i.value) {
					Label=i.label;
				}
			});

			return Label;
        	
        }
        
        // -------------动态轨迹结束------------------------------------------------------
        
        // -------------任务开始--------------
        
		// 查询条件对象
		$scope.searchTaskObj = {'contantId' : contractNo,
				'taskName' : ''};
		// 信息发送定义对象数据集
		$scope.TaskRowCollection = [];

		
		// 查询事件
		$scope.searchTask = function() {
			var opts = {};
			opts.url = '/crm/ocrm/task/getMulti';
			opts.method = 'GET';
			opts.params = $scope.searchTaskObj;
			HttpService.linkHttp(opts).then(function(response) {
				
				angular.forEach(response.data, function(item) {
					item.taskStat = EnumType.TaskStat.getLabelByValue(item.taskStat);
					item.taskEndDate = item.taskEndDate.substring(0,4)+"-"+ item.taskEndDate.substring(4,6)+"-"+ item.taskEndDate.substring(6,8);
				})
			
				$scope.TaskRowCollection = response.data;
                $scope.totalTask = response.data==null?0:response.data.length;
			});
		}
       // -------------任务结束--------------

    }

})();
