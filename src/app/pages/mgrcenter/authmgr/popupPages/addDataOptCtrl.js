(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.addAuthMgr').controller(
			'addDataOptCtrl', addDataOptCtrl);
	/** @ngInject */
	function addDataOptCtrl($scope, $filter, $uibModal, $timeout, HttpService,
			toastr, EnumType, Alert) {

        // $scope.treeModel = {
        //     'orgTree':'',
        //     'enterTree':'',
        //     'posTree':''
        // }

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

        function initTreeDisable(){// 初始化不可单击节点
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
        }


        $scope.searchFields = function(){
            initTreeDisable();

            $scope.fieldMap = new $scope.Map()
            var opts = {};
            opts.url = '/crm/manage/auth/getFieldByTable'; // 根据tableCode查询field
            opts.method = 'GET'
            opts.params = {'tableCode':$scope.dataAuthMapKey};
            HttpService.linkHttp(opts).then(function(response) {
                console.log("请求成功");
                $scope.fields = response.data;
                // $scope.fields = fieldsTempData;
            });
        }
        $scope.searchFields()
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

        $scope.selfieldCode = ''
        $scope.beforefieldCode = ''

        $scope.clickFieldBtn = function(fieldCode){    // 单机field按钮 根据field.fieldCode查询type 列表
            getCurrentField(fieldCode);
            if($scope.beforefieldCode == '') {  // 当第一次单击field按钮时
                $scope.beforefieldCode = fieldCode
            } else {
                $scope.beforefieldCode = $scope.selfieldCode
            }
            $scope.selfieldCode = fieldCode

            if($scope.resDataType.value.id != '') {
                var ruleMapkey = $scope.beforefieldCode // 之前field

                $scope.fieldMap.remove(ruleMapkey)     // 清空 以后赋值在此处扩展

                if ($scope.resDataType.value.id == $scope.constant.RULE_DEPT_LIST_CODE) { // rule + org_tree
                    $scope.fieldMap.put(ruleMapkey,getTreeSelNode($scope.constant.RULE_DEPT_LIST_CODE));
                } else if ($scope.resDataType.value.id == $scope.constant.RULE_POSI_LIST_CODE) {// rule + pos_tree
                    $scope.fieldMap.put(ruleMapkey,getTreeSelNode($scope.constant.RULE_POSI_LIST_CODE));
                } else if ($scope.resDataType.value.id == $scope.constant.RULE_ENTER_LIST_CODE) {// rule + enter_tree
                    $scope.fieldMap.put(ruleMapkey,getTreeSelNode($scope.constant.RULE_ENTER_LIST_CODE));
                }  else {// rule
                    $scope.fieldMap.put(ruleMapkey,[$scope.resDataType.value.id]);
                }

            }

            var opts = {};
            opts.url = '/crm/manage/auth/getRuleType';     // 根据field.fieldCode查询type 列表
            opts.method = 'GET';
            opts.params = {'tableCode':$scope.dataAuthMapKey,'tableField':fieldCode};
            HttpService.linkHttp(opts).then(function(response) {
                console.log("请求成功");
                fieldChangeInit()
                $scope.itemArray = [];
                response.data.forEach(function (value) {
                    var ruleObj = {};
                    ruleObj.name = value.ruleName;
                    ruleObj.id = value.ruleCode;
                    $scope.itemArray.push(ruleObj)
                });
                console.log($scope.itemArray);
                // $scope.itemArray = itemArrayTemp;
            });
        }

        function fieldChangeInit() {
            ruleChangeInit();
            $scope.resDataType = { value: {id: '', name: '请选择...' }};
            $scope.current = "Hidden"   // 隐藏下拉树

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
            console.log($scope.fieldMap)

            if (obj.id == $scope.constant.RULE_DEPT_LIST_CODE) {
                $scope.current = "orgTreeDiv"
            } else if (obj.id == $scope.constant.RULE_POSI_LIST_CODE){
                $scope.current = "posTreeDiv"
            } else if (obj.id == $scope.constant.RULE_ENTER_LIST_CODE){
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

        $scope.resDataType = { value: {id: '', name: '请选择...' }};
        $scope.closeDataPage = function() {
            // 获取当前field下的rule数据
            if($scope.resDataType.value.id != '') {
                var ruleMapkey = $scope.selfieldCode // 当前field
                $scope.fieldMap.remove(ruleMapkey)     // 清空

                if ($scope.resDataType.value.id == $scope.constant.RULE_DEPT_LIST_CODE) { // rule + org_tree
                    $scope.fieldMap.put(ruleMapkey,getTreeSelNode($scope.constant.RULE_DEPT_LIST_CODE))
                } else if ($scope.resDataType.value.id == $scope.constant.RULE_POSI_LIST_CODE) {// rule + pos_tree
                    $scope.fieldMap.put(ruleMapkey,getTreeSelNode($scope.constant.RULE_POSI_LIST_CODE))
                } else if ($scope.resDataType.value.id == $scope.constant.RULE_ENTER_LIST_CODE) {// rule + enter_tree
                    $scope.fieldMap.put(ruleMapkey,getTreeSelNode($scope.constant.RULE_ENTER_LIST_CODE));
                } else {// rule
                    $scope.fieldMap.put(ruleMapkey,[$scope.resDataType.value.id]);
                }

            }
            $scope.dataAuthMap.remove($scope.dataAuthMapKey)     // 清空 以后赋值在此处扩展
            $scope.dataAuthMap.put($scope.dataAuthMapKey,$scope.fieldMap)
            $scope.$dismiss();
		}

        $scope.cancelDataPage = function() {
            $scope.fieldMap = new $scope.Map()
            $scope.$dismiss();
        }

		function getTreeSelNode(ruleCode) {
            var treeCode = '';
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
            return selTreeNode
        }

	}

})();
