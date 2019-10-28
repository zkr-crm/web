//var app = angular.module("app", []);   //定义app
app.run(['$rootScope', '$location','$state', function ($rootScope, $location) {   //需要注入服务$rootScope；$location在这可要可不要，这里用来查看获取新的路由链接
                                                                         //路由监听事件
    $rootScope.routelist=[];
    $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) {
        //    console.log('路由的状态变化开始');
        });
    // stateChangeSuccess  当模板解析完成后触发

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
     //   console.log('路由的状态变化成功 ：' + fromState.name);
     //   console.log('当前路由参数为 ：' + toParams);
     //   console.log('上一个路由参数为 ：' + fromParams);
        var map = new Map();
        map.set(toState.name, toParams);
        $rootScope.routelist.push(map);
    });

    // $stateChangeError  当模板解析过程中发生错误时触发
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
     //   console.log('路由的状态变化失败');
    })
}]);