(function () {
    'use strict';

    angular.module('BlurAdmin.pages.similar').controller('taskDistributeCtrl',
        taskDistributeCtrl);

    /** @ngInject */
    function taskDistributeCtrl($scope, $filter, $compile, $uibModal,
                                $rootScope, Alert, $state, HttpService, EnumType) {
        // $scope.smartTablePageSize = 5;

        // 任务列表集合对象
        $scope.rowCollection = [];
        // 查询条件对象
        $scope.searchObj = {};

        // 任务状态枚举值转换为文字显示
        $scope.showTaskStat = function (item) {
            var xxx = "";
            angular.forEach(EnumType.SimTaskState, function (i) {
                if (item.taskState === i.value) {
                    xxx = i.label;
                }
            });
            return xxx;
        }

        // 小数转换为百分比
        $scope.toPercent = function (point) {
            var str = Number(point * 100).toFixed(0);
            str += "%";
            return str;
        }

        // 选中行对象
        $scope.checkedRow = [];
        // 全选
        $scope.selectAll = function () {
            if (!$scope.select_all) {
                $scope.checkedRow = [];
                var count = 0;
                angular.forEach($scope.rowCollection, function (i) {
                    i.isChecked = true;

                    // 选中对象
                    $scope.selectedObj = {};
                    $scope.selectedObj.taskId = i.taskId;

                    $scope.checkedRow.push($scope.selectedObj);
                })
                $scope.select_all = true;
            } else {
                angular.forEach($scope.rowCollection, function (i) {
                    i.isChecked = false;
                    $scope.checkedRow = [];
                })
                $scope.select_all = false;
            }
        };

        // 单个选中
        $scope.selectOne = function () {
            angular.forEach($scope.rowCollection, function (i) {
                var index = $scope.checkedRow.indexOf(i);
                if (i.isChecked && index === -1) {

                    // 选中对象
                    $scope.selectedObj = {};
                    $scope.selectedObj.taskId = i.taskId;

                    $scope.checkedRow.push($scope.selectedObj);
                } else if (!i.isChecked && index !== -1) {
                    $scope.checkedRow.splice(index, 1);
                }
            });

            if ($scope.rowCollection.length === $scope.checkedRow.length) {
                $scope.select_all = true;
            } else {
                $scope.select_all = false;
            }
        }

        // 查询当前登录用户的任务列表
        $scope.search = function (page) {
            var page = page || '1'
            $scope.queryOptions.params = $scope.searchObj;
            $scope.queryOptions.pageSize = $scope.pagination.pageSize;
            if (this.queryPage) {
                this.queryPage(page)
            } else {
                $scope.queryPage(page);
            }

        };

        // 待分配任务

        // 分页查询所有任务
        $scope.queryOptions = {};
        $scope.queryOptions.url = '/crm/ecif/similar/getTaskByEntity';
        $scope.queryOptions.method = 'POST';
        $scope.queryOptions.params = {};
        $scope.queryOptions.data = $scope.searchObj;
        $scope.queryOptions.success = function successCallback(response) {
            $scope.rowCollection = response.data.list;
        };

        //标记：0代表批量分配，1代表单个分配
        $scope.flg = "";
        // 单个任务分配页面跳转
        $scope.taskDistrib = function (item) {
            if (!$scope.queryPage && this.queryPage) {
                $scope.queryPage = this.queryPage;
            }
            $scope.editTaskId = item.taskId;
            $scope.flg = "1";
            $uibModal
                .open({
                    animation: true,
                    backdrop: 'static',
                    templateUrl: 'app/pages/similar/taskDistribute/doTaskDistribute.html',
                    size: 'midle-900',
                    controller: 'doTaskDistributeCtrl',
                    scope: $scope,
                    resolve: {}
                }).result.then(function (result) {
                $scope.queryPage();
            }, function (reason) {
                $scope.queryPage()
            });
        };

        // 批量任务分配页面跳转
        $scope.tasksDistrib = function () {
            if (!$scope.queryPage && this.queryPage) {
                $scope.queryPage = this.queryPage;
            }
            $scope.flg = "0";
            if ($scope.checkedRow == null || $scope.checkedRow.length == 0) {
                Alert.error('请选择要分配的任务！');
            } else {
                $uibModal
                    .open({
                        animation: true,
                        backdrop: 'static',
                        templateUrl: 'app/pages/similar/taskDistribute/doTaskDistribute.html',
                        size: 'midle-900',
                        controller: 'doTaskDistributeCtrl',
                        scope: $scope,
                        resolve: {}
                    }).result.then(function (result) {
                    $scope.queryPage();
                }, function (reason) {
                    $scope.queryPage()
                });
            }
        }

        //初始化
        var init = function () {
            $scope.pagination = {
                pageSize: '10',
                pageIndex: 1,
                maxText: 5
            }
            $scope.searchObj.taskState = EnumType.SimTaskState.unDistribute.value;
            // 分页查询所有任务
            $scope.queryOptions = {};
            $scope.queryOptions.pagination = {
                ageSize: '10',
                pageIndex: 1,
                maxText: 5
            }
            $scope.queryOptions.url = '/crm/ecif/similar/getTaskByEntity';
            $scope.queryOptions.method = 'POST';
            $scope.queryOptions.params = {};
            $scope.queryOptions.data = $scope.searchObj;
            $scope.queryOptions.success = function successCallback(response) {
                $scope.rowCollection = response.data.list;
            };

        }
        init()

    }
})();
