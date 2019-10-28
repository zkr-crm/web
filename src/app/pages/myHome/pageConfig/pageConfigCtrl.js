(function() {
	'use strict';

	angular.module('BlurAdmin.pages.myHome').controller('pageConfigCtrl', pageConfigCtrl);

	/** @ngInject */
	function pageConfigCtrl($scope, $state, $stateParams, $rootScope, $uibModal, EnumType, HttpService) {

		// 默认展示的tab页签
		$scope.isShow = 0;
		$scope.chengeDiv = function(flg) {
			$scope.isShow = flg;
		}

		// 关闭页面
		$scope.closePage = function() {
			$scope.$parent.$dismiss();
		}

		// 选中统计时间段
		$scope.onSelectFlg1 = false;
		$scope.onSelectFlg2 = false;
		$scope.onSelectFlg3 = false;
		$scope.onSelectFlg4 = false;
		$scope.onSelectFlg5 = false;
		$scope.onSelectFlg6 = false;
		$scope.onSelectFlg7 = false;
		$scope.onSelectFlg8 = false;
		$scope.onSelectFlg9 = false;
		$scope.onSelectFlg10 = false;
		$scope.onSelect = function(flg) {

			if (flg == 1 && $scope.onSelectFlg1 == false) {
				$scope.checkedColor1 = "#5975D9";
				$scope.fontColor1 = "#fff";
				$scope.onSelectFlg1 = true;
				$scope.div1 = true;

				$scope.checkedColor2 = "#fff";
				$scope.onSelectFlg2 = false;
				$scope.fontColor2 = "#000";
				$scope.div2 = false;

				$scope.checkedColor3 = "#fff";
				$scope.onSelectFlg3 = false;
				$scope.fontColor3 = "#000";
				$scope.div3 = false;

				$scope.checkedColor4 = "#fff";
				$scope.onSelectFlg4 = false;
				$scope.fontColor4 = "#000";
				$scope.div4 = false;

				$scope.checkedColor5 = "#fff";
				$scope.onSelectFlg5 = false;
				$scope.fontColor5 = "#000";
				$scope.div5 = false;

				$scope.checkedColor6 = "#fff";
				$scope.onSelectFlg6 = false;
				$scope.fontColor6 = "#000";
				$scope.div6 = false;

				$scope.checkedColor7 = "#fff";
				$scope.onSelectFlg7 = false;
				$scope.fontColor7 = "#000";
				$scope.div7 = false;

				$scope.checkedColor8 = "#fff";
				$scope.onSelectFlg8 = false;
				$scope.fontColor8 = "#000";
				$scope.div8 = false;

				$scope.checkedColor9 = "#fff";
				$scope.onSelectFlg9 = false;
				$scope.fontColor9 = "#000";
				$scope.div9 = false;

				$scope.checkedColor10 = "#fff";
				$scope.onSelectFlg10 = false;
				$scope.fontColor10 = "#000";
				$scope.div10 = false;
			}

			if (flg == 2 && $scope.onSelectFlg2 == false) {
				$scope.checkedColor2 = "#5975D9";
				$scope.fontColor2 = "#fff";
				$scope.onSelectFlg2 = true;
				$scope.div2 = true;

				$scope.checkedColor1 = "#fff";
				$scope.onSelectFlg1 = false;
				$scope.fontColor1 = "#000";
				$scope.div1 = false;

				$scope.checkedColor3 = "#fff";
				$scope.onSelectFlg3 = false;
				$scope.fontColor3 = "#000";
				$scope.div3 = false;

				$scope.checkedColor4 = "#fff";
				$scope.onSelectFlg4 = false;
				$scope.fontColor4 = "#000";
				$scope.div4 = false;

				$scope.checkedColor5 = "#fff";
				$scope.onSelectFlg5 = false;
				$scope.fontColor5 = "#000";
				$scope.div5 = false;

				$scope.checkedColor6 = "#fff";
				$scope.onSelectFlg6 = false;
				$scope.fontColor6 = "#000";
				$scope.div6 = false;

				$scope.checkedColor7 = "#fff";
				$scope.onSelectFlg7 = false;
				$scope.fontColor7 = "#000";
				$scope.div7 = false;

				$scope.checkedColor8 = "#fff";
				$scope.onSelectFlg8 = false;
				$scope.fontColor8 = "#000";
				$scope.div8 = false;

				$scope.checkedColor9 = "#fff";
				$scope.onSelectFlg9 = false;
				$scope.fontColor9 = "#000";
				$scope.div9 = false;

				$scope.checkedColor10 = "#fff";
				$scope.onSelectFlg10 = false;
				$scope.fontColor10 = "#000";
				$scope.div10 = false;
			}

			if (flg == 3 && $scope.onSelectFlg3 == false) {
				$scope.checkedColor3 = "#5975D9";
				$scope.fontColor3 = "#fff";
				$scope.onSelectFlg3 = true;
				$scope.div3 = true;

				$scope.checkedColor1 = "#fff";
				$scope.onSelectFlg1 = false;
				$scope.fontColor1 = "#000";
				$scope.div1 = false;

				$scope.checkedColor2 = "#fff";
				$scope.onSelectFlg2 = false;
				$scope.fontColor2 = "#000";
				$scope.div2 = false;

				$scope.checkedColor4 = "#fff";
				$scope.onSelectFlg4 = false;
				$scope.fontColor4 = "#000";
				$scope.div4 = false;

				$scope.checkedColor5 = "#fff";
				$scope.onSelectFlg5 = false;
				$scope.fontColor5 = "#000";
				$scope.div5 = false;

				$scope.checkedColor6 = "#fff";
				$scope.onSelectFlg6 = false;
				$scope.fontColor6 = "#000";
				$scope.div6 = false;

				$scope.checkedColor7 = "#fff";
				$scope.onSelectFlg7 = false;
				$scope.fontColor7 = "#000";
				$scope.div7 = false;

				$scope.checkedColor8 = "#fff";
				$scope.onSelectFlg8 = false;
				$scope.fontColor8 = "#000";
				$scope.div8 = false;

				$scope.checkedColor9 = "#fff";
				$scope.onSelectFlg9 = false;
				$scope.fontColor9 = "#000";
				$scope.div9 = false;

				$scope.checkedColor10 = "#fff";
				$scope.onSelectFlg10 = false;
				$scope.fontColor10 = "#000";
				$scope.div10 = false;
			}

			if (flg == 4 && $scope.onSelectFlg4 == false) {
				$scope.checkedColor4 = "#5975D9";
				$scope.fontColor4 = "#fff";
				$scope.onSelectFlg4 = true;
				$scope.div4 = true;

				$scope.checkedColor1 = "#fff";
				$scope.onSelectFlg1 = false;
				$scope.fontColor1 = "#000";
				$scope.div1 = false;

				$scope.checkedColor2 = "#fff";
				$scope.onSelectFlg2 = false;
				$scope.fontColor2 = "#000";
				$scope.div2 = false;

				$scope.checkedColor3 = "#fff";
				$scope.onSelectFlg3 = false;
				$scope.fontColor3 = "#000";
				$scope.div3 = false;

				$scope.checkedColor5 = "#fff";
				$scope.onSelectFlg5 = false;
				$scope.fontColor5 = "#000";
				$scope.div5 = false;

				$scope.checkedColor6 = "#fff";
				$scope.onSelectFlg6 = false;
				$scope.fontColor6 = "#000";
				$scope.div6 = false;

				$scope.checkedColor7 = "#fff";
				$scope.onSelectFlg7 = false;
				$scope.fontColor7 = "#000";
				$scope.div7 = false;

				$scope.checkedColor8 = "#fff";
				$scope.onSelectFlg8 = false;
				$scope.fontColor8 = "#000";
				$scope.div8 = false;

				$scope.checkedColor9 = "#fff";
				$scope.onSelectFlg9 = false;
				$scope.fontColor9 = "#000";
				$scope.div9 = false;

				$scope.checkedColor10 = "#fff";
				$scope.onSelectFlg10 = false;
				$scope.fontColor10 = "#000";
				$scope.div10 = false;
			}

			if (flg == 5 && $scope.onSelectFlg5 == false) {
				$scope.checkedColor5 = "#5975D9";
				$scope.fontColor5 = "#fff";
				$scope.onSelectFlg5 = true;
				$scope.div5 = true;

				$scope.checkedColor1 = "#fff";
				$scope.onSelectFlg1 = false;
				$scope.fontColor1 = "#000";
				$scope.div1 = false;

				$scope.checkedColor2 = "#fff";
				$scope.onSelectFlg2 = false;
				$scope.fontColor2 = "#000";
				$scope.div2 = false;

				$scope.checkedColor3 = "#fff";
				$scope.onSelectFlg3 = false;
				$scope.fontColor3 = "#000";
				$scope.div3 = false;

				$scope.checkedColor4 = "#fff";
				$scope.onSelectFlg4 = false;
				$scope.fontColor4 = "#000";
				$scope.div4 = false;

				$scope.checkedColor6 = "#fff";
				$scope.onSelectFlg6 = false;
				$scope.fontColor6 = "#000";
				$scope.div6 = false;

				$scope.checkedColor7 = "#fff";
				$scope.onSelectFlg7 = false;
				$scope.fontColor7 = "#000";
				$scope.div7 = false;

				$scope.checkedColor8 = "#fff";
				$scope.onSelectFlg8 = false;
				$scope.fontColor8 = "#000";
				$scope.div8 = false;

				$scope.checkedColor9 = "#fff";
				$scope.onSelectFlg9 = false;
				$scope.fontColor9 = "#000";
				$scope.div9 = false;

				$scope.checkedColor10 = "#fff";
				$scope.onSelectFlg10 = false;
				$scope.fontColor10 = "#000";
				$scope.div10 = false;
			}

			if (flg == 6 && $scope.onSelectFlg6 == false) {
				$scope.checkedColor6 = "#5975D9";
				$scope.fontColor6 = "#fff";
				$scope.onSelectFlg6 = true;
				$scope.div6 = true;

				$scope.checkedColor1 = "#fff";
				$scope.onSelectFlg1 = false;
				$scope.fontColor1 = "#000";
				$scope.div1 = false;

				$scope.checkedColor2 = "#fff";
				$scope.onSelectFlg2 = false;
				$scope.fontColor2 = "#000";
				$scope.div2 = false;

				$scope.checkedColor3 = "#fff";
				$scope.onSelectFlg3 = false;
				$scope.fontColor3 = "#000";
				$scope.div3 = false;

				$scope.checkedColor4 = "#fff";
				$scope.onSelectFlg4 = false;
				$scope.fontColor4 = "#000";
				$scope.div4 = false;

				$scope.checkedColor5 = "#fff";
				$scope.onSelectFlg5 = false;
				$scope.fontColor5 = "#000";
				$scope.div5 = false;

				$scope.checkedColor7 = "#fff";
				$scope.onSelectFlg7 = false;
				$scope.fontColor7 = "#000";
				$scope.div7 = false;

				$scope.checkedColor8 = "#fff";
				$scope.onSelectFlg8 = false;
				$scope.fontColor8 = "#000";
				$scope.div8 = false;

				$scope.checkedColor9 = "#fff";
				$scope.onSelectFlg9 = false;
				$scope.fontColor9 = "#000";
				$scope.div9 = false;

				$scope.checkedColor10 = "#fff";
				$scope.onSelectFlg10 = false;
				$scope.fontColor10 = "#000";
				$scope.div10 = false;
			}

			if (flg == 7 && $scope.onSelectFlg7 == false) {
				$scope.checkedColor7 = "#5975D9";
				$scope.fontColor7 = "#fff";
				$scope.onSelectFlg7 = true;
				$scope.div7 = true;

				$scope.checkedColor1 = "#fff";
				$scope.onSelectFlg1 = false;
				$scope.fontColor1 = "#000";
				$scope.div1 = false;

				$scope.checkedColor2 = "#fff";
				$scope.onSelectFlg2 = false;
				$scope.fontColor2 = "#000";
				$scope.div2 = false;

				$scope.checkedColor3 = "#fff";
				$scope.onSelectFlg3 = false;
				$scope.fontColor3 = "#000";
				$scope.div3 = false;

				$scope.checkedColor4 = "#fff";
				$scope.onSelectFlg4 = false;
				$scope.fontColor4 = "#000";
				$scope.div4 = false;

				$scope.checkedColor5 = "#fff";
				$scope.onSelectFlg5 = false;
				$scope.fontColor5 = "#000";
				$scope.div5 = false;

				$scope.checkedColor6 = "#fff";
				$scope.onSelectFlg6 = false;
				$scope.fontColor6 = "#000";
				$scope.div6 = false;

				$scope.checkedColor8 = "#fff";
				$scope.onSelectFlg8 = false;
				$scope.fontColor8 = "#000";
				$scope.div8 = false;

				$scope.checkedColor9 = "#fff";
				$scope.onSelectFlg9 = false;
				$scope.fontColor9 = "#000";
				$scope.div9 = false;

				$scope.checkedColor10 = "#fff";
				$scope.onSelectFlg10 = false;
				$scope.fontColor10 = "#000";
				$scope.div10 = false;
			}

			if (flg == 8 && $scope.onSelectFlg8 == false) {
				$scope.checkedColor8 = "#5975D9";
				$scope.fontColor8 = "#fff";
				$scope.onSelectFlg8 = true;
				$scope.div8 = true;

				$scope.checkedColor1 = "#fff";
				$scope.onSelectFlg1 = false;
				$scope.fontColor1 = "#000";
				$scope.div1 = false;

				$scope.checkedColor2 = "#fff";
				$scope.onSelectFlg2 = false;
				$scope.fontColor2 = "#000";
				$scope.div2 = false;

				$scope.checkedColor3 = "#fff";
				$scope.onSelectFlg3 = false;
				$scope.fontColor3 = "#000";
				$scope.div3 = false;

				$scope.checkedColor4 = "#fff";
				$scope.onSelectFlg4 = false;
				$scope.fontColor4 = "#000";
				$scope.div4 = false;

				$scope.checkedColor5 = "#fff";
				$scope.onSelectFlg5 = false;
				$scope.fontColor5 = "#000";
				$scope.div5 = false;

				$scope.checkedColor6 = "#fff";
				$scope.onSelectFlg6 = false;
				$scope.fontColor6 = "#000";
				$scope.div6 = false;

				$scope.checkedColor7 = "#fff";
				$scope.onSelectFlg7 = false;
				$scope.fontColor7 = "#000";
				$scope.div7 = false;

				$scope.checkedColor9 = "#fff";
				$scope.onSelectFlg9 = false;
				$scope.fontColor9 = "#000";
				$scope.div9 = false;

				$scope.checkedColor10 = "#fff";
				$scope.onSelectFlg10 = false;
				$scope.fontColor10 = "#000";
				$scope.div10 = false;
			}

			if (flg == 9 && $scope.onSelectFlg9 == false) {
				$scope.checkedColor9 = "#5975D9";
				$scope.fontColor9 = "#fff";
				$scope.onSelectFlg9 = true;
				$scope.div9 = true;

				$scope.checkedColor1 = "#fff";
				$scope.onSelectFlg1 = false;
				$scope.fontColor1 = "#000";
				$scope.div1 = false;

				$scope.checkedColor2 = "#fff";
				$scope.onSelectFlg2 = false;
				$scope.fontColor2 = "#000";
				$scope.div2 = false;

				$scope.checkedColor3 = "#fff";
				$scope.onSelectFlg3 = false;
				$scope.fontColor3 = "#000";
				$scope.div3 = false;

				$scope.checkedColor4 = "#fff";
				$scope.onSelectFlg4 = false;
				$scope.fontColor4 = "#000";
				$scope.div4 = false;

				$scope.checkedColor5 = "#fff";
				$scope.onSelectFlg5 = false;
				$scope.fontColor5 = "#000";
				$scope.div5 = false;

				$scope.checkedColor6 = "#fff";
				$scope.onSelectFlg6 = false;
				$scope.fontColor6 = "#000";
				$scope.div6 = false;

				$scope.checkedColor7 = "#fff";
				$scope.onSelectFlg7 = false;
				$scope.fontColor7 = "#000";
				$scope.div7 = false;

				$scope.checkedColor8 = "#fff";
				$scope.onSelectFlg8 = false;
				$scope.fontColor8 = "#000";
				$scope.div8 = false;

				$scope.checkedColor10 = "#fff";
				$scope.onSelectFlg10 = false;
				$scope.fontColor10 = "#000";
				$scope.div10 = false;
			}

			if (flg == 10 && $scope.onSelectFlg10 == false) {
				$scope.checkedColor10 = "#5975D9";
				$scope.fontColor10 = "#fff";
				$scope.onSelectFlg10 = true;
				$scope.div10 = true;

				$scope.checkedColor1 = "#fff";
				$scope.onSelectFlg1 = false;
				$scope.fontColor1 = "#000";
				$scope.div1 = false;

				$scope.checkedColor2 = "#fff";
				$scope.onSelectFlg2 = false;
				$scope.fontColor2 = "#000";
				$scope.div2 = false;

				$scope.checkedColor3 = "#fff";
				$scope.onSelectFlg3 = false;
				$scope.fontColor3 = "#000";
				$scope.div3 = false;

				$scope.checkedColor4 = "#fff";
				$scope.onSelectFlg4 = false;
				$scope.fontColor4 = "#000";
				$scope.div4 = false;

				$scope.checkedColor5 = "#fff";
				$scope.onSelectFlg5 = false;
				$scope.fontColor5 = "#000";
				$scope.div5 = false;

				$scope.checkedColor6 = "#fff";
				$scope.onSelectFlg6 = false;
				$scope.fontColor6 = "#000";
				$scope.div6 = false;

				$scope.checkedColor7 = "#fff";
				$scope.onSelectFlg7 = false;
				$scope.fontColor7 = "#000";
				$scope.div7 = false;

				$scope.checkedColor8 = "#fff";
				$scope.onSelectFlg8 = false;
				$scope.fontColor8 = "#000";
				$scope.div8 = false;

				$scope.checkedColor9 = "#fff";
				$scope.onSelectFlg9 = false;
				$scope.fontColor9 = "#000";
				$scope.div9 = false;
			}
		}

		// 模块列表
		$scope.modularList = [ {
			name : "客户列表",
			enable : true,
			seqNo : 1
		}, {
			name : "商机列表",
			enable : true,
			seqNo : 2
		}, {
			name : "任务列表",
			enable : true,
			seqNo : 3
		}, {
			name : "站内提醒",
			enable : true,
			seqNo : 4
		}, {
			name : "站内信",
			enable : true,
			seqNo : 5
		}, {
			name : "审批列表",
			enable : true,
			seqNo : 6
		}, {
			name : "营销活动列表",
			enable : true,
			seqNo : 7
		} ];

		// CheckBox选中事件
		$scope.menuSelectOne = function(item) {
			if (item.checked == false) {

				var index = $scope.menuListOnShow.indexOf(item);
				if (index > -1) {
					$scope.menuListOnShow.splice(index, 1);
				}
			} else {
				$scope.menuListOnShow.push(item);
			}
		}
		
		$scope.saveValue=function(){
			$scope.$parent.$dismiss();
		}
	}
})();
