(function () {
    'use strict';

    angular.module('BlurAdmin.pages.profile')
        .controller('selAutoRemindSendTmptCtrl', selAutoRemindSendCtrl);

    /** @ngInject */
    function selAutoRemindSendCtrl($scope, $http, HttpService,$uibModalInstance,EnumType, Alert) {
        // 用户对象
        $scope.msgTpl = {};
        // 查询条件对象
        $scope.searchObj = {};
        // 用户对象数据集
        $scope.RowCollection = [];
        $scope.smartTablePageSize = 5;
        //发送模板
        $scope.radioRptOptions = {};
        $scope.radioRptOptions.select="";
        $scope.sendTemDts = {};
        $scope.sendTemDts.tplNo ="" ;  //模板编号
        $scope.sendTemDts.tplTitle ="" ;  //模板标题
        $scope.sendTemDts.tplCont ="" ;  //模板标题

        $scope.radioRptOptions = {};
        $scope.radioRptOptions.select="";
        // 单个选中
        $scope.selectRptOne = function(i) {
            angular.forEach($scope.RowCollection, function(i) {
                if($scope.radioRptOptions.select == i.tplNo){
                    $scope.sendTemDts.tplNo = i.tplNo ;  //模板编号
                    $scope.sendTemDts.tplCont =i.tplCont ;  //模板内容
                    return ;
                }
            });
        }
        $scope.selectRptRow = function(item) {
            $scope.radioRptOptions.select = item.tplNo;
            $scope.sendTemDts = item;

        }

        $scope.restTpl = function() {
            $scope.searchObj.tplNo ="" ;  //模板编号
            $scope.searchObj.tplTitle ="" ;  //模板标题
            $scope.searchObj.tplCont="";//模板内容
        }

        $scope.ok = function () {
            console.log(angular.toJson($scope.sendTemDts));
            if($scope.radioRptOptions.select ==""){
                Alert.error('请选择模板！');
                return ;
            }
            $uibModalInstance.close($scope.sendTemDts);
        };
        $scope.search =function(page){
            page=page||1;
            this.queryPage(page);
        };

        // 业务类型显示
        $scope.showBusiType = function(item) {

            var busiTypeLabel="";
            angular.forEach(EnumType.busiType, function(i) {
                if (item.busiType === i.value) {
                    busiTypeLabel=i.label;
                }
            });

            return busiTypeLabel;
        };

        var init = function () {
            $scope.selectOpts={
                pagination:{
                    pageSize:'10',
                    pageIndex:1,
                    maxText:5
                },
                url:'/crm/manage/msgmng/getMsgTemplateByEntity',
                method:'GET',
                params:$scope.searchObj,
                success:function(response){
                    if (response == undefined || response.data == undefined) {
                        return;
                    }
                    if(response.data.list.length > 0){
                        $scope.RowCollection = response.data.list.filter(function(x){
                            return x.tplType === '02';
                        });
                    }else{
                        $scope.RowCollection = response.data.list;
                    }
                }
            }

        }
        init();

    }

})();