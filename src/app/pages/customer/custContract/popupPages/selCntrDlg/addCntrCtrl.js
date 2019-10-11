(function () {
    'use strict';

    angular.module('BlurAdmin.pages.portrayal.perCusPortrayal')
        .controller('addCntrCtrl', addCntrCtrl);

    /** @ngInject */
    function addCntrCtrl($scope, HttpService, EnumType,/*custNo,*/$uibModalInstance,  $filter,$uibModal, Alert, custNo) {
    	$scope.open = open;
        $scope.opened = false;

        $scope.sexItems = EnumType.Sex;
        $scope.idTypes = EnumType.IdType;
        $scope.custTypes = EnumType.CustType;
        $scope.dataSources = EnumType.DataSource;
        $scope.nationalitys = EnumType.Nationality;
        $scope.YesNoFlgs = EnumType.YesNoFlg;
        $scope.Degrees = EnumType.Degree;
        $scope.BusinessTypes = EnumType.BusinessType;
        $scope.Marriage = EnumType.Marriage;
        $scope.saveTask = {
        		'custId' : '',
        		'custName' : '',
        		'custTyp' : '', 
        };
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
		  //查询客户
			$scope.openCustList = function(){
				$scope.openType = "cust";
				$uibModal
				.open({
					animation : true,
//					backdrop : 'static',
			        templateUrl : 'app/pages/taskService/allTask/popupPages/peopleModal.html',
			        size : 'midle-1200',
			        controller : 'allTaskPeopleModalCtrl',
					scope : $scope,
					resolve : {}
				});
				$scope.saveTask;
			}

		  $scope.save = function(){
			$scope.custContract;
//			$scope.saveTask.custId = item.custNo;
//			$scope.saveTask.custName = item.custName;
//			$scope.saveTask.custTyp = item.custTyp;
			$scope.custContract.blnCustNo = $scope.saveTask.custId;
			$scope.custContract.blnCustType = $scope.saveTask.custTyp;

            var customObj = angular.copy($scope.custContract);
            if (customObj.contractName == null || customObj.contractName == undefined) {
            	Alert.error("姓名不能为空");
            	return;
            }

            if (customObj.blnCustNo == null || customObj.blnCustNo == undefined) {
            	Alert.error("所属客户号不能为空");
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
			opts.url = '/crm/ocrm/CustContractmng/addCustContract';
			opts.method = 'POST';
			opts.params = $scope.custContract;
			HttpService.linkHttp(opts).then(function(response) {
				$scope.custLifeCycleDef = {};
				// 执行查询
				$uibModalInstance.close();
				$scope.search();
			});
            
        };

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
