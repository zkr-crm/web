(function () {
    'use strict';

    angular.module('BlurAdmin.pages.mgrcenter.tagMgr').controller(
        'tagMgrCtrl', tagMgrCtrl);

    /** @ngInject */
    function tagMgrCtrl($scope, $uibModal, $filter, $timeout, $http, HttpService, EnumType, Alert, toastr) {

        $scope.typeState = {};
        $scope.defaultTypes = []
        $scope.typeState.modDis = true;
        $scope.typeState.delDis = true;
        // $scope.isJsTreeShow = true;
        //初始化标签类型下拉列表
        $scope.tagTypeT = [];
        $scope.tagTreeData = getDefaultData();
        setTimeout(function(){
            $scope.basicConfig.version++;
        },400)
        $scope.basicConfig = {
            core: {
                multiple: false,
                check_callback: true,
                worker: false
            },
            'types': {
                'folder': {
                    'icon': 'ion-folder'
                },
                'tag': {
                    'icon': 'ion-document-text'
                },
                'tagType': {
                    'icon': 'ion-folder'
                },
                'default': {
                    'icon': 'ion-document-text'
                }
            },
            'plugins': ['types'],
            'version': 1
        };
        // 获取标签使用范围label
        $scope.getTagScopeLabel = function (value) {
            return EnumType.TagScope.getLabelByValue(value);
        }

        //初始化上级标签下拉列表
        $scope.tagT = [];

        $scope.treeObj = {};

        $scope.applyModelChanges = function () {
            return true;
        };

        $scope.refresh = function () {
            $scope.tagTreeData = getDefaultData();
            setTimeout(function(){
                $scope.basicConfig.version++;
            },250)
        };

       

        $scope.searchObj = {
            "tagTypeId": "",
            "tagName": "",
            "parentTagId": ""

        };
       
        // *****************************类别加载********************************
        function getDefaultData() {
            // $scope.isJsTreeShow = false;
            //modify by linbangbo begin 20190903 物理地址变更导致树结构无法自动更新
            $scope.defaultTypes.splice(0, $scope.defaultTypes.length)
            //modify by linbangbo end 20190903 物理地址变更导致树结构无法自动更新
            var opts = {};
            opts.url = '/crm/manage/tagmng/tagTypes';
            opts.method = 'GET';
            HttpService.linkHttp(opts).then(function (response) {
                var typeList = response.data;
                angular.forEach(typeList, function (type) {
                    $scope.defaultTypes.push({
                        "id": type.tagTypeId,
                        "parent": (type.superTagTypeId == undefined || type.superTagTypeId == "") ? "#" : type.superTagTypeId,
                        "type": "tagType",
                        "text": type.tagTypeName,
                        "state": {
                            "opened": false
                        }
                    });
                    $scope.tagTypeT.push({label: type.tagTypeName, value: type.tagTypeId});
                })
                $scope.tagTypeId = $scope.tagTypeT;
                $scope.searchObj.tagTypeId = {label: "标签类别", value: ""};
            });
            return $scope.defaultTypes;
        }

        $scope.smartTablePageSize = 10;
        $scope.selectedCopy = ''
        $scope.detShow = function () {
            $scope.treeObj = this.basicTree.jstree(true);
            var nodeData = this.basicTree.jstree(true)._model.data;
            var selected = this.basicTree.jstree(true).get_selected()[0];
            if (selected == $scope.selectedCopy) {return}
            $scope.selectedCopy = angular.copy(selected);
            $scope.TagRowCollection = [];
            $scope.total = 0;
            var tagType = nodeData[selected]?nodeData[selected].type:'';
            if (tagType == "tag") {
                $scope.typeState.modDis = true;
                $scope.typeState.delDis = true;
                angular.forEach($scope.tagT, function (tag) {
                    if (selected == tag.value || selected == tag.label) {
                        selected = tag;
                    }
                })
                $scope.searchObj.parentTagId = selected;
                $scope.searchObj.tagName = "";
                $scope.searchObj.tagTypeId = "";

                var opts = {};
                opts.url = '/crm/manage/tagmng/getTagsById';
                opts.method = 'GET';
                opts.params = {
                    "id": selected.value
                };
                HttpService.linkHttp(opts).then(function (resp) {
                    angular.forEach(resp.data, function (item) {
                        angular.forEach($scope.tagTypeId, function (tagType) {
                            if (item.tagTypeId == tagType.value || item.tagTypeId == tagType.label) {
                                item.tagTypeId = tagType.label;
                            }
                        })
                        angular.forEach($scope.parentTagId, function (parentTag) {
                            if (item.parentTagId == parentTag.value || item.parentTagId == parentTag.label) {
                                item.parentTagId = parentTag.label;
                            }
                        })


                        item.recStat = EnumType.RecStat.getLabelByValue(item.recStat);
                        $scope.TagRowCollection.push(item);
                    })
                    $scope.total += resp.data.length;
                });
            } else if (tagType == "tagType") {
                $scope.typeState.modDis = false;
                $scope.typeState.delDis = false;
                angular.forEach($scope.tagTypeT, function (tagType) {
                    if (selected == tagType.value || selected == tagType.label) {
                        selected = tagType;
                    }
                })
                $scope.searchObj.tagTypeId1 = selected;
                $scope.searchObj.tagName = "";
                $scope.searchObj.parentTagId1 = "";

                $scope.search();
            }

        };

        // **********************************标签加载*******************************
        $scope.searchTag = function () {
            $scope.search();
        };

        // ***************************类别操作**************************
        $scope.addNode = function () {
            var selected = $.isEmptyObject($scope.treeObj)?"":$scope.treeObj.get_selected()[0]
            $uibModal
                .open({
                    animation: true,
                    backdrop: 'static',
                    templateUrl: 'app/pages/mgrcenter/tagmgr/popupPages/addType.html',
                    size: 'midle-900',
                    controller: 'addTagTypeCtrl',
                    scope: $scope,
                    resolve: {
                        selected:function(){
                            return selected
                        }
                    }
                });
        };

        $scope.modNode = function () {
            $scope.updType = {};
            if ($.isEmptyObject($scope.treeObj)) {
                Alert.error("请选择要修改的节点！");
                return;
            }
            var selected = $scope.treeObj.get_selected()[0];
            if (!selected) {
                Alert.error("请选择要修改的节点！");
                return;
            }
            var optsForUpd = {};
            optsForUpd.url = '/crm/manage/tagmng/tagType';
            optsForUpd.method = 'GET';
            optsForUpd.params = {
                "tagTypeId": selected
            };

            HttpService.linkHttp(optsForUpd).then(function (response) {
                $scope.updType.tagTypeId = response.data.tagTypeId;
                $scope.updType.tagTypeName = response.data.tagTypeName;
                $scope.updType.superTagTypeId = response.data.superTagTypeId;
                $scope.updType.tagTypeLevel = response.data.tagTypeLevel;
                $scope.updType.remark = response.data.remark;
                $scope.updType.recStat=0;
            });

            $uibModal.open({
                animation: true,
                backdrop: 'static',
                templateUrl: 'app/pages/mgrcenter/tagmgr/popupPages/updType.html',
                size: 'midle-900',
                controller: 'updTagTypeCtrl',
                scope: $scope,
                resolve: {}
            });
        };

        $scope.delNode = function () {
            $scope.delTagType = {};
            if ($.isEmptyObject($scope.treeObj)) {
                Alert.error("请选择要删除的节点！");
                return;
            }
            var selected = $scope.treeObj.get_selected()[0];
            if (!selected) {
                Alert.error("请选择要删除的节点！");
                return;
            }
            $scope.delTagType.tagTypeId = selected;

            Alert.confirm("确定删除该条记录？").then(function () {
                var opts = {};
                opts.url = '/crm/manage/tagmng/tagType';
                opts.method = 'DELETE';
                opts.params = $scope.delTagType;
                HttpService.linkHttp(opts).then(function (response) {
//					toastr.success('提交完成!');
                    if (response.status == 0) {
                        Alert.error(response.message);
                    } else {
                        $scope.refresh();
                    }
                });
            });
        };

        // ****************************标签操作*******************************

        $scope.addTag = function () {
            $scope.saveTag = {};
            $scope.isUpd = "false";

            $uibModal
                .open({
                    animation: true,
                    backdrop: 'static',
                    templateUrl: 'app/pages/mgrcenter/tagmgr/popupPages/tagAdd.html',
                    size: 'midle-900',
                    controller: 'tagAddCtrl',
                    resolve: {
                        saveTag:function(){
                            return $scope.saveTag;
                        },
                        strategyName:function(){
                            return $scope.strategyName;
                        },
                        isUpd:function(){
                            return $scope.isUpd;
                        }
                    }
                }).result.then(function(a){
                    $scope.searchTag();
                    // $scope.refresh();
                },function(b){
                    if(!b){
                        $scope.searchTag();
                        // $scope.refresh();
                    }

                });
        };

        $scope.updTag = function (item) {
            $scope.saveTag = {};
            var optsForUpdTag = {};
            optsForUpdTag.url = '/crm/manage/tagmng/tagDetail';
            optsForUpdTag.method = 'GET';
            optsForUpdTag.params = {"tagId": item.tagId};
            HttpService.linkHttp(optsForUpdTag).then(function (response) {
                $scope.saveTag = response.data;
                $scope.strategyName = response.data.strategyId;
                $scope.isUpd = "true";

                $uibModal
                    .open({
                        animation: true,
                        backdrop: 'static',
                        templateUrl: 'app/pages/mgrcenter/tagmgr/popupPages/tagAdd.html',
                        size: 'midle-900',
                        controller: 'tagAddCtrl',
                        resolve: {
                            saveTag:function(){
                                return $scope.saveTag;
                            },
                            strategyName:function(){
                                return $scope.strategyName;
                            },
                            isUpd:function(){
                                return $scope.isUpd;
                            }
                        }
                    }).result.then(function(a){
                        $scope.searchTag();
                        // $scope.refresh();
                    },function(b){
                        if(!b){
                            $scope.searchTag();
                            // $scope.refresh();
                        }
                    });
            });
        };

        $scope.removeTag = function (index) {

            Alert.confirm("确定要删除该条记录？").then(function () {
                $scope.delTag = {};
                $scope.delTag = $scope.TagRowCollection[index];
                var opts = {};
                opts.url = '/crm/manage/tagmng/delModTagDetial';
                opts.method = 'PUT';
                opts.params = $scope.delTag;
                HttpService.linkHttp(opts).then(function (response) {
//						toastr.success('提交完成!');
//						console.log(response);
                    if (response.status == 0) {
                        Alert.error(response.message);
                    }
                    // $scope.refresh();
                    $scope.searchTag();
                });
            });
        };
        $scope.search =function(page){
            if ($scope.searchObj.tagTypeId) {
                $scope.v = $scope.searchObj.tagTypeId1.value;
                // $scope.searchObj.tagTypeId = "";
                $scope.searchObj.tagTypeId = $scope.v;
            }
            if ($scope.searchObj.parentTagId) {
                $scope.v2 = $scope.searchObj.parentTagId1.value;
                // $scope.searchObj.parentTagId = "";
                $scope.searchObj.parentTagId = $scope.v2;
            }
            page=page||1;
            $scope.queryPage(page);
        }
        var init = function () {
            var i = 0;
            $scope.$on('queryPage',function(event,queryPage){
                if(!$scope.queryPage){
                    $scope.queryPage=queryPage;
                }
            });
            $scope.tagMgrOpts={
                pagination:{
                    pageSize:'10',
                    pageIndex:1,
                    maxText:5
                },
                url:'/crm/manage/tagmng/tagDetials',
                method:'GET',
                params:$scope.searchObj,
                success:function(response){
                    var tagList = response.data.list;
                    angular.forEach(tagList, function (item) {
                        $scope.tagT.push({label: item.tagName, value: item.tagId});
                        angular.forEach($scope.tagTypeId, function (tagType) {
                            if (item.tagTypeId == tagType.value || item.tagTypeId == tagType.label) {
                                item.tagTypeId = tagType.label;
                            }
                        })
                        angular.forEach($scope.parentTagId, function (parentTag) {
                            if (item.parentTagId == parentTag.value || item.parentTagId == parentTag.label) {
                                item.parentTagId = parentTag.label;
                            }
                        })
                        item.recStat = EnumType.RecStat.getLabelByValue(item.recStat);
                    })
                    $scope.TagRowCollection=tagList;
                    $scope.parentTagId = $scope.tagT;
                    $scope.searchObj.parentTagId = {label: "父级标签", value: ""};
                    if (i === 0) {
                        $scope.basicConfig.version++;
                        i++
                    }
                    
                }
            }

        }
        init();
    }
})();
