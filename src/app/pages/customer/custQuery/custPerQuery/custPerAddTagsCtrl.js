(function() {
	'use strict';

	angular.module('BlurAdmin.pages.customer.custQuery.custPerQuery').controller(
			'custPerAddTagsCtrl', custPerAddTagsCtrl);
	/** @ngInject */
	function custPerAddTagsCtrl($scope, $filter, toastr, HttpService, EnumType,$uibModal,$rootScope, Alert, checkedRow) {

		$scope.custList = checkedRow;
		$scope.loadData = {}
		var initCustTagList = function() {
			HttpService.linkHttp({
                url: 'crm/manage/tagmng/tagDetials',
                method: 'GET',
                params: {
                    sys:{
                        pageNum:'1',
                        pageSize:'99999'
                    }
                }
            }).then(function (response) {
            	if (response == undefined || response.data == undefined) {
            		return;
            	}
                $scope.loadData = angular.copy(response.data.list);
                $scope.tagDetails=angular.copy($scope.loadData);
            });
		}
		initCustTagList()
       
		$scope.loadDatas = function (query) {
           
            $scope.loadData=$scope.tagDetails.filter(function(x){
                return x.tagName.indexOf(query.trim())>-1;
            });
			return $scope.loadData;
        };
        $scope.tagAdded = function(tag) {
            console.log(tag);
            $scope.params = []

            $scope.custList.forEach(function(item){
            	var tagObj = {}
                tagObj.tagCd = tag.tagId; 
                tagObj.tagNam = tag.tagName; 
                tagObj.custNo = item.custNo; 
                $scope.params.push(tagObj)
            })
            console.log($scope.params)
            HttpService.linkHttp({
                url: 'crm/ecif/cust/addCustTagList',
                method: 'POST',
                data: $scope.params
            }).then(function (response) {
            	// initTrackInfo(custNo);
            });
        };
	}
})();
