(function () {
    'use strict';

    angular.module('BlurAdmin.pages.interactmarket').controller('blacklistCtrl',
        blacklistCtrl);

    /** @ngInject */
    function blacklistCtrl($scope, $uibModal, $filter, $timeout, $http,
                           HttpService, EnumType, Alert, $rootScope,$state) {
        $scope.smartTablePageSize = 5;
        $scope.impsmartTabPgSize = 5
        
        // HttpService.linkHttp({
        // 	url : 'crm/ecif/cust/blackperCustList',
        // 	method : 'GET',
        // }).then(
        // 		function(response) {
        // 			$scope.custCollection = response.data.map(function(item) {
        // 				item.custTyp = EnumType.CustType
        // 						.getLabelByValue(item.custTyp);
        // 				item.custSource = EnumType.DataSource
        // 						.getLabelByValue(item.custSource);
        // 				item.certTyp = EnumType.IdType
        // 						.getLabelByValue(item.certTyp);
        // 				return item;
        // 			});
        // 			$scope.total = response.data.length;
        // 		});

        $scope.canBlacklist = function (custNo, custName, phoneNumber) {
            if(this.queryPage && !$scope.queryPage){
                $scope.queryPage=this.queryPage;
            }
            $scope.custNo = custNo;
            $scope.custName = custName;
            $scope.phoneNumber = phoneNumber;

            var modalInstance = $uibModal
                .open({
                    animation: true,
                    templateUrl: 'app/pages/customer/blacklist/canBlacklist/canBlacklist.html',
                    size: 'midle-900',
                    controller: 'canBlacklistCtrl',
                    scope: $scope,
                    resolve: {
                        'custNo': function () {
                            return custNo;
                        }
                    }
                });
            modalInstance.result.then(function () {
                $scope.search();
                $scope.searchUser_black();
            });

        };

        // 查询条件对象
        $scope.searchObj = {
            'custNo': '',
            'custName': '',
            'custTagCd': ''
        };
        // 查询事件
        $scope.searchUser = function () {
            var opts = {};
            opts.url = 'crm/ecif/cust/blackperCustList';
            opts.method = 'GET';
            opts.params = $scope.searchObj;
            HttpService.linkHttp(opts).then(
                function (response) {
                    $scope.custCollection = response.data.list;
                    $scope.custCollection = response.data.list
                        .map(function (item) {
                            item.custTyp = EnumType.CustType
                                .getLabelByValue(item.custTyp);
                            item.custSource = EnumType.DataSource
                                .getLabelByValue(item.custSource);
                            item.certTyp = EnumType.IdType
                                .getLabelByValue(item.certTyp);
                            item.regiDate=item.regiDate.substr(0,4)+'-'+item.regiDate.substr(4,2)+'-'+item.regiDate.substr(6,2)
                            return item;
                        });
                });
        }

        $scope.addnewBlacklist = function (custNo) {
            if($scope.checkedRow.length==0){
                return Alert.error("请至少选择1个客户！");
            }
            if(this.queryPage && !$scope.queryPage){
                $scope.queryPage=this.queryPage;
            }
            var modalInstance = $uibModal
                .open({
                    animation: true,
                    templateUrl: 'app/pages/customer/blacklist/setBlacklist/setBlacklist.html',
                    controller: 'blackListCtrl',
                    size: 'midle-600',
                    backdrop: 'static',
                    scope: $scope,
                    resolve: {
                        'custNo': function () {/*
													 * return custNo;
													 */
                        }
                    }
                });
            modalInstance.result.then(function () {
                $scope.search();
            });

        };

        // ============================导入记录设置======================
        $scope.ShowImportSts = function (item) {
            var typeLabel = "";
            angular.forEach(EnumType.importSts, function (i) {
                if (item.importSts == i.value) {
                    typeLabel = i.label;
                }
            });
            return typeLabel;
        };
        $scope.ShowImportObjType = function (item) {
            var typeLabel = "";
            angular.forEach(EnumType.ImportObjType, function (i) {
                if (item.importObjTyp == i.value) {
                    typeLabel = i.label;
                }
            });
            return typeLabel;
        };
        // 下载产品导入模板
        // 选择文件
        // 上传文件
        $scope.uploadFiles = function (file, errFiles) {
            if(this.queryPage && !$scope.queryPage){
                $scope.queryPage=this.queryPage;
            }
            if (!file) {
                return;
            }
            var fd = new FormData();
            fd.append('file', file);
            fd.append('fileName',file.name);
            HttpService.linkHttp({
                url: '/crm/ecif/blacklist/upload',
                method: 'POST',
                headers: {
                    'Content-Type': undefined
                },
                data: fd
            }).then(function (response) {
                $scope.search();
            });
        }
        $scope.search = function (page) {

            // $scope[$scope.pageFlag].pageSize = $scope.pagination.pageSize;
            // $scope[$scope.pageFlag].pageIndex = $scope.pagination.pageIndex;
            var page = page || '1';
            $scope[$scope.pageFlag].params = $scope.searchObj;
            $scope[$scope.pageFlag].params.importObjTyp=3;
            $scope.queryList[$scope.pageFlag](page)
            // this.queryPage(page)
            $scope.checkedRow = [];
        }

        // 物理删除事件（单行删除）
        $scope.delPrdLog = function (item) {
            Alert.confirm("确定删除？").then(function () {
                var opts = {};
                opts.url = '/crm/ecif/backlist/deleteLog';
                opts.method = 'DELETE';
                opts.params = {
                    importCd: item.importCd
                };
                HttpService.linkHttp(opts).then(function (response) {
                    // 执行查询
                    $scope.search();
                });
            });
        };

        $scope.download = function (item) {
/*
            var importCd = item.importCd;
            var fileNam = item.fileNam;
            window.location.href = 'http://'+location.hostname+':8080/crm/ecif/blacklist/accountFile?importCd='+importCd+'&fileNam='+fileNam;
*/

            var turnForm = document.createElement("form");
            //一定要加入到body中！！
            document.getElementById("export").appendChild(turnForm);
            turnForm.method = 'post';
            turnForm.action =  '/crm/ecif/blacklist/accountFile';
            turnForm.enctype='multipart/form-data';
            var str = " <input id='importCd' name='importCd'  ng-hide='true'></input>" +
                "<input id='fileNam' name='fileNam'  ng-hide='true'></input>";
            turnForm.target = "newPage";
            $(turnForm).html(str);
            document.getElementById("importCd").value=item.importCd;
            document.getElementById("fileNam").value=item.fileNam;
            turnForm.submit();
            turnForm.remove();
            // $http({
            //     method: "GET",
            //     url: "/crm/ecif/blacklist/accountFile",
            //     params: {
            //         importCd: item.importCd,
            //         fileNam: item.fileNam
            //     },
            //     responseType: "blob" // 注意此参数
            // })
            //     .success(
            //         function (response) {
            //             var blob = new Blob(
            //                 [response],
            //                 {
            //                     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            //                 });

            //             var fileName = item.fileNam;
            //             var a = document.createElement("a");
            //             document.body.appendChild(a);
            //             a.download = fileName;
            //             a.href = URL.createObjectURL(blob);
            //             a.click();

            //         });
        }
        $scope.downloadErr = function (item) {
            var turnForm = document.createElement("form");
            //一定要加入到body中！！
            document.getElementById("export").appendChild(turnForm);
            turnForm.method = 'post';
            turnForm.action =  '/crm/ecif/blacklist/accountFile';
            turnForm.enctype='multipart/form-data';
            var str = " <input id='importCd' name='importCd'  ng-hide='true'></input>" +
                "<input id='importDetsSts' name='importDetsSts'  ng-hide='true'></input>" +
                "<input id='fileNam' name='fileNam'  ng-hide='true'></input>";
            turnForm.target = "newPage";
            $(turnForm).html(str);
            document.getElementById("importCd").value=item.importCd;
            document.getElementById("importDetsSts").value="0";
            document.getElementById("fileNam").value=item.fileNam;
            turnForm.submit();
            turnForm.remove();

            /*$http({
                method: "GET",
                url: "/crm/ecif/blacklist/accountFile",
                params: {
                    importCd: item.importCd,
                    importDetsSts: '0',
                    fileNam: item.fileNam,
                },
                responseType: "blob" // 注意此参数
            })
                .success(
                    function (response) {
                        var blob = new Blob(
                            [response],
                            {
                                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            });
                        var fileName = item.fileNam;
                        var a = document.createElement("a");
                        document.body.appendChild(a);
                        a.download = fileName;
                        a.href = URL.createObjectURL(blob);
                        a.click();

                    });*/
        }

        // --------------------------------------------黑名单
        // $scope.smartTablePageSize = 5;
        $scope.blacklistDts = {};
        // $scope.blacklistDts.custNo = "";
        $scope.blacklistDts.reason = "";
        // $scope.blacklistDts.blacklistSts = "0";
        // $scope.blacklistDts.blacklistType = "";
        // $scope.blacklistTypes = EnumType.BlacklistType;
        // HttpService.linkHttp({
        // 	url : 'crm/ecif/cust/NotBlackperCustList',
        // 	method : 'GET',
        // }).then(
        // 		function(response) {
        // 			$scope.custCollection_ = response.data.map(function(item_) {
        // 				item_.custTyp = EnumType.CustType
        // 						.getLabelByValue(item_.custTyp);
        // 				item_.custSource = EnumType.DataSource
        // 						.getLabelByValue(item_.custSource);
        // 				item_.certTyp = EnumType.IdType
        // 						.getLabelByValue(item_.certTyp);
        // 				// console.log(item_);
        // 				return item_;
        // 			});
        // 			$scope.total_ = response.data.length;
        // 			// console.log($scope.total_);
        // 		});
        // 黑名单查询事件
        $rootScope.searchObj = $scope.searchObj;
        $scope.searchUser_black = function () {
            var opts = {};
            opts.url = 'crm/ecif/cust/NotBlackperCustList';
            opts.method = 'GET';
            opts.params = $scope.searchObj;
            HttpService.linkHttp(opts).then(function (response) {
                $scope.custCollection_ = response.data.list;
                $scope.custCollection_ = response.data.list.map(function (item_) {
                    return item_;
                });
                $scope.total_ = response.data.length;
            });
        }

        // 选择操作
        $scope.link = 'abc';
        $scope.ok = function () {
            $uibModalInstance.close($scope.sendTemDts);
            /*
             * if($scope.radioRptOptions.select ==""){ Alert.error('请选择模板！');
             * return ; } $uibModalInstance.close($scope.sendTemDts);
             */
        };
        $scope.checkedRow = [];
        // 单个选中
        $scope.selectOne = function () {
            $scope.checkedRow = []
            angular.forEach($scope.custCollection_, function (i) {
                var index = $scope.checkedRow.indexOf(i);
                if (i.checked) {
                    $scope.delObj = {
                        'custNo': '',
                        'custName': '',
                        'regiReason': ''
                    };
                    $scope.delObj.custNo = i.custNo;
                    $scope.delObj.custName = i.custName;
                    $scope.delObj.regiReason = $scope.blacklistDts.reason;
                    $scope.checkedRow.push($scope.delObj);
                }
            });
            if ($scope.custCollection_.length === $scope.checkedRow.length) {
                $scope.select_all = true;
            } else {
                $scope.select_all = false;
            }
            $rootScope.checkedRow = $scope.checkedRow;
        }
        // 多选
        $scope.selectAll = function (e) {

            if (e) {
                $scope.checkedRow = [];
                var count = 0;
                angular.forEach($scope.custCollection_, function (i) {
                    i.checked = true;

                    // 条件对象
                    $scope.delObj = {
                        'custNo': '',
                        'custName': '',
                        'regiReason': '',
                        'blacklistType': ''

                    };
                    $scope.delObj.custNo = i.custNo;
                    $scope.delObj.regiReason = $scope.blacklistDts.reason;

                    $scope.checkedRow.push($scope.delObj);
                })
                $scope.select_all = true;
            } else {
                angular.forEach($scope.custCollection_, function (i) {
                    i.checked = false;
                    $scope.checkedRow = [];
                })
                $scope.select_all = false;
            }
            $rootScope.checkedRow=$scope.checkedRow;
            // console.log($scope.checkedRow);
        };
        $scope.changeFlag = function (pageFlag) {
            $scope.pageFlag = pageFlag;
            // $scope.pagination.pageSize = $scope[$scope.pageFlag].pageSize || '10';
            // $scope.pagination.totalItems = $scope[$scope.pageFlag].totalItems;
            // $scope.pagination.pageIndex = $scope[$scope.pageFlag].pageIndex || '1';
            $scope.searchObj = {};
        }
        $scope.openDetail = function (custNo) {
            $state.go('portrayal.perCusPortrayal',{'custNo':custNo});
        }
        var init = function () {
            $scope.queryList = []
            $scope.$on('queryPage',function(event,queryPage){
                var optsType=event.targetScope.optsType
                $scope.queryList[optsType]=queryPage;
            });
            $scope.pageFlag = 'queryProductOptions'
            
            // 默认查询所有黑名单客户
            $scope.queryCustOptions = {};
            $scope.queryCustOptions.pagination = {
                pageSize: '10',
                pageIndex: 1,
                maxText: 5
            }
            $scope.queryCustOptions.url = 'crm/ecif/cust/blackperCustList';
            $scope.queryCustOptions.method = "GET";
            $scope.queryCustOptions.params = $scope.searchObj;
            $scope.queryCustOptions.success = function successCallback(response) {
                if (response.status === '1') {
                    $scope.custCollection = response.data.list.map(function (item) {
                        item.custTyp = EnumType.CustType
                            .getLabelByValue(item.custTyp);
                        item.custSource = EnumType.DataSource
                            .getLabelByValue(item.custSource);
                        item.certTyp = EnumType.IdType
                            .getLabelByValue(item.certTyp);
                        item.regiDate=item.regiDate.substr(0,4)+'-'+item.regiDate.substr(4,2)+'-'+item.regiDate.substr(6,2)
                        return item;
                    });
                    $scope.queryCustOptions.totalItems = response.data.total;
                } else {
                    Alert.error(response.message)
                }

            }

            // 查询导入日志
            $scope.rowCollection = [];
            $scope.queryProductOptions = {};
            $scope.queryProductOptions.pagination = {
                pageSize: '10',
                pageIndex: 1,
                maxText: 5
            }
            $scope.queryProductOptions.url = '/crm/ecif/backlist/importLogByEntity';
            $scope.queryProductOptions.method = 'GET';
            $scope.queryProductOptions.params = {
                "importObjTyp": "3"
            };
            $scope.queryProductOptions.success = function successCallback(response) {
                if (response.status === '1') {
                    $scope.rowCollection = response.data.list;
                    //$scope.time = $scope.rowCollection[0].importTime;
                   // $scope.queryProductOptions.totalItems = response.data.total;
                } else {
                    Alert.error(response.message)
                }
            };

            //登记黑名单
            $scope.regBlackList = {};
            $scope.regBlackList.pagination = {
                pageSize: '10',
                pageIndex: 1,
                maxText: 5
            }
            $scope.regBlackList.url = 'crm/ecif/cust/NotBlackperCustList';
            $scope.regBlackList.method = 'GET';
            $scope.regBlackList.params = $scope.searchObj;
            $scope.regBlackList.success = function successCallback(response) {
                if (response.status === '1') {
                	if (!!!$scope.custCollection_) {
        				$scope.changeFlag('queryCustOptions')
                	}
                    $scope.custCollection_ = response.data.list.map(function (item_) {
                        item_.custTyp = EnumType.CustType
                            .getLabelByValue(item_.custTyp);
                        item_.custSource = EnumType.DataSource
                            .getLabelByValue(item_.custSource);
                        item_.certTyp = EnumType.IdType
                            .getLabelByValue(item_.certTyp);

                        return item_;
                    });
                } else {
                    Alert.error(response.message)
                }

            }
        }
        init()

    }

})();
