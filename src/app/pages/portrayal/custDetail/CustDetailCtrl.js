(function () {
    'use strict';

    angular.module('BlurAdmin.pages.portrayal.perCusPortrayal')
        .controller('CustDetailCtrl', CustDetailCtrl);

    /** @ngInject */
    function CustDetailCtrl($scope, HttpService, EnumType,custNo,$uibModalInstance, $filter, $uibModal, Alert, $rootScope, Valid) {
    	$scope.open = open;
        $scope.opened = false;
    	$scope.open1 = {
            opened:false
        }
        $scope.open2 = {
            opened:false
        }
        $scope.sexItems = EnumType.Sex;
        $scope.idTypes = EnumType.IdType;
        $scope.custTypes = EnumType.CustType;
        $scope.dataSources = EnumType.DataSource;
        $scope.nationalitys = EnumType.Nationality;
        $scope.YesNoFlgs = EnumType.YesNoFlg;
        $scope.Degrees = EnumType.Degree;
        $scope.BusinessTypes = EnumType.BusinessType;
        $scope.Marriage = EnumType.Marriage;
        $scope.Nation = EnumType.Nation;
        $scope.PoliticalStatus = EnumType.PoliticalStatus;

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
        $scope.custom = {};
        $scope.provListObj = [];

        // init
        $scope.provInitList = [];

      //信息选项卡
        $scope.information_a = 0;
        $scope.index_=function(){
        	$scope.information_a++;
        }
        $scope.information = ['基本信息','详细信息','社交信息'];
		$scope.fan_information=function(e){
			$scope.information_a=e;
		}

        /*联动查询*/
		var provOpt = {};
		provOpt.url = '/crm/manage/cm/getProv';
		provOpt.method = 'GET';
		HttpService.linkHttp(provOpt).then(function(response) {
			$scope.custom.liveCity = "";
			$scope.custom.liveCounty = "";

			$scope.custom.unitCity = "";
			$scope.custom.unitCounty = "";

			console.log(response.data);
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

        HttpService.linkHttp({
            url: 'crm/ecif/cust/mng/perCustInfo',
            method: 'GET',
            params: {'custNo': custNo}
        }).then(function (response) {
            response.data.nation = EnumType.Nation.getEnumByValue(response.data.nation);
            response.data.politSts = EnumType.PoliticalStatus.getEnumByValue(response.data.politSts);

            response.data.certTyp = EnumType.IdType.getEnumByValue(response.data.certTyp);
            response.data.custTyp = EnumType.CustType.getEnumByValue(response.data.custTyp);
            response.data.custSource = EnumType.DataSource.getEnumByValue(response.data.custSource);
            response.data.nationality = EnumType.Nationality.getEnumByValue(response.data.nationality);
            response.data.marrigeSts = EnumType.Marriage.getEnumByValue(response.data.marrigeSts);
            response.data.eduDegree = EnumType.Degree.getEnumByValue(response.data.eduDegree);
            response.data.trade = EnumType.BusinessType.getEnumByValue(response.data.trade);
            response.data.liveAddrTyp = EnumType.AddrTyp.getEnumByValue(response.data.liveAddrTyp);
            response.data.unitAddrTyp = EnumType.AddrTyp.getEnumByValue(response.data.unitAddrTyp);
            response.data.sex = EnumType.Sex.getEnumByValue(response.data.sex);
            response.data.keyCustFlg = response.data.keyCustFlg == '1'?true: false;
            // response.data.addressList = response.data.addrList;
            $scope.custom = response.data;
            $scope.custom.liveProvince = {}
			$scope.custom.liveCity = {};
			$scope.custom.liveCounty = {};

//            var birthDate = new Date(response.data.birthDate);
//            $scope.custom.birthDate = $filter('date')(birthDate, 'yyyy-MM-dd HH:mm:ss');
            if(response.data.birthDate != null) {
            	var v = new Date(response.data.birthDate);
                $scope.custom.birthDate = v;
            }
            if(response.data.certDate != null) {
            	$scope.custom.certDate = new Date(response.data.certDate);
            }
            $scope.custom.keyCustFlg = $scope.custom.keyCustFlg == '1'?true: false;
            $scope.common = {addressList : []}
            if ($scope.custom.addrList && $scope.custom.addrList.length>0) {
            	$scope.custom.addrList.forEach(function(item,index){
            		$scope.initProvCityCty(index, item.provCd, item.cityCd, item.countyCd);
            		$scope.common.addressList.push({
            			id:index,
            			provCd:item.provCd,
            			cityCd:item.cityCd,
            			countyCd:item.countyCd,
            			streetAddr:item.streetAddr,
            			postcode:item.postcode,
            			whtDefaultAddr:item.whtDefaultAddr
            		})
            		// item.index = index
            	})
            }
             // $scope.initProvCityCty('0', $scope.custom.liveProvince, $scope.custom.liveCity, $scope.custom.liveCounty);
             // $scope.initProvCityCty('1', $scope.custom.unitProvince, $scope.custom.unitCity, $scope.custom.unitCounty);
             $scope.perIconImg = $scope.custom.perIconSmlBlob;
 			var opts = {};
			opts.url = '/crm/manage/usermng/getUserByEmployeeID';
			opts.method = 'GET';
			opts.params = {'employeeId':$rootScope.global.employeeId};
			HttpService.linkHttp(opts).then(function(response) {
				$scope.custom.custAgentNam = response.data.userName;
			});

        });

		$scope.getCityByProv = function(item){
			$scope.custom.liveCity[item.id] = "";
			$scope.custom.liveCounty[item.id] = "";
			$scope.liveCityList[item.id] = [];
			$scope.liveCountyList[item.id] = [];
			$scope.liveCityListObj=[];
			var cityOpt = {};
			cityOpt.url = '/crm/manage/cm/getCityByProv';
			cityOpt.method = 'GET';
			cityOpt.params = {provinceCode : $scope.custom.liveProvince[item.id].value};
			HttpService.linkHttp(cityOpt).then(function(response) {
				console.log(response.data);
				angular.forEach(response.data, function (item) {
					$scope.liveCityListObj.push({
						label : item.cityName,
						value : item.cityCode
					});
				})
				$scope.liveCityList[item.id]=$scope.liveCityListObj;
			});
		}

	    $scope.getCountyByProvCty = function(item){

			$scope.custom.liveCounty[item.id] = "";
			$scope.liveCountyList[item.id] = [];
			$scope.liveCountyListObj = [];
			var ctyOpt = {};
			ctyOpt.url = '/crm/manage/cm/getCountyByProvCity';
			ctyOpt.method = 'GET';
			console.log($scope.custom.liveProvince[item.id].value)
			ctyOpt.params = {
				provinceCode : $scope.custom.liveProvince[item.id].value,
				cityCode : $scope.custom.liveCity[item.id].value
			};
			HttpService.linkHttp(ctyOpt).then(function(response) {
				console.log(response.data);
				angular.forEach(response.data, function (item) {
						$scope.liveCountyListObj.push({
							label : item.countyName,
							value : item.countyCode
						});
				})
				$scope.liveCountyList[item.id]=$scope.liveCountyListObj;
	 	    });
		}
		$scope.initProvCityCty = function(addrTyp, provCd, cityCd, countyCd){
			console.log("provCd=" + provCd);
			console.log("cityCd=" + cityCd);
			console.log("countyCd=" + countyCd);
			if (provCd == null || provCd == undefined) {
				console.log("省份代码为空");
				return;
			}
			console.log("addrTyp=" + addrTyp);
			angular.forEach(
					$scope.provList,
			function(item) {
				if (item.value == provCd) {
					// 省赋值

					$scope.custom.liveProvince[addrTyp] = item;
					var cityOpt = {};
					cityOpt.url = '/crm/manage/cm/getCityByProv';
					cityOpt.method = 'GET';
					cityOpt.params = {provinceCode : provCd};
						HttpService.linkHttp(cityOpt).then(function(response) {
							if (response.data == null || response.data == undefined) {
								console.log("获取市信息为空");
								return;
							}
							console.log(response.data);
							$scope.liveCityListObj = [];
							angular.forEach(
									response.data,
									function(item) {
										$scope.liveCityListObj.push({
													label : item.cityName,
													value : item.cityCode
												});
									})
							$scope.liveCityList[addrTyp]=$scope.liveCityListObj;
							angular.forEach(
									$scope.liveCityList[addrTyp],
									function(item) {
										if (item.value == cityCd) {
											// 市赋值
											$scope.custom.liveCity[addrTyp] = item;
											var ctyOpt = {};
											ctyOpt.url = '/crm/manage/cm/getCountyByProvCity';
											ctyOpt.method = 'GET';
											console.log($scope.custom.liveProvince[addrTyp].value)
											ctyOpt.params = {
														provinceCode : $scope.custom.liveProvince[addrTyp]?$scope.custom.liveProvince[addrTyp].value:'',
														cityCode : $scope.custom.liveCity[addrTyp].value
												};
												HttpService.linkHttp(ctyOpt).then(function(response) {
													if (response.data == null || response.data == undefined) {
														console.log("获取区县信息为空");
														return;
													}
													console.log(response.data);
													$scope.liveCountyListObj = []
													angular.forEach(
															response.data,
															function(item) {
																$scope.liveCountyListObj.push({
																			label : item.countyName,
																			value : item.countyCode
																		});
															})
													$scope.liveCountyList[addrTyp]=$scope.liveCountyListObj;
													angular.forEach(
															$scope.liveCountyList[addrTyp],
															function(item) {
																if (item.value == countyCd) {
																	$scope.custom.liveCounty[addrTyp] = item;
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

		  // 选择客户经理 开始
        $scope.selectAgentDlg = function() {
              var modalInstance = $uibModal.open({
                  animation: true,
                  templateUrl: 'app/pages/mgrcenter/usermanagement/popupPages/selectAgentDlg.html',
                  controller: 'selectAgentDlgCtrl',
                  size: 'midle-900', //
                  backdrop:'static',
                  resolve: {
                      'checkedRow': function () {
                          return '';
                      }
                  }
              });
              modalInstance.result.then(function(result){
            	  // 返回调用
            	  console.log(result); //result关闭是回传的值
            	  $scope.custom.custAgent = result.employeeId;
            	  $scope.custom.custAgentNam = result.userName;
              });

        }

	  // 选择客户经理 结束

		$scope.save = function(){
            var customObj = angular.copy($scope.custom);
            if (customObj.phoneNumber&&!(Valid.checkTel(customObj.phoneNumber))) {
                Alert.error('请输入正确的电话号码');
                return;
            }
            if (customObj.certTyp&&customObj.certTyp.value == '01') {
                if (customObj.certNo&&!(Valid.checkIdCardNo(customObj.certNo))) {
                    Alert.error('请输入正确的身份证号');
                    return;
                }
            }
            if (customObj.birthDate&&new Date(customObj.birthDate) > new Date()) {
                Alert.error('出生日期不能大于当天');
                return;
            }
            if (customObj.custName == null || customObj.custName == '') {
            	Alert.error("姓名不能为空");
            	return;
            }

           /* if (customObj.phoneNumber == null || customObj.phoneNumber == '') {
            	Alert.error("手机号码不能为空");
            	return;
            }*/

            // if (customObj.sex == null || customObj.sex == '') {
            // 	Alert.error("性别不能为空");
            // 	return;
            // }
            // if (customObj.custTyp.value=="01"&&(customObj.certDate == null || customObj.certDate == undefined)) {
            //     Alert.error("证件有效期不能为空");
            //     return;
            // }
            // if (customObj.custTyp.value=="01"&&($scope.custom.birthDate == null || $scope.custom.birthDate == '')) {
            // 	Alert.error("出生日期不能为空");
            // 	return;
            // }

            if (customObj.custTyp.value=="01"&&(customObj.certTyp == null || customObj.certTyp == '')) {
            	Alert.error("证件类型不能为空");
            	return;
            }

            customObj.certTyp = customObj.certTyp.value;
            /*if (customObj.custTyp.value=="01"&&(customObj.certNo == null || customObj.certNo == '')) {
            	Alert.error("证件号码不能为空");
            	return;
            }*/

            if (customObj.custTyp == null || customObj.custTyp == '') {
            	Alert.error("客户类型不能为空");
            	return;
            }

            if (customObj.custSource == null || customObj.custSource == '') {
            	Alert.error("数据来源不能为空");
            	return;
            }
            //customObj.certTyp = customObj.certTyp.value;
            customObj.addrList = [];
            customObj.custAgent = $rootScope.global.employeeId
            $scope.common.addressList.forEach(function(item,index){
                customObj.addrList.push({
                    provCd:$scope.custom.liveProvince[item.id]?$scope.custom.liveProvince[item.id].value:null,
                    cityCd:$scope.custom.liveCity[item.id]?$scope.custom.liveCity[item.id].value:null,
                    countyCd:$scope.custom.liveCounty[item.id]?$scope.custom.liveCounty[item.id].value:null,
                    streetAddr:item.streetAddr,
                    postcode:item.postcode,
                    whtDefaultAddr:item.whtDefaultAddr,
                    id:parseInt(item.id)+1
                })
            })
            customObj.phoneList = []
            $scope.custom.phoneList.forEach(function(item,index){
                customObj.phoneList.push({
                    phoneNo:item.phoneNo,
                    isDeault:item.isDeault,
                    id:parseInt(item.id)>0?item.id:'0',
                    custSource:item.custSource
                })
            })
            customObj.custTyp = customObj.custTyp.value;
            customObj.custSource = customObj.custSource.value;
            customObj.nationality = customObj.nationality == undefined ? null:customObj.nationality.value;
            customObj.marrigeSts = customObj.marrigeSts  == undefined ? null:customObj.marrigeSts.value;
            customObj.eduDegree = customObj.eduDegree == undefined ? null:customObj.eduDegree.value;
            customObj.trade = customObj.trade == undefined ? null:customObj.trade.value;
            customObj.sex = customObj.sex.value;
            var birthDate = new Date($scope.custom.birthDate);
            customObj.birthDate =  $filter('date')(birthDate, 'yyyy-MM-dd');
            var certDate = new Date($scope.custom.certDate);
            customObj.certDate =  $filter('date')(certDate, 'yyyy-MM-dd');
            customObj.keyCustFlg = customObj.keyCustFlg.value == true? '1' : '0';
            customObj.liveAddrTyp = EnumType.AddrTyp.home_addr.value;
            customObj.unitAddrTyp = EnumType.AddrTyp.company_addr.value;
            customObj.liveAddrNam = "";
            customObj.unitAddrNam = "";

            customObj.nation = customObj.nation.value;
            customObj.politSts = customObj.politSts.value;

            delete customObj.liveProvince
            delete customObj.liveCity
            delete customObj.liveCounty
//            HttpService.linkHttp({
//                url: 'crm/ecif/cust/mng/uptPerCustInfo',
//                method: 'POST',
//                params: customObj
//            }).then(function (response) {
//                $uibModalInstance.close();
//            });

//            if(!$scope.perIconFile){
//                return;
//            }
            var fd = new FormData();
            fd.append('file', $scope.perIconFile);
            fd.append('custBaseInfoStr', angular.toJson(customObj));
            HttpService.linkHttp({
                url: 'crm/ecif/cust/mng/uptPerCustInfo',
                method: 'POST',
                headers: {'Content-Type': undefined},
                data: fd
            }).then(function (response) {
                $scope.perIconImg = response.data;
                $uibModalInstance.close();
            });

        };

        $scope.uploadFiles = function (file, errFiles) {
            if(!file){
                return;
            }
            if (file.size>1024*1024) {
                Alert.error('图片大小不能超过1M');
                return;
            }
            $scope.perIconFile = file;

            var fd = new FormData();
            fd.append('file', file);

            HttpService.linkHttp({
                url: 'crm/ecif/picture',
                method: 'POST',
                headers: {'Content-Type': undefined},
                data: fd
            }).then(function (response) {
                $scope.perIconImg = response.data;
            });


        }

        // 打开日期控件
        $scope.open1 = function () {
            $scope.open1.opened = !$scope.open1.opened;
        }
        $scope.open2 = function () {
            $scope.open2.opened = !$scope.open2.opened
        }

        // 新增地址
        var i = -1
        $scope.addAddress=function(){
			var address={
                province:'',
                city:'',
                county:'',
                streetAddr:'',
                postcode:'',
                countyList:[],
                cityList:[],
                id:i--,
                whtDefaultAddr:'0'
			};
            $scope.common.addressList.push(address);
            console.log($scope.common.addressList)
		};

		$scope.removeAddress = function(id) {
             $scope.common.addressList.forEach(function (item,index) {
                if (id == item.id) {
                    $scope.common.addressList.splice(index,1);
                    if (item.whtDefaultAddr === '1') {
                         $scope.common.addressList[0].whtDefaultAddr = '1'
                    }
                }
             })
        };

        //电话
        var p = -1
        $scope.phoneList = function () {
            var phone = {
                phoneNo:'',
                isDeault:'0',
                id:p--
            }
            if (phone.id == 0) {
                phone.isDeault = '1'
            }
            $scope.custom.phoneList.push(phone)
        }
        $scope.removePhoneList = function (id) {
             $scope.custom.phoneList.forEach(function (item,index) {
                if (id == item.id) {
                    $scope.custom.phoneList.splice(index,1);
                    if (item.isDeault === '1') {
                         $scope.custom.phoneList[0].isDeault = '1'
                    }
                }
            })
        }

        //选择默认地址
        $scope.setAddrDefault = function (id,itemList) {
            itemList.forEach(function (item, index) {
                if (id == item.id) {
                    item.whtDefaultAddr = '1';
                }else {
                    item.whtDefaultAddr = '0';
                }
            })
        }

        //选择默认电话
        $scope.setPhoneDefault = function (id,itemList) {
            itemList.forEach(function (item, index) {
                if (id == item.id) {
                    item.isDeault = '1';
                }else {
                    item.isDeault = '0';
                }
            })
        }
    }

})();
