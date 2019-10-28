(function() {
    'use strict';

    angular.module('BlurAdmin.pages.customer.custImportAndDistribute').controller('custImportAndDistributeCtrl', custImportAndDistributeCtrl);
    /** @ngInject */
    function custImportAndDistributeCtrl($scope, $uibModal, $filter, $timeout, $http, HttpService, EnumType, Alert , $rootScope) {
        $scope.smartTablePageSize2 = 10;
        $scope.impsmartTabPgSize = 10;

        // 查询条件对象1
        $scope.searchObj1 = {
            'custName' : '',
            'custAgent' : ''
        };
        // 查询条件对象1
        $scope.searchObj2 = {
            'custName' : '',
            'custAgent' : 'hhhh'
        };
        
     // 查询事件-待分配
        $scope.search1 = function() {
                var opts = {};
                opts.url = '/crm/ecif/cust/getPerCustListByName';
                opts.method = 'GET';
                opts.params = $scope.searchObj1;
                //opts.data =custAgentList;
                HttpService.linkHttp(opts).then(function(response) {
                    $scope.rowCollection1 = response.data;
                    $scope.rowCollection1 = response.data.map(function (item) {
                    	item.custTyp = EnumType.CustType.getLabelByValue(item.custTyp);
                    	item.custSource = EnumType.DataSource.getLabelByValue(item.custSource);
                    	item.certTyp = EnumType.IdType.getLabelByValue(item.certTyp);
                    	item.retentionReason = EnumType.dealAction.getLabelByValue(item.retentionReason);                    	
                        return item;
                    });
                    $scope.total = response.data.length;
                });
        	}
        // 查询事件-已分配
        $scope.search2 = function() {       	
                var opts = {};
                opts.url = '/crm/ecif/cust/getPerCustListByName';
                opts.method = 'GET';
                opts.params = $scope.searchObj2;
                //opts.data =custAgentList;
                HttpService.linkHttp(opts).then(function(response) {
                    $scope.custCollection_ = response.data;
                    $scope.custCollection_ = response.data.map(function (item_) {
                       item_.custTyp = EnumType.CustType.getLabelByValue(item_.custTyp);
                        item_.custSource = EnumType.DataSource.getLabelByValue(item_.custSource);
                        item_.certTyp = EnumType.IdType.getLabelByValue(item_.certTyp);
                        item_.sex = EnumType.Sex.getLabelByValue(item_.sex);
                        return item_;
                    });
                    $scope.total_ = response.data.length;
                });

        }
        $scope.search2();
        $scope.search1();
     // 客户分配(待分配客户)
		$scope.addUser = function(index) {
			$scope.typeaaa=index;
			if ($scope.typeaaa==1 && $scope.checkedRow.length==0){
				Alert.error('请选择客户！');
				return;
			}else if($scope.typeaaa == 2 &&$scope.checkedRow2.length==0){
				Alert.error('请选择客户！');
				return ;
			}

			$uibModal
				.open({
					animation : true,
					backdrop : 'static',
					templateUrl : 'app/pages/customer/custImportAndDistribute/distribute/distribute.html',
					size : 'midle-900',
					controller : 'distributeCtrl',
					scope : $scope,
					resolve : {

					}
				});
		}
		
		
		// 客户分配(已分配客户)
		$scope.addUser_ = function(index) {
			$scope.typeaaa=index;
			if ($scope.typeaaa==1 && $scope.checkedRow.length==0){
				Alert.error('请选择客户！');
				return;
			}else if($scope.typeaaa == 2 &&$scope.checkedRow2.length==0){
				Alert.error('请选择客户！');
				return ;
			}

			$uibModal
				.open({
					animation : true,
					backdrop : 'static',
					templateUrl : 'app/pages/customer/custImportAndDistribute/distribute_cause/distribute_cause.html',
					size : 'midle-600',
					controller : 'distributeCtrl',
					scope : $scope,
					resolve : {

					}
				});
		}
        //============================导入记录设置======================
        $scope.ShowImportSts = function(item) {
            var typeLabel="";
            angular.forEach(EnumType.importSts, function(i) {
                if (item.importSts == i.value) {
                    typeLabel=i.label;
                }
            });
            return typeLabel;
        };
        $scope.ShowImportObjType = function(item) {
            var typeLabel="";
            angular.forEach(EnumType.ImportObjType, function(i) {
                if (item.importObjTyp == i.value) {
                    typeLabel=i.label;
                }
            });
            return typeLabel;
        };
        // 下载产品导入模板
        // 选择文件
        // 上传文件
        $scope.uploadFiles = function (file, errFiles) {
            if(!file){
                return;
            }
            var fd = new FormData();
            fd.append('file', file);

            HttpService.linkHttp({
                url: '/crm/ecif/cust/upload',
                method: 'POST',
                headers: {'Content-Type': undefined},
                data: fd
            }).then(function (response) {
                //$scope.myImg = response.data;
                $scope.search();
            });
        }
        $scope.search = function(page) {
            $scope.queryProductOptions.url = '/crm/ecif/productmng/importLogByEntity';
            $scope.queryProductOptions.method = 'GET';
            $scope.queryProductOptions.params = {"importObjTyp" : "0"};//个人客户

            this.queryPage(page);
        }
        // 查询导入日志
        $scope.smartTablePageSize = 4;
        $scope.rowCollection = [];
        $scope.queryProductOptions = {};
        $scope.queryProductOptions.pagination = {
            pageSize:'10',
            pageIndex:1,
            maxText:5
        }
        $scope.queryProductOptions.url = '/crm/ecif/productmng/importLogByEntity';
        $scope.queryProductOptions.method = 'GET';
        $scope.queryProductOptions.params = {"importObjTyp" : "0"};
        $scope.queryProductOptions.success = function successCallback(response) {
            $scope.rowCollection = response.data;
        };

        // 物理删除事件（单行删除）
        $scope.delPrdLog = function(item) {
            Alert.confirm("确定删除？").then(function() {
                var opts = {};
                opts.url = '/crm/ecif/productmng/deleteLog';
                opts.method = 'DELETE';
                opts.params = {
                    importCd:item.importCd
                };
                HttpService.linkHttp(opts).then(function(response) {
                    // 执行查询
                    $scope.search();
                });
            });
        };

        $scope.download = function (item) {

            $http({
                method : "GET",
                url : "/crm/ecif/cust/accountFile",
                params:{
                    importCd : item.importCd,
                    fileNam : item.fileNam},
                responseType: "blob"   //注意此参数

            }).success(function(response){
                var blob = new Blob([response], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});

                var fileName = item.fileNam;
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.download = fileName;
                a.href = URL.createObjectURL(blob);
                a.click();

            });
        }
        $scope.downloadErr = function (item) {

            $http({
                method : "GET",
                url : "/crm/ecif/cust/accountFile",
                params:{
                    importCd : item.importCd,
                    importDetsSts : '0',
                    fileNam : item.fileNam,
                },
                responseType: "blob"   //注意此参数
            }).success(function(response){
                var blob = new Blob([response], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                var fileName = item.fileNam;
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.download = fileName;
                a.href = URL.createObjectURL(blob);
                a.click();

            });
        }
        
  
        
     
      //选择操作

        $scope.checkedRow2 = [];
        $scope.checkedRow = [];
        // 单个选中
        $scope.selectOne2 = function() {
            angular.forEach($scope.custCollection_, function (i) {
                var index = $scope.checkedRow2.indexOf(i);
                if (i.checked && index === -1) {

                    // 条件对象
                    $scope.delObj = {
                        'custNo' : '',
                    };
                    $scope.delObj.custNo = i.custNo;
                    $scope.checkedRow2.push($scope.delObj);
                } else if (!i.checked && index !== -1) {
                    $scope.checkedRow2.splice(index, 1);
                }
            });

            if ($scope.custCollection_.length === $scope.checkedRow2.length) {
                $scope.select_all2 = true;
            } else {
                $scope.select_all2 = false;
            }
            $rootScope.checkedRow = $scope.checkedRow2;
        }
        //多选
        $scope.selectAll2 = function(e) {
        	
            if (e) {
                $scope.checkedRow2 = [];
                var count = 0;
                angular.forEach($scope.custCollection_, function(i) {
                    i.checked = true;

                    // 条件对象
                    $scope.delObj = {
                        'custNo' : '',
                    };
                    $scope.delObj.custNo = i.custNo;
                    $scope.checkedRow2.push($scope.delObj);
                })
                $scope.select_all2 = true;
            } else {
                angular.forEach($scope.custCollection_, function(i) {
                    i.checked = false;
                    $scope.checkedRow2 = [];
                })
                $scope.select_all2 = false;
            }
            //console.log($scope.checkedRow2);
        };
        
        
        // 单个选中
        $scope.selectOne1 = function() {
            angular.forEach($scope.rowCollection1, function (i) {
                var index = $scope.checkedRow.indexOf(i);
                if (i.checked && index === -1) {

                    // 条件对象
                    $scope.delObj = {
                        'custNo' : '',
                    };
                    $scope.delObj.custNo = i.custNo;
                    $scope.checkedRow.push($scope.delObj);
                } else if (!i.checked && index !== -1) {
                    $scope.checkedRow.splice(index, 1);
                }
            });

            if ($scope.rowCollection1.length === $scope.checkedRow.length) {
                $scope.select_all = true;
            } else {
                $scope.select_all = false;
            }
            $rootScope.checkedRow = $scope.checkedRow;
        }
 
        
        //多选
        $scope.selectAll1 = function(e) {
        	
            if (e) {
                $scope.checkedRow = [];
                var count = 0;
                angular.forEach($scope.rowCollection1, function(i) {
                    i.checked = true;

                    // 条件对象
                    $scope.delObj = {
                        'custNo' : '',
                    };
                    $scope.delObj.custNo = i.custNo;
                    $scope.checkedRow.push($scope.delObj);
                })
                $scope.select_all = true;
            } else {
                angular.forEach($scope.rowCollection1, function(i) {
                    i.checked = false;
                    $scope.checkedRow = [];
                })
                $scope.select_all = false;
            }
        };

        }
       

    
    
})();
