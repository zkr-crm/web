(function() {
    'use strict';

    angular.module('mgrcenter.engineManage.strategy.view').controller(
        'viewStrategyCtrl', viewStrategyCtrl);
    /** @ngInject */
    function viewStrategyCtrl($scope,$log,$state,$stateParams,$compile, toastr, toastrConfig,$uibModal, $filter, $timeout, $http,
                              HttpService, EnumType, Alert) {

        $scope.findRelations = function () {
            $scope.strategyObj = $stateParams.strategy;
            var opts = {};
            opts.url = '/crm/manage/engine/strategy/findRelations';
            opts.method = 'GET';
            opts.params = {'strategyId':$scope.strategyObj.strategyId};
            HttpService.linkHttp(opts).then(function(response) {
                if (response.status=="1"){
                    response.data.name = $scope.strategyObj.strategyName;
                    var myChart = echarts.init(document.getElementById('testEcharts'));
                    var option = {
                        title : {
                            text: '',
                            subtext: '',
                            subtextStyle:{
                            	fontSize:18
                            }
                        },
                        calculable : false,

                        series : [
                            {
                                name:'树图',
                                type:'tree',
                                top: '1%',
                                left: '17%',
                                bottom: '1%',
                                right: '20%',
                                layout:'layout',
                                orient: 'horizontal',  // vertical horizontal
                                symbol:'rect', // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                                symbolSize:[150, 40],
                                initialTreeDepth:-1,
                                label: {
                                    show: true,
                                    position:'inside',
                                    formatter: "{b}",
                                    color:'#fff',
                                    fontWeight:'bolder'
                                },
                                lineStyle: {
                                    color: '#48b',
                                    shadowColor: '#000',
                                    shadowBlur: 3,
                                    shadowOffsetX: 3,
                                    shadowOffsetY: 5,
                                    type: 'curve' // 'curve'|'broken'|'solid'|'dotted'|'dashed'
                                },
                                itemStyle: {
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                            offset: 0, color: 'blue' // 0% 处的颜色
                                        }, {
                                            offset: 1, color: 'blue' // 100% 处的颜色
                                        }],
                                        globalCoord: false // 缺省为 false
                                    },
                                    borderColor:'#929292',
                                    //color:"#fff"
                                },
                                /*label:{
                                	color:'#fff'
                                },*/
                                
                                data: [response.data]
                            }
                        ]
                    };
                    myChart.setOption(option);

                    myChart.on('click', function (params) {
                    });
                }
            });
        }

        function getTreeData() {
            return [
                {
                    name: '根节点',
                    value: 6,
                    children: [
                        {
                            name: '节点1',
                            value: 4,
                            children: [
                                {
                                    name: '叶子节点1',
                                    value: 4
                                },
                                {
                                    name: '叶子节点2',
                                    value: 4
                                },
                                {
                                    name: '叶子节点3',
                                    value: 2
                                }
                            ]
                        },
                        {
                            name: '节点2',
                            value: 4,
                            children: [{
                                name: '叶子节点7',
                                value: 4
                            },
                                {
                                    name: '叶子节点8',
                                    value: 4
                                }]
                        },
                        {
                            name: '节点3',
                            value: 1,
                            children: [
                                {
                                    name: '叶子节点9',
                                    value: 4
                                },
                                {
                                    name: '叶子节点10',
                                    value: 4
                                },
                                {
                                    name: '叶子节点11',
                                    value: 2
                                },
                                {
                                    name: '叶子节点12',
                                    value: 2
                                }
                            ]
                        }
                    ]
                }
            ];
        }

        $scope.findRelations();
        $scope.backRole = function () {
            $state.go('mgrcenter.engineManage.strategy',{});
            // $location.path('/portrayal/perCusPortrayal').search({'custNo':custNo});
        }



    }
})();