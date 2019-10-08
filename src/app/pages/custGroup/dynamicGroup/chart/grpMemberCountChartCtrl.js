(function () {
  'use strict';

  angular.module('BlurAdmin.pages.custGroup')
      .controller('grpMemberCountChartCtrl', grpMemberCountChartCtrl);

  /** @ngInject */
  function grpMemberCountChartCtrl($scope, baConfig, $element, layoutPaths,HttpService) {
	  
	  
	$scope.dataArr=[];
    $scope.dataUnit = {};

    var layoutColors = baConfig.colors;
    var id = $element[0].getAttribute('id');
    var lineChart = AmCharts.makeChart(id, {
      type: 'serial',
      theme: 'blur',
      color: layoutColors.defaultText,
      marginTop: 0,
      marginRight: 15,
      dataProvider: $scope.dataArr,
      valueAxes: [// 数值轴
        {
          axisAlpha: 0,
          position: 'left',
          gridAlpha: 0.5,
          minimum:0,//Y轴最小值
          integersOnly:true,//是否只显示整数
          gridColor: layoutColors.border
        }
      ],
      graphs: [// 图
        {
          id: 'g1',
          balloonText: '[[value]]',
          bullet: 'round',
          bulletSize: 8,
          lineColor: layoutColors.danger,
          lineThickness: 1,
          negativeLineColor: layoutColors.warning,
          type: 'smoothedLine',
          valueField: 'value'
        }
      ],
      chartScrollbar: {// 图表滚动条
        graph: 'g1',
        gridAlpha: 0,
        color: layoutColors.defaultText,
        scrollbarHeight: 55,
        backgroundAlpha: 0,
        selectedBackgroundAlpha: 0.05,
        selectedBackgroundColor: layoutColors.defaultText,
        graphFillAlpha: 0,
        autoGridCount: true,
        selectedGraphFillAlpha: 0,
        graphLineAlpha: 0.2,
        selectedGraphLineColor: layoutColors.defaultText,
        selectedGraphLineAlpha: 1
      },
      chartCursor: {// 图光标
        categoryBalloonDateFormat: 'YYYY-MM-DD',
        cursorAlpha: 0,
        valueLineEnabled: true,
        valueLineBalloonEnabled: true,
        valueLineAlpha: 0.5,
        fullWidth: true
      },
      dataDateFormat: 'YYYY-MM-DD',
      categoryField: 'month',// 分类字段
      categoryAxis: {// 分类轴
        minPeriod: 'DD',
        parseDates: true,  // 解析日期数据，若为true，会将字符串转换为对应的日期格式，所以categoryField对应的值必须为日期格式的字符串
        minorGridAlpha: 0.1,
        minorGridEnabled: true,
        gridAlpha: 0.5,
        gridColor: layoutColors.border
      },
      export: {
        enabled: true
      },
      creditsPosition: 'bottom-right',
      pathToImages: layoutPaths.images.amChart
    });

    lineChart.addListener('rendered', zoomChart);
    if (lineChart.zoomChart) {
      lineChart.zoomChart();
    }

    /* 缩放图 */
    function zoomChart() {
      lineChart.zoomToIndexes(Math.round(lineChart.dataProvider.length * 0.4), Math.round(lineChart.dataProvider.length * 0.55));
    }

    /* 查询趋势图基础数据 */
    $scope.getData = function(){
    	
    	// 群组ID必须有值
    	if($scope.groupId=="" || $scope.groupId==null ||$scope.groupId == undefined){
    		return;
    	}
    	
		var opts = {};
		opts.url = '/crm/ocrm/CustGroupMng/grpMemberTrendAnalysis';
		opts.method = 'GET';
		opts.params = {
			'groupId' : $scope.groupId
		};
		HttpService.linkHttp(opts).then(function(response) {

			
			var data = response.data;
			
			angular.forEach(data, function(i) {
				
				var item ={};
				item.value=i.count;
				item.month=i.date;
				$scope.dataArr.push(item);
			});

			// 刷新图表绑定的数据
			lineChart.validateNow(); 
			lineChart.validateData(); 
		});
    }
    $scope.getData();
  }

})();
