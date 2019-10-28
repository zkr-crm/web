(function() {
    'use strict';

                angular.module('BlurAdmin.pages.customer').controller('selectCntrDlgCtrl', selectCntrDlgCtrl);
                /** @ngInject */
                function selectCntrDlgCtrl($scope, $state, HttpService,EnumType,Alert,$uibModal,$rootScope,$uibModalInstance, $filter) {
                    // 对象
                    $scope.custContract = {};
                    // 对象数据集
                    $scope.RowCollection = [];
                    // 查询条件对象
                    $scope.searchObj = {
                              'mobile' : '',
                              'contractName' : ''
                    };

                    $scope.resetCustCntr = function () {
                        $scope.searchObj = {
                                  'mobile' : '',
                                  'contractName' : ''
                          };
                        $scope.search();
                    }
                    $scope.search = function(page) {
                          $scope.queryOptions.params = $scope.searchObj;
                          this.queryPage(page);
                    };

                  $scope.queryOptions = {};
                  $scope.queryOptions.pagination = {
                    pageSize:'10',
                    pageIndex:1,
                    maxText:5
                  }
                  $scope.queryOptions.url = '/crm/ocrm/CustContractmng/getAllCustContracts';
                  $scope.queryOptions.method = 'GET';
                          $scope.queryOptions.params = {};
                          $scope.queryOptions.success = function successCallback(response) {
                              //console.log("请求成功");
                                $scope.RowCollection = response.data.map(function (item) {
                                    item.custRelation = EnumType.Relation.getLabelByValue(item.custRelation);
                                    return item;
                                  });
                          };

                            $scope.radioRptOptions = {};
                            $scope.radioRptOptions.select="";
                            // 单个选中
                            $scope.selectRptOne = function(i) {
                                angular.forEach($scope.busiOppList, function(i) {
                                    if($scope.radioRptOptions.select == i.contractNo){
                                        $scope.checkedRow = i;
                                        return ;
                                    }
                                });
                            }
                            $scope.selectRptRow = function(item) {
                                $scope.radioRptOptions.select = item.contractNo;
                                $scope.checkedRow = item;

                            }

                    // 确定按钮事件
                    $scope.doConfirm = function() {
                        if ($scope.checkedRow.select == '') {
                            Alert.error('请选择联系人！');
                            return;
                        }
                        $uibModalInstance.close($scope.checkedRow);
                    }
                }
            })();
