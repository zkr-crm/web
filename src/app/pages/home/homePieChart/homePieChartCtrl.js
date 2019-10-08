(function () {
  'use strict';

  angular.module('BlurAdmin.pages.home')
      .controller('HomePieChartCtrl', homePieChartCtrl);

  /** @ngInject */
  function homePieChartCtrl($scope, $timeout, baConfig, baUtil, HttpService) {
    var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    function loadPieCharts() {
      $('.chart').each(function () {
        var chart = $(this);
        chart.easyPieChart({
          easing: 'easeOutBounce',
          onStep: function (from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
          },
          barColor: chart.attr('rel'),
          trackColor: 'rgba(0,0,0,0)',
          size: 84,
          scaleLength: 0,
          animation: 2000,
          lineWidth: 9,
          lineCap: 'round',
        });
      });

      $('.refresh-data').on('click', function () {
        updatePieCharts();
      });
    }

    function updatePieCharts() {
      $('.pie-charts .chart').each(function(index, chart) {
        $(chart).data('easyPieChart').update($scope.percent);
      });
    }

    /*$timeout(function () {
      loadPieCharts();
      updatePieCharts();
    }, 1000);*/

    // 主页 数据统计
    $scope.DataStatisticsOptions =function(){
      $scope.DataStatisticsOptions.url = '/crm/query/homePageCtrl/getDataStatisticsByEntity';
      $scope.DataStatisticsOptions.method = 'POST';
      $scope.DataStatisticsOptions.params = {};
      $scope.DataStatisticsOptions.success = function successCallback(response) {
        $scope.charts = [{
          color: pieColor,
          description: '客户数量',
          stats: '',
          icon: 'person',
          isShowIcon:true
        }, {
            color: pieColor,
            description: '保费金额',
            stats: '',
            icon: 'money',
            isShowIcon:true
        }, {
            color: pieColor,
            description: '保单数量',
            stats: '',
            icon: 'face',
            isShowIcon:true
        }, {
            color: pieColor,
            description: '真实性客户',
            stats: '',
            icon: 'refresh',
            isShowIcon:false
        }
        ];
        $.each($scope.charts,function(index,value) {  
         if(value.icon == 'person'){
            value.stats= response.data.cus;
         }
         if(value.icon == 'money'){
            value.stats= "￥ "+response.data.premium;
         }
         if(value.icon == 'face'){
            value.stats= response.data.policy;
         }
         if(value.icon == 'refresh'){
            value.stats= response.data.realCusCount;
            $scope.percent = response.data.realCus;
         }         
        });
          $timeout(function () {
              loadPieCharts();
              updatePieCharts();
          }, 1000);
      };

      HttpService.linkHttp($scope.DataStatisticsOptions);
    }
    $scope.init=function(){
      //初始化
      $scope.percent = 0;
      $scope.charts = [];
      // 主页 数据统计
      $scope.DataStatisticsOptions();
    }
    $scope.init();
  }
})();