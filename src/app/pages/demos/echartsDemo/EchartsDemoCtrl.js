(function () {
    'use strict';

    angular.module('BlurAdmin.pages.demos.echartsDemo')
        .controller('EchartsDemoCtrl', EchartsDemoCtrl);

    /** @ngInject */
    function EchartsDemoCtrl($scope, $filter, $uibModal, $timeout, toastr, Alert, EnumType) {


        var myChart = echarts.init(document.getElementById('testEcharts'));
        var option = {
            title: {text: '关系图谱'},
            tooltip: {
                formatter: function (x) {
                    return x.data.des;
                }
            },
            series: [
                {
                    type: 'graph',
                    layout: 'force',
                    symbolSize: 80,
                    roam: true,
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [4, 10],
                    force: {
                        repulsion: 2500,
                        edgeLength: [10, 50]
                    },
                    draggable: true,
                    itemStyle: {
                        normal: {
                            color: '#4b565b'
                        }
                    },
                    lineStyle: {
                        normal: {
                            width: 2,
                            color: '#4b565b'

                        }
                    },
                    edgeLabel: {
                        normal: {
                            show: true,
                            formatter: function (x) {
                                return x.data.name;
                            }
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            textStyle: {}
                        }
                    },
                    data: [
                        {
                            name: '张三',
                            des: '高消费客户<br/>xxx保险，yyy保险',
                            symbolSize: 100,
                            itemStyle: {
                                normal: {
                                    color: 'red'
                                }
                            }
                        }, {
                            name: '李四',
                            des: 'xx公司雇员',
                        }, {
                            name: '张五',
                            des: 'yy公司',
                            symbolSize: 50
                        }, {
                            name: '李五',
                            des: 'xx公司',
                            symbolSize: 50,
                            itemStyle: {
                                normal: {
                                    color: '#13219e'
                                }
                            }

                        }, {
                            name: '李六',
                            des: 'zz公司',
                            symbolSize: 50,
                            itemStyle: {
                                normal: {
                                    color:  '#13219e'
                                }
                            }
                        }
                    ],
                    links: [
                        {
                            source: '李四',
                            target: '张三',
                            name: '妻子',
                            des: '夫妻'
                        }, {
                            source: '张五',
                            target: '张三',
                            name: "父亲",
                            lineStyle: {
                                normal: {
                                    type: 'dotted',
                                    color: '#0000fe'
                                }
                            }
                        }, {
                            source: '李五',
                            target: '李四',
                            name: '同事',
                            des: '潜在客户'
                        }, {
                            source: '李六',
                            target: '李四',
                            name: '同事',
                            des: '高风险客户'
                        }]
                }
            ]
        };

        myChart.setOption(option);
    }

})();
