(function() {
	'use strict';

	angular.module('BlurAdmin.pages.interactmarket.cstmrMarket')
		.controller('cstmrMarketCtrl', function($scope, $location,$uibModal) {
			$scope.open = function (page, size) {
			      $uibModal.open({
			        animation: true,
			        templateUrl: page,
			        size: size,
			        resolve: {
			          items: function () {
			            return $scope.items;
			          }
			        }
			      });
			    };
			    
		      $scope.rowCollection = [];
				var row = {
					name : '',
					pv : '',
					count : '',
					desc : '',
					time : '',
					share : '',
					disable : ''
				};

				for (var i = 1; i <= 50; i++) {
					var newRow = angular.copy(row);
					newRow.id = i;
					newRow.name = '活动' + i;
					newRow.desc = '活动的具体内容' + i;
					newRow.share = '预览' + i;
					newRow.disable = i%2 ? '是':'否';
					newRow.pv = parseInt(Math.random()*1000+1);
					newRow.count= parseInt(Math.random()*10+1);
					newRow.time = '2017-12-01 17:07:41';
					$scope.rowCollection.push(newRow);
				}

				$scope.total = 50;
		});

})();
