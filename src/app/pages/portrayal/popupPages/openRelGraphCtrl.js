(function () {
    'use strict';

    angular.module('BlurAdmin.pages.portrayal.perCusPortrayal')
        .controller('openRelGraphCtrl', openRelGraphCtrl);

    /** @ngInject */
    function openRelGraphCtrl($scope, $filter, $uibModal, $timeout, toastr, Alert, HttpService, EnumType, $state, custNo) {
    	
        var custGraphChange = function (newCustNo) {
        	custNo = newCustNo;
        	$scope.loadRel();
        }

    	// $scope.custGraph = {};
    	$scope.loadRel = function() {
    		$scope.isFinsh = false;
            var myChart = echarts.init(document.getElementById('testEcharts'));
            var option = {};
            var opts = {};
            opts.url = 'crm/ecif/cust/custGraph';
            opts.method = 'GET';
            opts.params = {'custNo': custNo};
            HttpService.linkHttp(opts).then(function (response) {
            	if (response == undefined || response.data == undefined) {
            		return;
            	}
                $scope.isFinsh = true;
                $scope.custGraph = [];
                response.data.data.forEach(function(item,index){
                    //item.name = item.name+'['+index+']';
                    if($scope.custGraph.length>0 ){
                        var tmp=$scope.custGraph.filter(function(x){return x.name==item.name});
                        if(tmp.length>0){
                            item.name = item.name+'['+index+']';
                        }
                    }
                    item.x=item.y=null;
                    $scope.custGraph.push(item);
                });
                $scope.custRelLinks = []
                response.data.links.forEach(function(item,index){
                    $scope.custGraph.forEach(function(item1,index1){
                        if (item.sourceCustNo == item1.custNo) {
                            item.source = item1.name
                        }
                        if (item.targetCustNo == item1.custNo) {
                            item.target = item1.name
                        }
                    })
                    $scope.custRelLinks.push(item)
                })
                // if (!!$scope.custGraph) {
                //     angular.forEach($scope.custGraph.data,function(item){
                //         if (!!item.itemStyle) {
                //             $scope.thisName = item.name
                //         }
                //     })
                //     $scope.links = []
                //     angular.forEach($scope.custGraph.links,function(item){
                //         if ($scope.thisName == item.source) {
                //             $scope.links.push(item)
                //         }
                //     })
                // }

                option = {
//                    tooltip: {
//                        formatter: function (x) {
//                            return x.data.des;
//                        },
//		                trigger: 'item',           // 触发类型，默认数据触发，见下图，可选为：'item' ¦ 'axis'
//		                showDelay: 20,             // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
//		                hideDelay: 100,            // 隐藏延迟，单位ms
//		                transitionDuration : 0.4,  // 动画变换时间，单位s
//		                backgroundColor: 'rgba(0,0,0,0.7)',     // 提示背景颜色，默认为透明度为0.7的黑色
//		                borderColor: '#333',       // 提示边框颜色
//		                borderRadius: 4,           // 提示边框圆角，单位px，默认为4
//		                borderWidth: 0,            // 提示边框线宽，单位px，默认为0（无边框）
//		                padding: 5,                // 提示内边距，单位px，默认各方向内边距为5，
//		                                           // 接受数组分别设定上右下左边距，同css
//		                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
//		                    type : 'line',         // 默认为直线，可选为：'line' | 'shadow'
//		                    lineStyle : {          // 直线指示器样式设置
//		                        color: '#48b',
//		                        width: 2,
//		                        type: 'solid'
//		                    },
//		                    shadowStyle : {                       // 阴影指示器样式设置
//		                        width: 4,                   // 阴影大小
//		                        color: 'rgba(150,150,150,0.3)'  // 阴影颜色
//		                    }
//		                },
//		                textStyle: {
//		                    color: '#fff'
//		                }
//                    },
                    tooltip:{
                        formatter: function(x){
                            var tooltipStr="";
                            if(x.dataType=='node'){
                                tooltipStr=x.data.custNo;
                            }else{
                                tooltipStr=x.data.target+"是"+x.data.source+"的"+x.data.name;
                            }
                            return tooltipStr;
                        }
                    },

                    series: [
                        {
                            type: 'graph',
                            layout: 'force',
                            symbolSize: 80,
                            zoom:0.8,
                            roam: true,
                            edgeSymbol: ['circle', 'arrow'],
                            edgeSymbolSize: [4, 10],
                            force: {
                                repulsion: 2500,
                                edgeLength: 180,////边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
                                gravity : 0.3,//节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
                                layoutAnimation : true
                            },
                            draggable: true,
                            itemStyle: {
                                normal: {
                                    color: '#b5b5b6'
                                }
                            },
                            lineStyle: {
                                normal: {
                                	//curveness : 0.3,
                                    width: 2,
                                    color: '#ccc',
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
                            data: $scope.custGraph,
                            links: $scope.custRelLinks
                        }
                    ]
                };

                myChart.setOption(option);
                function openOrFold(params) {  //该事件会提示节点间关系
                	var newCustNo = params.data.custNo;
                	if (!newCustNo||newCustNo == custNo) {
                		return;
                	}
                	if ($scope.isFinsh) {
                        custGraphChange(newCustNo);
                	}
                }
                function goCusPortrayal(params){
                    var custNo = params.data.custNo;
                    $state.go('portrayal.perCusPortrayal',{'custNo':custNo});
                }
                myChart.on('click', openOrFold);
                myChart.on('dblclick',goCusPortrayal)
            });

        }
    	
    	
    	
    }

})();
