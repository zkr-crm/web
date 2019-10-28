(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.authMgr').controller(
			'dataOptCtrl', dataOptCtrl);
	/** @ngInject */
	function dataOptCtrl($scope, $filter, $uibModal, $timeout, HttpService,
			toastr, EnumType, Alert) {

        $scope.treeModel = {
            'orgTree':'',
            'enterTree':'',
            'posTree':''
        }

        $scope.fieldObj = {
            'name':''
        }

        function getCurrentField(currentField) {
            $scope.fields.forEach(function (value) {
                if (currentField == value.fieldCode){
                    $scope.fieldObj.name = value.fieldName;
                }
            });
        }

        function initTreeDisable(){ // 初始化不可单击节点
            var treeDemo = $.fn.zTree.getZTreeObj("posTreeDemo");
            $scope.disabledZtree.forEach(function (value) {
                var node = treeDemo.getNodeByParam("id", value, null);
                treeDemo.setChkDisabled(node, true);
            });
            var orgTreeDemo = $.fn.zTree.getZTreeObj("orgTreeDemo");
            $scope.orgDisabledZtree.forEach(function (value) {
                var node = orgTreeDemo.getNodeByParam("id", value, null);
                orgTreeDemo.setChkDisabled(node, true);
            });
            // var enterTreeDemo = $.fn.zTree.getZTreeObj("enterTreeDemo");
            // $scope.enterDisabledZtree.forEach(function (value) {
            //     var node = enterTreeDemo.getNodeByParam("id", value, null);
            //     enterTreeDemo.setChkDisabled(node, true);
            // });
        }

        $scope.searchFields = function(){
            initTreeDisable();
            if(typeof($scope.dataAuthMap.get($scope.dataAuthMapKey)) != "undefined"){ // field已存在时 不重新实例化
                $scope.fieldMap = $scope.dataAuthMap.get($scope.dataAuthMapKey) ;
            } else {
                $scope.fieldMap = new $scope.Map()
            }
            // $scope.fieldMap = new $scope.Map()

            var opts = {};
            opts.url = '/crm/manage/auth/getFieldByTable'; // 根据tableCode查询field
            opts.method = 'GET'
            opts.params = {'tableCode':$scope.dataAuthMapKey};
            HttpService.linkHttp(opts).then(function(response) {
                $scope.fields = response.data;
                if ($scope.fields && $scope.fields.length > 0) {
                    $scope.clickFieldBtn($scope.fields[0].fieldCode);
                }
                // $scope.fields = fieldsTempData;
            });
        }
        $scope.searchFields();
        var fieldsTempData = [
            {
                fieldCode: 1,
                fieldName: '客户经理职位'
            },
            {
                fieldCode: 2,
                fieldName: '客户经理部门'
            },
            {
                fieldCode: 3,
                fieldName: '客服职位'
            },
            {
                fieldCode: 4,
                fieldName: '客服部门'
            }
        ];

        $scope.currentFieldCode = '';
        $scope.beforefieldCode = '';
        $scope.beforeRuleode = '';


        $scope.clickFieldBtn = function(fieldCode){    // 单机field按钮 根据field.fieldCode查询type 列表
            // alert('beforeRuleode => ' + $scope.beforeRuleode)
            // alert('resDataType.value.id => ' + $scope.resDataType.value.id)
            getCurrentField(fieldCode);

            $scope.currentFieldCode = fieldCode; // 当前 field
            if($scope.beforefieldCode != '') {  // 当第一次单击field按钮时 缓存中不保存操作行为数据
                if($scope.resDataType.value.id != 'default' || $scope.resDataType.value.id !='') { // 判断beforeRuleode值是非空时才做map数据保存操作
                    if ($scope.resDataType.value.id == $scope.constant.RULE_DEPT_LIST_CODE) { // rule + org_tree
                        $scope.fieldMap.put($scope.beforefieldCode,getTreeSelNode($scope.constant.RULE_DEPT_LIST_CODE));
                    } else if ($scope.resDataType.value.id == $scope.constant.RULE_POSI_LIST_CODE) {// rule + pos_tree
                        $scope.fieldMap.put($scope.beforefieldCode,getTreeSelNode($scope.constant.RULE_POSI_LIST_CODE));
                    } else if ($scope.resDataType.value.id == $scope.constant.RULE_ENTER_LIST_CODE) {// rule + enter_tree
                        $scope.fieldMap.put($scope.beforefieldCode,getTreeSelNode($scope.constant.RULE_ENTER_LIST_CODE));
                    }  else {// rule
                        $scope.fieldMap.put($scope.beforefieldCode,[$scope.resDataType.value.id]);
                    }
                } else {
                    $scope.fieldMap.put($scope.beforefieldCode,['default']);
                }
            }

            $scope.beforefieldCode = fieldCode;

            var opts = {};
            opts.url = '/crm/manage/auth/getRuleType';     // 根据field.fieldCode查询rule 列表
            opts.method = 'GET';
            opts.params = {'tableCode':$scope.dataAuthMapKey,'tableField':fieldCode};
            HttpService.linkHttp(opts).then(function(response) {
                $scope.itemArray = [];
                $scope.itemArray.push({id: 'default', name: '请选择...' })
                response.data.forEach(function (value) {
                    var ruleObj = {};
                    ruleObj.name = value.ruleName;
                    ruleObj.id = value.ruleCode;
                    $scope.itemArray.push(ruleObj)
                });
                // $scope.itemArray = itemArrayTemp;
                //////////////////  当map中有数据走map 没有数据走 db  ////////////////////
                $scope.resDataType = { value: {id: 'default', name: '请选择...' }};
                $scope.current = "Hidden"; // 防止下面没值 默认隐藏掉
                if(typeof($scope.fieldMap.get($scope.currentFieldCode)) != "undefined"){ // map非空时走map 否则走db
                    var bindData = $scope.fieldMap.get($scope.currentFieldCode)
                    var initLuleCode = bindData[0];
                    var initLuleName = '' ;
                    $scope.itemArray.forEach(function (value) {
                        if (initLuleCode == value.id) {
                            initLuleName = value.name;
                        }
                    });
                    fieldChangeInit(initLuleCode);
                    $scope.resDataType = { value: {id: initLuleCode, name: initLuleName }};

                    var treeNodeList = [];
                    for (var i=1;i<bindData.length;i++) {
                        treeNodeList.push(bindData[i]);
                    }


                    if (treeNodeList.length > 0 ) {
                        checkTreeNode(initLuleCode,treeNodeList)
                    }

                } else {
                    var opts = {};
                    opts.url = '/crm/manage/auth/getRoleDataByField';     // 绑定数据
                    opts.method = 'GET';
                    var param = {}
                    param.roleCode = $scope.roleObj.roleCode;
                    param.tableCode = $scope.dataAuthMapKey;
                    param.fieldCode = $scope.currentFieldCode;
                    opts.params = param;
                    HttpService.linkHttp(opts).then(function(response) {
                        if(response.data.length > 0 ){
                            var initLuleCode = response.data[0].ruleCode;
                            var initLuleName = '' ;
                            $scope.itemArray.forEach(function (value) {
                                if (initLuleCode == value.id) {
                                    initLuleName = value.name;
                                }
                            });
                            fieldChangeInit(initLuleCode);
                            $scope.resDataType = { value: {id: initLuleCode, name: initLuleName }};

                            var treeNodeList = [];
                            response.data.forEach(function (value) { //组装tree
                                if (initLuleCode == $scope.constant.RULE_DEPT_LIST_CODE || initLuleCode == $scope.constant.RULE_POSI_LIST_CODE || initLuleCode == $scope.constant.RULE_ENTER_LIST_CODE){
                                    treeNodeList.push(value.matchCondition);
                                }
                            });

                            if (treeNodeList.length > 0 ) {
                                checkTreeNode(initLuleCode,treeNodeList)
                            }
                        }
                    });
                }
            });
        }

        function checkTreeNode(ruleCode,treeNodeList) {
            var treeCode = '';
            // var textNameCode = '';
            if (ruleCode == $scope.constant.RULE_DEPT_LIST_CODE) {
                treeCode ="orgTreeDemo"
            } else if (ruleCode == $scope.constant.RULE_POSI_LIST_CODE) {
                treeCode ="posTreeDemo"
            } else if (ruleCode == $scope.constant.RULE_ENTER_LIST_CODE) {
                treeCode ="enterTreeDemo"
            }

            // (ruleCode == $scope.constant.RULE_DEPT_LIST_CODE)? textNameCode ="orgTreeSelect" : textNameCode = "posTreeSelect";
            // if (ruleCode == $scope.constant.RULE_DEPT_LIST_CODE) {
            //     $scope.current = "orgTreeDiv"
            // } else if (ruleCode == $scope.constant.RULE_POSI_LIST_CODE){
            //     $scope.current = "posTreeDiv"
            // } else if (ruleCode == $scope.constant.RULE_ENTER_LIST_CODE){
            //     $scope.current = "enterTreeDiv"
            // } else {
            //     $scope.current = "Hidden"
            // }

            var treeDemo = $.fn.zTree.getZTreeObj(treeCode);
            var v = "";
            treeNodeList.forEach(function (value) {
                var node = treeDemo.getNodeByParam("id", value, null);
                v += node.name + ",";
                treeDemo.checkNode(node, true, false);
            });
            if (v.length > 0 ) v = v.substring(0, v.length-1);

            if (ruleCode == $scope.constant.RULE_DEPT_LIST_CODE) {
                $scope.treeModel.orgTree = v ;
            } else if (ruleCode == $scope.constant.RULE_POSI_LIST_CODE) {
                $scope.treeModel.posTree = v ;
            } else if (ruleCode == $scope.constant.RULE_ENTER_LIST_CODE) {
                $scope.treeModel.enterTree = v ;
            }

            // var cityObj = $("#" + textNameCode);
            // cityObj.attr("value", v);
        }

        function fieldChangeInit(ruleCode) {
            ruleChangeInit();
            // $scope.current = "Hidden"   // 隐藏下拉树
            if (ruleCode == $scope.constant.RULE_DEPT_LIST_CODE) {
                $scope.current = "orgTreeDiv"
            } else if (ruleCode == $scope.constant.RULE_POSI_LIST_CODE){
                $scope.current = "posTreeDiv"
            } else if (ruleCode == $scope.constant.RULE_ENTER_LIST_CODE){
                $scope.current = "enterTreeDiv"
            } else {
                $scope.current = "Hidden"
            }
        }

        function ruleChangeInit(){
            var orgTreeDemo = $.fn.zTree.getZTreeObj("orgTreeDemo");
            var posTreeDemo = $.fn.zTree.getZTreeObj("posTreeDemo");
            var enterTreeDemo = $.fn.zTree.getZTreeObj("enterTreeDemo");
            orgTreeDemo.checkAllNodes(false);
            posTreeDemo.checkAllNodes(false);
            enterTreeDemo.checkAllNodes(false);
            orgTreeDemo.expandAll(false);
            posTreeDemo.expandAll(false);
            enterTreeDemo.expandAll(false);
        }

        $scope.current = "Hidden"
        $scope.showTreeInfo = function (obj) {  // rule_code 变更是触发
            ruleChangeInit();
            var ruleCode = obj.id ;
            if (ruleCode == $scope.constant.RULE_DEPT_LIST_CODE) {
                $scope.current = "orgTreeDiv"
            } else if (ruleCode == $scope.constant.RULE_POSI_LIST_CODE){
                $scope.current = "posTreeDiv"
            } else if (ruleCode == $scope.constant.RULE_ENTER_LIST_CODE){
                $scope.current = "enterTreeDiv"
            } else {
                $scope.current = "Hidden"
            }
        }

        var itemArrayTemp= [
            {id: '1001', name: 'in 组织列表' },
            {id: '1002', name: 'in 登录人组织' },
            {id: '1003', name: 'in 职位列表' },
            {id: '1004', name: 'in 登录人职位' },
            {id: '1005', name: '等于登录人' }];

        $scope.resDataType = { value: {id: 'default', name: '请选择...' }};
        $scope.closeDataPage = function() {

            if($scope.currentFieldCode != '') {  // 跳过直接关闭
                if($scope.resDataType.value.id != 'default'  || $scope.resDataType.value.id !='') { // 判断rule值是非空时才做map数据保存操作
                    // 保存当前field下数据
                    if ($scope.resDataType.value.id == $scope.constant.RULE_DEPT_LIST_CODE) { // rule + org_tree
                        $scope.fieldMap.put($scope.currentFieldCode,getTreeSelNode($scope.constant.RULE_DEPT_LIST_CODE));
                    } else if ($scope.resDataType.value.id == $scope.constant.RULE_POSI_LIST_CODE) {// rule + pos_tree
                        $scope.fieldMap.put($scope.currentFieldCode,getTreeSelNode($scope.constant.RULE_POSI_LIST_CODE));
                    } else if ($scope.resDataType.value.id == $scope.constant.RULE_ENTER_LIST_CODE) {// rule + enter_tree
                        $scope.fieldMap.put($scope.currentFieldCode,getTreeSelNode($scope.constant.RULE_ENTER_LIST_CODE));
                    } else {// rule
                        $scope.fieldMap.put($scope.currentFieldCode,[$scope.resDataType.value.id]);
                    }
                } else {
                    $scope.fieldMap.put($scope.beforefieldCode,['default']);
                }

                $scope.dataAuthMap.remove($scope.dataAuthMapKey)     // 清空 以后赋值在此处扩展
                $scope.dataAuthMap.put($scope.dataAuthMapKey,$scope.fieldMap);

                ///////////////////////////////////////////////////////
                var roleDataAuthList = parseFieldMap2Obj();
                // return
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
            $scope.$dismiss();
		}

        function parseFieldMap2Obj() {
            // var keySet = $scope.dataAuthMap.keySet()
            var dataAuthObjList = []
            // keySet.forEach(function(key,index,array){
                var posTreeDemo = $.fn.zTree.getZTreeObj("posTreeDemo");
            //     var fieldMap = $scope.dataAuthMap.get(key);
            //     // if (fieldMap != '') { // 排除没有设置field数据
                var subKeySet = $scope.fieldMap.keySet()
                subKeySet.forEach(function(subKey,index,array){
                    var ruleList = $scope.fieldMap.get(subKey)
                    if (ruleList.length != 0) { // 排除没有设置rule的数据
                        if(ruleList.length > 1) { // 包含树的list
                            for (var i=1;i<ruleList.length;i++) {
                                var dataAuthObj = new Object();
                                dataAuthObj.roleCode = $scope.roleObj.roleCode
                                dataAuthObj.tableCode = $scope.dataAuthMapKey
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
                            dataAuthObj.tableCode = $scope.dataAuthMapKey;
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
                // });
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

        $scope.cancelDataPage = function() {
            $scope.fieldMap = new $scope.Map()
            $scope.$dismiss();
        }

		function getTreeSelNode(ruleCode) {
            var treeCode = '';
            // (ruleCode == $scope.constant.RULE_DEPT_LIST_CODE)? treeCode ="orgTreeDemo" : treeCode = "posTreeDemo";
            if (ruleCode == $scope.constant.RULE_DEPT_LIST_CODE) {
                treeCode ="orgTreeDemo"
            } else if (ruleCode == $scope.constant.RULE_POSI_LIST_CODE) {
                treeCode ="posTreeDemo"
            } else if (ruleCode == $scope.constant.RULE_ENTER_LIST_CODE) {
                treeCode ="enterTreeDemo"
            }

            var treeDemo = $.fn.zTree.getZTreeObj(treeCode),
                treeNodes = treeDemo.getCheckedNodes(true);

            var selTreeNode = []
            selTreeNode.push(ruleCode)
            for (var i=0, l=treeNodes.length; i<l; i++) {
                selTreeNode.push(treeNodes[i].id)
            }
            if (selTreeNode.length == 0) {
                selTreeNode.push('default');
            }
            return selTreeNode
        }

	}

})();
