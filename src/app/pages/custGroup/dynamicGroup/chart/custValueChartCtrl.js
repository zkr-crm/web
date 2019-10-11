(function () {
  'use strict';

  angular.module('BlurAdmin.pages.custGroup')
      .controller('CustValueChartCtrl', CustValueChartCtrl);

  /** @ngInject */
  function CustValueChartCtrl($scope, baConfig, $element, layoutPaths, HttpService) {
	  
		var NO_INCOME=0;// 无消费
		var NO_INCOME_DESC="无消费";// 无消费
		var COUNT_0=0;
		var LESS_THAN_1W=10000;// 1万
		var LESS_THAN_1W_DESC="一万元以下";// 无消费
		var COUNT_1W=0;
		var LESS_THAN_5W=50000;// 5万
		var LESS_THAN_5W_DESC="五万元以下";// 5万
		var COUNT_5W=0;
		var LESS_THAN_10W=100000;// 10万
		var LESS_THAN_10W_DESC="十万元以下";// 10万
		var COUNT_10W=0;
		var LESS_THAN_20W=200000;// 20万
		var LESS_THAN_20W_DESC="二十万元以下";// 20万
		var COUNT_20W=0;
		var LESS_THAN_50W=500000;// 50万
		var LESS_THAN_50W_DESC="五十万元以下";// 50万以下
		var COUNT_50W=0;
		var MORE_THAN_50W_DESC="五十万元以上";// 50万以上
		var COUNT_MORE_THAN_50W=0;
	  
		
		
    var layoutColors = baConfig.colors;
    
    var chartData=[
        {
            country: NO_INCOME_DESC,
            visits: COUNT_0,
            color: layoutColors.primary
          },
          {
            country: LESS_THAN_1W_DESC,
            visits: COUNT_1W,
            color: layoutColors.danger

          },
          {
            country: LESS_THAN_5W_DESC,
            visits: COUNT_5W,
            color: layoutColors.info
          },
          {
            country: LESS_THAN_10W_DESC,
            visits: COUNT_10W,
            color: layoutColors.success
          },
          {
            country: LESS_THAN_20W_DESC,
            visits: COUNT_20W,
            color: layoutColors.warning
          },
          {
            country: LESS_THAN_50W_DESC,
            visits: COUNT_50W,
            color: layoutColors.primaryLight
          },
          {
            country: MORE_THAN_50W_DESC,
            visits: COUNT_MORE_THAN_50W,
            color: layoutColors.primaryLight
          }
        ];
    
    var id = $element[0].getAttribute('id');
    var valueChart = AmCharts.makeChart(id, {
      type: 'serial',
      theme: 'blur',
      color: layoutColors.defaultText,
      dataProvider: chartData,
      valueAxes: [
        {
          axisAlpha: 0,
          position: 'left',
          title: '总人数（人）',
          gridAlpha: 0.5,
          gridColor: layoutColors.border,
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
      },
      export: {
        enabled: true
      },
      creditsPosition: 'top-right',
      pathToImages: layoutPaths.images.amChart
    });
    
    /** ************************************************************************ */
    /* 查询趋势图基础数据 */
    $scope.getData = function(){

    	// 群组ID必须有值
    	if($scope.groupId=="" || $scope.groupId==null ||$scope.groupId == undefined){
    		return;
    	}
    	
		var opts = {};
		opts.url = '/crm/ocrm/CustGroupMng/getCustGroupInfoByGroupId';
		opts.method = 'GET';
		opts.params = {
			'groupId' : $scope.groupId
		};
		HttpService.linkHttp(opts).then(function(response) {

			var data = response.data;
			$scope.custGrop = data.custGrp;
			$scope.custList = data.custGrpMemberList;// 群组成员列表
			$scope.custTotal=$scope.custList.length;
			
			// 获取客户名、客户类型等信息
			var custNoStr="";
			angular.forEach($scope.custList, function(i) {
				custNoStr=custNoStr+i.custNo+",";
			});
			
			// 根据客户号获取消费信息
			var postObj = {};
			postObj.url = '/crm/ecif/cust/getConsumInfoByCustNo';
			postObj.method = 'POST';
			postObj.params = {};
			postObj.data = {
				'custNoStr' : custNoStr
			};
			HttpService.linkHttp(postObj).then(function(response) {
				var sumData = response.data;
				
				angular.forEach(sumData, function(item) {

		  			if(parseFloat(item.consumSum)==NO_INCOME){
		  				COUNT_0=COUNT_0+1;
		  			}else if(parseFloat(item.consumSum)>NO_INCOME &&parseFloat(item.consumSum)<=LESS_THAN_1W){
		  				COUNT_1W=COUNT_1W+1;	
		  			}else if(parseFloat(item.consumSum)>LESS_THAN_1W &&parseFloat(item.consumSum)<=LESS_THAN_5W){
		  				COUNT_5W=COUNT_5W+1;	
		  			}else if(parseFloat(item.consumSum)>LESS_THAN_5W &&parseFloat(item.consumSum)<=LESS_THAN_10W){
		  				COUNT_10W=COUNT_10W+1;	
		  			}else if(parseFloat(item.consumSum)>LESS_THAN_10W &&parseFloat(item.consumSum)<=LESS_THAN_20W){
		  				COUNT_20W=COUNT_20W+1;	
		  			}else if(parseFloat(item.consumSum)>LESS_THAN_20W &&parseFloat(item.consumSum)<=LESS_THAN_50W){
		  				COUNT_50W=COUNT_50W+1;	
		  			}else{
		  				COUNT_MORE_THAN_50W=COUNT_MORE_THAN_50W+1;
		  			}
				});
				
				chartData[0].visits=COUNT_0;
				chartData[1].visits=COUNT_1W;
				chartData[2].visits=COUNT_5W;
				chartData[3].visits=COUNT_10W;
				chartData[4].visits=COUNT_20W;
				chartData[5].visits=COUNT_50W;
				chartData[6].visits=COUNT_MORE_THAN_50W;
				// 刷新图表绑定的数据
				valueChart.validateNow(); 
				valueChart.validateData(); 
			});
		});
    }
    $scope.getData();
  }
})();
