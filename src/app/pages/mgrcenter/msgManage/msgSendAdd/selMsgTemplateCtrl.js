(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.msgManage').controller(
			'selMsgTemplateCtrl', selMsgTemplateCtrl);
	/** @ngInject */
	function selMsgTemplateCtrl($scope, $uibModal, $filter, $timeout, $http,
			HttpService, EnumType, Alert) {

		// 用户对象
		$scope.msgTpl = {};
		// 查询条件对象
        $scope.searchObj = {};

		// 用户对象数据集
		$scope.RowCollection = [];
		
		// 确定
		$scope.saveItem = function() {
         //   $uibModalInstance.close($scope.sendTemDts);
			// $uibModal
			// 		.open({
			// 			animation : true,
			// 			templateUrl : 'app/pages/mgrcenter/msgTemplate/popupPages/addTemplate.html',
			// 			size : 'midle-1200',
			// 			controller : 'addTemplateCtrl',
			// 			scope : $scope,
			// 			resolve : {}
			// 		});

		};
		// 查询事件
		$scope.search = function() {

			var opts = {};
			opts.url = '/crm/manage/msgmng/getMsgTemplateByEntity';
			opts.method = 'GET';
			opts.params = $scope.searchObj;
			HttpService.linkHttp(opts).then(function(response) {
				console.log("请求成功");
				console.log(response);
				$scope.RowCollection = response.data.list;
                $scope.total = response.data.length;
			});
		}
		// 页面初始化查询
		$scope.search();

		// 修改事件
		$scope.upd = function(item) {

			$scope.msgTpl = item;

			// $uibModal
			// 		.open({
			// 			animation : true,
			// 			backdrop : 'static',
			// 			templateUrl : 'app/pages/mgrcenter/msgTemplate/popupPages/updTemplate.html',
			// 			size : 'midle-1200',
			// 			controller : 'updTemplateCtrl',
			// 			scope : $scope,
			// 			resolve : {
            //
			// 			}
			// 		});
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

			if ($scope.count == 0) {
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
				var count = 0;
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
        //发送模板
        $scope.radioRptOptions = {};
        $scope.radioRptOptions.select="";
        $scope.sendTemDts = {};
        $scope.sendTemDts.tplNo ="" ;  //模板编号
        $scope.sendTemDts.tplTitle ="" ;  //模板标题
		// 单个选中
		$scope.selectOne = function(i) {
			angular.forEach($scope.RowCollection, function(i) {
                if($scope.radioRptOptions.select == i.tplNo){
                    //alert("radioOptions.frequency");
                    $scope.sendTemDts.tplNo = i.tplNo ;  //模板编号
                    $scope.sendTemDts.tplTitle =i.tplTitle ;  //模板标题
                }

			});
		}
        // 关闭新增页面
        $scope.closePage = function() {

            $scope.$parent.$dismiss();
        }
	}
})();

