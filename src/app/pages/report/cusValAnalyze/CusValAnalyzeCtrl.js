(function () {
  'use strict';

  angular.module('BlurAdmin.pages.report')
      .controller('CusValAnalyzeCtrl', CusValAnalyzeCtrl);

  /** @ngInject */
  function CusValAnalyzeCtrl($scope, baConfig, $element, layoutPaths) {
    var layoutColors = baConfig.colors;
    var id = $element[0].getAttribute('id');
    var barChart = AmCharts.makeChart(id, {
      type: 'serial',
      theme: 'blur',
      color: layoutColors.defaultText,
      dataProvider: [
        {
          country: '1万以下',
          visits: 3025,
          color: layoutColors.primary
        },
        {
          country: '<5万',
          visits: 1882,
          color: layoutColors.danger

        },
        {
          country: '<10万',
          visits: 1809,
          color: layoutColors.info
        },
        {
          country: '<20万',
          visits: 1322,
          color: layoutColors.success
        },
        {
          country: '<30万',
          visits: 1122,
          color: layoutColors.warning
        },
        {
          country: '30万以上',
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
  }
})();
