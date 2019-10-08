(function () {
  'use strict';

  angular.module('BlurAdmin.pages.customer.custQuery.custPerQuery')
    .controller('selectStaticCustListCtrl', selectStaticCustListCtrl);

  /** @ngInject */
  function selectStaticCustListCtrl($scope, $http, HttpService,$uibModalInstance, Alert, EnumType) {
      // 用户对象
      $scope.msgTpl = {};
      // 查询条件对象
      $scope.searchObj = {};
      // 用户对象数据集
      $scope.RowCollection = [];
      
   // 编辑群组类型下拉框
		$scope.custGroupTyp = [];
		var initCustGroupTyp = {
			'value' : '',
			'label' : '-请选择-'
		};
		$scope.custGroupTyp.push(initCustGroupTyp);
		angular.forEach(EnumType.CustGroupTyp, function(i) {
			$scope.custGroupTyp.push(i);
		});
		// 群组类型选择事件
		$scope.selectCustGroupTyp = function(selected) {
			$scope.searchObj.groupType = selected.value;
		}
      
  // 查询事件
  $scope.search = function(page) {
      $scope.searchObj.groupType = '1';
      $scope.queryStaticGroupOpts.params = $scope.searchObj;
      this.queryPage(page)
  }
   // 客户组类型
		$scope.showCustGroupTyp = function(item) {
			var xxx = "";
			angular.forEach(EnumType.CustGroupTyp, function(i) {
				if (item.groupType === i.value) {
					xxx = i.label;
				}
			});
			return xxx;
		}
		// 群组创建类型
		$scope.showEstablishType = function(item) {
			var xxx = "";
			angular.forEach(EnumType.EstablishType, function(i) {
				if (item.establishType === i.value) {
					xxx = i.label;
				}
			});
			return xxx;
		}
		// 群成员类型
		$scope.showGroupMemberType = function(item) {
			var xxx = "";
			angular.forEach(EnumType.GroupMemberType, function(i) {
				if (item.memberType === i.value) {
					xxx = i.label;
				}
			});
			return xxx;
		}
     //选择操作
    $scope.link = 'abc';
    $scope.ok = function () {
        if($scope.radioRptOptions.select ==""){
            Alert.error('请选择静态客群！');
            return ;
        }
      $uibModalInstance.close($scope.sendTemDts);
    };

      //发送
      $scope.radioRptOptions = {};
      $scope.radioRptOptions.select="";
      $scope.sendTemDts = {};
      $scope.sendTemDts.groupId ="" ;  //
      $scope.sendTemDts.groupName ="" ;  //

      // 单个选中
      $scope.selectOne = function(i) {
          angular.forEach($scope.RowCollection, function(i) {
              if($scope.radioRptOptions.select == i.groupId){
                  //alert("radioOptions.frequency");
                  $scope.sendTemDts.groupId = i.groupId ;  //
                  $scope.sendTemDts.groupName =i.groupName ;  //
              }

          });
      }

    var init = function () {
      $scope.queryStaticGroupOpts = {
        pagination:{
          pageSize:'10',
          pageIndex:1,
          maxText:5
        },
        url:'/crm/ocrm/CustGroupMng/getCustGrpByEntity',
        method: 'GET',
        success:function(response){
          $scope.RowCollection = response.data.list;
        }
      }
    }
    init()
  }

})();