(function () {
  'use strict';
  angular.module('BlurAdmin.pages.mgrcenter.addAuthMgr')
      .controller('addAuthMgrCtrl', function($rootScope,$scope,$log,$state, $uibModal, $filter, $timeout, $http,toastr,
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

          $scope.basicConfig = {
              core: {
                  multiple: true,
                  check_callback: true,
                  worker: true
              },
              'types': {
                  'folder': {
                      'icon': 'ion-ios-folder'
                  },
                  'default': {
                      'icon': 'ion-document-text'
                  }
              },
              'plugins': ['types','checkbox'],
              'version': 1
          };

          $scope.dragData = [
              {
                  "id": "nd1",
                  "parent": "#",
                  "type": "folder",
                  "text": "总公司",
                  "state": {
                      "opened": true
                  }
              },
              {
                  "id": "nd2",
                  "parent": "nd1",
                  "type": "folder",
                  "text": "第一分公司",
                  "state": {
                      "opened": true
                  }
              },
              {
                  "id": "nd3",
                  "parent": "nd2",
                  "type": "folder",
                  "text": "第一分理处",
                  "state": {
                      "opened": true
                  }
              },
              {
                  "id": "nd4",
                  "parent": "nd2",
                  "type": "folder",
                  "text": "第二分理处",
                  "state": {
                      "opened": true
                  }
              },
              {
                  "id": "nd5",
                  "parent": "nd2",
                  "text": "第三分理处",
                  "state": {
                      "opened": true
                  }
              },
              {
                  "id": "nd6",
                  "parent": "nd1",
                  "text": "第二分公司",
                  "state": {
                      "opened": true
                  }
              },
              {
                  "id": "nd7",
                  "parent": "nd6",
                  "text": "第四分理处",
                  "state": {
                      "opened": true
                  }
              },
              {
                  "id": "nd8",
                  "parent": "nd6",
                  "text": "第四分理处",
                  "state": {
                      "opened": true
                  }
              }
          ];

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

          $scope.role = {};
          $scope.role.roleName = "";
          $scope.role.roleCode = "";

          $scope.saveTree = function () {

              if ($scope.role.roleCode === undefined || $scope.role.roleCode == "" || $scope.role.roleName === undefined || $scope.role.roleName == "") {
                  Alert.error('请输入角色信息')
                  return;
              }

              var selected = $scope.treeObj.get_selected(true)
              if (selected === undefined || selected.length == 0) {
                  Alert.error('请选择菜单.')
                  return;
              }

              var opts = {};
              opts.url = '/crm/manage/addRole';
              opts.method = 'POST';
              opts.params = $scope.role;

              HttpService.linkHttp(opts).then(function(response) {

                  //////////////////////////////////////////
                  $scope.saveEnter() ;// XXXXXXXXXXXXXXXXXXXXXXXXX修改此处
                  //////////////////////////////////////////
                  $scope.saveDataAuth() ;// XXXXXXXXXXXXXXXXXXXXXXXXX修改此处
                  ///////////////////////////////
                  if (selected.length > 0) {
                      var roleMenuList = []
                      selected.forEach(function(value,index,array){
                          var roleMenuObj = new Object();
                          roleMenuObj.roleCode = $scope.role.roleCode
                          roleMenuObj.roleName = $scope.role.roleName
                          roleMenuObj.menuCode = value.id
                          roleMenuObj.menuName = value.text
                          roleMenuList.push(roleMenuObj)
                      });
                      $log.info(roleMenuList)

                      var opts = {};
                      opts.url = '/crm/manage/addMenuAuthByJson';
                      opts.method = 'PUT';
                      opts.params = {};
                      opts.data = roleMenuList;
                      HttpService.linkHttp(opts).then(function(response) {
                          Alert.success("请求成功");
                          $state.go('mgrcenter.authMgr',{});
                      });
                  }
              });
          }

          $scope.saveEnter = function () {
              if ($scope.tagList.length > 0) {
                  var roleEnterList = []
                  $scope.tagList.forEach(function(value,index,array){
                      var roleEnterObj = new Object();
                      roleEnterObj.roleCode = $scope.role.roleCode
                      roleEnterObj.enterCode = value.value
                      roleEnterList.push(roleEnterObj)
                  });
                  $log.info(roleEnterList)

                  var opts = {};
                  opts.url = '/crm/manage/auth/updateRoleEnterByJson'; // XXXXXXXXXXXXXXXXXXXXXXXXX修改此处
                  opts.method = 'PUT';
                  opts.params = {};
                  opts.data = roleEnterList;
                  HttpService.linkHttp(opts).then(function(response) {
                      // Alert.success("请求成功");
                  });
              }
          }

          function parseMap2Obj() {
              var keySet = $scope.dataAuthMap.keySet()
              var dataAuthObjList = []
              keySet.forEach(function(key,index,array){
                  var posTreeDemo = $.fn.zTree.getZTreeObj("posTreeDemo");
                  var fieldMap = $scope.dataAuthMap.get(key)
                  // if (fieldMap != '') { // 排除没有设置field数据
                      var subKeySet = fieldMap.keySet()
                      subKeySet.forEach(function(subKey,index,array){
                          var ruleList = fieldMap.get(subKey)
                          if (ruleList.length != 0) { // 排除没有设置rule的数据
                              if(ruleList.length > 1) { // 包含树的list
                                  for (var i=1;i<ruleList.length;i++) {
                                      var dataAuthObj = new Object();
                                      dataAuthObj.roleCode = $scope.role.roleCode
                                      dataAuthObj.tableCode = key
                                      dataAuthObj.fieldCode = subKey
                                      dataAuthObj.ruleCode = ruleList[0]
                                      if ($scope.constant.RULE_POSI_LIST_CODE == ruleList[0]) {
                                          var node = posTreeDemo.getNodeByParam("id", ruleList[i], null);
                                          dataAuthObj.matchCondition = node.getParentNode().id + '_' + ruleList[i];
                                      } else {
                                          dataAuthObj.matchCondition = ruleList[i];
                                      }
                                      // dataAuthObj.matchCondition = ruleList[i];
                                      if ($scope.constant.RULE_USER_CODE == ruleList[0]) {
                                          dataAuthObj.isContainChild = '=';
                                      } else {
                                          dataAuthObj.isContainChild = $scope.constant.IS_CONTAIN_CHILD;
                                      }
                                      dataAuthObjList.push(dataAuthObj);
                                  }
                              } else {
                                  var dataAuthObj = new Object();
                                  dataAuthObj.roleCode = $scope.role.roleCode
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

          $scope.saveDataAuth = function () {
              var roleDataAuthList = parseMap2Obj();

              if (roleDataAuthList.length > 0) {
                  var opts = {};
                  opts.url = '/crm/manage/auth/updateRoleDataByJson'; // XXXXXXXXXXXXXXXXXXXXXXXXX修改此处
                  opts.method = 'PUT';
                  opts.params = {};
                  opts.data = roleDataAuthList;
                  HttpService.linkHttp(opts).then(function(response) {
                      // Alert.success("请求成功");
                  });
              }

          }

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

          };

          function createNodeCB(e,item) {
              // alert('createNodeCB called');
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
          $scope.searchRoleMenu = function () {
              var opts = {};
              opts.url = '/crm/manage/getAllMenus';
              opts.method = 'GET';
              HttpService.linkHttp(opts).then(function(response) {

                  var treeItemList = []
                  response.data.forEach(function(value,index,array){
                      // if(value.pareMenuCode==""){
                      //     value.pareMenuCode="#"
                      // }
                      if(value.menuPareid=="" || value.menuPareid==null){
                          value.menuPareid="#"
                      }
                      var treeItem = {
                          "id": value.menuId,
                          "parent": value.menuPareid,
                          "type": "folder",
                          "text": value.menuTitle,
                          "state": {
                            "opened": false
                          }
                      }

                      // if(value.menuOrder!="0"){
                          treeItemList.push(treeItem);
                      // }
                  });

                  $scope.ignoreChanges = true;
                  $scope.treeData = treeItemList;
                  $scope.basicConfig.version++;
              });
          }
          // 页面初始化查询
          $scope.searchRoleMenu();

          $scope.backRole = function () {
              $state.go('mgrcenter.authMgr',{});
              // $location.path('/portrayal/perCusPortrayal').search({'custNo':custNo});
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

          $scope.dragDataZtreeTest = [
              {
                  "id": "nd1",
                  "pId": "#",
                  "name": "总公司"
              },
              {
                  "id": "nd2",
                  "pId": "nd1",
                  "name": "第一分公司"
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
                  "id": "nd5",
                  "pId": "nd2",
                  "name": "第三分理处"
              },
              {
                  "id": "nd6",
                  "pId": "nd1",
                  "name": "第二分公司"
              },
              {
                  "id": "nd7",
                  "pId": "nd6",
                  "name": "第四分理处"
              },
              {
                  "id": "nd8",
                  "pId": "nd6",
                  "name": "第五分理处"
              }
          ];

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

          $scope.dataAuthMap = new $scope.Map()

          //////////////////////////////////////////
          // 数据权限设置
          $scope.modifyDataAuth = function(tableCode) {
              // alert(tableCode)
              $scope.dataAuthMapKey = tableCode

              var modalInstance = $uibModal
                  .open({
                      animation : true,
                      keyboard : false,
                      backdrop : 'static',
                      templateUrl : 'app/pages/mgrcenter/authmgr/popupPages/addDataOpt.html',
                      size : 'midle-900',
                      controller : 'addDataOptCtrl',
                      scope : $scope,
                      resolve : {

                      }
                  });

              // $uibModal.close(result)
              // modalInstance.result.then(function(result) {
              //     alert('111')
              // }, function(reason) {
              //     // alert('222')
              // });
          }

          $scope.dataAuthDataGrid = function(){
              $scope.fieldMap = new $scope.Map()
              var opts = {};
              opts.url = '/crm/manage/auth/getAllTableList'; // 查询所有table
              opts.method = 'GET';
              HttpService.linkHttp(opts).then(function(response) {
                  $scope.dataAuthData = response.data;
                  // $scope.dataAuthData = dataAuthDataTemp
              });
          }
          $scope.dataAuthDataGrid()

          var dataAuthDataTemp = [
               {
                   tableCode: 1,
                   tableName: '客户协作人关联表'
               },
               {
                   tableCode: 2,
                   tableName: '我协作的商机列表'
               },
               {
                   tableCode: 3,
                   tableName: '我的个人客户列表'
               },
               {
                   tableCode: 4,
                   tableName: '客户列表'
               },
               {
                   tableCode: 5,
                   tableName: '部门协作人列表'
               }
           ];

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
              HttpService.linkHttp(opts).then(function(response) {
                  $scope.userInfo.userId = response.data.userId;
                  $scope.userInfo.deptCode = response.data.deptCode;
                  $scope.userInfo.posiCode = response.data.deptCode + '_' +response.data.posiCode;
              });
          }
          $scope.getUserInfo()
      });
})();
