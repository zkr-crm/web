(function() {
    'use strict';

    angular.module('BlurAdmin.pages.mgrcenter.msgManage.msgConf')
        .controller('addMsgConfCtrl', addMsgConfCtrl);
    /** @ngInject */
    function addMsgConfCtrl($scope, $uibModal, $filter, $timeout, $http,
                              HttpService, EnumType, Alert) {

        $scope.msgConf={};

        // 保存
        $scope.saveValue = function() {
            if(!$scope.msgConf.msgEventType){
                Alert.error('事件不能为空');
                return
            }
            if(!$scope.msgConf.msgDescrption){
                Alert.error('事件描述不能为空');
                return
            }
            if(!$scope.msgConf.msgAdvdays){
                Alert.error('提前天数不能为空');
                return
            }else if(isNaN(parseInt($scope.msgConf.msgAdvdays))){
                Alert.error('提前天数只能输入整数');
                return
            }
            if(!$scope.msgConf.msgContent){
                Alert.error('短信模板不能为空');
                return
            }
            var opts = {};
            opts.url = '/crm/manage/msgConf/addMsgConf';
            opts.method = 'POST';
            opts.params = $scope.msgConf;
            HttpService.linkHttp(opts).then(function(response) {
                Alert.success("请求成功");
                $scope.$parent.$dismiss();
                // 刷新主页面
                $scope.getAllMsgConf();
            });
        }

        // 关闭页面
        $scope.closePage = function() {
            $scope.$parent.$dismiss();
        }
        // 任务状态下拉列表事件
        $scope.selectEventTypeState = function(selectedEventTypeState) {
            $scope.msgConf.msgEventType = selectedEventTypeState.value;
        }

        // 获取任务状态列表
        $scope.getTaskStates = function() {
            if (!!EnumType.EventType) {
                $scope.EventTypeList.push(EnumType.EventType.birthday);
                $scope.EventTypeList.push(EnumType.EventType.renewal_insurance);
            }
        }

        // 模板选择
        $scope.selectTemplate = function() {
            var modalInstance = $uibModal
                .open({
                    animation : true,
                    backdrop : 'static',
                    templateUrl : 'app/pages/mgrcenter/msgManage/msgConf/popup/selectMsgConfTmpt.html',
                    size : 'midle-1200',
                    controller : 'selectMsgConfCtrl',
                    scope : $scope,
                    resolve : {
                        items : function() {
                            return $scope.items;
                        }
                    }
                });
            modalInstance.result.then(function(result) {
                $scope.msgConf.msgTemplate = result.tplNo; // 模板代码
                $scope.msgConf.msgContent = result.tplCont; // 模板内容

                console.log(result); // result关闭是回传的值
            }, function(reason) {
                console.log(reason);// 点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel
            });
        }
         // 页面数据初始化
            $scope.initData = function() {
                console.log("---------初始化---------start--------");
                //下拉集合
                $scope.EventTypeList = [];
                $scope.selectedEventTypeState= {};
                $scope.getTaskStates();
                console.log("---------初始化---------end--------");
            }
         $scope.initData();
    }

})();
