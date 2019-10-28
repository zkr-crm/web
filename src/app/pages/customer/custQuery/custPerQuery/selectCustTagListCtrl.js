(function () {
  'use strict';

  angular.module('BlurAdmin.pages.customer.custQuery.custPerQuery')
    .controller('selectCustTagListCtrl', selectCustTagListCtrl);

  /** @ngInject */
  function selectCustTagListCtrl($scope, $http, HttpService,$uibModalInstance, Alert, EnumType) {
      // 用户对象
      $scope.msgTpl = {};
      // 查询条件对象
      $scope.searchObj = {};
      // 用户对象数据集
      $scope.TagRowCollection = [];
    //初始化标签类型下拉列表
		$scope.tagTypeT = [];
		var optsForST = {};
		optsForST.url = '/crm/manage/tagmng/tagTypes';
		optsForST.method = 'GET';
		HttpService.linkHttp(optsForST).then(function(response) {
			angular.forEach(response.data, function(item) {
				$scope.tagTypeT.push({ label : item.tagTypeName, value : item.tagTypeId });
			})
			
			$scope.tagTypeId = $scope.tagTypeT;
		});
		
		//初始化上级标签下拉列表
		$scope.tagT = [];
		var optsForTag = {};
		optsForTag.url = '/crm/manage/tagmng/tagDetials';
		optsForTag.method = 'GET';
		HttpService.linkHttp(optsForTag).then(function(response) {
			angular.forEach(response.data.list, function(item) {
				$scope.tagT.push({ label : item.tagName, value : item.tagId });
			})
			
			$scope.parentTagId = $scope.tagT;
		});
      // 查询事件
      $scope.search = function(page) {
			if($scope.searchObj.tagTypeId){
				$scope.v = $scope.searchObj.tagTypeId.value;
				$scope.searchObj.tagTypeId = "";
				$scope.searchObj.tagTypeId = $scope.v;
			}
			if($scope.searchObj.parentTagId){
				$scope.v2 = $scope.searchObj.parentTagId.value;
				$scope.searchObj.parentTagId = "";
				$scope.searchObj.parentTagId = $scope.v2;
			}
			$scope.queryTagOpts.params = $scope.searchObj;
			this.queryPage(page)
			// opts.params = $scope.searchObj;
			// HttpService.linkHttp(opts).then(function(response) {
			// 	angular.forEach(response.data.list, function(item) {
			// 		angular.forEach($scope.tagTypeId, function(tagType) {
			// 			if(item.tagTypeId == tagType.value || item.tagTypeId == tagType.label ){
			// 				item.tagTypeId = tagType.label;
			// 			}
			// 		})
			// 		angular.forEach($scope.parentTagId, function(parentTag) {
			// 			if(item.parentTagId == parentTag.value || item.parentTagId == parentTag.label ){
			// 				item.parentTagId = parentTag.label;
			// 			}
			// 		})

			// 		item.recStat = EnumType.RecStat.getLabelByValue(item.recStat);
			// 	})
				
			// 	$scope.TagRowCollection = response.data.list;
			// });
		};
      // 页面初始化查询

     //选择操作
    $scope.link = 'abc';
    $scope.ok = function () {
        if($scope.radioRptOptions.select ==""){
            Alert.error('请选择标签！');
            return ;
        }
      $uibModalInstance.close($scope.sendTemDts);
    };

      //发送标签
      $scope.radioRptOptions = {};
      $scope.radioRptOptions.select="";
      $scope.sendTemDts = {};
      $scope.sendTemDts.tagId ="" ;  //
      $scope.sendTemDts.tagName ="" ;  //

      // 单个选中
      $scope.selectOne = function(i) {
          angular.forEach($scope.TagRowCollection, function(i) {
              if($scope.radioRptOptions.select == i.tagId){
                  //alert("radioOptions.frequency");
                  $scope.sendTemDts.tagId = i.tagId ;  //标签编号
                  $scope.sendTemDts.tagName =i.tagName ;  //标签名称
              }

          });
      }
    $scope.selectRow = function(i) {
    	$scope.radioRptOptions.select = i.tagId;
    	$scope.sendTemDts.tagId = i.tagId ;
        $scope.sendTemDts.tagName =i.tagName ;  //标签名称

    }  
    var init = function () {
	  	$scope.queryTagOpts = {
	  		pagination:{
	  			pageSize:'10',
		        pageIndex:1,
		        maxText:5
	  		},
	  		url:'/crm/manage/tagmng/tagDetials',
	  		method:'GET',
	  		success:function(response){
	  			angular.forEach(response.data.list, function(item) {
					angular.forEach($scope.tagTypeId, function(tagType) {
						if(item.tagTypeId == tagType.value || item.tagTypeId == tagType.label ){
							item.tagTypeId = tagType.label;
						}
					})
					angular.forEach($scope.parentTagId, function(parentTag) {
						if(item.parentTagId == parentTag.value || item.parentTagId == parentTag.label ){
							item.parentTagId = parentTag.label;
						}
					})

					item.recStat = EnumType.RecStat.getLabelByValue(item.recStat);
				})
				$scope.TagRowCollection = response.data.list;
	  		}

	  	}
	}
	init()

  }
})();