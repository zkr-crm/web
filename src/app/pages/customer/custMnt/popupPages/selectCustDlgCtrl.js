(function() {
	'use strict';

				angular.module('BlurAdmin.pages.customer').controller('selectCustDlgCtrl', selectCustDlgCtrl);
				/** @ngInject */
                function selectCustDlgCtrl($scope, $state, HttpService,EnumType,Alert,$uibModal,$rootScope,$uibModalInstance) {
                    //客戶列表查询权限初始化
                	var custAgentList =[];
		        	var initOpts = {};
					initOpts.url = '/crm/manage/auth/getRoleDateAuth';
					initOpts.method = 'GET';
					initOpts.params = {
						userCode : $rootScope.global.user,
						tableCode : "T001"
					};
                    $scope.pagination = {
                        pageSize:'10',
                        pageIndex:1,
                        maxText:5
                    };
                    //客戶列表查询初始化
                    $scope.custListOpts = {};
                    $scope.custListOpts.pagination = {
                        pageSize:'10',
                        pageIndex:1,
                        maxText:5
                    };
                    $scope.custListOpts.url = '/crm/ecif/cust/getPerCustListByRole';
                    $scope.custListOpts.method = 'POST';
                    $scope.custListOpts.params ={};
                    console.log($scope,"$scope");
                    if(localStorage.getItem('custAgentList')){
                        $scope.custListOpts.params.custAgentJson=localStorage.getItem('custAgentList');
                    }
                    $scope.custListOpts.params.sys = {
                        pageSize:'10',
                        pageNum:'1',
                    };
                    console.log($scope.custListOpts,"$scope.custListOpts")
                    $scope.custListOpts.success = function successCallback (response) {
                        $scope.custCollection = response.data.list;
                        $scope.custCollection = response.data.list.map(function (item) {
                            item.custTypNam = EnumType.CustType.getLabelByValue(item.custTyp);
                            item.custSourceNam = EnumType.DataSource.getLabelByValue(item.custSource);
                            item.certTypNam = EnumType.IdType.getLabelByValue(item.certTyp);
                            return item;
                        });
                    };
                    $scope.isInitFinash=false;
					HttpService.linkHttp(initOpts).then(function(result) {
                        $scope.isInitFinash=true;
						if(!(result.data===undefined || result.data.length==0)){
		                	angular.forEach(result.data, function(i) {
		                		if(i.employeeId!==undefined){
		                			custAgentList.push(i.employeeId);
		                		}
		                	});
                            $scope.opts.data =custAgentList;
						}
					});


                    // ----------------选择客户开始--------------------
                    $scope.radioRptOptions = {};
                    $scope.radioRptOptions.select="";
                    // 单个选中
                    $scope.selectOne = function(i) {
                        angular.forEach($scope.custCollection, function(i) {
                            if($scope.radioRptOptions.select == i.custNo){
                            	$scope.selectCustInfo = i;
                            	return ;
                            }
                        });
                    }
                    $scope.selectRow = function(i) {
                        $scope.radioRptOptions.select = i.custNo;
                    	$scope.selectCustInfo = i;

                    }

                    $scope.ok = function () {
                        // if (!($scope.selectCustInfo.sex == 1 || $scope.selectCustInfo.sex == 2)) {
                        //     Alert.error('当前用户性别未知，不能添加关系');
                        //     return
                        // }
                        // if($scope.radioRptOptions.select ==""){
                        //     Alert.error('请选择客户！');
                        //     return ;
                        // }
                      $uibModalInstance.close($scope.selectCustInfo);
                    };
                    // ----------------选择客户结束--------------------



                    // 查询条件对象
                    $scope.searchObj = {
                        'custAgent' : '',
                        'custName' : ''
                    };
                    // 查询事件
                    $scope.search = function(page) {
                        $scope.custListOpts.params = $scope.searchObj;
                    	this.queryPage(page);
                    }

                    // 新增事件
                    $scope.smartTablePageSize = 10;


                    // 客户转交
                    $scope.checkedRow = [];

                    // 单个选中
                    $scope.selectOne1 = function() {
                        angular.forEach($scope.custCollection, function (i) {
                            var index = $scope.checkedRow.indexOf(i);
                            if (i.checked && index === -1) {

                                // 条件对象
                                $scope.delObj = {
                                    'custNo' : '',
                                };
                                $scope.delObj.custNo = i.custNo;
                                $scope.checkedRow.push($scope.delObj);
                            } else if (!i.checked && index !== -1) {
                                $scope.checkedRow.splice(index, 1);
                            }
                        });

                        if ($scope.custCollection.length === $scope.checkedRow.length) {
                            $scope.select_all = true;
                        } else {
                            $scope.select_all = false;
                        }
                        $rootScope.checkedRow = $scope.checkedRow;
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

                }

			})();
