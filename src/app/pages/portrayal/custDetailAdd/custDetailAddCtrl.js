(function () {
    'use strict';

    angular.module('BlurAdmin.pages.portrayal.perCusPortrayal')
        .controller('custDetailAddCtrl', custDetailAddCtrl);

    /** @ngInject */
    function custDetailAddCtrl($scope, HttpService, EnumType,custTyp,$uibModalInstance,  $filter,$uibModal, Alert, $rootScope, Valid) {
    	var defaultJpg = "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAnFBMVEUAAADu9fju8vjv8vnv8vnv\r\n8/nw8/nv8/nv8/fu8vjv8/jv8/jv8/jv8/jv8/jv8/jv9Pju8/jv8/jw8/jw9Pjw9Pnx9Pnx9fny\r\n9fny9vny9vrz9vr09vr09/r19/r19/v1+Pv2+Pv3+fz4+fz4+vz5+vz5+/z5+/36+/36/P37/P38\r\n/P38/P78/f79/f79/v7+/v7+/v/+//////+bhRQdAAAAEnRSTlMASk1QUVJTfoGLj7/Bwu7y9PdM\r\nvn5QAAAAAWJLR0QzN9V8XgAAAhlJREFUaN7t2ttymzAQgGE1bdND4hwwqMQKDgLsUFpx8L7/u8Xp\r\nRaeJjLySVlx09L/ANxoGacXAGLtc3STBurn+zI59TwL37biOJHgf2So8csXuwiO3LFmgiEQkIhGJ\r\nSET+XyQ/FhQROwV/UjsRCCl7+Kf+KQDCO3hXx6kRMYHWJGiRAk5WUCKbw2nkkNMh2QAz9SkZsofZ\r\nGioknzfgwImQnQFBLQWBrCcTMtEgBRh7JEEqM1KRIK0ZaUmQX2akI0GUGVEkyO8lVrLIM2nMSL3E\r\ne1KQIJkZSWn2rtbzkaCQjQnJiRDTUvZkh9aP2X145GRIIuYQ3LyCnFbkaaOknbuKU3PXY0KLJLk2\r\nsfTowRs/C6fVm8WMMsxUn8q/83An0yQM8upsyrJ8eljH61xEIjK3F5dNp1TfK9U15SYAwuXPd1vk\r\n1EpOimy7mcFuS4bIYf74HSQJIs7NwsIbyZ7hbPvUDxEjIBqFDyIBmXRHGkBXuyIWhvmqbUBqsKpy\r\nQSRYJu0RAdYJW4SP9siQWSItOPRshxTgVGGDpIMb0tsgEhyTeGQ9uiLDGo04L2TmxsIcvqZYf2lh\r\nlt8cz5YjkdoHqZCI8kEUDuHgVYZCtn5IgUIaP6RGIa0f0qKQ3g/pUYifAYclEMAgmS+iz5P6bz7c\r\nF9EuFLf6D0veK9Hexit2oZ2Kvoh2pHxg7GvoB//l9Ve1y9V9uPfk/voTYy8aJRqRMUdwWwAAAABJ\r\nRU5ErkJggg==";
        $scope.open1 = {
            opened:false
        }
        $scope.open2 = {
            opened:false
        }
        // $scope.opened1 = false;
        // $scope.opened2 = false;
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
        $scope.common = {
            phoneArr:[],
            addressList:[]
        };
        $scope.custom = {
            custSource:  EnumType.DataSource.getEnumByValue("01"),
            certTyp: EnumType.IdType.getEnumByValue("01")
        }
        $scope.provListObj = [];
        $scope.custom.custTyp = EnumType.CustType.getEnumByValue(custTyp);

        //信息选项卡
        $scope.information_a = 0;
        $scope.information = ['基本信息','详细信息','社交信息'];
		$scope.fan_information=function(e){
			$scope.information_a=e;
		}
        //电话
        var p = 0
        $scope.phoneList = function () {
            var phone = {
                phoneNo:'',
                isDeault:'0',
                id:p++
            }
            if (phone.id == 0) {
                phone.isDeault = '1'
            }
            $scope.common.phoneArr.push(phone)
        }
        $scope.removePhoneList = function (id) {
             $scope.common.phoneArr.forEach(function (item,index) {
                if (id == item.id) {
                    $scope.common.phoneArr.splice(index,1);
                    if (item.isDeault === '1') {
                         $scope.common.phoneArr[0].isDeault = '1'
                    }
                }
            })
        }
		//地址
        var i = 0
		$scope.addAddress=function(){

			var address={
                province:'',
                city:'',
                county:'',
                street:'',
                postcode:'',
                countyList:[],
                cityList:[],
                id:i++,
                whtDefaultAddr:'0'
			};
            if (address.id == 0) {
                address.whtDefaultAddr = '1'
            }
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
        $scope.addAddress();
        $scope.phoneList();
        /*联动查询*/
		var provOpt = {};
		provOpt.url = '/crm/manage/cm/getProv';
		provOpt.method = 'GET';
		HttpService.linkHttp(provOpt).then(function(response) {
			$scope.liveCityList.splice(0, $scope.liveCityList.length);
			$scope.liveCountyList.splice(0, $scope.liveCountyList.length);

			$scope.custom.liveCity = "";
			$scope.custom.liveCounty = "";

			$scope.unitCityList.splice(0, $scope.unitCityList.length);
			$scope.unitCountyList.splice(0, $scope.unitCountyList.length);

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

		  $scope.getCityByProv = function(item){
			// 居住
			item.city = "";
			item.county = "";
			var cityOpt = {};
            $scope.liveCityListObj=[];
			$scope.liveCountyListObj=[];
			cityOpt.url = '/crm/manage/cm/getCityByProv';
			cityOpt.method = 'GET';
			cityOpt.params = {provinceCode : item.province.value};
				HttpService.linkHttp(cityOpt).then(function(response) {
					console.log(response.data);
					angular.forEach(
							response.data,
							function(item) {
								$scope.liveCityListObj.push({
											label : item.cityName,
											value : item.cityCode
										});
							})
                    item.cityList=$scope.liveCityListObj;
				});
}

		  $scope.getCountyByProvCty = function(item){
				item.county = "";
				var ctyOpt = {};
				$scope.liveCountyListObj=[];
				ctyOpt.url = '/crm/manage/cm/getCountyByProvCity';
				ctyOpt.method = 'GET';
				ctyOpt.params = {
							provinceCode : item.province.value,
							cityCode : item.city.value
					};
					HttpService.linkHttp(ctyOpt).then(function(response) {
						console.log(response.data);
						angular.forEach(
								response.data,
								function(item) {
									$scope.liveCountyListObj.push({
												label : item.countyName,
												value : item.countyCode
											});
								})
						item.countyList=$scope.liveCountyListObj;
		  		});
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
			$scope.custom.perIconSmlBlob = defaultJpg;
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
            if (customObj.custName == null || customObj.custName == undefined) {
            	Alert.error("姓名不能为空");
            	return;
            }

          /*  if (customObj.eduDegree == null || customObj.eduDegree == undefined) {
                Alert.error("文化程度不能为空");
                return;
            }*/

            if (customObj.phoneNumber == null || customObj.phoneNumber == undefined) {
            	Alert.error("手机号码不能为空");
            	return;
            }

            // if (customObj.sex == null || customObj.sex == undefined) {
            // 	Alert.error("性别不能为空");
            // 	return;
            // }

            // if (customObj.custTyp.value=="01"&&($scope.custom.birthDate == null || $scope.custom.birthDate == undefined)) {
            // 	Alert.error("出生日期不能为空");
            // 	return;
            // }

            if (customObj.custTyp.value=="01"&&(customObj.certTyp == null || customObj.certTyp == undefined)) {
            	Alert.error("证件类型不能为空");
            	return;
            }

            // if (customObj.custTyp.value=="01"&&(customObj.certDate == null || customObj.certDate == undefined)) {
            //     Alert.error("证件有效期不能为空");
            //     return;
            // }

            customObj.certTyp = customObj.certTyp.value;
            if (customObj.custTyp.value=="01"&&(customObj.certNo == null || customObj.certNo == undefined)) {
            	Alert.error("证件号码不能为空");
            	return;
            }

            if (customObj.custTyp == null || customObj.custTyp == undefined) {
            	Alert.error("客户类型不能为空");
            	return;
            }

            if (customObj.custSource == null || customObj.custSource == undefined) {
            	Alert.error("客户来源不能为空");
            	return;
            }
            customObj.addrList = []
            $scope.common.addressList.forEach(function(item,index){
                customObj.addrList.push({
                    provCd:item.province.value,
                    cityCd:item.city.value,
                    countyCd:item.county.value,
                    streetAddr:item.street,
                    postcode:item.postcode,
                    whtDefaultAddr:item.whtDefaultAddr,
                    id:'0'
                })
            })
            customObj.phoneList = []
            $scope.common.phoneArr.forEach(function(item,index){
                customObj.phoneList.push({
                    phoneNo:item.phoneNo,
                    isDeault:item.isDeault,
                    id:'0'
                })
            })
            customObj.custAgent = $rootScope.global.employeeId
            customObj.custTyp = customObj.custTyp.value;
            customObj.custSource = customObj.custSource.value;
            customObj.nationality = customObj.nationality == undefined ? null:customObj.nationality.value;
            customObj.marrigeSts = customObj.marrigeSts  == undefined ? null:customObj.marrigeSts.value;
            customObj.eduDegree = customObj.eduDegree == undefined ? null:customObj.eduDegree.value;
            customObj.trade = customObj.trade == undefined ? null:customObj.trade.value;
            customObj.sex = customObj.sex == undefined?null:customObj.sex.value;
            customObj.nation = customObj.nation  == undefined ? null:customObj.nation.value;
            customObj.politSts = customObj.politSts  == undefined ? null:customObj.politSts.value;
            var birthDate = new Date($scope.custom.birthDate);
            var certDate = new Date($scope.custom.certDate);
            customObj.birthDate = $filter('date')(birthDate, 'yyyy-MM-dd');
            customObj.certDate = $filter('date')(certDate, 'yyyy-MM-dd');
            if (customObj.keyCustFlg == undefined) {
                customObj.keyCustFlg = '0';
            } else {
                customObj.keyCustFlg = customObj.keyCustFlg.value == true? '1' : '0';
            }
            customObj.liveAddrTyp = EnumType.AddrTyp.home_addr.value;
            customObj.liveProvince = customObj.liveProvince == undefined ? null:customObj.liveProvince.value;
            customObj.liveCity = customObj.liveCity == undefined ? null:customObj.liveCity.value;
            customObj.liveCounty = customObj.liveCounty == undefined ? null:customObj.liveCounty.value;

            customObj.unitAddrTyp = EnumType.AddrTyp.company_addr.value;
            customObj.unitProvince = customObj.unitProvince == undefined ? null:customObj.unitProvince.value;
            customObj.unitCity = customObj.unitCity == undefined ? null:customObj.unitCity.value;
            customObj.unitCounty = customObj.unitCounty == undefined ? null:customObj.unitCounty.value;
            customObj.liveAddrNam = "";
            customObj.unitAddrNam = "";
//            HttpService.linkHttp({
//                url: 'crm/ecif/cust/mng/addPerCustInfo',
//                method: 'PUT',
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
            console.log(fd)
            HttpService.linkHttp({
                url: 'crm/ecif/cust/mng/addPerCustInfo',
                method: 'POST',
                headers: {'Content-Type': undefined},
                data: fd
            }).then(function (response) {
                $scope.perIconImg = response.data;
                $uibModalInstance.close();
            });

        };
        $scope.headImgUpload = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/portrayal/headImg/headImg.html',
                controller: 'custDetailAddCtrl',
                size: 'big-1200',
                backdrop:'static',
                resolve: {
                    'custNo': function () {

                    }
                }
            });
            modalInstance.result.then(function(){
            	//
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

        //选择默认地址
        $scope.addrTyp = false;
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
