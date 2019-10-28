(function () {
  'use strict';

  angular.module('BlurAdmin.pages.custGroup')
      .controller('CustLossChartCtrl', CustLossChartCtrl);

  /** @ngInject */
  function CustLossChartCtrl($scope, baConfig, $element, layoutPaths, HttpService) {

		var NO_INCOME=0;// 无消费
		var NO_INCOME_DESC="无消费";// 无消费
		var COUNT_0=0;
		var LESS_1M=1;// 一个月以内
		var LESS_THAN_1M_DESC="最近一个月";
		var COUNT_1M=0;
		var LESS_THAN_3M=3;
		var LESS_THAN_3M_DESC="最近三个月";// 三个月
		var COUNT_3M=0;
		var LESS_THAN_6M=6;// 半年
		var LESS_THAN_6M_DESC="最近半年";// 半年
		var COUNT_6M=0;
		var LESS_THAN_12M=12;// 一年
		var LESS_THAN_12M_DESC="一年以内";
		var COUNT_12M=0;
		var MORE_THAN_12M_DESC="一年以上";
		var COUNT_MORE_THEN_12M=0;
	  
	  
	  var layoutColors = baConfig.colors;
	  var chartData=[
	        {
	          country: NO_INCOME_DESC,
	          visits: COUNT_0,
	          color: layoutColors.primary
	        },
	        {
	          country: LESS_THAN_1M_DESC,
	          visits: COUNT_1M,
	          color: layoutColors.danger

	        },
	        {
	          country: LESS_THAN_3M_DESC,
	          visits: COUNT_3M,
	          color: layoutColors.info
	        },
	        {
	          country: LESS_THAN_6M_DESC,
	          visits: COUNT_6M,
	          color: layoutColors.success
	        },
	        {
	          country: LESS_THAN_12M_DESC,
	          visits: COUNT_12M,
	          color: layoutColors.warning
	        },
	        {
	          country: MORE_THAN_12M_DESC,
	          visits: COUNT_MORE_THEN_12M,
	          color: layoutColors.primaryLight
	        }
	      ];
    var id = $element[0].getAttribute('id');
    var barChart = AmCharts.makeChart(id, {
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
    
    /** ************************************************************************************ */
    
    /**
	 * 判断字符串是否为空
	 * 
	 * @param str
	 *            字符串
	 * @returns {boolean} true 为空 false 非空
	 */
    function isEmpty (str){
    	return str ==null || str == undefined || str =="";
    }
    
    /**
	 * 日期解析，字符串转日期
	 * 
	 * @param dateString
	 *            可以为2017-02-16，2017/02/16，2017.02.16
	 * @returns {Date} 返回对应的日期对象
	 */    
    function dateParse(dateString){    
        var SEPARATOR_BAR = "-";    
        var SEPARATOR_SLASH = "/";    
        var SEPARATOR_DOT = ".";    
        var dateArray;    
        if(dateString.indexOf(SEPARATOR_BAR) > -1){    
            dateArray = dateString.split(SEPARATOR_BAR);      
        }else if(dateString.indexOf(SEPARATOR_SLASH) > -1){    
            dateArray = dateString.split(SEPARATOR_SLASH);    
        }else{    
            dateArray = dateString.split(SEPARATOR_DOT);    
        }    
        return new Date(dateArray[0], dateArray[1]-1, dateArray[2]);     
    }; 
    
    /**
	 * 日期比较大小 compareDateString大于dateString，返回1； 等于返回0；
	 * compareDateString小于dateString，返回-1
	 * 
	 * @param dateString
	 *            日期
	 * @param compareDateString
	 *            比较的日期
	 */    
    function dateCompare(dateString, compareDateString){    
        if(isEmpty(dateString)){    
            alert("dateString不能为空");    
            return;    
        }    
        if(isEmpty(compareDateString)){    
            alert("compareDateString不能为空");    
            return;    
        }    
        var dateTime = dateParse(dateString).getTime();    
        var compareDateTime = dateParse(compareDateString).getTime();    
        if(compareDateTime > dateTime){    
            return 1;    
        }else if(compareDateTime == dateTime){    
            return 0;    
        }else{    
            return -1;    
        }    
    }; 
    
    /**
	 * 设定新日期
	 * 
	 * @param _dateObject
	 *            日期对象
	 * @param x
	 *            加减月份
	 */            
    function getNewDate(_dateObject,x){  
        if( _dateObject == null || undefined == _dateObject || _dateObject == ''){  
            _dateObject = new Date();  
        }  
        _dateObject.setMonth(x);  
        var nd = _dateObject.valueOf() ;  
        nd = new Date(nd);  
          
        var y = nd.getFullYear();  
        var m = nd.getMonth() + 1;  
        var d = nd.getDate();  
          
        if(m <= 9) m = "0" + m;  
        if(d <= 9) d = "0" + d;   
        var cdate = y + "-" + m+ "-" +d ;  
          
        return cdate;  
    }  
    
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
					
		  			if(parseFloat(item.consumTimes)==0){
		  				COUNT_0=COUNT_0+1;
		  			}else if(dateCompare(getNewDate(new Date(),-1),item.lastSumTime)>=0){
		  				COUNT_1M=COUNT_1M+1;	
		  			}else if(dateCompare(getNewDate(new Date(),-3),item.lastSumTime)>=0){
		  				COUNT_3M=COUNT_3M+1;	
		  			}else if(dateCompare(getNewDate(new Date(),-6),item.lastSumTime)>=0){
		  				COUNT_6M=COUNT_6M+1;	
		  			}else if(dateCompare(getNewDate(new Date(),-12),item.lastSumTime)>=0){
		  				COUNT_12M=COUNT_12M+1;	
		  			}else if(dateCompare(getNewDate(new Date(),-12),item.lastSumTime)<0){
		  				COUNT_MORE_THEN_12M=COUNT_MORE_THEN_12M+1;	
		  			}
				});
				
				chartData[0].visits=COUNT_0;
				chartData[1].visits=COUNT_1M;
				chartData[2].visits=COUNT_3M;
				chartData[3].visits=COUNT_6M;
				chartData[4].visits=COUNT_12M;
				chartData[5].visits=COUNT_MORE_THEN_12M;
				// 刷新图表绑定的数据
				barChart.validateNow(); 
				barChart.validateData(); 
			});
			
		});
    }
    $scope.getData();
  }
})();
