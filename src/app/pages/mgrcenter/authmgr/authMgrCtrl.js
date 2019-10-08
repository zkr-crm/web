(function () {
  'use strict';
  angular.module('BlurAdmin.pages.mgrcenter.authMgr')
      .controller('authMgrCtrl', function($rootScope,$scope,$log, $state, $uibModal, $filter, $timeout, $http,
                                          HttpService, EnumType, Alert) {

          $.jstree.defaults.core.themes.url = true;
          $.jstree.defaults.core.themes.dir = "assets/img/theme/vendor/jstree/dist/themes";

          $scope.constant = {
              'IS_CONTAIN_CHILD' : 'in',
              'RULE_DEPT_LIST_CODE' : '1001',    // in组织列表
              'RULE_DEPT_CODE' : '1002',   // in登录人组织
              'RULE_POSI_LIST_CODE' : '1003',    // in岗位列表
              'RULE_POSI_CODE' : '1004',   // in登录人岗位
              'RULE_USER_CODE' : '1005',   // 等于登录人
              'RULE_ENTER_CODE' : '1007',   // 等于岗位登录人机构
              'RULE_ENTER_LIST_CODE' : '1006'   // 等于登录人机构列表
          }


          $scope.roleObj = {
              'roleName' : '',
              'roleCode' : ''
          };

          $scope.basicConfig = {
              core: {
                  multiple: true,
                  check_callback: true,
                  worker: true
              },
              'types': {
                  'folder': {
                      'icon': 'ion-folder'
                  },
                  'default': {
                      'icon': 'ion-document-text'
                  }
              },
              'plugins': ['types','checkbox'],
              'version': 1
          };

          $scope.refresh = function () {
              $scope.ignoreChanges = true;
              newId = 0;
              $scope.treeData = getDefaultData();
              $scope.basicConfig.version++;
          };

          $scope.ignoreChanges = false;
          var newId = 0;
          $scope.ignoreChanges = false;
          $scope.newNode = {};

          $scope.dragConfig = {
            'core': {
              'check_callback': true,
              'themes': {
                'responsive': false
              }
            },
            'types': {
              'folder': {
                'icon': 'ion-ios-folder'
              },
              'default': {
                'icon': 'ion-document-text'
              }
            },
            "plugins": ["dnd", 'types']
          };

          $scope.addNewNode = function () {
            $scope.ignoreChanges = true;
            var selected = this.basicTree.jstree(true).get_selected()[0];
            if (selected)
              $scope.treeData.push({
                id: (newId++).toString(),
                parent: selected,
                text: "New node " + newId,
                state: {opened: true}
              });
            $scope.basicConfig.version++;
          };

          $scope.saveTree = function () {
              var selected = $scope.treeObj.get_selected(true)
              //解决节点半选未传值问题
              var undeterminedArr = []
              $.each($scope.undeterminedObj.find(".jstree-undetermined"),function (index, item) {
                undeterminedArr.push(item.closest(".jstree-anchor").id)
              })
               undeterminedArr.forEach(function(item,index){
                var undeterminedNode = $('#menuTree').jstree('get_node',parseInt(item))
                selected.push(undeterminedNode)
              })

              if (selected === undefined || selected.length == 0) {
                  Alert.error('请选择菜单.')
                  return;
              }
              var opts = {};
              opts.url = '/crm/manage/modRole';
              opts.method = 'PUT';
              opts.params = {'roleName':$scope.roleObj.roleName,'roleCode':$scope.roleObj.roleCode};
              HttpService.linkHttp(opts).then(function(response) {
                  // console.log("请求成功");
                  // console.log(response.data)

                  //////////////////////////////////////////
                  $scope.saveMenu(selected);
                  $scope.saveEnter() ;// XXXXXXXXXXXXXXXXXXXXXXXXX修改此处
                  $scope.saveDataAuth();
                  $scope.searchUser();
                  // $state.go('mgrcenter.authMgr',{});

                  ////////////////////////////////////////
                  // var roleMenuList = []
                  // selected.forEach(function(value,index,array){
                  //     var roleMenuObj = new Object();
                  //     roleMenuObj.roleCode = $scope.roleObj.roleCode;
                  //     roleMenuObj.roleName = $scope.roleObj.roleName;
                  //     roleMenuObj.menuCode = value.id;
                  //     roleMenuObj.menuName = value.text;
                  //     roleMenuList.push(roleMenuObj)
                  // });
                  //
                  // var opts = {};
                  // opts.url = '/crm/manage/addMenuAuthByJson';
                  // opts.method = 'PUT';
                  // opts.params = {};
                  // opts.data = roleMenuList;
                  // HttpService.linkHttp(opts).then(function(response) {
                  //     Alert.success("请求成功");
                  //     $scope.searchUser();
                  // });
              });
          }

          $scope.saveMenu = function (selected) {
              var roleMenuList = []
              selected.forEach(function(value,index,array){
                  var roleMenuObj = new Object();
                  roleMenuObj.roleCode = $scope.roleObj.roleCode;
                  roleMenuObj.roleName = $scope.roleObj.roleName;
                  roleMenuObj.menuCode = value.id;
                  roleMenuObj.menuName = value.text;
                  roleMenuList.push(roleMenuObj)
              });

              var opts = {};
              opts.url = '/crm/manage/addMenuAuthByJson';
              opts.method = 'PUT';
              opts.params = {};
              opts.data = roleMenuList;
              HttpService.linkHttp(opts).then(function(response) {
                  Alert.success("请求成功");
              });

          }

          $scope.saveEnter = function () {
              var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
                  nodes = zTree.getCheckedNodes(true);
              if (nodes.length > 0) {
                  var roleEnterList = []
                  $scope.tagList.forEach(function(value,index,array){
                      var roleEnterObj = new Object();
                      roleEnterObj.roleCode = $scope.roleObj.roleCode
                      roleEnterObj.enterCode = value.value
                      roleEnterList.push(roleEnterObj)
                  });

                  var opts = {};
                  opts.url = '/crm/manage/auth/updateRoleEnterByJson'; // XXXXXXXXXXXXXXXXXXXXXXXXX修改此处
                  opts.method = 'PUT';
                  opts.params = {};
                  opts.data = roleEnterList;
                  HttpService.linkHttp(opts).then(function(response) {
                      // Alert.success("请求成功");
                      // console.log(response.data);
                      // $scope.searchUser();
                  });
              } else {
                  // 删除组织树数据
                  var opts = {};
                  opts.url = '/crm/manage/auth/deleteEnterAuthByRole'; // XXXXXXXXXXXXXXXXXXXXXXXXX修改此处
                  opts.method = 'DELETE';
                  opts.params = {'roleCode':$scope.roleObj.roleCode};
                  HttpService.linkHttp(opts).then(function(response) {
                      // Alert.success("请求成功");
                      // console.log(response.data);
                      // $scope.searchUser();
                  });
              }

          }

          $scope.saveDataAuth = function () {
              var roleDataAuthList = parseMap2Obj();

              if (roleDataAuthList.length > 0) {
                  var opts = {};
                  opts.url = '/crm/manage/auth/subUpdateRoleDataByJson'; // XXXXXXXXXXXXXXXXXXXXXXXXX修改此处
                  opts.method = 'PUT';
                  opts.params = {};
                  opts.data = roleDataAuthList;
                  HttpService.linkHttp(opts).then(function(response) {
                      // Alert.success("请求成功");
                      // $scope.searchUser();
                      $scope.dataAuthMap = new $scope.Map();
                  });
              }

          }

          function parseMap2Obj() {
              var keySet = $scope.dataAuthMap.keySet()
              var dataAuthObjList = []
              keySet.forEach(function(key,index,array){
                  var posTreeDemo = $.fn.zTree.getZTreeObj("posTreeDemo");
                  var fieldMap = $scope.dataAuthMap.get(key);
                  // if (fieldMap != '') { // 排除没有设置field数据
                  var subKeySet = fieldMap.keySet()
                  subKeySet.forEach(function(subKey,index,array){
                      var ruleList = fieldMap.get(subKey)
                      if (ruleList.length != 0) { // 排除没有设置rule的数据
                          if(ruleList.length > 1) { // 包含树的list
                              for (var i=1;i<ruleList.length;i++) {
                                  var dataAuthObj = new Object();
                                  dataAuthObj.roleCode = $scope.roleObj.roleCode
                                  dataAuthObj.tableCode = key
                                  dataAuthObj.fieldCode = subKey
                                  dataAuthObj.ruleCode = ruleList[0]
                                  if ($scope.constant.RULE_POSI_LIST_CODE == ruleList[0]) {
                                      var node = posTreeDemo.getNodeByParam("id", ruleList[i], null);
                                      dataAuthObj.matchCondition = node.getParentNode().id + '_' + ruleList[i];
                                  } else {
                                      dataAuthObj.matchCondition = ruleList[i];
                                  }

                                  if ($scope.constant.RULE_USER_CODE == ruleList[0]) {
                                      dataAuthObj.isContainChild = '=';
                                  } else {
                                      dataAuthObj.isContainChild = $scope.constant.IS_CONTAIN_CHILD;
                                  }
                                  dataAuthObjList.push(dataAuthObj);
                              }
                          } else {
                              var dataAuthObj = new Object();
                              dataAuthObj.roleCode = $scope.roleObj.roleCode
                              dataAuthObj.tableCode = key;
                              dataAuthObj.fieldCode = subKey;
                              dataAuthObj.ruleCode = ruleList[0];
                              dataAuthObj.matchCondition = getMatchCondition(ruleList[0])
                              if ($scope.constant.RULE_USER_CODE == ruleList[0]) {
                                  dataAuthObj.isContainChild = '=';
                              } else {
                                  dataAuthObj.isContainChild = $scope.constant.IS_CONTAIN_CHILD;
                              }
                              dataAuthObjList.push(dataAuthObj);
                          }
                      }
                  });
                  // }
              });
              return dataAuthObjList
          }

          function getMatchCondition(ruleCode) {
              var matchCondition = ''
              if (ruleCode == $scope.constant.RULE_DEPT_CODE){
                  matchCondition = $scope.userInfo.deptCode
              } else if (ruleCode == $scope.constant.RULE_POSI_CODE) {
                  matchCondition = $scope.userInfo.posiCode
              } else {
                  matchCondition = $scope.userInfo.userId
              }
              return matchCondition
          }

          $scope.saveTree1 = function () {
              // var selected = this.basicTree.jstree(true)
              this.basicTree.jstree('check_node',["n122", "n131"])
              // console.log(this)
              // console.log(selected.get_selected(true))
              // console.log(this.basicTree.jstree(true))
          }

          $scope.removeRole = function() {
              Alert.confirm("确定删除 " + $scope.roleObj.roleName + ' ?').then(function() {
                  var opts = {};
                  opts.url = '/crm/manage/delRole';
                  opts.method = 'DELETE';
                  opts.params = {'roleCode':$scope.roleObj.roleCode};
                  HttpService.linkHttp(opts).then(function(response) {
                      // console.log("请求成功");
                      // console.log(response);
                      $scope.searchUser();
                      // 执行查询
                  });
              });
          };

          $scope.expand = function () {
            $scope.ignoreChanges = true;
            $scope.treeData.forEach(function (n) {
              n.state.opened = true;
            });
            $scope.basicConfig.version++;
          };

          $scope.collapse = function () {
            $scope.ignoreChanges = true;
            $scope.treeData.forEach(function (n) {
              n.state.opened = false;
            });
            $scope.basicConfig.version++;
          };

          $scope.treeEventsObj = {
              'ready': readyCB,
              'create_node': createNodeCB
          }

          function readyCB() {
              $scope.treeObj = {}
              $scope.treeObj = this.basicTree.jstree(true);
              $scope.undeterminedObj = this.basicTree.jstree('jstree-undetermined')
              $log.info('ready called');
              // $log.info($scope.roleTreeData);
              // 解决半选节点全选问题
              var allMenuArr = []; // 所有菜单集合
              var nodeList = [];  // 后台获取到的菜单集合
              var allMenuList; // 所有菜单加上后台获取的菜单的总和
              var noChooseMenuList; // 所有未选择的菜单集合
              var noChooseParentList = []; // 所有不应该选择的父级菜单集合
              var lastNoChooseMenuList; //去重后的不应该选择的父级菜单集合
              // 获取所有菜单集合
              $scope.treeData.forEach(function (item, index) {
                allMenuArr.push(item.id)
              })

              // 获取后台返回的所有选中状态菜单
              $scope.roleTreeData.forEach(function(value,index,array){
                  nodeList.push(value.menuCode)
              });

              // 所有菜单及选中状态菜单总和
              allMenuList = allMenuArr.concat(nodeList)
              // 获取到所有未选中的菜单
              noChooseMenuList = getNoRepeat(allMenuList)

              // 获取到所有不应该全选的父级菜单
              noChooseMenuList.forEach(function (item, index) {
                $scope.treeData.forEach(function (item1, index1) {
                  if (item1.parent!=='#' && item1.id === item) {
                    noChooseParentList.push(item1.parent)
                  }
                })
              })

              // 对所有不应该全选的父级菜单进行去重
              lastNoChooseMenuList = distinct(noChooseParentList)
               
              // 获取所有未选中菜单集合方法
              function getNoRepeat (arr) {
                return arr.filter(function (item) {
                  return arr.indexOf(item) === arr.lastIndexOf(item)
                })
              }

              // 对未选中父级菜单进行去重方法
              function distinct(arr) {
                arr = arr.sort();
                var result = [arr[0]];
                for (var i = 1, len = arr.length; i < len; i++) {
                  arr[i] !== arr[i - 1] && result.push(arr[i]);
                }
                return result;
              }
              
              // 截取掉不应该全选的父级菜单
              lastNoChooseMenuList.forEach(function (item,index) {
                if (nodeList.indexOf(item)>-1) {
                  nodeList.splice(nodeList.indexOf(item),1)
                }
              })
              this.basicTree.jstree('check_node',nodeList) // 添加角色对应菜单权限
              
              // $log.info($scope);

          };

          function createNodeCB(e,item) {
              // $log.info('create_node called');
          };

          // $scope.readyCB = function() {
          //     $timeout(function() {
          //         $scope.ignoreChanges = false;
          //     });
          // };

          $scope.applyModelChanges = function() {
            return !$scope.ignoreChanges;
          };


          // 查询角色对应菜单
          $scope.searchRoleMenu = function (role,param) {
              $scope.dataAuthMap = new $scope.Map(); // dataAuthMap 初始化
              $scope.roleObj.roleCode=role.roleCode;
              $scope.roleObj.roleName=role.roleName;
              console.log(role.index);
              var opts = {};
              opts.url = '/crm/manage/getAllMenu';
              opts.method = 'GET';
              HttpService.linkHttp(opts).then(function(response) {
                  // $log.info(response.data)
                  var treeItemList = []
                  response.data.forEach(function(value,index,array){
                      $scope.allMenuArr = array
                      if(value.menuPareid=="" || value.menuPareid==null){
                          value.menuPareid="#"
                      }

                      var treeItem = {
                          "id": value.menuId,
                          "parent": value.menuPareid,
                          "type": "folder",
                          "text": value.menuTitle,
                          "state": {
                            "opened": true
                          }
                      }

                      //if(value.menuOrder!="0"){
                          treeItemList.push(treeItem);
                      //}

                  });

                  $scope.ignoreChanges = true;
                  $scope.treeData = treeItemList;
                  $scope.basicConfig.version++;
              });

              opts = {};
              opts.url = '/crm/manage/getMenuAuthsByEntity';
              opts.method = 'GET';
              opts.params = $scope.roleObj;
              HttpService.linkHttp(opts).then(function(response) {
                  // console.log("请求成功");
                  $scope.roleTreeData = response.data;
              });


              if (param != 'first') {
                  roleChangeInit();
                  opts = {};
                  opts.url = '/crm/manage/auth/getRoleEnterByRole';//给人事组织树添加check
                  opts.method = 'GET';
                  opts.params = {'roleCode':role.roleCode};
                  HttpService.linkHttp(opts).then(function(response) {
                      var v = "";
                      response.data.forEach(function (value) {
                          var node = $scope.treeDemo.getNodeByParam("id", value.enterCode, null);
                          v += node.name + ",";
                          $scope.treeDemo.checkNode(node, true, false);
                      });
                      if (v.length > 0 ) v = v.substring(0, v.length-1);
                      var cityObj = $("#citySel");
                      cityObj.attr("value", v);
                  });
              }
          }

          // 查询角色事件
          $scope.searchUser = function() {
              var opts = {};
              opts.url = '/crm/manage/getAllRoles';
              opts.method = 'GET';
              HttpService.linkHttp(opts).then(function(response) {
                  //console.log(response);
                  $scope.roles = response.data;
                  $scope.searchRoleMenu($scope.roles[0],'first');
                  // $scope.getDataAuthMap($scope.roles[0]);
              });

          }
          // 页面初始化查询
          $scope.searchUser();
          // console.log($scope.basicTree.jstree(true))

          $scope.addRole = function () {
              $state.go('mgrcenter.addAuthMgr',{});
              // $location.path('/portrayal/perCusPortrayal').search({'custNo':custNo});
          }


          //////////////////////////////////////////
          // 人事权限设置
          $scope.dataAuthDataGrid = function(){
              var opts = {};
              opts.url = '/crm/manage/auth/getAllTableList'; // 查询所有table
              opts.method = 'GET';
              HttpService.linkHttp(opts).then(function(response) {
                  console.log("请求成功1111");
                  $scope.dataAuthData = response.data;
                  // $scope.dataAuthData = dataAuthDataTemp
                  console.log($scope.dataAuthData);
              });
          }
          $scope.dataAuthDataGrid();

          //////////////////////////////////////////
          // 数据权限设置
          /*$scope.peopleTableData = [
              {
                  id: 1,
                  firstName: 'Mark',
                  lastName: 'Otto',
                  username: '@mdo',
                  email: 'mdo@gmail.com',
                  age: '28',
                  status: 'primary'
              },
              {
                  id: 2,
                  firstName: 'Jacob',
                  lastName: 'Thornton',
                  username: '@fat',
                  email: 'fat@yandex.ru',
                  age: '45',
                  status: 'primary'
              },
              {
                  id: 3,
                  firstName: 'Larry',
                  lastName: 'Bird',
                  username: '@twitter',
                  email: 'twitter@outlook.com',
                  age: '18',
                  status: 'primary'
              },
              {
                  id: 4,
                  firstName: 'John',
                  lastName: 'Snow',
                  username: '@snow',
                  email: 'snow@gmail.com',
                  age: '20',
                  status: 'primary'
              },
              {
                  id: 5,
                  firstName: 'Jack',
                  lastName: 'Sparrow',
                  username: '@jack',
                  email: 'jack@yandex.ru',
                  age: '30',
                  status: 'primary'
              }
          ];*/

          $scope.Map = function(){
              this.container = new Object();
          }

          $scope.Map.prototype.put = function(key, value){
              this.container[key] = value;
          }

          $scope.Map.prototype.get = function(key){
              return this.container[key];
          }

          $scope.Map.prototype.remove = function(key) {
              delete this.container[key];
          }

          $scope.Map.prototype.keySet = function() {
              var keyset = new Array();
              var count = 0;
              for (var key in this.container) {
                  if (key == 'extend') {    // 跳过object的extend函数
                      continue;
                  }
                  keyset[count] = key;
                  count++;
              }
              return keyset;
          }

          $scope.tableMap = new $scope.Map();

          $scope.getDataAuthMap = function(role){
              var opts = {};
              opts.url = '/crm/manage/auth/getRoleDataByRole'; // 查询所有table
              opts.method = 'GET';
              opts.params = {'roleCode':role.roleCode};
              HttpService.linkHttp(opts).then(function(response) {
                  console.log("请求成功11111111111");
                  // $scope.dataAuthData = response.data;
                  // $scope.dataAuthData = dataAuthDataTemp
                  console.log(response.data);
              });
          }

          $scope.dataAuthMap = new $scope.Map();
          $scope.modifyDataAuth = function(tableCode) {
              // alert(tableCode)
              $scope.dataAuthMapKey = tableCode
              $uibModal
                  .open({
                      animation : true,
                      keyboard : false,
                      backdrop : 'static',
                      templateUrl : 'app/pages/mgrcenter/authmgr/dataOpt.html',
                      size : 'midle-900',
                      controller : 'dataOptCtrl',
                      scope : $scope,
                      resolve: {
                          // 'custNo': function () {
                          //     return custNo;
                          // }
                      }
                  });
          }
          // 查看权限
          $scope.showDataAuthParam;
          $scope.showDataAuth = function(tableCode) {
              // alert(tableCode)
              $scope.showDataAuthParam = {
            		  'tableCode' : tableCode,
            		  'roleName' : $scope.roleObj.roleName,
            		  'roleCode' : $scope.roleObj.roleCode
            		  }
              $uibModal
                  .open({
                      animation : true,
                      keyboard : false,
                      backdrop : 'static',
                      templateUrl : 'app/pages/mgrcenter/authmgr/showDataAuth.html',
                      size : 'midle-900',
                      // controller : '',
                      scope : $scope,
                      resolve: {
                      }
                  });
          }

          function roleChangeInit(){
              var orgTreeDemo = $.fn.zTree.getZTreeObj("orgTreeDemo")
              var posTreeDemo = $.fn.zTree.getZTreeObj("posTreeDemo")
              $scope.treeDemo.checkAllNodes(false);
              $scope.treeDemo.expandAll(false);
              orgTreeDemo.checkAllNodes(false);
              orgTreeDemo.expandAll(false);
              posTreeDemo.checkAllNodes(false);
              posTreeDemo.expandAll(false);
          }

          function getDefaultData() {
              return [
                  {
                      "id": "n1",
                      "parent": "#",
                      "type": "folder",
                      "text": "业务权限",
                      "state": {
                          "opened": true
                      }
                  },
                  {
                      "id": "n2",
                      "parent": "#",
                      "type": "folder",
                      "text": "功能权限",
                      "state": {
                          "opened": true
                      }
                  },
                  {
                      "id": "n3",
                      "parent": "n2",
                      "type": "folder",
                      "text": "个人信息",
                      "state": {
                          "opened": true
                      }
                  },
                  {
                      "id": "n11",
                      "parent": "n1",
                      "text": "首页",
                      "state": {
                          "opened": true
                      }
                  },
                  {
                      "id": "n12",
                      "parent": "n1",
                      "text": "数据源管理",
                      "state": {
                          "opened": true
                      }
                  },
                  {
                      "id": "n121",
                      "parent": "n12",
                      "text": "数据导入",
                      "state": {
                          "opened": true
                      }
                  },
                  {
                      "id": "n122",
                      "parent": "n12",
                      "text": "数据导出",
                      "state": {
                          "opened": true
                      }
                  },
                  {
                      "id": "n13",
                      "parent": "n1",
                      "text": "客户管理",
                      "state": {
                          "opened": true
                      }
                  },
                  {
                      "id": "n131",
                      "parent": "n13",
                      "text": "个人客户",
                      "state": {
                          "opened": true
                      }
                  },
                  {
                      "id": "n132",
                      "parent": "n13",
                      "text": "企业客户",
                      "state": {
                          "opened": true
                      }
                  },
                  {
                      "id": "n133",
                      "parent": "n13",
                      "text": "联系人列表",
                      "state": {
                          "opened": true
                      }
                  },
                  {
                      "id": "n14",
                      "parent": "n1",
                      "text": "客户群运营",
                      "state": {
                          "opened": true
                      }
                  },
                  {
                      "id": "n15",
                      "parent": "n1",
                      "text": "互动营销",
                      "state": {
                          "opened": true
                      }
                  },
                  {
                      "id": "n151",
                      "parent": "n15",
                      "text": "营销活动",
                      "state": {
                          "opened": true
                      }
                  },
                  {
                      "id": "n152",
                      "parent": "n15",
                      "text": "短信群发",
                      "state": {
                          "opened": true
                      }
                  },
                  {
                      "id": "n16",
                      "parent": "n1",
                      "text": "任务管理",
                      "state": {
                          "opened": true
                      }
                  },
                  {
                      "id": "n161",
                      "parent": "n16",
                      "text": "我的任务",
                      "state": {
                          "opened": true
                      }
                  },
                  {
                      "id": "n162",
                      "parent": "n16",
                      "text": "全部任务",
                      "state": {
                          "opened": false
                      }
                  }

              ]
          }


          $scope.userInfo = {
              'userId' : '',
              'deptCode' : '', // 登录人组织
              'posiCode' : ''  // 职位
          };
          $scope.getUserInfo = function() {
              var opts = {};
              opts.url = '/crm/manage/usermng/user';
              opts.method = 'GET';
              opts.params = {'userID':$rootScope.global.user};
              console.log($rootScope.global.user);
              HttpService.linkHttp(opts).then(function(response) {
                  $scope.userInfo.userId = response.data.userId;
                  $scope.userInfo.deptCode = response.data.deptCode;
                  $scope.userInfo.posiCode = response.data.deptCode + '_' +response.data.posiCode;
              });
              console.log($scope.userInfo)
          }
          $scope.getUserInfo();
      });
})();
