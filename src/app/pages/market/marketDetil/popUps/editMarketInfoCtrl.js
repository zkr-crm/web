(function() {
	'use strict';

	angular.module('BlurAdmin.pages.market.marketDetil').controller('editMarketInfoCtrl', editMarketInfoCtrl);

	/** @ngInject */
	function editMarketInfoCtrl($scope, $state, $stateParams) {

		// 关闭新增页面
		$scope.closePage = function() {
			$scope.$parent.$dismiss();
		}

		// 信息选项卡
		$scope.information_a = 0;
		$scope.index_ = function() {
			$scope.information_a++;
		}
		$scope.information = [ '基本信息', '管理信息', '高级设置' ];
		$scope.fan_information = function(e) {
			$scope.information_a = e;
		}
		
		// 图片上传
		$scope.uploadFiles = function(file, errFiles) {
			if (!file) {
				return;
			}
			$scope.perIconFile = file;
			var fd = new FormData();
			fd.append('file', file);
			HttpService.linkHttp({
				url : 'crm/ecif/picture',
				method : 'POST',
				headers : {
					'Content-Type' : undefined
				},
				data : fd
			}).then(function(response) {
				$scope.perIconImg = response.data;
			});
		}

		// ----------标签开始------------

		$scope.tagData1 = [ {
			tagName : "80后",
		}, {
			tagName : "90后",
		}, {
			tagName : "00后",
		}, {
			tagName : "高学历"
		} ];

		$scope.tagData2 = [ {
			tagName : "白金客户",
		}, {
			tagName : "高收入",
		}, {
			tagName : "高学历"
		}, {
			tagName : "80后",
		}, {
			tagName : "90后",
		}, {
			tagName : "00后",
		} ];

		$scope.loadTags = function(query) {
			return [ {
				"id" : 1,
				"name" : "Tag1"
			}, {
				"id" : 2,
				"name" : "Tag2"
			}, {
				"id" : 3,
				"name" : "Tag3"
			}, {
				"id" : 4,
				"name" : "Tag4"
			}, {
				"id" : 5,
				"name" : "Tag5"
			}, {
				"id" : 6,
				"name" : "Tag6"
			}, {
				"id" : 7,
				"name" : "Tag7"
			}, {
				"id" : 8,
				"name" : "Tag8"
			}, {
				"id" : 9,
				"name" : "Tag9"
			}, {
				"id" : 10,
				"name" : "Tag10"
			} ];
		};
		// ----------------标签结束-----------------

		// 客群对象
		$scope.custGroup = {};
		// 静态客群list
		$scope.openStaticCustList = function() {
			var modalInstance = $uibModal.open({
				animation : true,
				backdrop : 'static',
				templateUrl : 'app/pages/customer/custQuery/custPerQuery/selectStaticCustList.html',
				size : 'midle-900',
				controller : 'selectStaticCustListCtrl',
				scope : $scope,
				resolve : {
					items : function() {
						return $scope.items;
					}
				}
			});
			modalInstance.result.then(function(result) {
				$scope.custGroup.guoupId = result.groupId; //
				$scope.custGroup.groupName = result.groupName; //

				//console.log(result); // result关闭是回传的值
			}, function(reason) {
				//console.log(reason);// 点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel

			});

		}
	}

})();
