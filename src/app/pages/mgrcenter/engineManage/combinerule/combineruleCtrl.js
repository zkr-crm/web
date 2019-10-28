(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.engineManage.combinerule').controller(
			'combineruleCtrl', combineruleCtrl);
	/** @ngInject */
	function combineruleCtrl($scope,$state, $uibModal, toastr, toastrConfig, $filter, $timeout, $http,
			HttpService, EnumType, Alert) {

        $scope.options = {
            autoDismiss: false,
            positionClass: 'toast-top-center',
            type: 'success',
            timeOut: '900',
            extendedTimeOut: '2000',
            allowHtml: false,
            closeButton: false,
            tapToDismiss: true,
            progressBar: false,
            newestOnTop: true,
            maxOpened: 0,
            preventDuplicates: false,
            preventOpenDuplicates: false,
            title: "Some title here",
            msg: "Type your message here"
        };
		// 用户对象
		$scope.userInfo = {};
		// 查询条件对象
		$scope.searchObj = {};

		// 用户对象数据集
		$scope.BaseRuleRowCollection = [];

		// 性别下拉框初始化
		$scope.genders = EnumType.Sex;

		// 性别下拉框显示
		$scope.ShowGender = function(item) {

			var sexLabel="";
			angular.forEach(EnumType.Sex, function(i) {
				if (item.sex === i.value) {
					sexLabel=i.label;
				}
			});

			return sexLabel;
		};

		// 用户状态下拉框初始化
		$scope.userStates = EnumType.UserStat;
		// 用户状态下拉框显示
		$scope.ShowUserStat = function(item) {
			Alert.error('施工中...');
			return;
			////////////////////

			var userStatLabel="";
			angular.forEach(EnumType.UserStat, function(i) {
				if (item.userStat === i.value) {
					userStatLabel=i.label;
				}
			});

			return userStatLabel;
		};

        $scope.isUsed = { value: {id: '-1', name: '是否被使用' }};
        $scope.itemArray = [
            {id: '-1', name: '全部'},
            {id: '1', name: '是' },
            {id: '0', name: '否' }];


		// 查看规则
		$scope.viewRule = function(item) {
            // Alert.error('施工中...');
            // return;
            ////////////////////
            $state.go('mgrcenter.viewCombinerule', {
                'combinerule': item
            });

			// $scope.userInfo = item;
			// $uibModal
			// 		.open({
			// 			animation : true,
			// 			backdrop : 'static',
			// 			templateUrl : 'app/pages/mgrcenter/usermanagement/popupPages/roleAuth.html',
			// 			size : 'lg',
			// 			controller : 'roleAuthCtrl',
			// 			scope : $scope,
			// 			resolve : {
            //
			// 			}
			// 		});
		}

		// 查询事件
		$scope.searchBaseRule = function() {

			var opts = {};
			opts.url = '/crm/manage/engine/getAllCombineRuleByEntity';
			opts.method = 'GET';
            $scope.searchObj.isUsed = $scope.isUsed.value.id;
			opts.params = $scope.searchObj;
			HttpService.linkHttp(opts).then(function(response) {
                console.log("请求成功");
                console.log(response.data);
                $scope.BaseRuleRowCollection = []
                response.data.forEach(function (value) {
                    if (value.isUsed>0){
                        value.isUsed = '是'
					} else {
                        value.isUsed = '否'
					}
                    // value.isUsed = EnumType.IsUsed.getLabelByValue(value.isUsed);
                    $scope.BaseRuleRowCollection.push(value);
                });
			});
		}
		// 页面初始化查询
		$scope.searchBaseRule();

		// 新增事件
		$scope.addBaseRule = function() {
            // Alert.error('施工中...');
            // return;
            ////////////////////

            $state.go('mgrcenter.addCombinerule',{});
            // $uibModal
				// 	.open({
				// 		animation : true,
				// 		backdrop : 'static',
				// 		templateUrl : 'app/pages/mgrcenter/engineManage/baserule/add/addBaserule.html',
				// 		size : 'big-1500',
				// 		controller : 'addBaseruleCtrl',
				// 		scope : $scope,
				// 		resolve : {
            //
				// 		}
				// 	});
		}

		// 修改事件
		$scope.updRule = function(item) {
            // console.log(item);
            // Alert.error('施工中...');

            var opts = {};
            opts.url = '/crm/manage/engine/getCombineRuleToUpdate';
            opts.method = 'GET';
            opts.params = {'combineRuleId':item.combineRuleId};
            HttpService.linkHttp(opts).then(function(response) {
                // console.log("请求成功");
                console.log(response.data);
                // if (response.data.isUsed){
                 //    Alert.error('施工中...');
				// } else {
                //
				// }
                // return;
                $state.go('mgrcenter.modifyCombinerule', {
                    'combineRule': response.data.combineRule,
                    'combineFactorRels': response.data.combineFactorRels,
                    'isUsed': response.data.isUsed
                });
                // response.data.forEach(function (value) {
                //     if (value.isUsed>0){
                //         value.isUsed = '是'
                //         // Alert.error('施工中...');
                //     } else {
                //         value.isUsed = '否'
                //     }
                // });
            });

            // $state.go('portrayal.perCusPortrayal',{'custNo':custNo});
            // Alert.error('施工中...');
            // return;
            ////////////////////
            // $scope.userInfo = item;
            // $uibModal
            //     .open({
            //         animation: true,
            //         backdrop: 'static',
            //         templateUrl: 'app/pages/mgrcenter/usermanagement/popupPages/updUser.html',
            //         size: 'midle-1200',
            //         controller: 'updUserCtrl',
            //         scope: $scope,
            //         resolve: {}
            //     });
		}

		// 逻辑删除事件（单行删除）
		$scope.removeRule = function(item) {
            // Alert.error('no method ...');
            // console.log(item);
            // return;

            ////////////////////
			Alert.confirm("确定删除？").then(function() {
				var opts = {};
				opts.url = '/crm/manage/engine/multiDelCombineRule';
				opts.method = 'POST';
				opts.data = [{'combineRuleId' :item.combineRuleId}]
				HttpService.linkHttp(opts).then(function(response) {
                    console.log(response);
                    if(response.status == "0") {
                        $scope.options.timeOut = '1800';
                        angular.extend(toastrConfig, $scope.options);
                        toastr['error'](response.message, '');
                    } else {
                        angular.extend(toastrConfig, $scope.options);
                        toastr[$scope.options.type]('删除成功!', '');
                    }
					// 执行查询
					$scope.searchBaseRule();
				});
			});

		};

		// 逻辑删除事件（多行删除）
		$scope.batchRemoveBaseRule = function() {
            Alert.error('施工中...');
            console.log($scope.checkedRow);
            return;
            ////////////////////
			if ($scope.count == 0) {
				Alert.error('请选择要删除的行！');
			} else {

				Alert.confirm("确定删除？").then(function() {
					var opts = {};
					opts.url = '/crm/manage/engine/multiDelBaseRule';
					opts.method = 'DELETE';
					opts.params = {};
					opts.data = $scope.checkedRow;
					HttpService.linkHttp(opts).then(function(response) {
						console.log("请求成功");
						console.log($scope.checkedRow);
						// 执行查询
						$scope.searchBaseRule();
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
				angular.forEach($scope.BaseRuleRowCollection, function(i) {
					i.checked = true;

					// 删除条件对象
					$scope.delObj = {
						'baseRuleId' : ''
					};
					$scope.delObj.baseRuleId = i.baseRuleId;

					$scope.checkedRow.push($scope.delObj);
				})
				$scope.select_all = true;
			} else {
				angular.forEach($scope.BaseRuleRowCollection, function(i) {
					i.checked = false;
					$scope.checkedRow = [];
				})
				$scope.select_all = false;
			}
			console.log($scope.checkedRow);
		};

		// 单个选中
		$scope.selectOne = function() {
            // Alert.error('施工中...');
            // return;
            ////////////////////
			angular.forEach($scope.BaseRuleRowCollection, function(i) {
				var index = $scope.checkedRow.indexOf(i);
				if (i.checked && index === -1) {

					// 删除条件对象
					$scope.delObj = {
                        'baseRuleId' : ''
					};
					$scope.delObj.baseRuleId = i.baseRuleId;

					$scope.checkedRow.push($scope.delObj);
				} else if (!i.checked && index !== -1) {
					$scope.checkedRow.splice(index, 1);
				}
			});

			if ($scope.BaseRuleRowCollection.length === $scope.checkedRow.length) {
				$scope.select_all = true;
			} else {
				$scope.select_all = false;
			}
			console.log($scope.checkedRow);
		}

	}

})();
