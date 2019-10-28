(function () {
  'use strict';
  angular.module('BlurAdmin.pages.interactmarket.tagMgr')
      .directive('posTreeDir', function($filter, $timeout, $http, HttpService) {
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
                      }
                  };


                  function beforeClick(treeId, treeNode) {
                      // alert('beforeClick')
                      $scope.tags = []
                      var zTree = $.fn.zTree.getZTreeObj("posTreeDemo");
                      zTree.checkNode(treeNode, !treeNode.checked, null, true);
                      return false;
                  }

                  $scope.posTreeSelNode = []
                  function onCheck(e, treeId, treeNode) {
                      var zTree = $.fn.zTree.getZTreeObj("posTreeDemo"),
                          nodes = zTree.getCheckedNodes(true);
                      var v = "";
                      // $scope.posTreeSelNode = [];
                      for (var i=0, l=nodes.length; i<l; i++) {
                          v += nodes[i].name + ",";
                          // var tag={}
                          // tag.text = nodes[i].name
                          // tag.value = nodes[i].id
                          // $scope.posTreeSelNode.push(tag)
                      }
                      // $scope.tags = vList
                      // console.log($scope.posTreeSelNode)

                      if (v.length > 0 ) v = v.substring(0, v.length-1);

                      var cityObj = $("#posTreeSelect");
                      cityObj.attr("value", v);
                      // $scope.treeModel.posTree = v;
                      // var groupTagObj = $("#groupTag");
                      // groupTagObj.attr("value", v);
                  }

                  $scope.showPosTreeMenu = function() {
                      var cityObj = $("#posTreeSelect");
                      var cityOffset = $("#posTreeSelect").offset();
                      $("#posMenuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");
                      $("body").bind("mousedown", onBodyDown);
                  }

                  function hideMenu() {
                      $("#posMenuContent").fadeOut("fast");
                      $("body").unbind("mousedown", onBodyDown);
                  }

                  function onBodyDown(event) {
                      if (!(event.target.id == "menuBtn" || event.target.id == "posTreeSelect" || event.target.id == "posMenuContent" || $(event.target).parents("#posMenuContent").length>0)) {
                          hideMenu();
                      }
                  }


                  $scope.searchPosTree = function () {
                      var opts = {};
                      opts.url = '/crm/manage/auth/getAllRoleEnterTree';
                      opts.method = 'GET';
                      HttpService.linkHttp(opts).then(function(response) {
                          var treeItemList = [];
                          $scope.disabledZtree = [];
                          response.data.forEach(function(value,index,array){
                              if(value.pareMenuCode==""){
                                  value.pareMenuCode="#"
                              }
                              var img_url = '';
                              if (value.type == '0'){
                                  img_url = "assets/zTree/css/zTreeStyle/img/diy/1_open.png" ;
                              } else if (value.type == '1'){

                                  img_url = "assets/zTree/css/zTreeStyle/img/diy/8.png" ;
                              } else if (value.type == '2'){
                                  img_url = "assets/zTree/css/zTreeStyle/img/diy/9.png" ;
                              }

                              if (value.type != '2'){  // type !=2 的节点不让选择
                                  $scope.disabledZtree.push(value.id)
                              }

                              var treeItem = {
                                  "id": value.id,
                                  "pId": value.parent,
                                  "icon":img_url,
                                  "name": value.text
                                  // ,
                                  // "state": {
                                  //     "opened": false
                                  // }
                              }
                              treeItemList.push(treeItem);
                              // if(value.menuOrder!="0"){
                              //     treeItemList.push(treeItem);
                              // }

                          });

                          $.fn.zTree.init(element, setting, treeItemList);
                          var treeDemo = $.fn.zTree.getZTreeObj("posTreeDemo");
                          $scope.disabledZtree.forEach(function (value) {
                              var node = treeDemo.getNodeByParam("id", value, null);
                              treeDemo.setChkDisabled(node, true);
                          });

                          // $scope.dragDataZtree = treeItemList;
                          // treeItemList = postreeTest;

                      });

                  }
                  // 页面初始化查询
                  $scope.searchPosTree();

                  /*var postreeTest = [
                      {
                          "id": "nd1",
                          "pId": "#",
                          "name": "总公司"
                      },
                      {
                          "id": "rnd2",
                          "pId": "nd1",
                          "name": "系统管理员"
                      },
                      {
                          "id": "rnd3",
                          "pId": "nd1",
                          "name": "销售主管"
                      },
                      {
                          "id": "nd2",
                          "pId": "nd1",
                          "name": "第一分公司"
                      },
                      {
                          "id": "rnd2",
                          "pId": "nd2",
                          "name": "系统管理员"
                      },
                      {
                          "id": "rnd3",
                          "pId": "nd2",
                          "name": "销售主管"
                      },
                      {
                          "id": "nd3",
                          "pId": "nd2",
                          "name": "第一分理处"
                      },
                      {
                          "id": "nd4",
                          "pId": "nd2",
                          "name": "第二分理处"
                      },
                      {
                          "id": "nd4",
                          "pId": "nd2",
                          "name": "销售主管"
                      },
                      {
                          "id": "nd5",
                          "pId": "nd2",
                          "name": "第三分理处"
                      },
                      {
                          "id": "nd6",
                          "pId": "nd1",
                          "name": "第二分公司"
                      }
                  ];*/
              }
          };
      });
})();
