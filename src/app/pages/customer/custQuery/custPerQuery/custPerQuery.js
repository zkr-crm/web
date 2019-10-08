(function() {
	'use strict';

				angular.module('BlurAdmin.pages.customer.custQuery.custPerQuery').controller('custPerQueryCtrl', custPerQueryCtrl);
				/** @ngInject */
                function custPerQueryCtrl($scope, $state, HttpService,EnumType,Alert,$uibModal,$rootScope) {
                	
                	// 枚举类型
                	$scope.idTypes = EnumType.IdType;
                	$scope.custTypes = EnumType.CustType;
                	$scope.healthConditions = EnumType.HealthCondition;
                	$scope.creditGrades = EnumType.CreditGrade;
                    $scope.YesNoFlgs = EnumType.YesNoFlg;
                    $scope.sexItems = EnumType.Sex;
                    $scope.EventType = EnumType.EventType;
                    $scope.ChannelTypes = EnumType.ChannelType;
                    $scope.markList = [
                        {
                            label:'=',
                            value:'0'
                        },{
                            label:'<',
                            value:'1'
                        },{
                            label:'>',
                            value:'2'
                        },{
                            label:'<=',
                            value:'3'
                        },{
                            label:'>=',
                            value:'4'
                        }
                    ]
                    // 客户集和
                	$scope.custCollection=[];
                	$scope.checkedRow=[];
                	$scope.habitsRow = [];
                	$scope.habitList = [];
                	
                	
                	$scope.searchObj = {};
                	
                    // 页面大小
                    $scope.smartTablePageSize = 5;
                    // 查询爱好
//                    var opts = {};
//        			opts.url = '/crm/query/custQuery/perCustList';
//        			opts.method = 'GET';
//        			HttpService.linkHttp(opts).then(function(response) {
//        				$scope.habitsRow = response.data;
//        			});   
                    $scope.habitsRow = [{
                    	habit_avoc_cd: '10001',
                    	habit_avoc_val: '吸烟'
    			      },{
                    	habit_avoc_cd: '10002',
                    	habit_avoc_val: '乒乓球'
    			      },{
                    	habit_avoc_cd: '10003',
                    	habit_avoc_val: '书法'
    			      },{
                    	habit_avoc_cd: '10004',
                    	habit_avoc_val: '读书'
    			      },{
                    	habit_avoc_cd: '10005',
                    	habit_avoc_val: '打扮'
    			      }];
                	// 标签list
                    $scope.openCustTagList = function() {
                        var modalInstance = $uibModal.open({
                            animation : true,
                            backdrop : 'static',
                            templateUrl : 'app/pages/customer/custQuery/custPerQuery/selectCustTagList.html',
                            size : 'midle-1200',
                            controller : 'selectCustTagListCtrl',
                            scope : $scope,
                            resolve : {
                                items: function () {
                                    return $scope.items;
                                }
                            }
                        });
                        modalInstance.result.then(function (result) {
                            $scope.custGroupList.custTag = result.tagId;		//
                            $scope.custGroupList.tag = result.tagName;		//

                        }, function (reason) {

                        });

                    }
                    // 动态客群list
                    $scope.openStaticCustList = function() {
                        var modalInstance = $uibModal.open({
                            animation : true,
                            backdrop : 'static',
                            templateUrl : 'app/pages/customer/custQuery/custPerQuery/selectStaticCustList.html',
                            size : 'midle-1200',
                            controller : 'selectStaticCustListCtrl',
                            scope : $scope,
                            resolve : {
                                items: function () {
                                    return $scope.items;
                                }
                            }
                        });
                        modalInstance.result.then(function (result) {
                            $scope.custGroupList.staticCust = result.groupId;		//
                            $scope.custGroupList.groupName = result.groupName;		//

                        }, function (reason) {

                        });

                    }
                    // 新增静态客群
                    $scope.add = function(){
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
                     // 批量增加标签
                    $scope.addTags = function(){
                        if ($scope.checkedRow.length >= 1) {
                            $uibModal
                                .open({
                                    animation : true,
                                    backdrop : 'static',
                                    templateUrl : 'app/pages/customer/custQuery/custPerQuery/custPerAddTags.html',
                                    size : 'midle-900',
                                    controller : 'custPerAddTagsCtrl',
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
                    function timeTransform (GMTtime) {
                        var date = new Date(GMTtime)
                        var criterionDate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
                        return criterionDate
                    }
                    // 查询
                    $scope.search = function(page){
                        $scope.searchObj.certTyp = $scope.searchObj.idTypes?$scope.searchObj.idTypes.value:'';
                        $scope.searchObj.sex =$scope.searchObj.sexItem? $scope.searchObj.sexItem.value:'';
                        $scope.searchObj.eventType =$scope.searchObj.eventT? $scope.searchObj.eventT.value:'';
                        $scope.searchObj.mark =$scope.searchObj.repeatNum? $scope.searchObj.repeatNum.value:'';
                        $scope.searchObj.companycode =$scope.searchObj.channel? $scope.searchObj.channel.value:'';
                        $scope.searchObj.beginEvent = $scope.searchObj.beginEventTime? timeTransform($scope.searchObj.beginEventTime):''
                        $scope.searchObj.endEvent = $scope.searchObj.endEventTime?timeTransform($scope.searchObj.endEventTime):''
                        $scope.searchObj.beginPolicy = $scope.searchObj.beginPolicyTime?timeTransform($scope.searchObj.beginPolicyTime):''
                        $scope.searchObj.endPolicy = $scope.searchObj.endPolicyTime?timeTransform($scope.searchObj.endPolicyTime):''
                        $scope.searchObj.beginsPolicy = $scope.searchObj.beginsPolicyTime?timeTransform($scope.searchObj.beginsPolicyTime):''
                        $scope.searchObj.endsPolicy = $scope.searchObj.endsPolicyTime?timeTransform($scope.searchObj.endsPolicyTime):''
                        $scope.queryOpts.params = $scope.searchObj;
                        $scope.queryOpts.params.group = $scope.custGroupList.staticCust;
                        $scope.queryOpts.params.tag = $scope.custGroupList.custTag;
                        // $scope.queryOpts.pageSize = $scope.pagination.pageSize;
                        // var page = page || '1';
                    	this.queryPage(page)
                    }
                    // 重置
                    $scope.transfer = function(){
                    	$scope.searchObj={};
                        $scope.custGroupList = {}
                    	// $scope.custCollection=[];
                    	$scope.checkedRow=[];
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
                    // 点击行选中本行
                    $scope.selectRow = function (item) {
                        item.checked = !item.checked;
                        $scope.selectOne1(item)
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
                    // 获取城市
                    $scope.getCityByProv = function(item){
                        // 居住
                        $scope.searchObj.city = "";
                        $scope.searchObj.county = "";
                        $scope.cityList = [];
                        $scope.countyList = [];
                        var cityOpt = {}
                        cityOpt.url = '/crm/manage/cm/getCityByProv';
                        cityOpt.method = 'GET';
                        cityOpt.params = {provinceCode : item.value};
                        HttpService.linkHttp(cityOpt).then(function(response) {
                            angular.forEach(
                                    response.data,
                                    function(item) {
                                        $scope.cityList.push({
                                                    label : item.cityName,
                                                    value : item.cityCode
                                                });
                                    })
                        });
                    }

                    $scope.getCountyByProvCty = function(item,item1){
                        $scope.searchObj.county = "";
                        $scope.countyList=[];
                        var ctyOpt = {}
                        ctyOpt.url = '/crm/manage/cm/getCountyByProvCity';
                        ctyOpt.method = 'GET';
                        ctyOpt.params = {
                                    provinceCode : item.value,
                                    cityCode : item1.value
                            };
                        HttpService.linkHttp(ctyOpt).then(function(response) {
                            angular.forEach(
                                    response.data,
                                    function(item) {
                                        $scope.countyList.push({
                                                    label : item.countyName,
                                                    value : item.countyCode
                                                });
                                    })
                        });
                    }
                    // 日期控件打开关闭
                    $scope.toggleOpen1 = function () {
                        $scope.open1.opened = !$scope.open1.opened
                    } 
                    $scope.toggleOpen2 = function () {
                        $scope.open2.opened = !$scope.open2.opened
                    } 
                    $scope.toggleOpen3 = function () {
                        $scope.open3.opened = !$scope.open3.opened
                    } 
                    $scope.toggleOpen4 = function () {
                        $scope.open4.opened = !$scope.open4.opened
                    } 
                    $scope.toggleOpen5 = function () {
                        $scope.open5.opened = !$scope.open5.opened
                    } 
                    $scope.toggleOpen6 = function () {
                        $scope.open6.opened = !$scope.open6.opened
                    } 
                    //查看客户画像
                    $scope.openDetail = function (custNo) {
                        $state.go('portrayal.perCusPortrayal',{'custNo':custNo});
                       // $location.path('/portrayal/perCusPortrayal').search({'custNo':custNo});
                    }
                    // 初始化方法
                    var init = function () {
                        $scope.custGroupList = {}
                        $scope.pagination = {
                            pageSize:'10',
                            pageIndex:1,
                            maxText:5
                        }
                        $scope.isInitFinash=false;
                        var custAgentList =[];
                        $scope.open1 = {
                            opened:false
                        }
                        $scope.open2 = {
                            opened:false
                        }
                        $scope.open3 = {
                            opened:false
                        }
                        $scope.open4 = {
                            opened:false
                        }
                        $scope.open5 = {
                            opened:false
                        }
                        $scope.open6 = {
                            opened:false
                        }
                        // $scope.searchObj = {
                        //     city:'',
                        //     county:'',
                        //     province:''
                        // }
                        $scope.provList = [];
                        $scope.cityList = [];
                        $scope.countyList = [];
                        var provOpt = {};
                        provOpt.url = '/crm/manage/cm/getProv';
                        provOpt.method = 'GET';
                        HttpService.linkHttp(provOpt).then(function(response) {
                            angular.forEach(
                                    response.data,
                                    function(item) {
                                        $scope.provList.push({
                                                    label : item.provinceName,
                                                    value : item.provinceCode
                                                });
                                    })
                            
                        });
                       

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
                                $scope.queryOpts = {};
                                
                                $scope.queryOpts.data = custAgentList;

                                $scope.queryOpts.pagination = {
                                    pageSize:'10',
                                    pageIndex:1,
                                    maxText:5
                                }
                                $scope.queryOpts.url = '/crm/query/custquery/getPerCustListByRole';
                                $scope.queryOpts.method = 'POST';
                                $scope.queryOpts.params = $scope.searchObj;
                                // $scope.queryOpts.data = $scope.habitList;
                                $scope.queryOpts.success = function successCallback (response) {
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
                                $scope.isInitFinash=true;
                            }
                        });
                    }   
                    init()          	
                	
                }
			})();
