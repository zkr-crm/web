(function () {
    'use strict';
    angular.module('BlurAdmin.pages.mgrcenter.tagMgr')
        .directive('enterTreeDir', function($filter, $timeout, $http, HttpService) {
            // 将对象return出去
            return{
                require: '?ngModel',
                restrict: 'AE',
                link: function ($scope, element, attrs, ngModel) {

                    var setting = {
                        check: {
                            enable: true,
                            chkboxType: { "Y": "", "N": "" }
                        },
                        view: {
                            dblClickExpand: true
                        },
                        data: {
                            simpleData: {
                                enable: true
                            }
                        },
                        callback: {
                            beforeClick: beforeClick,
                            onCheck: onCheck
                            // onCheck: $scope.testCheck
                        }
                    };


                    function beforeClick(treeId, treeNode) {
                        // alert('beforeClick')
                        $scope.tags = []
                        var zTree = $.fn.zTree.getZTreeObj("enterTreeDemo");
                        zTree.checkNode(treeNode, !treeNode.checked, null, true);
                        return false;
                    }

                    // $scope.tagList = [];
                    // $scope.tag={}
                    // $scope.tag.text = "";
                    // $scope.tag.value = "";
                    function onCheck(e, treeId, treeNode) {
                        // alert('onCheck')
                        var zTree = $.fn.zTree.getZTreeObj("enterTreeDemo"),
                            nodes = zTree.getCheckedNodes(true);
                        var v = "";
                        // $scope.tagList = [];
                        for (var i=0, l=nodes.length; i<l; i++) {
                            v += nodes[i].name + ",";
                            // var tag={}
                            // tag.text = nodes[i].name
                            // tag.value = nodes[i].id
                            // $scope.tagList.push(tag)
                        }
                        // $scope.tags = vList
                        // console.log($scope.tagList)

                        if (v.length > 0 ) v = v.substring(0, v.length-1);
                        var cityObj = $("#enterTreeSelect");
                        cityObj.attr("value", v);
                        // $scope.treeModel.enterTree = v ;
                        // var groupTagObj = $("#groupTag");
                        // groupTagObj.attr("value", v);
                    }

                    $scope.showEnterTreeMenu = function() {
                        var cityObj = $("#enterTreeSelect");
                        var cityOffset = $("#enterTreeSelect").offset();
                        $("#enterMenuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");

                        $("body").bind("mousedown", onBodyDown);
                    }

                    function hideMenu() {
                        $("#enterMenuContent").fadeOut("fast");
                        $("body").unbind("mousedown", onBodyDown);
                    }

                    function onBodyDown(event) {
                        if (!(event.target.id == "menuBtn" || event.target.id == "enterTreeSelect" || event.target.id == "enterMenuContent" || $(event.target).parents("#enterMenuContent").length>0)) {
                            hideMenu();
                        }
                    }


                    $scope.searchRoleDept = function () {
                        $scope.tagList = []; //初始化 树的值
                        var opts = {};
                        opts.url = '/crm/manage/enters';
                        opts.method = 'GET';
                        HttpService.linkHttp(opts).then(function(response) {
                            var treeItemList = []
                            response.data.forEach(function(value,index,array){
                                if(value.pareMenuCode==""){
                                    value.pareMenuCode="#"
                                }
                                var treeItem = {
                                    "id": value.enterCode,
                                    "pId": value.superEnterCode,
                                    "icon":"assets/zTree/css/zTreeStyle/img/diy/8.png" ,
                                    "name": value.enterName
                                    // ,
                                    // "state": {
                                    //     "opened": false
                                    // }
                                }
                                treeItemList.push(treeItem);
                            });
                            // $scope.dragDataZtree = treeItemList;
                            $.fn.zTree.init(element, setting, treeItemList);
                            $scope.enterTreeDemo = $.fn.zTree.getZTreeObj("enterTreeDemo");
                            // var treeObj = $.fn.zTree.getZTreeObj("enterTreeDemo");
                            // console.log($scope.dragDataZtree)


                            /*var opts = {};
                            opts.url = '/crm/manage/getAllRoles';
                            opts.method = 'GET';
                            HttpService.linkHttp(opts).then(function(response) {
                                console.log("请求成功");
                                var role = response.data[0];
                                opts = {};
                                opts.url = '/crm/manage/auth/getRoleEnterByRole';
                                opts.method = 'GET';
                                opts.params = {'roleCode':role.roleCode};
                                HttpService.linkHttp(opts).then(function(response) {
                                    console.log("请求成功");
                                    var v = "";
                                    // var treeItemList = [];
                                    // $scope.orgDisabledZtree = [];
                                    response.data.forEach(function (value) {
                                        var node = $scope.enterTreeDemo.getNodeByParam("id", value.enterCode, null);
                                        // console.log(node.name);
                                        v += node.name + ",";
                                        $scope.enterTreeDemo.checkNode(node, true, false);
                                    });

                                });
                            });*/


                            // console.log('$scope.enterTreeDemo')
                            // console.log($scope.enterTreeDemo)
                        });

                    }
                    // 页面初始化查询
                    $scope.searchRoleDept();
                    // console.log($scope.$$childTail.dragDataZtree)
                }
            };
        });
})();
