(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.engineManage.strategy').controller(
			'strategyCtrl', strategyCtrl);
	/** @ngInject */
	function strategyCtrl($scope,$state, toastr, toastrConfig, $uibModal, $filter, $timeout, $http,
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

		// 用户状态下拉框显示
		$scope.ShowUserStat = function(item) {
			var userStatLabel="";
			angular.forEach(EnumType.UserStat, function(i) {
				if (item.userStat === i.value) {
					userStatLabel=i.label;
				}
			});

			return userStatLabel;
		};

        $scope.runningStatus = { value: {id: '-1', name: '状态' }};
        $scope.itemArray = [
            {id: '-1', name: '全部'},
            {id: '0', name: '启用' },
            {id: '1', name: '未启用' }];


		// 查看规则
		// $scope.viewRule = function(item) {
         //    Alert.error('施工中...');
         //    return;
         //    ////////////////////
		// 	$scope.userInfo = item;
		// 	$uibModal
		// 			.open({
		// 				animation : true,
		// 				backdrop : 'static',
		// 				templateUrl : 'app/pages/mgrcenter/usermanagement/popupPages/roleAuth.html',
		// 				size : 'lg',
		// 				controller : 'roleAuthCtrl',
		// 				scope : $scope,
		// 				resolve : {
        //
		// 				}
		// 			});
		// }

		// 查询事件
		$scope.searchBaseRule = function() {

			var opts = {};
			opts.url = '/crm/manage/engine/getAllStraByEntity';
			opts.method = 'GET';
			if($scope.runningStatus.value.id == '-1') {
                delete $scope.searchObj.runningStatus ;
            } else {
                $scope.searchObj.runningStatus = $scope.runningStatus.value.id
            }

			opts.params = $scope.searchObj;
			HttpService.linkHttp(opts).then(function(response) {
                console.log("请求成功");
                console.log(response.data);
                $scope.BaseRuleRowCollection = []
                response.data.forEach(function (value) {
                    if (value.runningStatus == 0){
                        value.runningStatus = '启用'
					} else {
                        value.runningStatus = '未启用'
					}

                    // if (value.strategyAction  == 'RMT0004'){
                    //     value.strategyAction = '联网核查'
                    // } else if (value.strategyAction  == 'RMT0002'){
                    //     value.strategyAction = '电话核实'
                    // }

                    // if (value.postAction  == '01'){
                    //     value.postAction = '设备进高可疑名单'
                    // } else if (value.postAction  == '02'){
                    //     value.postAction = '设备进低可疑名单'
                    // }


                    // value.isUsed = EnumType.IsUsed.getLabelByValue(value.isUsed);
                    $scope.BaseRuleRowCollection.push(value);
                });
			});
		}

        // $scope.strategyAction = [
        //     {label: '电话核实', value: "RMT0002"},
        //     {label: '联网核查', value: "RMT0004"}
        // ];
        // $scope.postAction = [
        //     {label: '设备进高可疑名单', value: "01"},
        //     {label: '设备进低可疑名单', value: "02"}
        // ];
        // $scope.warnLevel = [
        //     {label: '低', value: "1"},
        //     {label: '中', value: "2"},
        //     {label: '高', value: "3"}
        // ];
        // $scope.fireTime = [
        //     {label: 'T+0', value: "0"},
        //     {label: 'T+1', value: "1"}
        // ];


		// 页面初始化查询
		$scope.searchBaseRule();

		// 新增事件
		$scope.addBaseRule = function() {
            // Alert.error('施工中...');
            // return;
            ////////////////////

            $state.go('mgrcenter.addStrategy',{});
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

        $scope.viewRule = function(item) {
            // Alert.error('施工中...');
            // return;
            // console.log(item);

            $state.go('mgrcenter.viewStrategy', {
                'strategy': item
            });

            // var opts = {};
            // opts.url = '/crm/manage/engine/getBaseRuleToDetail';
            // opts.method = 'GET';
            // opts.params = {'baseRuleId':item.baseRuleId};
            // HttpService.linkHttp(opts).then(function(response) {
            //     $state.go('mgrcenter.modifyBaserule', {
            //         'baseRule': response.data.baseRule,
            //         'baseFactorRels': response.data.baseFactorRels,
            //         'isUsed': response.data.isUsed
            //     });
            // });

        };

		// 修改事件
		$scope.updRule = function(item) {
            var opts = {};
            opts.url = '/crm/manage/engine/getStrategyToUpdate';
            opts.method = 'GET';
            opts.params = {'strategyId':item.strategyId};
            HttpService.linkHttp(opts).then(function(response) {
                console.log(response.data);
                $state.go('mgrcenter.modifyStrategy', {
                    'strategy': response.data.strategy,
                    'strategyCombineRels': response.data.strategyCombineRels
                });
            });

		}

		// 逻辑删除事件（单行删除）
		$scope.removeRule = function(item) {
            // Alert.error('施工中...');
            // console.log(item);
            // return;

            ////////////////////
			Alert.confirm("确定删除？").then(function() {
				var opts = {};
				opts.url = '/crm/manage/engine/delStra';
				opts.method = 'DELETE';
				opts.params = item
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
					opts.url = '/crm/manage/engine/delBaseRule';
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
