(function() {
    'use strict';

    angular.module('BlurAdmin.pages.similar').controller('taskDistriDetailCtrl',
        taskDistriDetailCtrl);
    /** @ngInject */
    function taskDistriDetailCtrl($scope, $stateParams, $state, $uibModal,
                               HttpService, Alert, EnumType) {

        // 任务编号
        $scope.taskId = $stateParams.taskId;
        if($scope.taskId==null || $scope.taskId==""){
            window.history.go(-1);
            return;
        }
        $scope.custmergeApply = {};

        // 任务状态枚举值转换为文字显示
        $scope.showTaskStat = function(taskState) {
            var xxx = "";
            angular.forEach(EnumType.SimTaskState, function(i) {
                if (taskState === i.value) {
                    xxx = i.label;
                }
            });
            return xxx;
        }

        // 历史动作枚举值转换为汉字显示
        $scope.showTaskTrace = function(item) {
            var xxx = "";
            angular.forEach(EnumType.MergeSplitAction, function(i) {
                if (item.mergeSplitAction === i.value) {
                    xxx = i.label;
                }
            });
            return xxx;
        }

        // 性别枚举值转换为汉字显示
        $scope.ShowGender = function(item) {

            var sexLabel = "";
            angular.forEach(EnumType.Sex, function(i) {
                if (item.sex === i.value) {
                    sexLabel = i.label;
                }
            });
            return sexLabel;
        };

        // 证件类型枚举值转换为汉字显示
        $scope.ShowCertTyp = function(item) {

            var certTyp = "";
            angular.forEach(EnumType.IdType, function(i) {
                if (item.certTyp === i.value) {
                    certTyp = i.label;
                }
            });
            return certTyp;
        };

        // 证件类型枚举值转换为汉字显示
        $scope.ShowDealConclusion = function(item) {

            var dealConclusion = "";
            angular.forEach(EnumType.ApprovConclusion, function(i) {
                if (item.dealConclusion === i.value) {
                    dealConclusion = i.label;
                }
            });
            return dealConclusion;
        };

        // 小数转换为百分比
        $scope.toPercent = function(point) {
            var str = Number(point * 100).toFixed(0);
            if(isNaN(str)){
                return null;
            }
            str += "%";
            return str;
        }

        $scope.writCount = 200;
        // 输入字数限定200字
        $scope.tolCount = function() {
            if ($scope.custmergeApply.applyOpinion.length > 200) {
                Alert.error('字数不能超过200字！');
            } else {
                $scope.writCount = 200 - $scope.custmergeApply.applyOpinion.length;
            }
        };

        // 打开客户详情页面
        $scope.openCustDetail = function(custNo) {
            $state.go('portrayal.perCusPortrayal', {
                'custNo' : custNo
            });
        }

        $scope.init = function() {
            var opts = {};
            opts.url = '/crm/ecif/similar/getTaskByTaskId';
            opts.method = 'GET';
            opts.params = {
                'taskId' : $scope.taskId
            };
            HttpService
                .linkHttp(opts)
                .then(
                    function(response) {

                        var data = response.data;

                        // 详细任务数据初始化
                        $scope.taskId = data.taskId;
                        $scope.taskState = data.simTask.taskState;
                        $scope.judgeRuleDesc = data.simCustRule.judgeDesc;
                        $scope.similarPercent = data.simTask.similarPercent;

                        // 合并、关闭按钮的可操作性
                        if (EnumType.SimTaskState.pending.value == $scope.taskState
                            || EnumType.SimTaskState.merge_send_back.value == $scope.taskState
                            || EnumType.SimTaskState.close_send_back.value == $scope.taskState) {
                            $scope.marge = false;
                            $scope.close = false;
                        } else {
                            $scope.marge = true;
                            $scope.close = true;
                        }

                        // 审批人意见div是否显示控制
                        if (EnumType.SimTaskState.pending.value == $scope.taskState|| EnumType.SimTaskState.unDistribute.value == $scope.taskState) {
                            $scope.isShow = false;
                        } else {
                            $scope.isShow = false;
                        }

                        // 相似客户信息获取
                        $scope.rowCollection = data.simCustDetilList;
                        // 出生日期截取年月日
                        angular.forEach($scope.rowCollection, function(
                            i) {
                            if(i.birthDate!=null && i.birthDate.length>=10) {
                                i.birthDate = i.birthDate.substring(0, 10);
                            }
                        });

                        // 相似任务处理轨迹信息获取
                        $scope.timelineCollection = data.mergeSplitTraceList;

                        if (data.custMergeApplyList != null
                            && data.custMergeApplyList[0] != null) {
                            $scope.custmergeApply.approveSugges = data.custMergeApplyList[0].approveSugges;
                        }

                        $scope.applyOpinion = "";
                    });
        }
        $scope.init();

        // 返回任务列表
        $scope.backToList = function() {
            $state.go('similar.taskDistribute');
            //window.history.go(-1);
        };

        // 选中行对象
        $scope.checkedRow = [];
        // 全选
        $scope.selectAll = function() {
            if (!$scope.select_all) {
                $scope.checkedRow = [];
                var count = 0;
                angular.forEach($scope.rowCollection, function(i) {
                    i.isChecked = true;

                    // 选中对象
                    $scope.selectedObj = {};
                    $scope.selectedObj.custNo = i.custNo;

                    $scope.checkedRow.push($scope.selectedObj);
                })
                $scope.select_all = true;
            } else {
                angular.forEach($scope.rowCollection, function(i) {
                    i.isChecked = false;
                    $scope.checkedRow = [];
                })
                $scope.select_all = false;
            }
        };

        // 单个选中
        $scope.selectOne = function() {
            angular.forEach($scope.rowCollection, function(i) {
                var index = $scope.checkedRow.indexOf(i);
                if (i.isChecked && index === -1) {

                    // 选中对象
                    $scope.selectedObj = {};
                    $scope.selectedObj.custNo = i.custNo;

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

        // 合并任务
        $scope.doCustMerge = function() {
            if ($scope.checkedRow.length == 0) {
                Alert.error('请选择要合并的客户！');
                $scope.activeTab = 0;
            } else if ($scope.checkedRow.length == 1) {
                Alert.error('请至少选择两条客户信息！');
                $scope.activeTab = 0;
            } else {
                $scope.flg = 0;
                $uibModal
                    .open({
                        animation : true,
                        backdrop : 'static',
                        templateUrl : 'app/pages/similar/similarDetail/mergeApplyOpinion.html',
                        size : 'midle-900',
                        controller : 'mergeApplyOpinionCtrl',
                        scope : $scope,
                        resolve : {}
                    });
            }
        }

        // 关闭任务
        $scope.doCloseTask = function() {

            $scope.flg = 1;
            $uibModal
                .open({
                    animation : true,
                    backdrop : 'static',
                    templateUrl : 'app/pages/similar/similarDetail/mergeApplyOpinion.html',
                    size : 'midle-900',
                    controller : 'mergeApplyOpinionCtrl',
                    scope : $scope,
                    resolve : {}
                });
        }
        $scope.flg = "";
        // 单个任务分配页面跳转
        $scope.taskDistrib = function (taskId) {
            if (!$scope.queryPage && this.queryPage) {
                $scope.queryPage = this.queryPage;
            }
            $scope.editTaskId = taskId;
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
                })
        };
    }
})();
