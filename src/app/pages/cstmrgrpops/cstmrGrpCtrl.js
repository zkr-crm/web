(function() {
	'use strict';

	angular.module('BlurAdmin.pages.cstmrgrpops')
		.controller('cstmrGrpCtrl', function($scope, $uibModal, baProgressModal,$location,$state) {
				
			$scope.add = function(args){
				$state.go(args.indexOf('动态')<0 ? 'static' : 'dynamic');
			}
			
			$scope.rowCollection = [];
				var row = {
					id : '',
					name : '',
					type : '',
					count : '',
					desc : '',
					time : ''
				};

				for (var i = 1; i <= 50; i++) {
					var newRow = angular.copy(row);
					newRow.id = i;
					newRow.name = i%2==0? '静态客户群' + i :'动态客户群' + i;
					newRow.desc = ( i%2==0?'静态客户群' + i :'动态客户群' + i)+"的描述信息";
					newRow.count= i;
					newRow.type = i%2==0?'静态客户群':'动态客户群';
					newRow.time = '2017-12-01 17:07:41';
					$scope.rowCollection.push(newRow);
				}

				$scope.total = 50;

				 $scope.initData = function(type){
					 $scope.rowCollection = [];
					 for (var i = 1; i <= 25; i++) {
						var newRow = angular.copy(row);
						newRow.id = i;
						newRow.name = type==0?'静态客户群' + i :'动态客户群' + i;
						newRow.desc = (type==0?'静态客户群' + i :'动态客户群' + i)+'的描述信息';
						newRow.count= parseInt(Math.random()*100+1);
						newRow.type = type==0?'静态客户群':'动态客户群';
						newRow.time = '2017-12-01 17:07:41';
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
