(function() {
    'use strict';

    angular.module('BlurAdmin.pages.mgrcenter.tagMgr').controller(
        'tagAddCtrl', tagAddCtrl);
    /** @ngInject */
    function tagAddCtrl($scope, $filter, $uibModal, $timeout, HttpService,
        toastr, EnumType, Alert,saveTag,strategyName,isUpd) {
        $scope.saveTag=saveTag||{};
        $scope.strategyName=strategyName||"";
        $scope.isUpd=isUpd||"";
		$scope.tagScope = EnumType.TagScope;
		$scope.recStat = EnumType.RecStat;


        $scope.saveTag.recStat = "正常";
        //初始化标签类型下拉列表
        $scope.tagTypeT = [];
        var optsForST = {};
        optsForST.url = '/crm/manage/tagmng/tagTypes';
        optsForST.method = 'GET';
        HttpService.linkHttp(optsForST).then(function(response) {
            angular.forEach(response.data, function(item) {
                $scope.tagTypeT.push({ label: item.tagTypeName, value: item.tagTypeId });

                if (item.tagTypeName == $scope.saveTag.tagTypeId || item.tagTypeId == $scope.saveTag.tagTypeId) {
                    $scope.saveTag.tagTypeId = "";
                    $scope.saveTag.tagTypeId = { label: item.tagTypeName, value: item.tagTypeId };
                    $scope.tagTypeChan();
                }

            })

            $scope.tagTypeId = $scope.tagTypeT;
        });



        $scope.showMenu = function() {
            // alert(1)
            var cityObj = $("#tagScopeVal");
            var cityOffset = $("#tagScopeVal").offset();

            $("#menuContent").css({ left: cityOffset.left - cityObj.outerWidth() - 12, top: cityOffset.top - cityObj.outerHeight() + 2 }).slideDown("fast");

            $("body").bind("mousedown", onBodyDown);
        }

        function hideMenu() {
            $("#menuContent").fadeOut("fast");
            $("body").unbind("mousedown", onBodyDown);
        }

        function onBodyDown(event) {
            if (!(event.target.id == "menuBtn" || event.target.id == "citySel" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length > 0)) {
                hideMenu();
            }
        }
        //初始化上级标签下拉列表
        $scope.tagT = [];
        /*var optsForTag = {};
        optsForTag.url = '/crm/manage/tagmng/tagDetials';
        optsForTag.method = 'GET';
        HttpService.linkHttp(optsForTag).then(function(response) {
            angular.forEach(response.data, function(item) {
                $scope.tagT.push({ label: item.tagName, value: item.tagId });

                if (item.tagName == $scope.saveTag.parentTagId || item.tagId == $scope.saveTag.parentTagId) {
                    $scope.saveTag.parentTagId = "";
                    $scope.saveTag.parentTagId = { label: item.tagName, value: item.tagId };
                }

            })

            $scope.parentTagId = $scope.tagT;
        });*/

        //标签状态
        //		$scope.recStatv = EnumType.RecStat.getEnumByValue($scope.saveTag.recStat);
        //		$scope.saveTag.recStat = $scope.recStatv;
        //		console.log($scope.saveTag.recStat);
        //		$scope.recStat = EnumType.RecStat;


        $scope.searchStar = function() {
            var opts = {};
            opts.url = '/crm/manage/engine/getAllStraByEntity';
            opts.method = 'GET';
            opts.params = $scope.searchObj;
            HttpService.linkHttp(opts).then(function(response) {

                $scope.StratRowCollection = response.data;

                angular.forEach(response.data, function(item) {
                    if (item.strategyId == $scope.strategyName) {

                        $scope.strategyName = item.strategyName;
                        $scope.searchObj.strategyName = item.strategyName;
                        $scope.saveTag.strategyId = item.strategyId;
                    }

                })

                $scope.total = response.data.length;
            });
        };

        $scope.searchStar();

        $scope.pareTagChan = function() {
            //	$scope.searchPare={};
            //	$scope.searchPare.parentTagId = $scope.saveTag.parentTagId.value;
            var opts = {};
            opts.url = '/crm/manage/tagmng/tagDetail';
            opts.method = 'GET';
            opts.params = { "tagId": $scope.saveTag.parentTagId.value };
            HttpService.linkHttp(opts).then(function(response) {
                angular.forEach($scope.tagTypeT, function(item) {

                    if (item.label == response.data.tagTypeId || item.value == response.data.tagTypeId) {
                        //				$scope.saveTag.tagTypeId = {};
                        $scope.saveTag.tagTypeId = item;
                    }

                })

            });

        }


        $scope.tagTypeChan = function() {
            $scope.searchType = {};
            $scope.searchType.tagTypeId = $scope.saveTag.tagTypeId.value;
            var opts = {};
            opts.url = '/crm/manage/tagmng/tagDetials';
            opts.method = 'GET';
            opts.params = $scope.searchType;
            opts.params.sys={
                pageSize:50,
                pageNum:1
            }
            HttpService.linkHttp(opts).then(function(response) {
                $scope.tagT = [];
                angular.forEach(response.data.list, function(item) {
                    $scope.tagT.push({ label: item.tagName, value: item.tagId });

                    //			if( item.tagName == $scope.saveTag.parentTagId  ||  item.tagId == $scope.saveTag.parentTagId ){
                    //				$scope.saveTag.parentTagId = "";
                    //				$scope.saveTag.parentTagId = { label : item.tagName, value : item.tagId };
                    //			}

                })
                if($scope.saveTag.parentTagId==null){
                    $scope.saveTag.parentTagId = { label: "请选择...", value: "" };
                }
                $scope.parentTagId = $scope.tagT;
            });

        }

        $scope.saveValue = function() {

            /*if (!isValid) {
            	return;
            }*/
            if (!$scope.saveTag.tagName) {
            	Alert.error('请填写标签名称')
            	return
            }
            if (!$scope.saveTag.tagTypeId) {
            	Alert.error('请填写标签类别')
            	return
            }
            if ($scope.saveTag.tagTypeId) {
                $scope.v = $scope.saveTag.tagTypeId.value;
                $scope.saveTag.tagTypeId = "";
                $scope.saveTag.tagTypeId = $scope.v;
            }
            if ($scope.saveTag.parentTagId) {
                $scope.v2 = $scope.saveTag.parentTagId.value;
                $scope.saveTag.parentTagId = "";
                $scope.saveTag.parentTagId = $scope.v2;
            }
            // if ($scope.saveTag.recStat) {
            //     $scope.v3 = $scope.saveTag.recStat.value;
            //     $scope.saveTag.recStat = "";
            //     $scope.saveTag.recStat = $scope.v3;
            // }
            if ($scope.saveTag.tagScope) {
                $scope.v4 = $scope.saveTag.tagScope.value;
                $scope.saveTag.tagScope = "";
                $scope.saveTag.tagScope = $scope.v4;
            }


            if ($scope.isUpd == "true") {


                var opts = {};
                opts.url = '/crm/manage/tagmng/tagDetial';
                opts.method = 'PUT';
                opts.params = $scope.saveTag;
                opts.params.recStat = '0'
                HttpService.linkHttp(opts).then(function(response) {
                    $scope.saveTag = {};
                    // 执行查询
                   /* $scope.searchTag();
                    $scope.refresh();*/
                    $scope.$dismiss();
                });

            } else {
                var opts = {};
                opts.url = '/crm/manage/tagmng/tagDetial';
                opts.method = 'POST';
                opts.params = $scope.saveTag;
                HttpService.linkHttp(opts).then(function(response) {
                    toastr.success('提交完成!');
                    $scope.saveTag = {};
                    /*$scope.searchTag();
                    $scope.refresh();*/
                    $scope.$dismiss();
                });

            }

        }

        // $scope.closePage = function() {
        //     $scope.$parent.$dismiss();
        // }



    }

})();