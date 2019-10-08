(function() {
    'use strict';

    angular.module('mgrcenter.engineManage.combinerule.view').controller(
        'viewCombineruleCtrl', viewCombineruleCtrl);
    /** @ngInject */
    function viewCombineruleCtrl($scope,$log,$state,$stateParams,$compile, toastr, toastrConfig,$uibModal, $filter, $timeout, $http,
                              HttpService, EnumType, Alert) {

        $scope.findRelations = function () {
            $scope.combineruleObj = $stateParams.combinerule;
            var opts = {};
            opts.url = '/crm/manage/engine/combineRule/findRelations';
            opts.method = 'GET';
            opts.params = {'combineRuleId':$scope.combineruleObj.combineRuleId};
            HttpService.linkHttp(opts).then(function(response) {
                if (response.status=="1"){
                    response.data.name = $scope.combineruleObj.combineRuleName;
                    // console.log(response.data);
                    // console.log(getTreeData());

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
                                    borderColor:'#929292'
                                },
                                data: [response.data]
                            }
                        ]
                    };
                    myChart.setOption(option);

                    myChart.on('click', function (params) {
                        // 控制台打印数据的名称
                        console.log(params);
                        console.log(myChart);

                        // myChart.setOption({
                        //     series: [{
                        //         // 根据名字对应到相应的系列
                        //         data: getTreeData()
                        //     }]
                        // });
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
            $state.go('mgrcenter.engineManage.combinerule',{});
            // $location.path('/portrayal/perCusPortrayal').search({'custNo':custNo});
        }



    }
})();