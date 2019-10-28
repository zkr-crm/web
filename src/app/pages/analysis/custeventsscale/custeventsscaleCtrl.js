(function() {
	'use strict';

	angular.module('BlurAdmin.pages.analysis.custeventsscale').controller('custeventsscaleCtrl', custeventsscaleCtrl);
	/** @ngInject */
	function custeventsscaleCtrl($scope, $uibModal, baConfig, $filter, $timeout, $http,HttpService, EnumType, $rootScope, Alert) {
		$scope.searchAnalysis = {};
    	$scope.CustType = [];
		angular.forEach(
				EnumType.CustType,
				function(item) {
					if (item.value == '01' || item.value == '03' ) {
						$scope.CustType.push(item);
					}
				});
		$scope.DataSource = EnumType.DataSource;
		$scope.YesNoFlg = EnumType.YesNoFlg;
		
        // 重置条件
        $scope.resetSearch = function() {
        	$scope.searchAnalysis = {};
        	$scope.initBarByAges();
        }
        $scope.searchAnalysisData = {};
        $scope.search = function() {
        	$scope.searchAnalysisData.custSource = $scope.searchAnalysis.custSource ?$scope.searchAnalysis.custSource.value:'';
        	$scope.searchAnalysisData.custTyp = $scope.searchAnalysis.custTyp ? $scope.searchAnalysis.custTyp.value:'';
        	$scope.searchAnalysisData.keyCustFlg = $scope.searchAnalysis.keyCustFlg ? $scope.searchAnalysis.keyCustFlg.value:'';

        	$scope.getDataCustEventsScale();
        }


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

        $scope.getDataCustEventsScale=function(){
	        $scope.hasAgesBar = false;
	        $scope.simpleBarOptions = {
	            fullWidth: true,
	            height: "300px"
	        };
	        $scope.initBarByAgesOptions={
	            url :'/crm/query/homePageCtrl/getDataCustEventsScale',
	            method: 'POST',
	            data:$scope.searchAnalysisData,
	            success: function successCallback(response) {

	                $scope.homeCharts=[
	                   {
	                       title:'客户事件占比',
	                       labels :["生日", "纪念日","续保","投诉"],
	                       data:[]
	                   },
	                 ];
	               $.each($scope.homeCharts,function(index,value) {  
	                if(value.title == '客户事件占比'){
	                   value.data= response.data.eventCountList;
	                   value.labels= response.data.eventTypeList;
	                }    
	               }); 
	             
	            }
	        };
	        HttpService.linkHttp($scope.initBarByAgesOptions);

	    }
        $scope.init=function(){
            //Charts 初始化
            $scope.homeCharts=[];
            // 主页 数据统计
            $scope.getDataCustEventsScale();
        }
        $scope.init();
	}

})();
