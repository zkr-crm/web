(function() {
	'use strict';

	angular.module('BlurAdmin.pages.analysis.custagedistribution').controller('custagedistributionCtrl', custagedistributionCtrl);
	/** @ngInject */
	function custagedistributionCtrl($scope, $uibModal, $filter, $timeout, $http,HttpService, EnumType, $rootScope, Alert) {
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
		
        $scope.startChange=function(){
            if ($scope.searchAnalysis.endDate != null && $scope.searchAnalysis.endDate != '') {
                var endDate = new Date($scope.searchAnalysis.endDate);
                var startDate = new Date($scope.searchAnalysis.startDate);
                if(startDate>endDate){
                   $scope.searchAnalysis.startDate=null;
               }
            }
        }

        $scope.endChange=function(){
            if ($scope.searchAnalysis.startDate != null && $scope.searchAnalysis.startDate != '') {
                var endDate = new Date($scope.searchAnalysis.endDate);
                var startDate = new Date($scope.searchAnalysis.startDate);
                if(startDate>endDate){
                    $scope.searchAnalysis.endDate=null;
                }
            }
        }
        // 日期控件
        $scope.endOpened = {
            opened : false
        }
        $scope.startOpened = {
            opened : false
        }

        // 打开日期控件
        $scope.endOpen = function() {
            $scope.endOpened.opened = !$scope.endOpened.opened;
        }

        $scope.startOpen = function () {
            $scope.startOpened.opened = !$scope.startOpened.opened;
        }

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
        	$scope.searchAnalysisData.startDate = $scope.searchAnalysis.startDate ? $filter('date')($scope.searchAnalysis.startDate, 'yyyy-MM-dd'):'';
        	$scope.searchAnalysisData.endDate = $scope.searchAnalysis.endDate ? $filter('date')($scope.searchAnalysis.endDate, 'yyyy-MM-dd'):'';

        	$scope.initBarByAges();
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
	            data:$scope.searchAnalysisData,
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
	}

})();
