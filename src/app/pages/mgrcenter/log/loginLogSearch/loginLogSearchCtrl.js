(function () {
    'use strict';

    angular.module('BlurAdmin.pages.mgrcenter.log.loginLogSearch').controller(
        'loginLogSearchCtrl', loginLogSearchCtrl);

    /** @ngInject */
    function loginLogSearchCtrl($scope, $uibModal, $filter, $timeout, $http,
                                HttpService, EnumType, Alert) {
        $scope.pagination = {
            pageSize: '10',
            pageIndex: 1,
            maxText: 5
        }
        // html查询条件对象
        $scope.searchLogin = {};
        // 参数 查询条件对象
        $scope.searchLogin1 = {};

        // 对象数据集
        $scope.LoginRowCollection = [];

        // 登陆日志类型下拉框显示
        $scope.Show = function (item) {
            var typeLabel = "";
            angular.forEach(EnumType.LogType, function (i) {
                if (item.logType == i.value) {
                    typeLabel = i.label;
                }
            });
            return typeLabel;
        };


        $scope.search = function (page) {
            $scope.searchLogin1 = {
                'userId': $scope.searchLogin.userId
            };
            if ($scope.searchLogin.startDate != null && $scope.searchLogin.startDate != '') {
                var startDate = new Date($scope.searchLogin.startDate);
                $scope.searchLogin1.startDate = $filter('date')(startDate, 'yyyyMMdd');
            }
            if ($scope.searchLogin.endDate != null && $scope.searchLogin.endDate != '') {
                var endDate = new Date($scope.searchLogin.endDate);
                $scope.searchLogin1.endDate = $filter('date')(endDate, 'yyyyMMdd');
            }
            $scope.queryLoginLogOptions.url = 'crm/manage/logmng/selLoginLog';
            $scope.queryLoginLogOptions.method = 'GET';
            $scope.queryLoginLogOptions.params = $scope.searchLogin1;
            // page=page||1;
            this.queryPage(page);

        }

        $scope.queryLoginLogOptions = $scope.pagination;
        $scope.queryLoginLogOptions.url = 'crm/manage/logmng/selLoginLog';
        $scope.queryLoginLogOptions.method = 'GET';
        $scope.queryLoginLogOptions.params = $scope.searchLogin1;
        $scope.queryLoginLogOptions.success = function successCallback(response) {
            $scope.LoginRowCollection = response.data.list;
        };

        // 关闭弹出页面
        $scope.closePage = function () {

            $scope.$parent.$dismiss();
        }

        // 日期控件
        $scope.opened3 = {
            opened : false
        }
        $scope.opened4 = {
            opened : false
        }

        // 打开日期控件
        $scope.open3 = function() {
            $scope.opened3.opened = !$scope.opened3.opened;
        }

        $scope.open4 = function () {
            $scope.opened4.opened = !$scope.opened4.opened;
        }
    }
})();
