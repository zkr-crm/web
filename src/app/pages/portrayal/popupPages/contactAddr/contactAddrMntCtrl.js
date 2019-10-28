(function() {
	'use strict';

	angular.module('BlurAdmin.pages.portrayal.perCusPortrayal')
		.controller('contactAddrMntCtrl', contactAddrMntCtrl);
    function contactAddrMntCtrl($scope, EnumType, $filter, $uibModal, $timeout, toastr,Alert,HttpService, addrList){
    	$scope.AddrTyp  = EnumType.AddrTyp;
    	$scope.Nationality  = EnumType.Nationality;
        
        var init = function () {
            $scope.addrList = addrList;
            $scope.provListObj = [];
            // null obj 判断
            if ($scope.addrList == null || $scope.addrList == undefined || $scope.addrList.length == 0){
            	return;
            } else {
                if (!!$scope.addrList[0].provCd||(!!$scope.addrList[0].cityCode)||(!!$scope.addrList[0].countyCode)||(!!$scope.addrList[0].streetAddr)||(!!$scope.addrList[0].postcode)) {
                    var provOpt = {};
                    provOpt.url = '/crm/manage/cm/getProv';
                    provOpt.method = 'GET';
                    HttpService.linkHttp(provOpt).then(function(response) {
                        angular.forEach(response.data,function(item) {
                            $scope.provListObj.push({
                                        label : item.provinceName,
                                        value : item.provinceCode
                                    });
                        })
                        $scope.provList=$scope.provListObj;
                        $scope.addrList.forEach(function(item,index){
                            $scope.provList.forEach(function(item1,index){
                                if (item.provCd == item1.value) {
                                    item.provLabel = item1.label;
                                    var cityOpt = {};
                                    cityOpt.url = '/crm/manage/cm/getCityByProv';
                                    cityOpt.method = 'GET';
                                    cityOpt.params = {provinceCode : item.provCd};
                                    HttpService.linkHttp(cityOpt).then(function(response){
                                        if (!!!response.data) {return}
                                        response.data.forEach(function(item2,index){
                                            if (item.cityCd == item2.cityCode) {
                                                item.cityLabel = item2.cityName;
                                                var ctyOpt = {};
                                                ctyOpt.url = '/crm/manage/cm/getCountyByProvCity';
                                                ctyOpt.method = 'GET';
                                                ctyOpt.params = {
                                                    provinceCode : item.provCd||0,
                                                    cityCode : item.cityCd||0
                                                };
                                                HttpService.linkHttp(ctyOpt).then(function(response){
                                                    response.data.forEach(function(item3,index){
                                                        if (item.countyCd == item3.countyCode) {
                                                            item.countyLabel = item3.countyName
                                                        }
                                                    })
                                                })
                                            }
                                        })
                                    })
                                }
                            })
                        })
                    });
                    
                }
            }

            // HttpService.linkHttp()
        }
        init()
        // HttpService.linkHttp({
        //     url: 'crm/ecif/cust/contactAddrList',
        //     method: 'GET',
        //     params: {'custNo': custNo}
        // }).then(function (response) {
        //     $scope.contactAddrList  = response.data.map(function (item) {
        //         item.addrTyp = EnumType.AddrTyp.getLabelByValue(item.addrTyp);
        //         item.countryCd = EnumType.Nationality.getLabelByValue(item.countryCd);

        //         return item;
        //     });
        //     $scope.addrTotal = response.data.length;
        // });

        // $scope.searchContactAddrObj = {
        // 		'addrTyp' : '',
        //         'custNo' : custNo
        //     };

        // $scope.clearContactAddrSearch = function() {
        //     $scope.searchContactAddrObj = {
        //     		'addrTyp' : '',
        //             'custNo' : custNo
        //         };

        //     $scope.searchContactAddr();
        // }

        // // 修改
        // $scope.uptContactAddr = function(custNo, addrTyp){
        //     console.log("custNo=" + custNo);
        //     console.log("addrTyp=" + addrTyp);
        //     var modalInstance = $uibModal.open({
        //         animation: true,
        //         templateUrl: 'app/pages/portrayal/popupPages/contactAddr/uptContactAddr.html',
        //         controller: 'uptContactAddrCtrl',
        //         size: 'midle-1200', // 
        //         backdrop:'static',
        //         resolve: {
        //             'custNo': function () {
        //                 return custNo;
        //             }, 'addrTyp': function () {
        //                 return addrTyp;
        //             }
        //         }
        //     });
        //     modalInstance.result.then(function(){
        //         $scope.searchContactAddr();
        //     });
        // };

        // // 新增
        // $scope.addContactAddr = function(){
        // 	$scope.custNo = custNo;
        //     var modalInstance = $uibModal.open({
        //         animation: true,
        //         templateUrl: 'app/pages/portrayal/popupPages/contactAddr/addContactAddr.html',
        //         controller: 'addContactAddrCtrl',
        //         size: 'midle-1200',
        //         backdrop:'static',
        //         scope:$scope,
        //         resolve: {
        //             'custNo': function () {
        //                 return custNo;
        //             }
        //         }
        //     });
        //     modalInstance.result.then(function(){
        //         $scope.searchContactAddr();
        //     });
        // };


        // // 删除
        // $scope.delContactAddr = function(custNo, addrTyp) {
        //     console.log("custNo=" + custNo);
        //     console.log("addrTyp=" + addrTyp);
        //     Alert.confirm("确定删除？").then(function() {
        //         var opts = {};
        //         opts.url = '/crm/ecif/cust/delContactAddr';
        //         opts.method = 'PUT';
        //         opts.params = {
        //             custNo : custNo,
        //             addrTyp : addrTyp,
        //         };
        //         HttpService.linkHttp(opts).then(function(response) {
        //             console.log("请求成功");
        //             console.log(response);
        //             // 执行查询
        //             $scope.searchContactAddr();
        //         });
        //     });
        // };

        // // 查询事件
        // $scope.searchContactAddr = function() {
        //     var opts = {};
        //     opts.url = 'crm/ecif/cust/contactAddrList';
        //     opts.method = 'GET';
        //     opts.params =  {
        //     		'addrTyp' : $scope.searchContactAddrObj.addrTyp.value,
        //             'custNo' : custNo
        //         }
        //     HttpService.linkHttp(opts).then(function(response) {
        //         console.log("请求成功");
        //         console.log(response);
        //         $scope.contactAddrList  = response.data.map(function (item) {
        //             item.addrTyp = EnumType.AddrTyp.getLabelByValue(item.addrTyp);
        //             item.countryCd = EnumType.Nationality.getLabelByValue(item.countryCd);

        //             return item;
        //         });
        //         $scope.addrTotal = response.data.length;

        //     });
        // }
    }
})();
