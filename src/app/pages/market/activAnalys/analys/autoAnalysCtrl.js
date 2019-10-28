(function() {
	'use strict';

	angular.module('BlurAdmin.pages.market.activAnalys').controller('autoAnalysCtrl', autoAnalysCtrl);

	/** @ngInject */
	function autoAnalysCtrl($scope, $state, $stateParams) {

		$scope.percentDiagramInit = function() {
			var myChart = echarts.init(document.getElementById('percentDiagram'));
			var option = {
				tooltip : {
					trigger : 'item',
					formatter : "{a} <br/>{b} : {c} ({d}%)"
				},
				color : [ '#9B30FF', '#836FFF', '#B4CDCD', '#B0C4DE', '#87CEFF', '#009ACD', '#00868B', '#D8E5F5', '#446994', '#507AAC', '#5988C1',
						'#99AED1', '#C0CBE0' ],
				calculable : true,
				series : [ {
					name : '',
					type : 'pie',
					radius : '75%', // 半径内外径百分比
					itemStyle : {
						normal : {
							label : {
								show : true,
								formatter : "{b}({d}%)"
							},
							// color: '#89DAF1',
							labelLine : {
								show : true
							}
						},
						emphasis : {
							label : {
								show : true,
								position : 'center',
								textStyle : {
									fontSize : '14'
								// fontWeight : 'bold'
								}
							}
						}
					},
					data : [ {
						name : "报名人数",
						value : 319
					}, {
						name : "参加人数",
						value : 230
					} ]
				} ]
			};
			myChart.setOption(option);
		}

		$scope.percentCustAddInit = function() {
			var myChart = echarts.init(document.getElementById('percentCustAdd'));
			var option = {
				tooltip : {
					trigger : 'item',
					formatter : "{a} <br/>{b} : {c} ({d}%)"
				},
				color : [ '#9B30FF', '#836FFF', '#B4CDCD', '#B0C4DE', '#87CEFF', '#009ACD', '#00868B', '#D8E5F5', '#446994', '#507AAC', '#5988C1',
						'#99AED1', '#C0CBE0' ],
				calculable : true,
				series : [ {
					name : '',
					type : 'pie',
					radius : '75%', // 半径内外径百分比
					itemStyle : {
						normal : {
							label : {
								show : true,
								formatter : "{b}({d}%)"
							},
							// color: '#89DAF1',
							labelLine : {
								show : true
							}
						},
						emphasis : {
							label : {
								show : true,
								position : 'center',
								textStyle : {
									fontSize : '12'
								}
							}
						}
					},
					data : [ {
						name : "普通顾客",
						value : 103
					}, {
						name : "潜在客户",
						value : 69
					}, {
						name : "正式客户",
						value : 58
					} ]
				} ]
			};
			myChart.setOption(option);
		}

		$scope.data = [ {
			"日期" : "20岁以下",
			"资产增量 单位（万元）" : 5
		}, {
			"日期" : "20-30",
			"资产增量 单位（万元）" : 12
		}, {
			"日期" : "30-40",
			"资产增量 单位（万元）" : 73
		}, {
			"日期" : "40-50",
			"资产增量 单位（万元）" : 90
		}, {
			"日期" : "50-60",
			"资产增量 单位（万元）" : 35
		}, {
			"日期" : "60-70",
			"资产增量 单位（万元）" : 9
		}, {
			"日期" : "70岁以上",
			"资产增量 单位（万元）" : 6
		} ]
		var newIncAssetsChart = echarts.init(document.getElementById('newIncAssetsAnl'));
		var newIncAssetsOption = {
			title : {
				text : '',
				subtext : ''
			},
			tooltip : {
				trigger : 'axis'
			},
			legend : {
				data : [ '资产增量 单位（万元）' ]
			},
			calculable : true,
			xAxis : [ {
				type : 'category',
				data : [ '20岁以下', '20-30', '30-40', '40-50', '50-60', '60-70', '70岁以上' ],
				axisLabel : {
					interval : 1,
					rotate : 40
				},
				// 控制y轴线是否显示
				axisLine : {
					show : true
				},
				// 控制网格线是否显示
				splitLine : {
					show : false
				},
				// 去除y轴上的刻度线
				axisTick : {
					show : false
				}
			} ],
			yAxis : [ {
				type : 'value',
				show : true,
				minInterval : 75,
				// 控制y轴线是否显示
				axisLine : {
					show : true
				},
				// 控制网格线是否显示
				splitLine : {
					show : false
				},
				// 去除y轴上的刻度线
				axisTick : {
					show : false
				}
			} ],
			series : [ {
				name : '资产增量 单位（万元）',
				type : 'bar',
				data : [ 5, 12, 73, 90, 35, 9, 6 ],
				barWidth : 20,// 柱图宽度
				itemStyle : {
					normal : {
						label : {
							show : false,
							position : 'top'
						},
						color : new echarts.graphic.LinearGradient(0, 0, 0, 1, [ {
							offset : 0,
							color : '#36A4E9'
						}, {
							offset : 0.5,
							color : '#339CDD'
						}, {
							offset : 1,
							color : '#339CDD'
						} ])
					}
				},
			} ]
		};
		newIncAssetsChart.setOption(newIncAssetsOption);

	}

})();
