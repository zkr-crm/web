(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.msgManage.msgSendQuery').controller(
			'msgSendQuery', msgSendQuery);
	/** @ngInject */
	function msgSendQuery($scope, $uibModal, $filter, $timeout, $http,
			HttpService, EnumType, Alert) {
		// 消息类型列表
		$scope.selectedList = EnumType.msgType;
		// 消息类型选中事件
		$scope.selectMsgType = function(selectedMsgType) {
			$scope.searchObj.msgType = selectedMsgType.value;
		}
		
		//消息类型
		$scope.ShowMsgType = function(item) {
			
			var showLabel="";
			angular.forEach(EnumType.msgType, function(i) {
				if (item.msgType === i.value) {
					showLabel=i.label;
				}
			});

			return showLabel;
		};
		//发送方式
		$scope.ShowSendWay = function(item) {
			
			var showLabel="";
			angular.forEach(EnumType.sendWay, function(i) {
				if (item.sendWay === i.value) {
					showLabel=i.label;
				}
			});

			return showLabel;
		};
		//信息状态
		$scope.ShowMsgStat = function(item) {
			
			var showLabel="";
			angular.forEach(EnumType.msgState, function(i) {
				if (item.msgState === i.value) {
					showLabel=i.label;
				}
			});

			return showLabel;
		};
		//发送渠道
		
		$scope.ShowSendChannel = function(item) {
			
			var showLabel="";
			angular.forEach(EnumType.sendChannel, function(i) {
				if (item.sendChannel === i.value) {
					showLabel=i.label;
				}
			});

			return showLabel;
		};
		// 查询条件对象
		$scope.searchObj = {};

		// 用户对象数据集
		$scope.RowCollection = [];



		// clear
		$scope.reset = function(){
            $scope.selectedMsgTyp="";
			$scope.searchObj={
                msgTopic:'',
                custName:'',
                sendObj:'',
                msgType:''
			};
			$scope.RowCollection = {};
		}
        $scope.search =function(page){
            page=page||1;
            $scope.queryPage(page);
        }
        var init = function () {
            $scope.$on('queryPage',function(event,queryPage){
                if(!$scope.queryPage){
                    $scope.queryPage=queryPage;
                }
            });
            $scope.searchOpts={
                pagination:{
                    pageSize:'10',
                    pageIndex:1,
                    maxText:5
                },
                url:'/crm/manage/msgmng/selectSendMsgByEntity',
                method:'GET',
                params:$scope.searchObj,
                success:function(response){
                    if (response == undefined || response.data == undefined) {
                        return;
                    }
                    $scope.RowCollection = response.data.list;
                }
            }

        }
        init();
	
	}
	
})();
