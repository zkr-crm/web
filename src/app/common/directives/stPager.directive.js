angular.module('BlurAdmin.common')
    // 分页组件
    .directive('stPager', function() {
        // function link($scope, element, $attrs) {

        // }
        return {
            restrict: 'E',
            scope:true,
            // link: link,
            templateUrl: 'app/common/directives/template/my-pagination.html',
            controller: function ($scope, $element, $attrs, $transclude, HttpService, Alert, $rootScope) {
                $scope.pagination = {}
                $scope.optsType = $attrs.opts;
                $scope.pagination[$scope.optsType] = {
                    pageSize:'10',
                    pageIndex:1,
                    maxText:5
                }
                var opts = $scope[$attrs.opts];
                if (opts == undefined || opts.success == undefined) {
                    return;
                }
                // if (opts.pagination) {
                //     $scope.pagination = opts.pagination
                // }
                if (!!opts.success) {
                    var targetCallback = angular.copy(opts.success);
                    opts.success = function (response) {
                        if (response.status === '1') {

                            $scope.pagination[$scope.optsType].totalItems = response.data?response.data.total:0;
                            $scope.pagination[$scope.optsType].maxText = Math.ceil($scope.pagination[$scope.optsType].totalItems / $scope.pagination[$scope.optsType].pageSize); //计算最大页数
                            $scope.pagination[$scope.optsType].pageIndex = !$scope.pagination[$scope.optsType].pageNewIndex ?  $scope.pagination[$scope.optsType].pageIndex : ( $scope.pagination[$scope.optsType].pageIndex > $scope.pagination[$scope.optsType].maxText ? $scope.pagination[$scope.optsType].maxText : $scope.pagination[$scope.optsType].pageNewIndex);
                            $scope.pagination[$scope.optsType].pageNewIndex = ''; //清空跳转数
                            console.log("共"+$scope.pagination[$scope.optsType].totalItems+"条数据")
                            //
                            targetCallback(response);
                        } else if (response.status === '0') {
                            Alert.error(response.message)
                        }

                    };
                }

                $scope.queryPage = function (n) {
                    $scope.$parent.select_all = false;
                    if (n != 1) {
                        if (n > $scope.totalPages || n < 1) {
                            return;
                        }
                    }
                    $scope.pagination[$scope.optsType].pageIndex = n||1;
                    if (!opts.params) {
                        opts.params = {};
                    }
                    opts.params.sys = {};
                    opts.params.sys.pageNum = n||1;
                    opts.params.sys.pageSize = $scope.pagination[$scope.optsType].pageSize
                    console.log("显示"+opts.params.sys.pageNum+"到"+(opts.params.sys.pageSize)+"页")

                    // if (!!opts.pageSize) {
                    //     opts.params.sys.pageSize = opts.pageSize;

                    // } else {
                    //     opts.params.sys.pageSize = 10;
                    // }
                    delete opts.pagination;
                    HttpService.http(opts);

                };
                $scope.$emit('pagination',$scope.pagination)
                $scope.$emit('queryPage',$scope.queryPage)
                if (opts.noDefaultQuery) { //是否默认查询
                    return
                }
                $scope.queryPage(1);

                /****临时解决方案**解决在其他页面使用this.queryPage调用该插件时queryPage未定义的问题******/
                $scope.$parent.queryPage=function(){
                    $scope.queryPage();
                }
                $scope.$parent.refreshPage=function(n,option){
                    $scope.refreshPage(n,option);
                }
                /****临时解决方案**解决在其他页面使用this.queryPage调用该插件时queryPage未定义的问题******/

                $scope.refreshPage = function (n,option) {
                    if (n != 1) {
                        if (n > $scope.totalPages || n < 1) {
                            return;
                        }
                    }

                    if (!option.params) {
                        option.params = {};
                    }
                    option.params.sys = {};
                    option.params.sys.pageNum = n;
                    if (!!$attrs.pagesize) {
                        option.params.sys.pageSize = $attrs.pagesize;
                    } else {
                        option.params.sys.pageSize = 10;
                    }

                    HttpService.http(option);

                };
                $scope.$emit('refreshPage',$scope.refreshPage)

            }
        };
    })
    ;
