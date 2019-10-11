(function () {
  'use strict';

  angular.module('BlurAdmin.pages.cstmrgrpops')
      .controller('dynamicCtrl', dynamicCtrl);

  /** @ngInject */
  function dynamicCtrl($scope, $element, layoutPaths, baConfig) {
	  $scope.test = {};
	  $scope.type = 1;
	  $scope.showData = function(args){
		  if(args == 1){
			  $scope.type = 1;
		  }else{
			  $scope.type = 0;
		  }
	  }
	  
	  
	  
	  $scope.rowCollection = [];
		var row = {
			col1 : '',
			col2 : '',
			col3 : '',
			col4 : '',
			col5 : '',
			col6 : ''
		}; 
		
		for (var i = 1; i <= 50; i++) {
			var newRow = angular.copy(row);
			newRow.col1 = '静态客户' + i;
			newRow.col2 =  '13000000000';
			newRow.col3 = '客户经理' + i;
			newRow.col4=  '客户来源'+i;
			newRow.col5 = '职业'+i;
			newRow.col6 = '2017-12-01 17:07:41';
			$scope.rowCollection.push(newRow);
		}

		
		$scope.rowCollection1 = [];
		for (var i = 1; i <= 50; i++) {
			var newRow = angular.copy(row);
			newRow.col1 = '标题' + i;
			newRow.col2 =  '2017-12-31';
			newRow.col3 = '类型' + i;
			newRow.col4=  '状态' +  i;
			newRow.col5 = i;
			newRow.col6 = '相关活动'+i;
			$scope.rowCollection1.push(newRow);
		}

		$scope.total = 50;

	  $scope.standardItem = {};
	  $scope.standardSelectItems = [
             {label: '客户来源', value: 1},
             {label: '流式分布', value: 2},
             {label: '跟进分布', value: 3},
             {label: '价值分布', value: 4},
             {label: '消费次数', value: 5}
       ];
	  
	  $scope.selectedItem ={item: $scope.standardSelectItems[0]};
	  
    var layoutColors = baConfig.colors;
    var pieChart = AmCharts.makeChart('pieChart', {
      type: 'pie',
      startDuration: 0,
      theme: 'blur',
      addClassNames: true,
      color: layoutColors.defaultText,
      labelTickColor: layoutColors.borderDark,
      legend: {
        position: 'right',
        marginRight: 100,
        autoMargins: false,
      },
      innerRadius: '40%',
      defs: {
        filter: [
          {
            id: 'shadow',
            width: '200%',
            height: '200%',
            feOffset: {
              result: 'offOut',
              in: 'SourceAlpha',
              dx: 0,
              dy: 0
            },
            feGaussianBlur: {
              result: 'blurOut',
              in: 'offOut',
              stdDeviation: 5
            },
            feBlend: {
              in: 'SourceGraphic',
              in2: 'blurOut',
              mode: 'normal'
            }
          }
        ]
      },
      dataProvider: [
        {
          country: '线上活动',
          litres: 100
        },
        {
            country: '老用户介绍',
            litres: 100
       },
        {
          country: '老用户介绍',
          litres: 100
        },
        {
          country: '直接输入',
          litres: 200
        },{
            country: '微信',
            litres: 500
          }
      ],
      valueField: 'litres',
      titleField: 'country',
      export: {
        enabled: true
      },
      creditsPosition: 'bottom-left',

      autoMargins: false,
      marginTop: 10,
      alpha: 0.8,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      pullOutRadius: 0,
      pathToImages: layoutPaths.images.amChart,
      responsive: {
        enabled: true,
        rules: [
          // at 900px wide, we hide legend
          {
            maxWidth: 400,
            overrides: {
              legend: {
                enabled: false
              }
            }
          },

          // at 200 px we hide value axis labels altogether
          {
            maxWidth: 200,
            overrides: {
              valueAxes: {
                labelsEnabled: false
              },
              marginTop: 30,
              marginBottom: 30,
              marginLeft: 30,
              marginRight: 30
            }
          }
        ]
      }
    });
    
    
    pieChart.addListener('init', handleInit);

    pieChart.addListener('rollOverSlice', function (e) {
      handleRollOver(e);
    });

    function handleInit() {
      pieChart.legend.addListener('rollOverItem', handleRollOver);
    }

    function handleRollOver(e) {
      var wedge = e.dataItem.wedge.node;
      wedge.parentNode.appendChild(wedge);
    }
    
    
    
    
    var barChart = AmCharts.makeChart('genjinChart', {
        type: 'serial',
        theme: 'blur',
        color: layoutColors.defaultText,
        dataProvider: [
          {
            country: '无跟进',
            visits: 3025,
            color: layoutColors.primary
          },
          {
            country: '1个月以内',
            visits: 1882,
            color: layoutColors.danger

          },
          {
            country: '>1个月',
            visits: 1809,
            color: layoutColors.info
          },
          {
            country: '>2个月',
            visits: 1322,
            color: layoutColors.success
          },
          {
            country: '>3个月',
            visits: 1122,
            color: layoutColors.warning
          }
        ],
        valueAxes: [
          {
            axisAlpha: 0,
            position: 'left',
            title: '客户数量',
            gridAlpha: 0.5,
            gridColor: layoutColors.border
          } 
        ],
        startDuration: 1,
        graphs: [
          {
            balloonText: '<b>[[category]]: [[value]]</b>',
            fillColorsField: 'color',
            fillAlphas: 0.7,
            lineAlpha: 0.2,
            type: 'column',
            valueField: 'visits'
          }
        ],
        chartCursor: {
          categoryBalloonEnabled: false,
          cursorAlpha: 0,
          zoomable: false
        },
        categoryField: 'country',
        categoryAxis: {
          gridPosition: 'start',
          labelRotation: 45,
          gridAlpha: 0.5,
          gridColor: layoutColors.border,
          title: '客户累计消费金额（元）',
        },
        export: {
          enabled: true
        },
        creditsPosition: 'top-right',
        pathToImages: layoutPaths.images.amChart
      });
    
    
    var barChart = AmCharts.makeChart('barChart', {
        type: 'serial',
        theme: 'blur',
        color: layoutColors.defaultText,
        dataProvider: [
          {
            country: '无消费',
            visits: 3025,
            color: layoutColors.primary
          },
          {
            country: '1个月以内',
            visits: 1882,
            color: layoutColors.danger

          },
          {
            country: '>1个月',
            visits: 1809,
            color: layoutColors.info
          },
          {
            country: '>3个月',
            visits: 1322,
            color: layoutColors.success
          },
          {
            country: '>6个月',
            visits: 1122,
            color: layoutColors.warning
          },
          {
            country: '>12个月',
            visits: 1114,
            color: layoutColors.primaryLight
          }
        ],
        valueAxes: [
          {
            axisAlpha: 0,
            position: 'left',
            title: '客户数量',
            gridAlpha: 0.5,
            gridColor: layoutColors.border
          } 
        ],
        startDuration: 1,
        graphs: [
          {
            balloonText: '<b>[[category]]: [[value]]</b>',
            fillColorsField: 'color',
            fillAlphas: 0.7,
            lineAlpha: 0.2,
            type: 'column',
            valueField: 'visits'
          }
        ],
        chartCursor: {
          categoryBalloonEnabled: false,
          cursorAlpha: 0,
          zoomable: false
        },
        categoryField: 'country',
        categoryAxis: {
          gridPosition: 'start',
          labelRotation: 45,
          gridAlpha: 0.5,
          gridColor: layoutColors.border,
          title: '客户累计消费金额（元）',
        },
        export: {
          enabled: true
        },
        creditsPosition: 'top-right',
        pathToImages: layoutPaths.images.amChart
      });
    
    var barChart = AmCharts.makeChart('qushiChart', {
        type: 'serial',
        theme: 'blur',
        color: layoutColors.defaultText,
        dataProvider: [
          {
            country: '2017-01',
            visits: 100,
            color: layoutColors.primary
          },
          {
            country: '2017-02',
            visits: 200,
            color: layoutColors.danger

          },
          {
            country: '>2017-03',
            visits: 130,
            color: layoutColors.info
          },
          {
            country: '2017-04',
            visits: 40,
            color: layoutColors.success
          },
          {
            country: '2017-05',
            visits: 80,
            color: layoutColors.warning
          },
          {
            country: '2017-06',
            visits: 100,
            color: layoutColors.primaryLight
          }, {
              country: '2017-07',
              visits: 110,
              color: layoutColors.primary
            },
            {
              country: '2017-08',
              visits: 100,
              color: layoutColors.danger

            },
            {
              country: '>2017-09',
              visits: 90,
              color: layoutColors.info
            },
            {
              country: '2017-10',
              visits: 50,
              color: layoutColors.success
            },
            {
              country: '2017-11',
              visits: 70,
              color: layoutColors.warning
            },
            {
              country: '2017-12',
              visits: 100,
              color: layoutColors.primaryLight
            }
        ],
        valueAxes: [
          {
            axisAlpha: 0,
            position: 'left',
            title: '客户数量',
            gridAlpha: 0.5,
            gridColor: layoutColors.border
          } 
        ],
        startDuration: 1,
        graphs: [
          {
            balloonText: '<b>[[category]]: [[value]]</b>',
            fillColorsField: 'color',
            fillAlphas: 0.7,
            lineAlpha: 0.2,
            type: 'column',
            valueField: 'visits'
          }
        ],
        chartCursor: {
          categoryBalloonEnabled: false,
          cursorAlpha: 0,
          zoomable: false
        },
        categoryField: 'country',
        categoryAxis: {
          gridPosition: 'start',
          labelRotation: 45,
          gridAlpha: 0.5,
          gridColor: layoutColors.border,
          title: '客户累计消费金额（元）',
        },
        export: {
          enabled: true
        },
        creditsPosition: 'top-right',
        pathToImages: layoutPaths.images.amChart
      });
    
    
    
  }
})();
