(function() {
	'use strict';

				angular.module('BlurAdmin.pages.customer').controller('custMntCtrl', custMntCtrl).filter('filter',function (){
    				return function(e){
    					//console.log(e);
    					if(e == undefined){

    					}else{
    						if(e.length>=10){
                                if (typeof e === 'object') {
                                    return e
                                }
        						return  e.substring(0,10)+"****";
        					}else{
        						return e;
        					}
    					}

    				}
    			});
				/** @ngInject */
                function custMntCtrl($scope, $state, HttpService,EnumType,Alert,$uibModal,$rootScope) {
                    var custAgentList =[];
                    $scope.initSearch=function(){
                        // 查询条件对象
                        $scope.searchObj = {
                            custTyp:'01'
                        };

                        $scope.isInitFinash=false;
                            $scope.idTypes = EnumType.IdType;
                        $scope.queryOptions = {};
                        $scope.queryOptions.pagination = {
                            pageSize:'10',
                            pageIndex:1,
                            maxText:5
                        }
                        $scope.queryOptions.url = '/crm/ecif/cust/getPerCustListByRole';
                        $scope.queryOptions.method = 'POST';
                        $scope.queryOptions.params = $scope.searchObj;
                        $scope.queryOptions.params.sys = {
                            pageSize:'10',
                            pageNum:'1',
                        };
                        $scope.queryOptions.success = function successCallback (response) {
                            if (response.status === '1') {
                                $scope.custCollection = response.data.list;
                                $scope.custCollection = response.data.list.map(function (item) {
                                    item.custTypNam = EnumType.CustType.getLabelByValue(item.custTyp);
                                item.custSourceNam = EnumType.DataSource.getLabelByValue(item.custSource);
                                item.certTypNam = EnumType.IdType.getLabelByValue(item.certTyp);
                                return item;
                            });
                    }
                }
    //获取用户权限
    var initOpts = {};
    initOpts.url = '/crm/manage/auth/getRoleDateAuth';
    initOpts.method = 'GET';
    initOpts.params = {
        userCode : $rootScope.global.user,
        tableCode : "T001"
    };
    HttpService.linkHttp(initOpts).then(function(result) {
        if(!(result.data===undefined)){

            angular.forEach(result.data, function(i) {
                if(i.employeeId!==undefined){
                    custAgentList.push(i.employeeId);
                }
            });
            $scope.queryOptions.data = custAgentList;
                                $scope.isInitFinash=true;
                            }
                        });
                    }
                    $scope.initSearch();
                    $scope.cusDetail = function(custNo){
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: 'app/pages/portrayal/custDetail/custDetail.html',
                            controller: 'CustDetailCtrl',
                            size: 'midle-1200',
                            backdrop:'static',
                            resolve: {
                                'custNo': function () {
                                    return custNo;
                                }
                            }
                        });
                        modalInstance.result.then(function(){
                            $scope.searchUser();
                        });
                    };
                    // 查询事件
                    $scope.search = function(page,custTyp) {
                    	if(this.queryPage && !$scope.queryPage){
                            $scope.queryPage=this.queryPage;
                        }
                    	if(!(custAgentList===undefined)){
                            // if (custTyp&&parseInt(custTyp)!==parseInt($scope.searchObj.custTyp)) {
                            //     $scope.pagination.pageSize = '10'
                            // }
                            $scope.searchObj.custTyp = custTyp||$scope.searchObj.custTyp;
                            $scope.searchObj.certTyp=$scope.searchObj.idTypes?$scope.searchObj.idTypes.value:null;
                            $scope.queryOptions.params = $scope.searchObj;
                            // $scope.queryOptions.pageSize = $scope.queryOptions.pagination.pageSize;
                            var page = page||1;
                            if (this.queryPage) {
                                this.queryPage(page)
                            }else if($scope.queryPage){
                                $scope.queryPage(page);
                            } else{
                                this.$parent.$parent.$$childHead.queryPage(page)
                            }
                    	}
                    }
                    $scope.searchUser = function () {
                        /*var opts = {};
                        opts.url = '/crm/ecif/cust/getPerCustListByRole';
                        opts.method = 'POST';
                        opts.params = {
                            custTyp:$scope.searchObj.custTyp
                        };
                        opts.params.sys = {
                            pageSize:'10',
                            pageNum:'1',
                        };
                        opts.data = custAgentList
                        HttpService.linkHttp(opts).then(function (response) {
                            if (response.status === '1') {
                                $scope.custCollection = response.data.list;
                                $scope.custCollection = response.data.list.map(function (item) {
                                    item.custTypNam = EnumType.CustType.getLabelByValue(item.custTyp);
                                    item.custSourceNam = EnumType.DataSource.getLabelByValue(item.custSource);
                                    item.certTypNam = EnumType.IdType.getLabelByValue(item.certTyp);
                                    return item;
                                });
                            } else {
                                Alert.error(response.message)
                            }
                        })*/
                        $scope.search();
                    }

                    // reset
                    $scope.clearUserSearch = function() {
                        $scope.custTyp = $scope.searchObj.custTyp
                        $scope.searchObj = {};
                        $scope.searchObj.custTyp =  $scope.custTyp
                        // 查询事件
                        // $scope.searchUser();
                    }

                    // 逻辑删除事件（单行删除）
                    $scope.removeUser = function(custNo) {

                        Alert.confirm("确定删除？").then(function() {
                            var opts = {};
                            opts.url = '/crm/ecif/cust/mng/delPerCustInfo';
                            opts.method = 'PUT';
                            opts.params = {
                                custNo : custNo
                            };
                            HttpService.linkHttp(opts).then(function(response) {
                                if (response.status === '1') {
                                    $scope.searchUser();
                                } else {
                                    Alert.error(response.message)
                                }
                            });
                        });

                    };
                    // 新增事件
                    $scope.addUser = function(/*custNo*/){
                        if(this.queryPage && !$scope.queryPage){
                            $scope.queryPage=this.queryPage;
                        }
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: 'app/pages/portrayal/custDetailAdd/custDetailAdd.html',
                            controller: 'custDetailAddCtrl',
                            size: 'midle-1200',
                            backdrop:'static',
                            resolve: {
                                'custTyp': function () {
                                    return $scope.searchObj.custTyp;
                                }
                            }
                        });
                        modalInstance.result.then(function(){
                            $scope.searchUser();
                        });
                    };
                    $scope.smartTablePageSize = 10;

                    // 客户画像查询
                    $scope.openDetail = function (custNo) {
                        $state.go('portrayal.perCusPortrayal',{'custNo':custNo,'custAgentList':$scope.queryOptions.data});
                       // $location.path('/portrayal/perCusPortrayal').search({'custNo':custNo});
                    }

                    // 客户转交
                    $scope.checkedRow = [];
            		$scope.transferUser = function() {
            			if ($scope.checkedRow.length==0){
            				Alert.error('请选择客户！');
            				return;
            			}
            			$uibModal
            					.open({
            						animation : true,
            						backdrop : 'static',
            						templateUrl : 'app/pages/customer/custMnt/custDeliver/custDeliver.html',
            						size : 'midle-600',
            						controller : 'custDeliverCtrl',
            						scope : $scope,
            						resolve : {

            						}
            					});
            		}
            		$scope.selectRow = function (item) {
                        item.checked = !item.checked;
                        $scope.selectOne1(item)
                    }

            		 // 单个选中
                    $scope.selectOne1 = function(item) {
                        $scope.checkedRow = []
                        angular.forEach($scope.custCollection, function (i) {
                            var index = $scope.checkedRow.indexOf(i);
                            if (i.checked) {
                                $scope.checkedRow.push(i);
                            }
                        });
                    }


                    //多选
                    $scope.selectAll1 = function(e) {

                        if (e) {
                            $scope.checkedRow = [];
                            var count = 0;
                            angular.forEach($scope.custCollection, function(i) {
                                i.checked = true;

                                // 条件对象
                                $scope.delObj = {
                                    'custNo' : '',
                                };
                                $scope.delObj.custNo = i.custNo;
                                $scope.checkedRow.push($scope.delObj);
                            })
                            $scope.select_all = true;
                        } else {
                            angular.forEach($scope.custCollection, function(i) {
                                i.checked = false;
                                $scope.checkedRow = [];
                            })
                            $scope.select_all = false;
                        }
                    };

                    // 保存客群方法
                    $scope.addUserGroup = function () {
                        if ($scope.checkedRow.length >= 1) {
                            $uibModal
                                .open({
                                    animation : true,
                                    backdrop : 'static',
                                    templateUrl : 'app/pages/customer/custQuery/custPerQuery/addCustGroup.html',
                                    size : 'midle-900',
                                    controller : 'addCustGroupCtrl',
                                    scope : $scope,
                                    resolve : {
                                        checkedRow:function(){
                                            return $scope.checkedRow;
                                        }
                                    }
                                });
                        } else {
                            Alert.error('至少选择一个用户')
                            return
                        }
                    }

                }


			})();
