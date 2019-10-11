(function () {
    'use strict';

    angular.module('BlurAdmin.pages.portrayal.perCusPortrayal')
        .controller('updateCustContractCtrl', updateCustContractCtrl);

    /** @ngInject */
    function updateCustContractCtrl($scope, HttpService, EnumType,/*custNo,*/$uibModalInstance,  $filter,$uibModal, Alert) {
    	// 初始化查询联系人
    	var opts = {};
		opts.url = '/crm/ocrm/CustContractmng/getCustContracts';
		opts.method = 'GET';
		opts.params = $scope.custContract;
		HttpService.linkHttp(opts).then(function(response) {
			$scope.custContract = response.data;
			//日期处理
            var birthDate = new Date(response.data.birthDate);
            $scope.custContract.birthDate = birthDate;
            var certEffDate = new Date(response.data.certEffDate);
            $scope.custContract.certEffDate = certEffDate;
            var passportEffDate = new Date(response.data.passportEffDate);
            $scope.custContract.passportEffDate = passportEffDate;
            // 初始化下拉列表的值
            angular.forEach(EnumType.Sex, function(i) {
				if (response.data.sex === i.value) {
					$scope.custContract.sex = i;
				}
			});
            
            angular.forEach(EnumType.CustType, function(i) {
				if (response.data.blnCustType === i.value) {
					$scope.custContract.blnCustType = i;
				}
			});
			
			angular.forEach(EnumType.Degree, function(i) {
				if (response.data.eduDegree === i.value) {
					$scope.custContract.eduDegree = i;
				}
			});
			
			angular.forEach(EnumType.BusinessType, function(i) {
				if (response.data.blnBusiness === i.value) {
					$scope.custContract.blnBusiness = i;
				}
			});
			
			 $scope.initProvCityCty($scope.custContract.blnProvince, $scope.custContract.blnCity, $scope.custContract.blnCounty);
		});
		
    	var defaultJpg = "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAnFBMVEUAAADu9fju8vjv8vnv8vnv\r\n8/nw8/nv8/nv8/fu8vjv8/jv8/jv8/jv8/jv8/jv8/jv9Pju8/jv8/jw8/jw9Pjw9Pnx9Pnx9fny\r\n9fny9vny9vrz9vr09vr09/r19/r19/v1+Pv2+Pv3+fz4+fz4+vz5+vz5+/z5+/36+/36/P37/P38\r\n/P38/P78/f79/f79/v7+/v7+/v/+//////+bhRQdAAAAEnRSTlMASk1QUVJTfoGLj7/Bwu7y9PdM\r\nvn5QAAAAAWJLR0QzN9V8XgAAAhlJREFUaN7t2ttymzAQgGE1bdND4hwwqMQKDgLsUFpx8L7/u8Xp\r\nRaeJjLySVlx09L/ANxoGacXAGLtc3STBurn+zI59TwL37biOJHgf2So8csXuwiO3LFmgiEQkIhGJ\r\nSET+XyQ/FhQROwV/UjsRCCl7+Kf+KQDCO3hXx6kRMYHWJGiRAk5WUCKbw2nkkNMh2QAz9SkZsofZ\r\nGioknzfgwImQnQFBLQWBrCcTMtEgBRh7JEEqM1KRIK0ZaUmQX2akI0GUGVEkyO8lVrLIM2nMSL3E\r\ne1KQIJkZSWn2rtbzkaCQjQnJiRDTUvZkh9aP2X145GRIIuYQ3LyCnFbkaaOknbuKU3PXY0KLJLk2\r\nsfTowRs/C6fVm8WMMsxUn8q/83An0yQM8upsyrJ8eljH61xEIjK3F5dNp1TfK9U15SYAwuXPd1vk\r\n1EpOimy7mcFuS4bIYf74HSQJIs7NwsIbyZ7hbPvUDxEjIBqFDyIBmXRHGkBXuyIWhvmqbUBqsKpy\r\nQSRYJu0RAdYJW4SP9siQWSItOPRshxTgVGGDpIMb0tsgEhyTeGQ9uiLDGo04L2TmxsIcvqZYf2lh\r\nlt8cz5YjkdoHqZCI8kEUDuHgVYZCtn5IgUIaP6RGIa0f0qKQ3g/pUYifAYclEMAgmS+iz5P6bz7c\r\nF9EuFLf6D0veK9Hexit2oZ2Kvoh2pHxg7GvoB//l9Ve1y9V9uPfk/voTYy8aJRqRMUdwWwAAAABJ\r\nRU5ErkJggg==";
    	$scope.open = open;
        $scope.opened = false;
        $scope.perIconImg = defaultJpg;

        $scope.sexItems = EnumType.Sex;
        $scope.idTypes = EnumType.IdType;
        $scope.custTypes = EnumType.CustType;
        $scope.dataSources = EnumType.DataSource;
        $scope.nationalitys = EnumType.Nationality;
        $scope.YesNoFlgs = EnumType.YesNoFlg;
        $scope.Degrees = EnumType.Degree;
        $scope.BusinessTypes = EnumType.BusinessType;
        $scope.Marriage = EnumType.Marriage;
        
        // 居住
        $scope.provList = [];
        $scope.liveCityList = [];
        $scope.liveCountyList = [];

        $scope.liveCityListObj = [];
        $scope.liveCountyListObj = [];

        // 单位
        $scope.unitProvList = [];
        $scope.unitCityList = [];
        $scope.unitCountyList = [];

        $scope.unitCityListObj = [];
        $scope.unitCountyListObj = [];

        // 公用
        $scope.custContract = {};
        $scope.provListObj = [];
        $scope.custContract.custTyp = EnumType.CustType.getEnumByValue("03");

        //信息选项卡
        $scope.information_a = 0;
        $scope.index_=function(){
        	$scope.information_a++;
        }
        $scope.information = ['基本信息','详细信息','社交信息'];
		$scope.fan_information=function(e){
			$scope.information_a=e;
		}
		$scope.saveTask = {
        		'custId' : '',
        		'custName' : '',
        		'custTyp' : '', 
        };
		 //查询客户
		$scope.openCustList = function(){
			$scope.openType = "cust";
			$uibModal
			.open({
				animation : true,
//				backdrop : 'static',
		        templateUrl : 'app/pages/taskService/allTask/popupPages/peopleModal.html',
		        size : 'midle-1200',
		        controller : 'allTaskPeopleModalCtrl',
				scope : $scope,
				resolve : {}
			});
			$scope.saveTask;
		}
		
        /*联动查询*/
		var provOpt = {};
		provOpt.url = '/crm/manage/cm/getProv';
		provOpt.method = 'GET';
		HttpService.linkHttp(provOpt).then(function(response) {
			$scope.liveCityList.splice(0, $scope.liveCityList.length);
			$scope.liveCountyList.splice(0, $scope.liveCountyList.length);

			$scope.custContract.blnCity = "";
			$scope.custContract.blnCounty = "";

			$scope.unitCityList.splice(0, $scope.unitCityList.length);
			$scope.unitCountyList.splice(0, $scope.unitCountyList.length);

			$scope.custContract.unitCity = "";
			$scope.custContract.unitCounty = "";

			angular.forEach(
					response.data,
					function(item) {
						$scope.provListObj.push({
									label : item.provinceName,
									value : item.provinceCode
								});
					})
			$scope.provList=$scope.provListObj;
			$scope.unitProvList=$scope.provListObj;
		});

		  $scope.getCityByProv = function(addrTyp){
			// 居住
			if (addrTyp == '0') {
				$scope.liveCityList.splice(0, $scope.liveCityList.length);
				$scope.liveCountyList.splice(0, $scope.liveCountyList.length);

				$scope.custContract.blnCity = "";
				$scope.custContract.blnCounty = "";

				var cityOpt = {};
				cityOpt.url = '/crm/manage/cm/getCityByProv';
				cityOpt.method = 'GET';
				cityOpt.params = {provinceCode : $scope.custContract.blnProvince.value};
					HttpService.linkHttp(cityOpt).then(function(response) {
						angular.forEach(
								response.data,
								function(item) {
									$scope.liveCityListObj.push({
												label : item.cityName,
												value : item.cityCode
											});
								})
						$scope.liveCityList=$scope.liveCityListObj;
					});
			}

			// 单位
			if (addrTyp == '1') {
				$scope.unitCityList.splice(0, $scope.unitCityList.length);
				$scope.unitCountyList.splice(0, $scope.unitCountyList.length);

				$scope.custContract.unitCity = "";
				$scope.custContract.unitCounty = "";

				var cityOpt = {};
				cityOpt.url = '/crm/manage/cm/getCityByProv';
				cityOpt.method = 'GET';
				cityOpt.params = {provinceCode : $scope.custContract.unitProvince.value};
					HttpService.linkHttp(cityOpt).then(function(response) {
						angular.forEach(
								response.data,
								function(item) {
									$scope.unitCityListObj.push({
												label : item.cityName,
												value : item.cityCode
											});
								})
						$scope.unitCityList=$scope.unitCityListObj;
					});
			}
}

		  $scope.getCountyByProvCty = function(addrTyp){
				if (addrTyp == '0') {
					$scope.liveCountyList.splice(0, $scope.liveCountyList.length);
					$scope.custContract.blnCounty = "";

						var ctyOpt = {};
						ctyOpt.url = '/crm/manage/cm/getCountyByProvCity';
						ctyOpt.method = 'GET';
						ctyOpt.params = {
									provinceCode : $scope.custContract.blnProvince.value,
									cityCode : $scope.custContract.blnCity.value
							};
							HttpService.linkHttp(ctyOpt).then(function(response) {
								angular.forEach(
										response.data,
										function(item) {
											$scope.liveCountyListObj.push({
														label : item.countyName,
														value : item.countyCode
													});
										})
								$scope.liveCountyList=$scope.liveCountyListObj;
				  });
				}
				if (addrTyp == '1') {
					$scope.unitCountyList.splice(0, $scope.unitCountyList.length);
					$scope.custContract.unitCounty = "";

						var ctyOpt = {};
						ctyOpt.url = '/crm/manage/cm/getCountyByProvCity';
						ctyOpt.method = 'GET';
						ctyOpt.params = {
									provinceCode : $scope.custContract.unitProvince.value,
									cityCode : $scope.custContract.unitCity.value
							};
							HttpService.linkHttp(ctyOpt).then(function(response) {
								angular.forEach(
										response.data,
										function(item) {
											$scope.unitCountyListObj.push({
														label : item.countyName,
														value : item.countyCode
													});
										})
								$scope.unitCountyList=$scope.unitCountyListObj;
				  });
				}
	}

		  $scope.save = function(){
			$scope.custContract;
            var customObj = angular.copy($scope.custContract);
            if (customObj.contractName == null || customObj.contractName == undefined) {
            	Alert.error("姓名不能为空");
            	return;
            }

            if (customObj.blnCustNo == null || customObj.blnCustNo == undefined) {
            	Alert.error("手机号码不能为空");
            	return;
            }

            if (customObj.sex == null || customObj.sex == undefined) {
            	Alert.error("性别不能为空");
            	return;
            }

            if ($scope.custContract.birthDate == null || $scope.custContract.birthDate == undefined) {
            	Alert.error("出生日期不能为空");
            	return;
            }

            if (customObj.certNo == null || customObj.certNo == undefined) {
            	Alert.error("证件号码不能为空");
            	return;
            }


//            customObj.custTyp = customObj.custTyp.value;
//            customObj.custSource = customObj.custSource.value;
//            customObj.nationality = customObj.nationality == undefined ? null:customObj.nationality.value;
//            customObj.marrigeSts = customObj.marrigeSts  == undefined ? null:customObj.marrigeSts.value;
//            customObj.eduDegree = customObj.eduDegree == undefined ? null:customObj.eduDegree.value;
//            customObj.trade = customObj.trade == undefined ? null:customObj.trade.value;
//            customObj.sex = customObj.sex.value;
//            var birthDate = new Date($scope.custContract.birthDate);
//            customObj.birthDate = $filter('date')(birthDate, 'yyyy-MM-dd'); 
//            if (customObj.keyCustFlg == undefined) {
//                customObj.keyCustFlg = '0';
//            } else {
//                customObj.keyCustFlg = customObj.keyCustFlg.value == true? '1' : '0';
//            }
//            customObj.liveAddrTyp = EnumType.AddrTyp.home_addr.value;
//            customObj.liveProvince = customObj.liveProvince == undefined ? null:customObj.liveProvince.value;
//            customObj.liveCity = customObj.liveCity == undefined ? null:customObj.liveCity.value;
//            customObj.liveCounty = customObj.liveCounty == undefined ? null:customObj.liveCounty.value;
//
//            customObj.unitAddrTyp = EnumType.AddrTyp.company_addr.value;
//            customObj.unitProvince = customObj.unitProvince == undefined ? null:customObj.unitProvince.value;
//            customObj.unitCity = customObj.unitCity == undefined ? null:customObj.unitCity.value;
//            customObj.unitCounty = customObj.unitCounty == undefined ? null:customObj.unitCounty.value;
//            customObj.liveAddrNam = "";
//            customObj.unitAddrNam = "";
//
//            var fd = new FormData();
//            fd.append('file', $scope.perIconFile);
//            fd.append('custBaseInfoStr', angular.toJson(customObj));

//            HttpService.linkHttp({
//                url: 'crm/ecif/cust/mng/addPerCustInfo',
//                method: 'POST',
//                headers: {'Content-Type': undefined},
//                data: fd
//            }).then(function (response) {
//                $scope.perIconImg = response.data;
//                $uibModalInstance.close();
//            });
            
            $scope.custContract.sex  = $scope.custContract.sex.value;
            $scope.custContract.blnCustType = $scope.custContract.blnCustType == undefined ? null:$scope.custContract.blnCustType.value;
            $scope.custContract.eduDegree = $scope.custContract.eduDegree == undefined ? null:$scope.custContract.eduDegree.value;
            $scope.custContract.blnBusiness = $scope.custContract.blnBusiness == undefined ? null:$scope.custContract.blnBusiness.value;
            $scope.custContract.blnProvince = $scope.custContract.blnProvince == undefined ? null:$scope.custContract.blnProvince.value;
            $scope.custContract.blnCity = $scope.custContract.blnCity == undefined ? null:$scope.custContract.blnCity.value;
            $scope.custContract.blnCounty = $scope.custContract.blnCounty == undefined ? null:$scope.custContract.blnCounty.value;
            var birthDate = new Date($scope.custContract.birthDate);
            var certEffDate = new Date($scope.custContract.certEffDate);
            var passportEffDate = new Date($scope.custContract.passportEffDate);
            $scope.custContract.birthDate = $filter('date')(birthDate, 'yyyy-MM-dd');
            $scope.custContract.certEffDate = $filter('date')(certEffDate, 'yyyy-MM-dd');
            $scope.custContract.passportEffDate = $filter('date')(passportEffDate, 'yyyy-MM-dd');

            var opts = {};
			opts.url = '/crm/ocrm/CustContractmng/CustContract';
			opts.method = 'PUT';
			opts.params = $scope.custContract;
			HttpService.linkHttp(opts).then(function(response) {
				$scope.custLifeCycleDef = {};
				// 执行查询
				$uibModalInstance.close();
				$scope.search();
			});
            
        };
        // 地址初始化
        $scope.initProvCityCty = function(provCd, cityCd, countyCd){
		if (provCd == null || provCd == undefined) {
			//console.log("省份代码为空");
			return;
		}
			angular.forEach(
					$scope.provList,
			function(item) {
				if (item.value == provCd) {
					// 省赋值
					$scope.custContract.blnProvince = item;
					var cityOpt = {};
					cityOpt.url = '/crm/manage/cm/getCityByProv';
					cityOpt.method = 'GET';
					cityOpt.params = {provinceCode : provCd};
						HttpService.linkHttp(cityOpt).then(function(response) {
							if (response.data == null || response.data == undefined) {
								//console.log("获取市信息为空");
								return;
							}
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
											$scope.custContract.blnCity = item;
											var ctyOpt = {};
											ctyOpt.url = '/crm/manage/cm/getCountyByProvCity';
											ctyOpt.method = 'GET';
											ctyOpt.params = {
														provinceCode : $scope.custContract.blnProvince.value,
														cityCode : $scope.custContract.blnCity.value
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
																	$scope.custContract.blnCounty = item;
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

        $scope.open1 = open1;
    	$scope.open2 = open2;
        $scope.opened1 = false;
        $scope.opened2 = false;

        // 打开日期控件
        function open() {
            $scope.opened = true;
        }
        function open1() {
            $scope.opened1 = true;
        }
        function open2() {
            $scope.opened2 = true;
        }
    }

})();
