(function() {
	'use strict';

	angular.module('BlurAdmin.pages.cusService')
		.controller('IncServPushCtrl', function($scope, $uibModal, baProgressModal,$location,$state) {
			$scope.smartTablePageSize = 10;
			$scope.add = function(args){
				$state.go(args.indexOf('动态')<0 ? 'static' : 'dynamic');
			}
			
			$scope.rowCollection = [];
				var row = {
					id : '',
					proID : '',
					proName : '',
					proDesc : '',
					pushPlat : '',
					pushCont : '',
					pushCrowd : '',
					pushTime : ''
				};

				for (var i = 1; i <= 50; i++) {
					var newRow = angular.copy(row);
					newRow.id = i;
					newRow.proID = i;
					newRow.proName = '项目' + i;
					newRow.proDesc = '增值服务推送';
					newRow.pushPlat = '短信平台';
					newRow.pushCont = '车险优惠大促项目';
					newRow.pushCrowd = '驾驶客户群';
					newRow.pushTime = '2017-12-05 16:00';
					$scope.rowCollection.push(newRow);
				}

				$scope.total = 50;

				 $scope.initData = function(type){
					 $scope.rowCollection = [];
					 for (var i = 1; i <= 25; i++) {
						var newRow = angular.copy(row);
						newRow.id = i;
						newRow.proID = i;
						newRow.proName = '项目' + i;
						newRow.proDesc = '增值服务推送';
						newRow.pushPlat = '短信平台';
						newRow.pushCont = '车险优惠大促项目';
						newRow.pushCrowd = '驾驶客户群';
						newRow.pushTime = '2017-12-05 16:00';
						$scope.rowCollection.push(newRow);
					}
					 
				 }
				
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
				    $scope.openProgressDialog = baProgressModal.open;
				

			});

})();
