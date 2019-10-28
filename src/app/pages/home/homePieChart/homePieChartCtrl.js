(function () {
  'use strict';

  angular.module('BlurAdmin.pages.home')
      .controller('HomePieChartCtrl', homePieChartCtrl);

  /** @ngInject */
  function homePieChartCtrl($scope, $timeout, baConfig, baUtil, HttpService,$filter) {
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
        $(chart).data('easyPieChart').update(parseFloat(($scope.realCusCountChart.value/$scope.cusChart.value*100).toFixed(4)).toFixed(2));
      });
    }

    /*$timeout(function () {
      loadPieCharts();
      updatePieCharts();
    }, 1000);*/

    // 主页 数据统计
    $scope.DataStatisticsOptions =function(type){
      $scope.DataStatisticsOptions.url = '/crm/query/homePageCtrl/getDataStatisticsByEntity';
      $scope.DataStatisticsOptions.method = 'POST';
      $scope.DataStatisticsOptions.params = {
          dataType:type
      };
      $scope.DataStatisticsOptions.success = function successCallback(response) {
          $scope.reqData++;
          if(type=="custCount"){
              $scope.cusChart= {
                  color: pieColor,
                  description: '客户数量',
                  value:response.data.cus,
                  stats: $filter("number")(response.data.cus),
                  icon: 'person',
                  isShowIcon:true
              }
          }else if (type=="premiumSum"){
              var premium=parseFloat((response.data.premium/10000).toFixed(4)).toFixed(2);
              $scope.premiumChart= {
                  color: pieColor,
                  description: '保费金额(万元)',
                  value:premium,
                  stats: "￥ "+$filter("number")(premium),
                  icon: 'money',
                  isShowIcon:true
              }
          }else if (type=="policyCount"){
              $scope.policyCharts={
                  color: pieColor,
                  description: '保单数量',
                  value:response.data.policy,
                  stats: $filter("number")(response.data.policy),
                  icon: 'face',
                  isShowIcon:true
              }
          }else if (type=="realCustCount"){
              $scope.realCusCountChart={
                  color: pieColor,
                  description: '真实性客户',
                  value: response.data.realCusCount,
                  stats: $filter("number")(response.data.realCusCount),
                  icon: 'refresh',
                  isShowIcon:false
              }
          }
          if($scope.reqData>=4){
              $scope.charts.push($scope.cusChart);
              $scope.charts.push($scope.premiumChart);
              $scope.charts.push($scope.policyCharts);
              $scope.charts.push($scope.realCusCountChart);
              $timeout(function () {
                  loadPieCharts();
                  updatePieCharts();
                  var relData=[];
                  relData.push($scope.realCusCountChart.value);
                  relData.push($scope.cusChart.value-$scope.realCusCountChart.value);
                  var relCustChart={
                      title:'客户真实性',
                      labels :["真实客户", "其它客户"],
                      data:relData
                  };
                  if($scope.homeCharts){
                      $scope.homeCharts.push(relCustChart);
                  }
                  if($scope.loyal.value!=null && !$scope.loyal.flag){
                      var char1={
                          title:'忠诚度',
                          labels :["忠诚客户", "其它客户"],
                          data:[$scope.loyal.value,$scope.cusChart.value-$scope.loyal.value]
                      }
                      $scope.loyal.flag=true;
                      $scope.homeCharts.push(char1);
                  }
              }, 1000);
          }

      };

      HttpService.linkHttp($scope.DataStatisticsOptions);
    }
    $scope.init=function(){
        //初始化
        $scope.percent = 0;
        $scope.charts = $scope.charts = [];
        // 主页 数据统计
        $scope.reqData=0;
        $scope.DataStatisticsOptions("custCount");//客户数量
        $scope.DataStatisticsOptions("premiumSum");//保费数量
        $scope.DataStatisticsOptions("policyCount");//保单数量
        $scope.DataStatisticsOptions("realCustCount");//真实性客户数量
    }
    $scope.init();
  }
})();