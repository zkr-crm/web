(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.msgTemplate').controller(
			'msgTemplateCtrl', msgTemplateCtrl);
	/** @ngInject */
	function msgTemplateCtrl($scope, $uibModal, $filter, $timeout, $http,
			HttpService, EnumType, Alert) {

		// 用户对象
		$scope.msgTpl = {};
		// 查询条件对象
		$scope.searchObj = {};

		// 用户对象数据集
		$scope.RowCollection = [];
		
		// 业务类型显示
		$scope.showBusiType = function(item) {
			
			var busiTypeLabel="";
			angular.forEach(EnumType.busiType, function(i) {
				if (item.busiType === i.value) {
					busiTypeLabel=i.label;
				}
			});

			return busiTypeLabel;
		};
		// 模板类型显示
		$scope.showTplType = function(item) {

			var tplTypeLabel="";
			angular.forEach(EnumType.tplType, function(i) {
				if (item.tplType === i.value) {
					tplTypeLabel=i.label;
				}
			});

			return tplTypeLabel;
		};
		// 新增
		$scope.addTemplate = function() {
			$uibModal
					.open({
						animation : true,
						templateUrl : 'app/pages/mgrcenter/msgTemplate/popupPages/addTemplate.html',
						size : 'midle-900',
						controller : 'addTemplateCtrl',
						scope : $scope,
						resolve : {}
					});

		};
		// 日期转换
		$scope.parseEffectDate = function (item){
				var effectDt = new Date(item.effectDt);
				return $filter('date')(effectDt, 'yyyy-MM-dd'); 
		}
		$scope.parseExpDate = function (item){
				var expDt = new Date(item.expDt);
				return $filter('date')(expDt, 'yyyy-MM-dd'); 
		}
		// 修改事件
		$scope.upd = function(item) {

			$scope.msgTpl = item;
			console.log($scope.msgTpl.tplNo);

			$uibModal
					.open({
						animation : true,
						backdrop : 'static',
						templateUrl : 'app/pages/mgrcenter/msgTemplate/popupPages/updTemplate.html',
						size : 'midle-900',
						controller : 'updTemplateCtrl',
						scope : $scope,
						resolve : {

						}
					});
		}

		// 物理删除事件（单行删除）
		$scope.remove = function(item) {

			Alert.confirm("确定删除？").then(function() {
				var opts = {};
				opts.url = '/crm/manage/msgmng/delTemplate';
				opts.method = 'DELETE';
				opts.params = {
					'tplNo' : item.tplNo
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

			if ($scope.checkedRow.length == 0) {
				Alert.error('请选择要删除的行！');
			} else {

				Alert.confirm("确定删除？").then(function() {
					var opts = {};
					opts.url = '/crm/manage/msgmng/delTemplateByKey';
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
				angular.forEach($scope.RowCollection, function(i) {
					i.checked = true;

					// 删除条件对象
					$scope.delObj = {
						'tplNo' : '',
					};
					$scope.delObj.tplNo= i.tplNo;

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
			console.log($scope.checkedRow);
		};

		// 单个选中
		$scope.selectOne = function() {
            $scope.checkedRow.length=0;
            var temp=$scope.RowCollection.filter(function(x){
            	return x.checked;
			});
            angular.forEach(temp, function(x) {
                if (x.checked) {
                    $scope.checkedRow.push({'tplNo' : x.tplNo});
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
            $scope.msgTemplateOpts={
                pagination:{
                    pageSize:'10',
                    pageIndex:1,
                    maxText:5
                },
                url:'/crm/manage/msgmng/getMsgTemplateByEntity',
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

