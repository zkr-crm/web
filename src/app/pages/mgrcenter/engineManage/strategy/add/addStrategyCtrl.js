(function() {
    'use strict';

    angular.module('mgrcenter.engineManage.strategy.add').controller(
        'addStrategyCtrl', addStrategyCtrl);
    /** @ngInject */
    function addStrategyCtrl($scope,$sce,$log,$state, toastr, toastrConfig,$compile, $uibModal, $filter, $timeout, $http,
                             HttpService, EnumType, Alert) {
        $scope.test = function (id) {
           // alert(id);
        }

        $scope.options = {
            autoDismiss: false,
            positionClass: 'toast-top-center',
            type: 'success',
            timeOut: '900',
            extendedTimeOut: '2000',
            allowHtml: false,
            closeButton: false,
            tapToDismiss: true,
            progressBar: false,
            newestOnTop: true,
            maxOpened: 0,
            preventDuplicates: false,
            preventOpenDuplicates: false,
            title: "Some title here",
            msg: "Type your message here"
        };


        $scope.rootNode = {name:'temp_tree'};

        $scope.strategyAdd = {
            treeFlag:true,
            index:1,
            constant : {
                BASIS_FACTOR:0,
                COMPLEX_FACTOR:1
            },
            init:function(){
                $scope.searchBaseRule();
                this.loadFactor();
                // $scope.strategyAdd.initTree();
                // this.check();
            },
            initTree:function () {
                var myChart = echarts.init(document.getElementById('testEcharts'));
                var option = {
                    title : {
                        text: '',
                        subtext: ''
                    },
                    calculable : false,

                    series : [
                        {
                            name:'树图',
                            type:'tree',
                            top: '1%',
                            left: '17%',
                            bottom: '1%',
                            right: '20%',
                            layout:'layout',
                            orient: 'horizontal',  // vertical horizontal
                            symbol:'rect', // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                            symbolSize:[150, 40],
                            initialTreeDepth:-1,
                            label: {
                                show: true,
                                position:'inside',
                                formatter: "{b}",
                                color:'#000000',
                                fontWeight:'bolder'
                            },
                            lineStyle: {
                                color: '#48b',
                                shadowColor: '#000',
                                shadowBlur: 3,
                                shadowOffsetX: 3,
                                shadowOffsetY: 5,
                                type: 'curve' // 'curve'|'broken'|'solid'|'dotted'|'dashed'
                            },
                            itemStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: 'blue' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: 'blue' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                },
                                borderColor:'#929292'
                            },
                            /*label:{
                            	color:"#fff"
                            },*/
                            data: [$scope.rootNode]
                        }
                    ]
                };
                myChart.setOption(option);

                myChart.on('click', function (params) {
                    // 控制台打印数据的名称
                });
            },
            addRow:function(items){
                var exists = false;
                var rowid = items.combineRuleId;
                //表里是否存在
                $("#combineRuleTable",parent.document).find("tr").each(function(){
                    if($(this).attr("id")==rowid){
                        // var name = $("#"+rowid).children().eq(3).html();
                        Alert.error("組合规则: "+items.combineRuleName+"已经存在！");
                        exists = true;
                        return;
                    }
                })

                var index = $scope.strategyAdd.index;
                if(rowid&&!exists){
                    var rowObject = items;
                    var row = "<tr id='"+rowid+"' exp='"+rowObject.combineExpression+"' order='CR"+index+"' combineRuleName="+rowObject.combineRuleName+">"
                        + "<td align='center'>CR"+index+"</td>"
                        + "<td align='left'>"+rowObject.combineRuleName+"</td>"
                        + "<td align='left'>"+rowObject.remark+"</td>"
                        + "<td align='center' class='text-danger'>"
                        // + "<button type='button' class='btn btn-sm btn-primary' ng-click='strategyAdd.viewBaseRule(\""+rowid+"\")'><!--<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>-->查看</button>"
                        + "<i  class='fa fa-trash-o' style='font-size:20px;' ng-click='strategyAdd.deleteRow(\""+rowid+"\")'></i>"
                        + "</td>"
                        + "</tr>";

                    var $row = $compile(row)($scope);
                    $("#combineRuleTable tr:last").after($row);
                    $scope.strategyAdd.index = index + 1;
                }
                $scope.strategyAdd.itemDragInit($("#combineRuleTable .drag-item:last"));
                $scope.strategyAdd.updateTree(items)
            },
            updateTree:function(items){

                if($scope.strategyAdd.treeFlag) { // 第一次初始化
                    $scope.strategyAdd.initTree();
                }

                if(!!$scope.saveObj.strategyName){
                    $scope.rootNode.name = $scope.saveObj.strategyName;
                }

                //组合规则集合
                var combineRulesList = [];
                $.each($("#combineRuleTable tr:gt(0)"), function (index, domEle) {
                    combineRulesList.push({
                        combineRuleId:$(this).attr("id"),
                        combineRuleName:$(this).attr("combineRuleName")
                    });
                });

                if(!!combineRulesList.length || combineRulesList.length>0){
                    var opts = {};
                    opts.url = '/crm/manage/engine/combineRule/findRelationsList';
                    opts.method = 'POST';
                    opts.params = {};
                    opts.data = combineRulesList;
                    HttpService.linkHttp(opts).then(function(response) {
                        if (response.status=="1"){
                            // response.data.name = items.combineRuleName;
                            $scope.rootNode['children'] = [response.data];

                            var myChart = echarts.init(document.getElementById('testEcharts'));
                            myChart.setOption({
                                series: [{
                                    // 根据名字对应到相应的系列
                                    data: [$scope.rootNode]
                                }]
                            });
                        }
                    });
                }

            },
            /**
             * 更新因子表达式的译文
             */
            updateTranslation:function() {
                $("#remark").val("");
                $(".sortable > *").each(function(){
                    var exp = $(this).find("[exp]").attr("exp");
                    var translation =  $("#combineRuleTable span:contains('"+exp+"')").closest("td").next().next().html();
                    translation = (translation||"").replace(/\&lt;/g, '<').replace(/\&gt;/g, '>').replace(/\&amp;/g, '&') || exp;
                    $("#remark").val($("#remark").val() +" "+ translation);
                });
            },

            /**
             * 关闭弹窗操作,增加一行基本规则
             * @param rowObject
             */
            closeBRWindow: function (id) {
                var exists = false;
                $("#combineRuleTable",parent.document).find("tr").each(function(){
                    if($(this).attr("id")==id){
                        parent.layer.alert("基本规则已经存在！",{icon:2});
                        exists = true;
                        return;
                    }
                })

                var index = $scope.strategyAdd.index;
                if(id&&!exists){
                    var rowObject = $("#jqGrid").jqGrid('getRowData', id);
                    var row = "<tr id='"+id+"' exp='"+rowObject.expression+"' order='BR"+index+"'>"
                        + "<td align='center'>BR"+index+"</td>"
                        + "<td align='center'>"+rowObject.ruleName+"</td>"
                        + "<td align='center'>"+rowObject.remark+"</td>"
                        + "<td align='center'>"+rowObject.creater+"</td>"
                        + "<td align='center' class='text-danger'>"
                        + "<button type='button' class='btn btn-danger btn-sm' onclick='javascript:strategyAdd.deleteRow(\""+id+"\")'><!--<span class='glyphicon glyphicon-remove' aria-hidden='true'>--></span>删除</button></td>"
                        + "</tr>";
                    $("#combineRuleTable",parent.document).append(row);

                    parent.window.strategyAdd.index = index + 1;
                    var layerIndex = parent.layer.getFrameIndex(window.name);
                    parent.layer.close(layerIndex);
                }
            },
            //关闭窗口
            closeWin:function(){
                var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
                parent.layer.close(index);
            },
            loadFactor: function () {

                var opts = {};
                opts.url = '/crm/manage/engine/findAllScene';
                opts.method = 'GET';
                HttpService.linkHttp(opts).then(function(response) {
                    $scope.strategyAdd.ruleFactor = response.data;
                    var treeItemList = [];
                    // var selectOption = "";
                    response.data.forEach(function(value,index,array){

                        if(value.pId==""){
                            value.pId="#"
                        }

                        var treeItem = {
                            id: value.id,
                            pId: value.pId,
                            // icon:img_url,
                            name: value.name
                        }

                        treeItemList.push(treeItem);
                        // selectOption += "<option value='"+value.factorId+"' name='"+value.factorName+"' operateType='"+value.operateType+"' valueType='"+value.valueType+"'>"+value.displayName+"</option>";
                    });
                    // var $selectOption = $compile(selectOption)($scope);
                    // $("#factorName_select").append(selectOption);
                    $.fn.zTree.init($("#factorTree"), setting, treeItemList);
                    console.log(treeItemList);
                    // $scope.ignoreChanges = true;
                    // $scope.treeData = treeItemList;
                    // $scope.basicConfig.version++;
                });
            },
            deleteRow: function (id) {
                Alert.confirm("确定删除？").then(function() {
                    $(".oc_tags").empty();
                    $("#"+id).nextAll().each(function () {
                        var newOrder = $(this).attr("order").substr(2)-1;
                        $(this).attr("order","CR"+newOrder);
                        $(this).children().first().html("CR"+newOrder)
                    })
                    $("#"+id).remove();
                    $scope.strategyAdd.index = $scope.strategyAdd.index - 1
                });
            },
            /**
             * 将一行基本规则添加到列表中
             * @param rowObj
             */
            addExistRow: function (rowObj) {
                var row = "<tr id='"+rowObj.base_rule_id+"' exp='"+rowObj.base_rule_order+"' order='"+rowObj.base_rule_order+"' >"
                    + "<td align='center'>"
                    + "<button type='button' class='btn btn-sm btn-default dropdown-toggle drag-item' onclick='strategyAdd.addExp(this)'>" +
                    "<span exp='"+rowObj.base_rule_order+"'>"+rowObj.base_rule_order+"</span>" +
                    "</button>"
                    + "</td>"
                    + "<td align='left'>"+rowObj.rule_name+"</td>"
                    + "<td align='left'>"+rowObj.remark+"</td>"
                    + "<td align='center' class='text-danger'>"
                    + "<button type='button' class='btn btn-sm btn-primary' onclick='javascript:strategyAdd.viewBaseRule(\""+rowObj.base_rule_id+"\")'>查看</button>"
                    + "<button type='button' class='btn btn-sm btn-danger' onclick='javascript:strategyAdd.deleteRow(\""+rowObj.base_rule_id+"\")'>删除</button>"
                    + "</tr>";
                $("#combineRuleTable").append(row);
                this.itemDragInit($("#combineRuleTable .drag-item:last"));
                this.index++;
            },
            /**
             * 将表达式解析成html代码
             * (R1&&R2)||R3
             * @param expression
             */
            compileExp: function (expression) {
                var dom = "<div class='oc_tag'><span exp='$1'>$1</span>" +
                    "<div style='display: none;' class='oc_tag_remove'>X</div>" +
                    "<div style='clear: both;'></div>" +
                    "</div>";
                var reg = [
                    new RegExp("(BR\\d+)","gmi"),//因子
                    new RegExp("(\\()","gmi"),//左括号
                    new RegExp("(\\))","gmi"),//右括号
                    new RegExp("(\\&\\&)","gmi"),
                    new RegExp("(\\|\\|)","gmi")
                ]
                $.each(reg,function(i){
                    expression = expression.replace(reg[i],dom);
                })
                $(".oc_tags").html(expression);
                this.addHoverEffet($(".oc_tag"))
                this.addRemoveEffect($(".oc_tag_remove"))
            },
            /**
             * 增加表达式
             */
            addExp: function (obj) {
                var span = $(obj).html();

                var expStr = "<div class='oc_tag'>"
                    + span
                    + "<div class='oc_tag_remove'>X</div>"
                    + "<div style='clear: both;'></div>"
                    + "</div>"

                $(".oc_tags").append(expStr);
                this.addHoverEffet($(".oc_tag"))
                this.addRemoveEffect($(".oc_tag_remove"))

                this.updateTranslation();
            },
            addHoverEffet:function(obj){
                obj.unbind();
                obj.hover(function(){
                    $(this).find(".oc_tag_remove").show();
                },function(){
                    $(this).find(".oc_tag_remove").hide();
                })
            },
            addRemoveEffect:function(obj){
                obj.unbind();
                obj.bind("click",function(){
                    $(this).parent().remove();
                    $scope.strategyAdd.updateTranslation();
                })
            },
            /**
             * 校验规则配置是否合法
             * 1、构建规则表达式
             * 2、发送到后台通过drools的build方法
             */
            checkExp:function(){
                var result = false;
                //基本规则集合
                var baseRules = [];
                $.each($("#combineRuleTable tr:gt(0)"), function (index, domEle) {
                    baseRules.push({
                        base_rule_order:$(this).attr("order"),
                        id:$(this).attr("id"),
                        expression:$(this).attr("exp")
                    });
                })

                //组合规则表达式
                var expression = "";
                $.each($(".oc_tags").children(),function(i,obj){
                    expression += $(obj).children().first().attr("exp") + " ";
                })

                //请求后台，校验规则
                $.ajax({
                    url:$ROOT+"rule_combine_rule/compileRule",
                    async:false,
                    data:{
                        "baseRules":JSON.stringify(baseRules),
                        "exp":expression
                    },
                    success: function(data){
                        if (data.rst=="SUCCESS"){
                            result = true;
                        }else{
                            result = false;
                        }
                    }
                });

                return result;
            },

            /**
             * 保存组合规则
             */
            save: function () {

                // 判断场景是否选择
                var zTree = $.fn.zTree.getZTreeObj("factorTree"),
                    nodes = zTree.getCheckedNodes(true);
                if (nodes.length == 0) {
                    Alert.error('场景不能为空.')
                    return;
                }

                var v = "";
                for (var i=0, l=nodes.length; i<l; i++) {
                    // if(nodes[i].level == 1) { // 排除根节点
                        v += nodes[i].id + ",";
                    // }
                }
                if (v.length > 0) {
                    v = v.substring(0, v.length - 1);
                }

                console.log($scope.saveObj);

                // 模型名称不能为空
                if(!$scope.saveObj.strategyName){
                    Alert.error('模型名称不能为空.')
                    return;
                }
                // 核查动作不能为空
                // if(!$scope.saveObj.strategyAction){
                //     Alert.error('核查动作不能为空.')
                //     return;
                // }
                // $scope.saveObj.channel = v;

                //组合规则集合
                var combineRules = [];
                $.each($("#combineRuleTable tr:gt(0)"), function (index, domEle) {
                    combineRules.push({
                        combine_order:$(this).attr("order"),
                        combine_rule_id:$(this).attr("id"),
                        combine_expression:$(this).attr("exp")
                    });
                })
                if(!combineRules.length){
                    Alert.error('请选择组合规则！')
                    return;
                }

                var opts = {};
                opts.url = '/crm/manage/engine/checkStrategyName';
                opts.method = 'GET';
                opts.params = {'strategyName':$scope.saveObj.strategyName};
                HttpService.linkHttp(opts).then(function(response) {
                    console.log(response.data);
                    if(response.data != "0"){// 校验名称是否重复
                        Alert.error('模型名称已存在.');
                        return;
                    } else {

                        //3 请求后台，校验规则
                        var opts = {};
                        opts.url = '/crm/manage/engine/compileStrategyRule';
                        opts.method = 'POST';
                        opts.params = {};
                        opts.data = combineRules;
                        HttpService.linkHttp(opts).then(function(response) {
                            // Alert.success("请求成功");
                            if (response.data=="0"){
                                Alert.error('校验规则失败.')
                                return ;
                            } else {

                                //校验所选因子是否全部应用到表达式中
                                var strategyObj = {};
                                strategyObj.strategyName = $scope.saveObj.strategyName
                                // strategyObj.strategyAction = $scope.saveObj.strategyAction.value;
                                // if(!!$scope.saveObj.postAction){
                                //     strategyObj.postAction = $scope.saveObj.postAction.value;
                                // }
                                // if(!!$scope.saveObj.warnLevel){
                                //     strategyObj.warnLevel = $scope.saveObj.warnLevel.value;
                                // }
                                // if(!!$scope.saveObj.priority){
                                //     strategyObj.priority = $scope.saveObj.priority.value;
                                // }
                                if(!!$scope.saveObj.remark){
                                    strategyObj.remark = $scope.saveObj.remark;
                                }
                                strategyObj.channel = v;
                                var opts = {};
                                opts.url = '/crm/manage/engine/saveStra';
                                opts.method = 'POST';
                                opts.params = strategyObj;
                                opts.data = combineRules;
                                HttpService.linkHttp(opts).then(function(response) {
                                    if (response.status == "1") {
                                        // Alert.success("请求成功");
                                        $scope.options.type = 'success';
                                        angular.extend(toastrConfig, $scope.options);
                                        toastr[$scope.options.type]('保存成功!', '');
                                        $scope.backRole();
                                    } else {
                                        $scope.options.type = 'error';
                                        $scope.options.timeOut = '2000';
                                        angular.extend(toastrConfig, $scope.options);
                                        toastr[$scope.options.type](response.message,'保存失败!');
                                    }
                                });

                            }
                        });
                    }
                });



            },
            addBracket: function(expression) {
                expression = $.trim(expression);
                if(expression.substring(0, 1) != '(' || expression.substring(expression.length-1, expression.length) != ')'){
                    expression = '(' + expression + ')';
                }

                $scope.strategyAdd.compileExp(expression);
                $scope.strategyAdd.updateTranslation();

                return  expression;
            },
            /**
             * 修改组合规则
             */
            update: function () {
                //加载等待层，可防止重复提交
                layer.load();
                //校验
                if(!$("#addFrom").valid()){
                    //关闭等待层，返回
                    layer.closeAll();
                    return;
                };

                //获取基本参数
                var combineRuleName = $.trim($("#combineRuleName").val());
                var remark = $("#remark").val();
                var riskFeature = $("#riskFeature").val();

                if(combineRuleName==""){
                    layer.closeAll();
                    parent.layer.alert('规则名称不能为空！',{icon: 2});
                    return;
                }

                if(!this.checkName()){
                    layer.closeAll();
                    layer.alert('规则名称已经存在！',{icon: 2});
                    return;
                }

                //校验规则内容
                if(!this.checkExp()){
                    layer.closeAll();
                    layer.alert('规则校验失败！',{icon: 2});
                    return;
                }
                //获取基本参数
                var combineRuleId = $("#combineRuleId").val()

                //基本规则集合
                var baseRules = [];
                var hasUnUsed = false;
                var unUsedBR = [];
                $.each($("#combineRuleTable tr:gt(0)"), function (i, domEle) {
                    if(!$(".oc_tags span:contains('BR"+(i+1)+"')").size()){
                        unUsedBR.push('【BR'+unUsedBR+'】');
                        hasUnUsed = true;
                    }
                    baseRules.push({
                        base_rule_order:$(this).attr("order"),
                        base_rule_id:$(this).attr("id")
                    });
                })
                if(hasUnUsed){
                    layer.closeAll();
                    layer.alert('规则'+unUsedBR.join(',')+'未被使用！',{icon: 2});
                    return;
                }

                //获取表达式内容
                var expression = ""
                $.each($(".oc_tags").children(),function(i,obj){
                    var span = $(obj).children().first();
                    expression += $(span).attr("exp") + " ";
                });

                expression =  strategyAdd.addBracket(expression);

                if(!$.trim(expression)){
                    //关闭等待层，返回
                    layer.closeAll();
                    layer.alert('请输入表达式内容！',{icon: 2});
                    return;
                }

                //请求后台，提交数据
                $.post($ROOT+"rule_combine_rule/updateRule",{
                    "combineRuleId":combineRuleId,
                    "combineRuleName":combineRuleName,
                    "remark":$("#remark").val(),
                    "riskFeature":riskFeature,
                    "combineExpression":expression,
                    "baseRulesStr":JSON.stringify(baseRules)
                },function (data) {
                    if (data.rst=="SUCCESS"){
                        //关闭等待层，返回
                        layer.closeAll();
                        layer.msg('保存成功',{
                            time: 2000
                        }, function(){
                            $.linkTo("/rule/combinerule/combine_rule_list");
                            strategyAdd.closeWin();
                        });
                    }else{
                        //关闭等待层，返回
                        layer.closeAll();
                        layer.msg('保存失败！');
                    }
                },"json")
            },
            check: function () {
                //校验
                // $("#addFrom").validate({
                //     rules: {
                //         combineRuleName: {
                //             required: true,
                //             minlength: 2,
                //             maxlength:100
                //         }
                //         /*,
                //         remark: {
                //             required: true,
                //             minlength: 2,
                //             maxlength:50
                //         },
                //         riskFeature: {
                //             required: true,
                //             minlength: 2,
                //             maxlength:100
                //         }*/
                //     },
                //     messages: {
                //         combineRuleName: {
                //             required: "请输入规则名称",
                //             minlength: "名称不能少于2个字符",
                //             maxlength:"名称不能多于100个字符"
                //         }
                //         /*,
                //         remark: {
                //             required: "请输入备注内容",
                //             minlength: "名称不能少于2个字符",
                //             maxlength:"名称不能多于50个字符"
                //         },
                //         riskFeature: {
                //             required: "请输入风险特征",
                //             minlength: "名称不能少于2个字符",
                //             maxlength:"名称不能多于50个字符"
                //         }*/
                //     },
                //     errorElement: "em",
                //     errorPlacement: function (error, element) {
                //         error.addClass("text-danger");
                //         if (element.prop("type") === "checkbox") {
                //             error.insertAfter(element.parent("label"));
                //         } else {
                //             error.insertAfter(element);
                //         }
                //     }
                // });
            },
            checkName: function () {
                var result;
                var ruleName = $.trim($("#combineRuleName").val());
                var ruleId = $.trim($("#combineRuleId").val());
                $.ajax({
                    url:$ROOT+"rule_combine_rule/checkName",
                    async:false,
                    data:{
                        ruleName:ruleName,
                        ruleId:ruleId
                    },
                    type:"post",
                    success: function(data){
                        result = data;
                    }
                });
                return result;
            },
            /**
             * 基本规则搜索
             */
            formatters:{
                formatOperate: function (cellvalue, options, rowObject) {
                    return "<button type='button' class='btn btn-sm btn-primary' " +
                        "onclick='javascript:strategyAdd.closeBRWindow(\""+rowObject.id+"\")'>" +
                        "<span class='glyphicon glyphicon-plus' aria-hidden='true'></span>&nbsp;&nbsp;选择</button>";
                }
            },
            /**
             * Html编码获取Html转义实体
             * @param value
             * @returns {*|jQuery}
             */
            htmlEncode:function(value){
                return $('#temp').text(value).html();
            },
            /**
             * Html解码获取Html实体
             * @param value
             * @returns {*|jQuery}
             */
            htmlDecode:function(value){
                return $('#temp').html(value).text();
            },
            itemDragInit:function(dom){
                $(dom).draggable({
                    revert : true,
                    deltaX : 5,
                    deltaY : 5,
                    proxy : function(source) {
                        var n = $('<div class="proxy btn btn-sm"></div>');
                        n.html($.trim($(source).find(":first").text() || $(source).text())).appendTo('body');
                        return n;
                    }
                });
            },
            keyDown:function(e) {
                var ev= window.event||e;
                if (ev.keyCode == 13) {
                    e.preventDefault();
                }
            }
        }


        /////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////   新页面 代码     ///////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////// tree start ////////////////////////////////////////////
        // var setting = {
        //     view: {
        //         showIcon: false,
        //         fontCss : {"font-weight": "bold",color:"#6a6a6a"}
        //     },
        //     data: {
        //         simpleData: {
        //             enable: true
        //         }
        //     },
        //     callback: {
        //         onDblClick: onDblClick
        //     }
        // };

        var setting = {
            check: {
                enable: true,
                chkStyle: "radio"
                // chkboxType: {  "Y": "s", "N": "s"  }
            },
            view: {
                showIcon: false,
                fontCss : {"font-weight": "bold",color:"#6a6a6a"},
                dblClickExpand: true
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                onDblClick: onDblClick
            }
        };

        function onDblClick(event, treeId, treeNode) {
            alert(selected.node.id + ' ==> ' + selected.node.text);
        }

        var ztreeDefaultData = [
            {id: "n1", pId: "#", name: "基础因子"},
            {id: "n2", pId: "#", name: "复杂因子"}
        ];

        //////////////////////////////// tree start ////////////////////////////////////////////
        ////////////////////////////////////////////////////////////  search start /////////////////////////////////////
        ////////////////////////////////////////////////////////////  search start /////////////////////////////////////
        // 查询条件对象
        $scope.searchObj = {};
        $scope.smartTablePageSize = 5;

        $scope.isUsed = {};
        // $scope.isUsed = {};
        $scope.itemArray = [
            {id: '-1', name: '全部'},
            {id: '1', name: '是' },
            {id: '0', name: '否' }];

        $scope.saveObj = {}; // save obj

        $scope.standardItem = {};
        $scope.standardSelectItems = [
            {label: 'Option 1', value: 1},
            {label: 'Option 2', value: 2},
            {label: 'Option 3', value: 3},
            {label: 'Option 4', value: 4}
        ];

        $scope.strategyAction = [
            {label: '电话核实', value: "RMT0002"},
            {label: '联网核查', value: "RMT0004"}
        ];
        $scope.postAction = [
            {label: '设备进高可疑名单', value: "01"},
            {label: '设备进低可疑名单', value: "02"}
        ];
        $scope.warnLevel = [
            {label: '低', value: "1"},
            {label: '中', value: "2"},
            {label: '高', value: "3"}
        ];
        $scope.fireTime = [
            {label: 'T+0', value: "0"},
            {label: 'T+1', value: "1"}
        ];




        // 查看规则
        $scope.viewRule = function(item) {
            Alert.error('施工中...');
            return;
            ////////////////////
            $scope.userInfo = item;
            $uibModal
                .open({
                    animation : true,
                    backdrop : 'static',
                    templateUrl : 'app/pages/mgrcenter/usermanagement/popupPages/roleAuth.html',
                    size : 'lg',
                    controller : 'roleAuthCtrl',
                    scope : $scope,
                    resolve : {

                    }
                });
        }

        // 查询事件
        $scope.searchBaseRule = function() {

            var opts = {};
            opts.url = '/crm/manage/engine/getAllCombineRuleByEntity';
            opts.method = 'GET';
            if(!!$scope.isUsed.value){
                $scope.searchObj.isUsed = $scope.isUsed.value.id;
            }
            opts.params = $scope.searchObj;
            HttpService.linkHttp(opts).then(function(response) {
                console.log("请求成功");
                console.log(response.data);
                $scope.BaseRuleRowCollection = []  // 用户对象数据集
                response.data.forEach(function (value) {
                    if (value.isUsed>0){
                        value.isUsed = '是'
                    } else {
                        value.isUsed = '否'
                    }
                    // value.isUsed = EnumType.IsUsed.getLabelByValue(value.isUsed);
                    $scope.BaseRuleRowCollection.push(value);
                });
            });
        }
        // 页面初始化查询



        ////////////////////////////////////////////////////////////  search end /////////////////////////////////////
        ////////////////////////////////////////////////////////////  search end /////////////////////////////////////

        function itemDragInit(dom) {
            $(dom).draggable({
                revert : true,
                deltaX : 5,
                deltaY : 5,
                proxy : function(source) {
                    var n = $('<div class="proxy btn btn-sm"></div>');
                    n.html($.trim($(source).find(":first").text() || $(source).text())).appendTo('body');
                    return n;
                }
            });
        }

        $scope.backRole = function () {
            $state.go('mgrcenter.engineManage.strategy',{});
            // $location.path('/portrayal/perCusPortrayal').search({'custNo':custNo});
        }

        /////////////////////////////////////////////////////////////////////////////////////////
        // do
        $scope.strategyAdd.init();


    }

})();
