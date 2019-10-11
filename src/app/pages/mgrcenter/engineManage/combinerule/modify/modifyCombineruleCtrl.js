(function() {
    'use strict';

    angular.module('mgrcenter.engineManage.combinerule.modify').controller(
        'modifyCombineruleCtrl', modifyCombineruleCtrl);
    /** @ngInject */
    function modifyCombineruleCtrl($scope,$stateParams,$sce,$log,$state, toastr, toastrConfig,$compile, $uibModal, $filter, $timeout, $http,
                             HttpService, EnumType, Alert) {
        $scope.test = function (id) {
            alert(id);
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

        $scope.combineRuleAdd = {
            index:1,
            init:function(){
                this.check();
                this.updateInit()
            },
            addRow:function(items){
                var exists = false;
                var rowid = items.baseRuleId;

                $("#baseRuleTable",parent.document).find("tr").each(function(){
                    if($(this).attr("id")==items.baseRuleId){
                        // var name = $("#"+rowid).children().eq(3).html();
                        Alert.error("基本规则: "+items.ruleName+"已经存在！");
                        exists = true;
                        return;
                    }
                })

                var index = $scope.combineRuleAdd.index;
                if(rowid&&!exists){
                    var rowObject = items;
                    var row = "<tr id='"+rowid+"' exp='"+rowObject.expression+"' order='BR"+index+"'>"
                        + "<td align='center'>"
                        + '<button type="button" class="btn btn-sm btn-default dropdown-toggle drag-item" onclick="addExp(this)"><span exp="BR'+index+'">BR'+index+'</span></button>'
                        + "</td>"
                        + "<td align='left'>"+rowObject.ruleName+"</td>"
                        + "<td align='left'>"+rowObject.remark+"</td>"
                        + "<td align='center' class='text-danger'>"
                        + "<button type='button' class='btn btn-sm btn-primary' ng-click='combineRuleAdd.viewBaseRule(\""+rowid+"\")'><!--<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>-->查看</button>"
                        + "<button type='button' class='btn btn-sm btn-danger' ng-click='combineRuleAdd.deleteRow(\""+rowid+"\")'><!--<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>-->删除</button>"
                        + "</td>"
                        + "</tr>";

                    // $("#baseRuleTable",parent.document).append(row);
                    var $row = $compile(row)($scope);
                    $("#baseRuleTable tr:last").after($row);
                    $scope.combineRuleAdd.index = index + 1;
                }
                $scope.combineRuleAdd.itemDragInit($("#baseRuleTable .drag-item:last"));


            },
            /**
             * 更新因子表达式的译文
             */
            updateTranslation:function() {
                $("#remark").val("");
                $(".sortable > *").each(function(){
                    var exp = $(this).find("[exp]").attr("exp");
                    var translation =  $("#baseRuleTable span:contains('"+exp+"')").closest("td").next().next().html();
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
                $("#baseRuleTable",parent.document).find("tr").each(function(){
                    if($(this).attr("id")==id){
                        parent.layer.alert("基本规则已经存在！",{icon:2});
                        exists = true;
                        return;
                    }
                })

                var index = $scope.combineRuleAdd.index;
                if(id&&!exists){
                    var rowObject = $("#jqGrid").jqGrid('getRowData', id);
                    var row = "<tr id='"+id+"' exp='"+rowObject.expression+"' order='BR"+index+"'>"
                        + "<td align='center'>BR"+index+"</td>"
                        + "<td align='center'>"+rowObject.ruleName+"</td>"
                        + "<td align='center'>"+rowObject.remark+"</td>"
                        + "<td align='center'>"+rowObject.creater+"</td>"
                        + "<td align='center' class='text-danger'>"
                        + "<button type='button' class='btn btn-danger btn-sm' onclick='javascript:combineRuleAdd.deleteRow(\""+id+"\")'><!--<span class='glyphicon glyphicon-remove' aria-hidden='true'>--></span>删除</button></td>"
                        + "</tr>";
                    $("#baseRuleTable",parent.document).append(row);

                    parent.window.combineRuleAdd.index = index + 1;
                    var layerIndex = parent.layer.getFrameIndex(window.name);
                    parent.layer.close(layerIndex);
                }
            },
            //关闭窗口
            closeWin:function(){
                var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
                parent.layer.close(index);
            },
            /**
             * 打开对话框，加载所有的基本规则
             */
            openBRWindow:function(){
                layer.open({
                    type: 2,
                    title: '选择基本规则',
                    //shadeClose: true, //点击遮罩关闭层
                    area : ['800px' , '520px'],
                    content: $ROOT+'sys/toView?path=/rule/combinerule/base_rule_list'
                });
            },
            /**
             * 将用户配置的多条规则因子，添加到dropdown中
             * 1.校验因子配置是否正确
             * 2.生成dom添加到dropdown中
             */
            prepareRule:function(){
                //需要添加规则校验
                $("#ruleList").html("");
                $.each($("#baseRuleTable tr:gt(0)"), function (index, domEle) {
                    var id = $(this).attr("id");
                    var ruleOrder = $(this).attr("order")
                    var exp = $(this).attr("exp");
                    var li = "<li><a href='javascript:void(0)' onclick='combineRuleAdd.addExp(this)'><span id='"+id+"' exp='"+ruleOrder+"'>"+ruleOrder+"</span></a></li>";
                    $("#ruleList").append(li);
                })
            },

            deleteRow: function (id) {
                if($(".oc_tags").children().length > 0){
                    //询问框
                    Alert.confirm("删除基本规则需要再次输入公式，确定删除？").then(function() {
                        $(".oc_tags").empty();
                        $("#"+id).nextAll().each(function () {
                            var newOrder = $(this).attr("order").substr(2)-1;
                            $(this).attr("order","BR"+newOrder);
                            $(this).children().first().html('<button type="button" class="btn btn-sm btn-default dropdown-toggle drag-item" onclick="combineRuleAdd.addExp(this)"><span exp="BR'+newOrder+'">BR'+newOrder+'</span></button>')
                        })
                        $("#"+id).remove();
                        $scope.combineRuleAdd.index = $scope.combineRuleAdd.index - 1
                    });
                }else{
                    $(".oc_tags").empty();
                    $("#"+id).nextAll().each(function () {
                        var newOrder = $(this).attr("order").substr(2)-1;
                        $(this).attr("order","BR"+newOrder);
                        $(this).children().first().html('<button type="button" class="btn btn-sm btn-default dropdown-toggle drag-item" onclick="combineRuleAdd.addExp(this)"><span exp="BR'+newOrder+'">BR'+newOrder+'</span></button>')
                    })
                    $("#"+id).remove();
                    $scope.combineRuleAdd.index = $scope.combineRuleAdd.index - 1
                }
                $("#remark").val("");
            },
            /**
             * 将一行基本规则添加到列表中
             * @param rowObj
             */
            addExistRow: function (rowObj) {
                // base_rule_id:"bc1e71eadf744d1b882e62bd363a2b5c"
                // base_rule_order:"BR1"
                // combine_rule_id:"67395078ec374b68a74daa6b1a9a398f"
                // create_user:"dev"
                // remark:" ( 年收入>年收入10万 && 学历==博士以上 )"
                // rule_name:"test002"
                var row = "<tr id='"+rowObj.base_rule_id+"' exp='"+rowObj.base_rule_order+"' order='"+rowObj.base_rule_order+"'>"
                    + "<td align='center'>"
                    + "<button type='button' class='btn btn-sm btn-default dropdown-toggle drag-item' onclick='addExp(this)'>"
                    + "<span exp='"+rowObj.base_rule_order+"'>"+rowObj.base_rule_order+"</span>" +
                      "</button>"
                    + "</td>"
                    + "<td align='left'>"+rowObj.rule_name+"</td>"
                    + "<td align='left'>"+rowObj.remark+"</td>"
                    + "<td align='center' class='text-danger'>"
                    + "<button type='button' style='margin-right:5px' class='btn btn-info btn-icon ion-eye' ng-click='combineRuleAdd.viewBaseRule(\""+rowObj.base_rule_id+"\")'></i>"
                    + "<button type='button' class='btn btn-danger btn-icon ion-trash-a' ng-click='combineRuleAdd.deleteRow(\""+rowObj.base_rule_id+"\")'></i>"
                    + "</tr>";
                var $row = $compile(row)($scope);
                $("#baseRuleTable").append($row);
                itemDragInit($("#baseRuleTable .drag-item:last"));
                $scope.combineRuleAdd.index++;
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
                    $scope.combineRuleAdd.updateTranslation();
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
                $.each($("#baseRuleTable tr:gt(0)"), function (index, domEle) {
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
                //加载等待层，可防止重复提交
                // layer.load();
                // //校验
                // if(!$("#addFrom").valid()){save
                //     //关闭等待层，返回
                //     layer.closeAll();
                //     return;
                // };

                //获取基本参数
                var combineRuleName = $.trim($("#combineRuleName").val());
                var remark = $("#remark").val();
                var riskFeature = $("#riskFeature").val();

                if(combineRuleName==""){
                    Alert.error('规则名称不能为空.')
                    return;
                }

                var ruleName = $.trim($("#combineRuleName").val());
                var ruleId = $.trim($("#combineRuleId").val());

                var opts = {};
                opts.url = '/crm/manage/engine/combineRule/checkName';
                opts.method = 'GET';
                opts.params = {'ruleName':ruleName,'ruleId':ruleId};
                HttpService.linkHttp(opts).then(function(response) {
                    console.log(response.data);
                    if(response.data != "0"){// 校验名称是否重复
                        Alert.error('规则名称已存在.');
                        return;
                    } else {

                        var baseRules = [];
                        $.each($("#baseRuleTable tr:gt(0)"), function (index, domEle) {
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

                        //3 请求后台，校验规则
                        var opts = {};
                        opts.url = '/crm/manage/engine/combineRule/compileRule';
                        opts.method = 'POST';
                        opts.params = {expression : expression};
                        opts.data = baseRules;
                        HttpService.linkHttp(opts).then(function(response) {
                            // Alert.success("请求成功");
                            if (response.data=="0"){
                                Alert.error('校验规则失败.')
                                return ;
                            } else {

                                //////////////////////////////////////////////
                                //基本规则集合
                                var ruleCombineBaseRel = [];
                                var hasUnUsed = false;
                                var unUsedBR = [];
                                $.each($("#baseRuleTable tr:gt(0)"), function (i, domEle) {
                                    if($(".oc_tags span:contains('BR"+(i+1)+"')")[0] == undefined){
                                        unUsedBR.push('【BR'+(i+1)+'】');
                                        hasUnUsed = true;
                                    }
                                    ruleCombineBaseRel.push({
                                        baseRuleOrder:$(this).attr("order"),
                                        baseRuleId:$(this).attr("id")
                                    });
                                })
                                if(hasUnUsed){
                                    Alert.error('规则'+unUsedBR.join(',')+'未被使用！')
                                    return;
                                }
                                //获取表达式内容
                                var expression = ""
                                $.each($(".oc_tags").children(),function(i,obj){
                                    var span = $(obj).children().first();
                                    expression += $(span).attr("exp") + " ";
                                })

                                expression =  $scope.combineRuleAdd.addBracket(expression);

                                if(!$.trim(expression)){
                                    //关闭等待层，返回
                                    Alert.error('请输入表达式内容！')
                                    return;
                                }

                                //校验所选因子是否全部应用到表达式中
                                var combineRuleObj = new Object();
                                combineRuleObj.combineRuleName = combineRuleName;
                                // combineRuleObj.riskFeature = riskFeature;
                                combineRuleObj.combineExpression = expression;
                                combineRuleObj.remark = $("#remark").val();
                                var opts = {};
                                opts.url = '/crm/manage/engine/saveCombineRule';
                                opts.method = 'POST';
                                opts.params = combineRuleObj;
                                opts.data = ruleCombineBaseRel;
                                HttpService.linkHttp(opts).then(function(response) {
                                    if (response.status == "1") {
                                        Alert.success("请求成功");
                                        $scope.backRole();
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

                $scope.combineRuleAdd.compileExp(expression);
                $scope.combineRuleAdd.updateTranslation();

                return  expression;
            },
            /**
             * 修改组合规则
             */
            update: function () {
                //加载等待层，可防止重复提交
                // layer.load();
                //校验
                // if(!$("#addFrom").valid()){
                //     //关闭等待层，返回
                //     layer.closeAll();
                //     return;
                // };

                //获取基本参数
                var combineRuleName = $.trim($("#combineRuleName").val());

                var remark = $("#remark").val();
                // var riskFeature = $("#riskFeature").val();

                if(combineRuleName==""){
                    Alert.error('规则名称不能为空.')
                    return;
                }

                var baseRules = [];
                $.each($("#baseRuleTable tr:gt(0)"), function (index, domEle) {
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

                //3 请求后台，校验规则
                var opts = {};
                opts.url = '/crm/manage/engine/combineRule/compileRule';
                opts.method = 'POST';
                opts.params = {expression : expression};
                opts.data = baseRules;
                HttpService.linkHttp(opts).then(function(response) {
                    // Alert.success("请求成功");
                    if (response.data=="0"){
                        Alert.error('校验规则失败.')
                        return ;
                    } else {

                        //////////////////////////////////////////////
                        //基本规则集合
                        var ruleCombineBaseRel = [];
                        var hasUnUsed = false;
                        var unUsedBR = [];
                        $.each($("#baseRuleTable tr:gt(0)"), function (i, domEle) {
                            if($(".oc_tags span:contains('BR"+(i+1)+"')")[0] == undefined){
                                unUsedBR.push('【BR'+(i+1)+'】');
                                hasUnUsed = true;
                            }
                            ruleCombineBaseRel.push({
                                baseRuleOrder:$(this).attr("order"),
                                baseRuleId:$(this).attr("id")
                            });
                        })
                        if(hasUnUsed){
                            Alert.error('规则'+unUsedBR.join(',')+'未被使用！')
                            return;
                        }
                        //获取表达式内容
                        var expression = ""
                        $.each($(".oc_tags").children(),function(i,obj){
                            var span = $(obj).children().first();
                            expression += $(span).attr("exp") + " ";
                        })

                        expression =  $scope.combineRuleAdd.addBracket(expression);

                        if(!$.trim(expression)){
                            //关闭等待层，返回
                            Alert.error('请输入表达式内容！')
                            return;
                        }

                        //校验所选因子是否全部应用到表达式中
                        $scope.combineRuleObj.combineRuleName = combineRuleName;
                        // combineRuleObj.riskFeature = riskFeature;
                        $scope.combineRuleObj.combineExpression = expression;
                        $scope.combineRuleObj.remark = $("#remark").val();
                        var opts = {};
                        opts.url = '/crm/manage/engine/updCombineRule';
                        opts.method = 'PUT';
                        opts.params = $scope.combineRuleObj;
                        opts.data = ruleCombineBaseRel;
                        HttpService.linkHttp(opts).then(function(response) {
                            if (response.status == "1") {
                                // Alert.success("请求成功");
                                angular.extend(toastrConfig, $scope.options);
                                toastr[$scope.options.type]('更新成功!', '');
                                $scope.backRole();
                            }
                        });

                    }
                });
            },
            updateInit : function () {
                console.log('updateInit');
                console.log($stateParams.combineRule);
                console.log($stateParams.combineFactorRels);
                console.log($stateParams.isUsed);

                $scope.combineRuleObj = $stateParams.combineRule;
                $scope.combineFactorRelsObj = $stateParams.combineFactorRels;
                $scope.isUsedParam = $stateParams.isUsed;

                //加载所有因子表达式
                if ($scope.combineRuleObj != null) {
                    $scope.combineRuleAdd.compileExp($scope.combineRuleObj.combineExpression);
                    // $scope.combineRuleAdd.updateTranslation();

                    if ($scope.combineFactorRelsObj != null) {
                        $scope.combineFactorRelsObj.forEach(function (value) {
                            $scope.combineRuleAdd.addExistRow(value);
                        })
                    }

                }else {
                    $scope.backRole();
                }
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
             * 加载所有的基本规则
             */
            // loadBaseRules: function () {
            //     $("#jqGrid").jqGrid({
            //         url: $ROOT+"rule_base_rule/findAll",
            //         datatype: "json",
            //         jsonReader : {
            //             root:"list",
            //             page: "pageNum",//当前页
            //             total: "pages",//总页数
            //             records: "total"//总记录数
            //         },
            //         ondblClickRow: function (rowid) {
            //             var exists = false;
            //
            //             $("#baseRuleTable",parent.document).find("tr").each(function(){
            //                 if($(this).attr("id")==rowid){
            //                     var name = $("#"+rowid).children().eq(3).html();
            //                     parent.layer.alert("基本规则:<br>"+name+"<br>已经存在！",{icon:2});
            //                     exists = true;
            //                     return;
            //                 }
            //             })
            //             var index = parent.window.combineRuleAdd.index;
            //             if(rowid&&!exists){
            //                 var rowObject = $("#jqGrid").jqGrid('getRowData', rowid);
            //                 var row = "<tr id='"+rowid+"' exp='"+rowObject.expression+"' order='BR"+index+"'>"
            //                     + "<td align='center'>"
            //                     + '<button type="button" class="btn btn-sm btn-default dropdown-toggle drag-item" onclick="combineRuleAdd.addExp(this)"><span exp="BR'+index+'">BR'+index+'</span></button>'
            //                     + "</td>"
            //                     + "<td align='left'>"+rowObject.ruleName+"</td>"
            //                     + "<td align='left'>"+rowObject.remark+"</td>"
            //                     + "<td align='center' class='text-danger'>"
            //                     + "<button type='button' class='btn btn-sm btn-primary' onclick='javascript:combineRuleAdd.viewBaseRule(\""+rowid+"\")'><!--<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>-->查看</button>"
            //                     + "<button type='button' class='btn btn-sm btn-danger' onclick='javascript:combineRuleAdd.deleteRow(\""+rowid+"\")'><!--<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>-->删除</button>"
            //                     + "</td>"
            //                     + "</tr>";
            //
            //                 $("#baseRuleTable",parent.document).append(row);
            //                 parent.window.combineRuleAdd.index = index + 1;
            //             }
            //             parent.window.combineRuleAdd.itemDragInit($("#baseRuleTable .drag-item:last",parent.document));
            //
            //
            //         },
            //         colModel: [
            //             { label: '规则id', name: 'id',key:true,hidden:true},
            //             { label: '基本规则名称', name: 'ruleName',sortable:false},
            //             { label: '基本规则表达式', name: 'remark',sortable:false},
            //             { label: '是否被使用',width:'80px', name: 'isUsed',sortable:false,formatter: function (cellvalue, options, rowObject) {
            //                     return cellvalue>0?'是':'否';
            //                 }}
            //         ],
            //         loadComplete: function () {
            //             if(!$.isEmptyObject($(this).getGridParam('userData'))){
            //                 parent.layer.alert($(this).getGridParam('userData'),{icon: 2});
            //             }
            //             $("#cb_jqGrid").hide();
            //         },
            //         beforeSelectRow:function beforeSelectRow(rowid)
            //         {
            //             var id = $("#jqGrid").jqGrid("getGridParam", "selarrrow");
            //             if(id!=null&&id!=''){
            //                 if(id==rowid){
            //                     return false;
            //                 }else {
            //                     $("#jqGrid").jqGrid('resetSelection');
            //                     return (true);
            //                 }
            //             }else {
            //                 $("#jqGrid").jqGrid('resetSelection');
            //                 return (true);
            //             }
            //         },
            //         height : "auto",
            //         width : $("#jqGrid").parent().width()-50,
            //         shrinkToFit : true,
            //         viewrecords: true,
            //         rownumbers:true,
            //         multiselect: true,
            //         //multiboxonly:true,
            //         rowNum: 10,
            //         pager: "#jqGridPager"
            //     });
            // },
            /**
             * 基本规则搜索
             */
            search:function() {
                $("#jqGrid").setGridParam({
                    postData:{
                        "ruleCode":$("#ruleCode").val(),
                        "ruleName":$("#ruleName").val(),
                        "isUsed":$("#isUsed").val()
                    },
                    page:1,
                    ajaxGridOptions:{
                        'type':'post'
                    }
                }).trigger("reloadGrid");
            },
            viewBaseRule: function (id) {
                Alert.error('施工中...');
                return;
                //获取选中ID
                // if(!id){
                //     var id = $("#jqGrid").jqGrid("getGridParam", "selarrrow");
                //
                //     if(id==null||id==""){
                //         parent.layer.alert("请选择要操作的规则！",{icon: 2});
                //         return;
                //     }
                //     if(id.length > 1){
                //         parent.layer.alert("只能选择一个规则进行操作！",{icon: 2});
                //         return;
                //     }
                // }
                // console.log(id)
                // parent.layer.open({
                //     type: 2,
                //     title: '基本规则',
                //     shift:1,
                //
                //     shadeClose: true, //点击遮罩关闭层
                //     area : ['800px' , '580px'],
                //     content: $ROOT + '/rule_base_rule/findById/'+id
                //     //content: $ROOT + '/relation.jsp'
                // });
            },
            /**
             * 所有的单元格格式化函数
             */
            formatters:{
                formatOperate: function (cellvalue, options, rowObject) {
                    return "<button type='button' class='btn btn-sm btn-primary' " +
                        "ng-click='combineRuleAdd.closeBRWindow(\""+rowObject.id+"\")'>" +
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

        ////////////////////////////////////////////////////////////  search start /////////////////////////////////////
        ////////////////////////////////////////////////////////////  search start /////////////////////////////////////
        // 查询条件对象
        $scope.searchObj = {};
        $scope.smartTablePageSize = 5;

        $scope.isUsed = { value: {id: '-1', name: '是否被使用' }};
        $scope.itemArray = [
            {id: '-1', name: '全部'},
            {id: '1', name: '是' },
            {id: '0', name: '否' }];


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
            opts.url = '/crm/manage/engine/getBaseRuleByEntity';
            opts.method = 'GET';
            $scope.searchObj.isUsed = $scope.isUsed.value.id;
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
        $scope.searchBaseRule();


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
            $state.go('mgrcenter.engineManage.combinerule',{});
            // $location.path('/portrayal/perCusPortrayal').search({'custNo':custNo});
        }

        /////////////////////////////////////////////////////////////////////////////////////////
        // do
        $scope.combineRuleAdd.init();

    }


    // function reinitIframe(){
    //     var iframe = document.getElementById("base_rule_iframe");
    //     try{
    //         var bHeight = iframe.contentWindow.document.body.scrollHeight;
    //         var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
    //         var height = Math.max(bHeight, dHeight);
    //         iframe.height = height;
    //     }catch (ex){}
    // }
    //
    // var timer1 = window.setInterval("reinitIframe()", 500); //定时开始
    //
    // function reinitIframeEND(){
    //     var iframe = document.getElementById("base_rule_iframe");
    //     try{
    //         var bHeight = iframe.contentWindow.document.body.scrollHeight;
    //         var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
    //         var height = Math.max(bHeight, dHeight);
    //         iframe.height = height;
    //     }catch (ex){}
    //     // 停止定时
    //     window.clearInterval(timer1);
    //
    // }

    // Sortable.create($(".sortable").get(0), {
    //     onEnd: function (evt) { // 拖拽
    //         // var itemEl = evt.item;
    //         combineRuleAdd.updateTranslation();
    //     },
    // });
    // $scope.combineRuleAdd.itemDragInit($('.drag-item'));

    // $(".drag-target").droppable({
    //     accept : '.drag-item',
    //     onDrop : function(e, source) {
    //         //$(this).append($(source).clone());
    //         var exp = $.trim($(source).find(":first").text() || $(source).text());
    //         combineRuleAdd.addExp($("<div><span exp='"+exp+"'>"+exp+"</span></div>"));
    //     }
    // });

    // var status='OPEN'
    // $("#ruleList").click(function () {
    //     if(status == 'OPEN'){
    //         $(this).next().hide();
    //         $(this).find("span").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
    //         status = 'CLOSED';
    //     }else{
    //         $(this).next().show();
    //         $(this).find("span").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
    //         status = 'OPEN';
    //     }
    // })


})();
