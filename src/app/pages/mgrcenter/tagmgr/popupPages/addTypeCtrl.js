(function () {
    'use strict';

    angular.module('BlurAdmin.pages.mgrcenter.tagMgr').controller(
        'addTagTypeCtrl', addTagTypeCtrl);

    /** @ngInject */
    function addTagTypeCtrl($scope, $filter, $uibModal, $timeout, toastr, Alert, HttpService) {
        //用户信息对象
        $scope.saveType = {
            "tagTypeName": "",
            "superTagTypeId": "",
            "tagTypeLevel": "",
            "remark": ""
        };

        //初始化上级标签下拉列表
        $scope.superTagTypeT = [];
        var optsForST = {};
        optsForST.url = '/crm/manage/tagmng/tagTypes';
        optsForST.method = 'GET';
        HttpService.linkHttp(optsForST).then(function (response) {
            angular.forEach(response.data, function (item) {
                $scope.superTagTypeT.push({label: item.tagTypeName, value: item.tagTypeId});
            })

            $scope.superTagTypeId = $scope.superTagTypeT;
        });

        /*保存数据*/
        $scope.saveValue = function () {
            if ($scope.saveType.tagTypeName == null || $scope.saveType.tagTypeName == '') {
                Alert.error('请填写标签类别名称')
                return
            }

            $scope.v = $scope.saveType.superTagTypeId.value;
            $scope.saveType.superTagTypeId = "";
            $scope.saveType.superTagTypeId = $scope.v;

            if ($scope.saveType.superTagTypeId) {

                var optsForSave = {};
                optsForSave.url = '/crm/manage/tagmng/tagType';
                optsForSave.method = 'GET';
                optsForSave.params = {
                    "tagTypeId": $scope.v
                };

                HttpService.linkHttp(optsForSave).then(function (response) {
                    $scope.saveType.tagTypeLevel = parseInt(response.data.tagTypeLevel) + 1;
                    var opts = {};
                    opts.url = '/crm/manage/tagmng/tagType';
                    opts.method = 'POST';
                    opts.params = $scope.saveType;
                    HttpService.linkHttp(opts).then(function (response) {
                        Alert.success('新增成功!');
                        $scope.$parent.$dismiss();
                        $scope.refresh();

                    });
                });


            } else {


                $scope.saveType.tagTypeLevel = 1;
                var opts = {};
                opts.url = '/crm/manage/tagmng/tagType';
                opts.method = 'POST';
                opts.params = $scope.saveType;
                HttpService.linkHttp(opts).then(function (response) {
                    Alert.success('新增成功!');
                    $scope.$parent.$dismiss();
                    $scope.refresh();

                });


            }


        }

        // 关闭页面
        $scope.closePage = function () {
            $scope.$parent.$dismiss();
        }

    }

})();
