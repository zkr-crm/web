(function () {
  'use strict';

  angular.module('BlurAdmin.pages.home')
    .controller('HomeChartCtrl', homeChartCtrl);

  /** @ngInject */
  function homeChartCtrl($scope, baConfig, HttpService,$timeout) {
    var layoutColors = baConfig.colors;
      $scope.options = {
          elements: {
              arc: {
                  borderWidth: 0
              }
          },
          legend: {
              display: true,
              position: 'bottom',
              labels: {
                  fontColor: layoutColors.defaultText
              }
          }
      };

    $scope.changeData = function (item) {
        item = shuffle(item);
    };

    function shuffle(o){
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x){}
      return o;
    }

    // 主页 数据统计
    $scope.DataStatisticsPieOptions =function(){
      $scope.DataStatisticsPieOptions.url = '/crm/query/homePageCtrl/getDataStatisticsPieByEntity';
      $scope.DataStatisticsPieOptions.method = 'POST';
      $scope.DataStatisticsPieOptions.params = {};
      $scope.DataStatisticsPieOptions.success = function successCallback(response) {
          $scope.loyal.value=response.data.loyalList[0];
          if($scope.cusChart.value!=null && !$scope.loyal.flag){
              var char1={
                  title:'忠诚度',
                  labels :["忠诚客户", "其它客户"],
                  data:[$scope.loyal.value,$scope.cusChart.value-$scope.loyal.value]
              }
              $scope.loyal.flag=true;
              $scope.homeCharts.push(char1);
          }
          var char2={
                title:'事件占比',
                labels :response.data.eventTypeList,
                data:response.data.eventCountList
            };


         $scope.homeCharts.push(char2);
      };

      HttpService.linkHttp($scope.DataStatisticsPieOptions);
    }
    $scope.initBarByAges=function(){
        $scope.hasAgesBar = false;
        $scope.simpleBarOptions = {
            fullWidth: true,
            height: "300px"
        };
        $scope.initBarByAgesOptions={
            url :'/crm/query/homePageCtrl/getDataBarByAges',
            method: 'POST',
            params:{},
            success: function successCallback(response) {
                if(response.status==1){
                    $scope.hasAgesBar=true;
                    var dataProvider=response.data;
                    $scope.barLabels=[];
                    var countsList=[];
                    $scope.barData=[];
                    angular.forEach(dataProvider,function(item){
                        $scope.barLabels.push(item.ages);
                        countsList.push(item.counts);
                    })
                    $scope.barData.push(countsList);
                    var dataShadow = [];
                    var yMax = 500;
                    for (var i = 0; i < countsList.length; i++) {
                        dataShadow.push(yMax);
                    }
                    var showBar=function(){
                        var myChart = echarts.init(document.getElementById('barChartAges'));
                        var option = {
                            color: ['#3398DB'],
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis : [
                                {
                                    type : 'category',
                                    data : $scope.barLabels,
                                    axisTick: {
                                        alignWithLabel: true
                                    }
                                }
                            ],
                            yAxis : [
                                {
                                    type : 'value'
                                }
                            ],
                            series : [
                                {
                                   /* name:'',*/
                                    type:'bar',
                                    barWidth: '60%',
                                    data:countsList
                                }
                            ]
                        };
                        myChart.setOption(option);
                    }
                    $timeout(showBar, 1000);

                }
            }
        };
        HttpService.linkHttp($scope.initBarByAgesOptions);

    }
    $scope.init=function(){
      //Charts 初始化
      $scope.homeCharts=[];
        $scope.loyal={};
      // 主页 数据统计
      $scope.DataStatisticsPieOptions();
    }
    $scope.init();
  }

})();