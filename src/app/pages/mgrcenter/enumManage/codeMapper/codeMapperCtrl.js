(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.enumManage.codeMapper').controller(
			'codeMapperCtrl', codeMapperCtrl);
	/** @ngInject */
	function codeMapperCtrl($scope, $uibModal, $filter, $timeout, $http,
			HttpService, EnumType, Alert) {

		// 用户对象
		$scope.codeMapper = {};
		// 查询条件对象
		$scope.searchObj = {};

		// 用户对象数据集
		$scope.RowCollection = [];
		
		// 新增
		$scope.addCodeMapper = function() {
			$uibModal
					.open({
						animation : true,
						templateUrl : 'app/pages/mgrcenter/enumManage/codeMapper/popupPages/addCodeMapper.html',
						size : 'midle-900',
						controller : 'addCodeMapperCtrl',
						scope : $scope,
						resolve : {}
					});

		};
		// 修改事件
		$scope.upd = function(item) {

			$scope.codeMapper = item;

			$uibModal
					.open({
						animation : true,
						backdrop : 'static',
						templateUrl : 'app/pages/mgrcenter/enumManage/codeMapper/popupPages/updCodeMapper.html',
						size : 'midle-900',
						controller : 'updCodeMapperCtrl',
						scope : $scope,
						resolve : {

						}
					});
		}

		// 物理删除事件（单行删除）
		$scope.remove = function(item) {

			Alert.confirm("确定删除？").then(function() {
				var opts = {};
				opts.url = '/crm/manage/codemappermng/delCodeMapper';
				opts.method = 'DELETE';
				opts.params = {
						'codeType' : item.codeType,
						'codeVal' : item.codeVal,
						'extSysFlg' : item.extSysFlg,
						'extCodeType' : item.extCodeType
				};
				HttpService.linkHttp(opts).then(function(response) {
					console.log("请求成功");
					console.log(response);
					// 执行查询
					$scope.search();
				});
			});

		};

		// 逻辑删除事件（多行删除）
		$scope.batchRemove = function() {

			if ($scope.count == 0) {
				Alert.error('请选择要删除的行！');
			} else {

				Alert.confirm("确定删除？").then(function() {
					var opts = {};
					opts.url = '/crm/manage/codemappermng/delCodeMapperByKey';
					opts.method = 'POST';
					opts.params = {};
					opts.data = $scope.checkedRow;
					HttpService.linkHttp(opts).then(function(response) {
						console.log("请求成功");
						console.log(response);
						// 执行查询
						$scope.search();
					});
					$scope.checkedRow = [];
				});
			}
		};

		$scope.checkedRow = [];
		// 全选
		$scope.selectAll = function() {
			if (!$scope.select_all) {
				$scope.checkedRow = [];
				var count = 0;
				angular.forEach($scope.RowCollection, function(i) {
					i.checked = true;

					// 删除条件对象
					$scope.delObj = {
							'codeType' : '',
							'codeVal' : '',
							'extSysFlg' : '',
							'extCodeType' : ''
					};
					$scope.delObj.codeType= i.codeType;
					$scope.delObj.codeVal= i.codeVal;
					$scope.delObj.extSysFlg= i.extSysFlg;
					$scope.delObj.extCodeType= i.extCodeType;

					$scope.checkedRow.push($scope.delObj);
				})
				$scope.select_all = true;
			} else {
				angular.forEach($scope.RowCollection, function(i) {
					i.checked = false;
					$scope.checkedRow = [];
				})
				$scope.select_all = false;
			}
		};

		// 单个选中
		$scope.selectOne = function() {
            $scope.checkedRow=[];
			angular.forEach($scope.RowCollection, function(i) {
				var index = $scope.checkedRow.indexOf(i);
				if (i.checked && index === -1) {

					// 删除条件对象
					$scope.delObj = {
							'codeType' : '',
							'codeVal' : '',
							'extSysFlg' : '',
							'extCodeType' : ''
					};
					$scope.delObj.codeType= i.codeType;
					$scope.delObj.codeVal= i.codeVal;
					$scope.delObj.extSysFlg= i.extSysFlg;
					$scope.delObj.extCodeType= i.extCodeType;

					$scope.checkedRow.push($scope.delObj);
				} else if (!i.checked && index !== -1) {
					$scope.checkedRow.splice(index, 1);
				}
			});

			if ($scope.RowCollection.length === $scope.checkedRow.length) {
				$scope.select_all = true;
			} else {
				$scope.select_all = false;
			}
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
            $scope.codeOpts={
                pagination:{
                    pageSize:'10',
                    pageIndex:1,
                    maxText:5
                },
                url:'/crm/manage/codemappermng/getCodeMapperByEntity',
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

