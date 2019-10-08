(function () {
  'use strict';

  angular.module('BlurAdmin.pages.home')
    .controller('HomeChartCtrl', homeChartCtrl);

  /** @ngInject */
  function homeChartCtrl($scope, baConfig, HttpService) {
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
         $scope.homeCharts=[
            {
              title:'忠诚度',
              labels :["忠诚客户", "其它客户"],
              data:[]
            },{
                title:'事件占比',
                labels :["生日", "纪念日","续保","投诉"],
                data:[]
            },
          ];
        $.each($scope.homeCharts,function(index,value) {  
         if(value.title == '忠诚度'){
            value.data= response.data.loyalList;
         }
         if(value.title == '事件占比'){
            value.data= response.data.eventCountList;
            value.labels= response.data.eventTypeList;
         }    
        }); 
      };

      HttpService.linkHttp($scope.DataStatisticsPieOptions);
    }
    $scope.init=function(){
      //Charts 初始化
      $scope.homeCharts=[];
      // 主页 数据统计
      $scope.DataStatisticsPieOptions();
    }
    $scope.init();
  }

})();