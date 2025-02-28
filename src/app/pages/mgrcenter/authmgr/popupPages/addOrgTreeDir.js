(function () {
  'use strict';
  angular.module('BlurAdmin.pages.mgrcenter.addAuthMgr')
      .directive('addOrgTreeDir', function($filter, $timeout, $http,
                                   HttpService) {
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
                      var zTree = $.fn.zTree.getZTreeObj("orgTreeDemo");
                      zTree.checkNode(treeNode, !treeNode.checked, null, true);
                      return false;
                  }

                  // $scope.tagList = [];
                  // $scope.tag={}
                  // $scope.tag.text = "";
                  // $scope.tag.value = "";

                  function onCheck(e, treeId, treeNode) {
                      var zTree = $.fn.zTree.getZTreeObj("orgTreeDemo"),
                          nodes = zTree.getCheckedNodes(true);
                      var v = "";
                      // $scope.orgTreeSelNode = [];
                      for (var i=0, l=nodes.length; i<l; i++) {
                          v += nodes[i].name + ",";
                          // var tag={}
                          // tag.text = nodes[i].name
                          // tag.value = nodes[i].id
                          // $scope.orgTreeSelNode.push(tag)
                      }
                      // $scope.tags = vList
                      // console.log($scope.orgTreeSelNode)

                      if (v.length > 0 ) v = v.substring(0, v.length-1);
                      var cityObj = $("#orgTreeSelect");
                      cityObj.attr("value", v);
                      // var groupTagObj = $("#groupTag");
                      // groupTagObj.attr("value", v);
                  }

                  $scope.showOrgTreeMenu = function() {
                      var cityObj = $("#orgTreeSelect");
                      var cityOffset = $("#orgTreeSelect").offset();
                      $("#orgMenuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");
                      $("body").bind("mousedown", onBodyDown);
                  }

                  function hideMenu() {
                      $("#orgMenuContent").fadeOut("fast");
                      $("body").unbind("mousedown", onBodyDown);
                  }

                  function onBodyDown(event) {
                      if (!(event.target.id == "menuBtn" || event.target.id == "orgTreeSelect" || event.target.id == "orgMenuContent" || $(event.target).parents("#orgMenuContent").length>0)) {
                          hideMenu();
                      }
                  }


                  $scope.searchOrgTree = function () {
                      var opts = {};
                      opts.url = '/crm/manage/auth/getRoleDeptTree';
                      opts.method = 'GET';
                      HttpService.linkHttp(opts).then(function(response) {
                          var treeItemList = [];
                          $scope.orgDisabledZtree = [];
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
                              if (value.type != '1'){  // type !=1 的节点不让选择
                                  $scope.orgDisabledZtree.push(value.id)
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

                          // $scope.dragDataZtree = treeItemList;
                          // treeItemList = orgtreeTest;
                          $.fn.zTree.init(element, setting, treeItemList);
                      });

                  }
                  // 页面初始化查询
                  $scope.searchOrgTree();

                  var orgtreeTest = [
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
                  ];

              }
          };
      });
})();
