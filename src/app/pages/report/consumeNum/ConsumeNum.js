(function () {
  'use strict';

  angular.module('BlurAdmin.pages.report')
      .controller('ConsumeNum', ConsumeNum);

  /** @ngInject */
  function ConsumeNum($scope, baConfig, $element, layoutPaths) {
    var layoutColors = baConfig.colors;
    var id = $element[0].getAttribute('id');
    var areaChart = AmCharts.makeChart(id, {
      type: 'serial',
      theme: 'blur',
      color: layoutColors.defaultText,
      dataProvider: [
        {
          lineColor: layoutColors.info,
          date: '无消费',
          nums: 408
        },
        {
          date: '1次',
          nums: 482
        },
        {
          date: '2次',
          nums: 562
        },
        {
          date: '3次',
          nums: 379
        },
        {
          lineColor: layoutColors.warning,
          date: '4次',
          nums: 501
        },
        {
          date: '5次',
          nums: 443
        },
        {
          date: '6次',
          nums: 405
        },
        {
          date: '7次',
          nums: 309,
          lineColor: layoutColors.danger
        },
        {
          date: '8次',
          nums: 287
        },
        {
          date: '9次',
          nums: 485
        },
        {
          date: '>9次',
          nums: 810
        }
      ],
      balloon: {
        cornerRadius: 6,
        horizontalPadding: 15,
        verticalPadding: 10
      },
      valueAxes: [
        {
          gridAlpha: 0.5,
          gridColor: layoutColors.border,
          title: '客户数量',
        }
      ],
      graphs: [
        {
          bullet: 'square',
          bulletBorderAlpha: 1,
          bulletBorderThickness: 1,
          fillAlphas: 0.5,
          fillColorsField: 'lineColor',
          legendValueText: '[[value]]',
          lineColorField: 'lineColor',
          title: 'nums',
          valueField: 'nums'
        }
      ],

      chartCursor: {
        categoryBalloonDateFormat: 'YYYY MMM DD',
        cursorAlpha: 0,
        fullWidth: true
      },
      dataDateFormat: 'YYYY-MM-DD',
      categoryField: 'date',
      categoryAxis: {
        autoGridCount: false,
        gridCount: 50,
        gridAlpha: 0.5,
        gridColor: layoutColors.border,
        title: '客户累计消费次数',
      },
      export: {
        enabled: true
      },
      pathToImages: layoutPaths.images.amChart
    });

    areaChart.addListener('dataUpdated', zoomAreaChart);

    function zoomAreaChart() {
      areaChart.zoomToDates(new Date(2012, 0, 3), new Date(2012, 0, 11));
    }
  }

})();
