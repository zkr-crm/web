(function() {
    'use strict';

    angular.module('mgrcenter.engineManage.baserule.add').controller(
        'addBaseruleCtrl', addBaseruleCtrl);
    /** @ngInject */
    function addBaseruleCtrl($scope,$log,$state,$compile, toastr, toastrConfig,$uibModal, $filter, $timeout, $http,
                             HttpService, EnumType, Alert) {
        $scope.test = function () {
            alert(111);
        }

        $scope.baseRuleAdd = {
            index:1,
            ruleFactor: [],// 所有因子
            htmlSegment:{
                COMPARISON:"<option value='>'>&gt;</option><option value='<'>&lt;</option><option value='>='>&gt;&#61;</option><option value='<='>&lt;&#61;</option><option value='=='>&#61;&#61;</option><option value='!='>&#33;&#61;</option>",
                LOGICAL:"<option value='=='>属于</option><option value='!='>不属于</option>",
                EQUALNOT:"<option value='=='>&#61;&#61;</option><option value='!='>&#33;&#61;</option>",
                CONTAINS:"<option value='contains'>包含</option><option value='not contains'>不包含</option>",
                MEMBEROF:"<option value='memberOf'>集合于</option><option value='not memberOf'>不集合于</option>",
                MATCHES:"<option value='matches'>匹配</option><option value='not matches'>不匹配</option>"

            },
            test : function () {
                alert(222);
            },
            constant : {
                BASIS_FACTOR:0,
                COMPLEX_FACTOR:1
            },
            init: function () {
                $scope.baseRuleAdd.loadFactor();
                //$('#operate_1').html("").append(this.htmlSegment['COMPARISON']);//默认的下拉框值，待修改
                // $scope.baseRuleAdd.check();
            },
            /**
             * 加载所有的规则因子，构建下拉选项
             */
            loadFactor: function () {
                var opts = {};
                opts.url = '/crm/manage/getAllFactors';
                opts.method = 'GET';
                HttpService.linkHttp(opts).then(function(response) {
                    $scope.baseRuleAdd.ruleFactor = response.data;
                    var treeItemList = ztreeDefaultData;

                   // debugger ;
                    var selectOption = "";
                    response.data.forEach(function(value,index,array){

                        if(value.factorType == $scope.baseRuleAdd.constant.BASIS_FACTOR) {
                            var parentId = "n1"
                        } else {
                            var parentId = "n2"
                        }

                        var treeItem = {
                            id: value.factorId,
                            pId: parentId,
                            // icon:img_url,
                            // open:true, //默认当前节点展开
                            name: value.displayName
                            
                        }

                        treeItemList.push(treeItem);
                        selectOption += "<option value='"+value.factorId+"' name='"+value.factorName+"' operateType='"+value.operateType+"' valueType='"+value.valueType+"'>"+value.displayName+"</option>";
                    });
                    // var $selectOption = $compile(selectOption)($scope);
                    $("#factorName_select").append(selectOption);
                    $.fn.zTree.init($("#factorTree"), setting, treeItemList);
                    // $scope.ignoreChanges = true;
                    // $scope.treeData = treeItemList;
                    // $scope.basicConfig.version++;
                });
            },
            /**
             * 根据id获取因子
             */
            getFactor: function (factorId) {
                for (var i = 0; i< $scope.baseRuleAdd.ruleFactor.length; i++){
                    if (ruleFactor[i].id == factorId) {
                        return ruleFactor[i];
                    }
                }
                return null;
            },
            /**
             * 修改规则因子选项，下拉参数列表会联动修改
             */
            doChangeFactorName:function(id){
                var index = id.substr(id.indexOf("_")+1);//因子索引
                var factorName = $('#'+id).val();//规则因子名称
                var operateName = $('#'+id+' option[value="'+factorName+'"]').attr("name") || $('#'+id).attr("operatename");//获取值类型
                var operateType = $('#'+id+' option[value="'+factorName+'"]').attr("operateType") || $('#'+id).attr("operateType");//获取操作类型
                var valueType = $('#'+id+' option[value="'+factorName+'"]').attr("valueType") || $('#'+id).attr("valueType");//获取值类型


                $('#operate_'+index).html("").append(this.htmlSegment[operateType]);//修改操作类型

                var valueHtml = "";

                if (valueType == "SELECT"){
                    //向后台发起ajax请求，获取因子的取值范围,构造options

                    var opts = {};
                    opts.url = '/crm/manage/getFactorParams';
                    opts.method = 'GET';
                    opts.params = {'paramName':operateName};
                    HttpService.linkHttp(opts).then(function(response) {
                        var select = "<select class='form-control'  id='value_"+index+"' style='width: 180px;' name='value_"+index+"' onchange='updateTranslationBaseRule()'>";
                        var selectOption = "";
                        response.data.forEach(function(value,index,array){
                            var prop = value.itemCode;
                            var t = value.itemName;
                            prop = prop.replace(/\'/g,"&apos;");
                            selectOption += "<option value='"+prop+"'>"+t+"</option>";
                        });
                        valueHtml = select+selectOption+"</select>";
                        // var $valueHtml = $compile(valueHtml)($scope);
                        $('#valueTd_'+index).html("").append(valueHtml);//修改值类型

                    });
                }else if (valueType == "TEXT"){
                    valueHtml = "<input type='text' class='form-control input-sm' style='width: 180px;'  name='value_"+index+"' id='value_"+index+"' placeholder='参考值' onblur='blurCheckBaseRule(this)'>";

                    // var $valueHtml = $compile(valueHtml)($scope);
                    $('#valueTd_'+index).html("").append(valueHtml);//修改值类型
                }

            },
            /**
             * 增加一行规则，同时调整规则的序号
             */
            addRow: function (rowBtn, optVal) {
                //重复性判断
                /*        var exists = false;
                        $("#factorTable").find("tr:not(:first) td input:hidden").each(function(){
                            if (optVal == $(this).val()) {
                                exists = true;
                            }
                        });
                        if (exists)
                            return false;*/
                var index = $scope.baseRuleAdd.index;
                var row = "<tr id='row_"+index+"'>"
                    + "<td align='center' id='order_"+index+"'>"
                    + '<button type="button" class="btn btn-sm btn-default dropdown-toggle drag-item" onclick="addExpBaseRule(this)"><span exp="R'+index+'">R'+index+'</span></button>'
                    + "</td>"
                    + "<td>"
                    + "<select class='form-control' ng-model='factorName_"+index+"' id='factorName_"+index+"' style='width: 180px;' name='factorName_"+index+"' ng-change='baseRuleAdd.doChangeFactorName(factorName_"+index+")'>"
                    + $("#factorName_select").html()
                    + "</select></td>"
                    + "<td>"
                    + "<select class='form-control'  id='operate_"+index+"' style='width: 180px;' name='operate_"+index+"' onchange='updateTranslationBaseRule()'>"
                    + $scope.baseRuleAdd.htmlSegment['LOGICAL']
                    + "</select></td>"
                    + "<td id='valueTd_"+index+"'>"
                    + "<select class='form-control' id='value_"+index+"' style='width: 180px;' name='value_"+index+"' onchange='updateTranslationBaseRule()'>"
                    + "<option value='\"whiteList\"'>白名单</option>"
                    + "<option value='\"grayList\"'>灰名单</option>"
                    + "<option value='\"blackList\"'>黑名单</option>"
                    + "</select>"
                    + "</td>"
                    + "<td>"
                    + "<button type=\"button\" class=\"btn btn-danger btn-icon ion-trash-a\" ng-click=\"baseRuleAdd.deleteRow("+index+")\"></button>"
                    + "<button type='button' class='close hide' ng-click='baseRuleAdd.addRow(this)'>"
                    + "<span class='glyphicon glyphicon-plus' aria-hidden='true'></span>"
                    + "</button>"
                    + "</td>"
                    + "</tr>";
                // 保证序号连续，需要变更大于等于当前序号的规则+1
                for (var i = $scope.baseRuleAdd.index; i >= index; i--){
                    var newIndex = i+1;
                    // console.log($("#row_"+i).attr('id'));
                    $("#row_"+i).attr("id","row_"+newIndex);
                    $("#order_"+i).html("R"+newIndex);
                    $("#order_"+i).attr("id","order_"+newIndex);
                    $("#factorName_"+i).attr("id","factorName_"+newIndex);
                    $("#factorName_"+newIndex).attr("name","factorName_"+newIndex);
                    $("#operate_"+i).attr("id","operate_"+newIndex);
                    $("#operate_"+newIndex).attr("name","operate_"+newIndex);
                    $("#value_"+i).attr("id","value_"+newIndex);
                    $("#value_"+newIndex).attr("name","value_"+newIndex);
                    $("#valueTd_"+i).attr("id","valueTd_"+newIndex);
                }
                var $row = $compile(row)($scope);
                $(".hint").remove();
                $("#tbody").append($row);
                //$(currRow).after(row);
                var factorSelect = $("#factorTable").find("tr:last td:eq(1) select").val(optVal);
                // factorSelect.trigger("ng-change");
                $scope.baseRuleAdd.doChangeFactorName(factorSelect[0].id);
                // var factorSelect = $("#factorTable").find("tr:last td:eq(1) select").val(optVal).trigger("onchange");
                // $scope.baseRuleAdd.doChangeFactorName("factorName_" + optVal);
                var factorOptChecked = factorSelect.find("option:selected");
                factorSelect.after("<input type='hidden' id='"+factorSelect.attr("id")+"' name='"+factorSelect.attr("name")+"' value='"+factorOptChecked.attr("value")+"' operateName='"+factorOptChecked.attr("name")+"' operateType='"+factorOptChecked.attr("operateType")+"' valueType='"+factorOptChecked.attr("valueType")+"' />"
                    + "<input type='text' id="+i+"  class='form-control' value='"+$.trim(factorOptChecked.text())+"' title='"+$.trim(factorOptChecked.text())+"' style=\"color:#6a6a6a\" readonly />"+"<div class='addDiv' id='addDiv"+i+"'></div>").remove();

                $scope.baseRuleAdd.index++;
                return true;
            },
            /**
             * 删除一行规则，同时调整规则的序号
             */
            deleteRow: function (rowBtn) {
                if($scope.baseRuleAdd.index<=1){
                    alert("至少选择一个因子！");
                    return;
                }
                // 大于当前编码的规则-1
                // var currRowId = $(rowBtn).closest("tr").attr("id");
                // var index = currRowId.substr(currRowId.indexOf("_")+1);
                var currRow = $("#row_"+rowBtn);

                $(".sortable .oc_tag:contains('"+$.trim(currRow.find("td:first").text())+"')").remove();
                $(currRow).remove();
                // 保证序号连续，需要变更大于等于当前序号的规则-1
                for (var i = parseInt($scope.baseRuleAdd.index)+1; i <= $scope.baseRuleAdd.index; i++){
                    var newIndex = i-1;
                    $("#row_"+i).attr("id","row_"+newIndex);
                    $("#order_"+i).html('<button type="button" class="btn btn-sm btn-default dropdown-toggle drag-item" ng-click="baseRuleAdd.addExp(this)"><span exp="R'+newIndex+'">R'+newIndex+'</span></button>');
                    $("#order_"+i).attr("id","order_"+newIndex);
                    $("#factorName_"+i).attr("id","factorName_"+newIndex);
                    $("#factorName_"+newIndex).attr("name","factorName_"+newIndex);
                    $("#operate_"+i).attr("id","operate_"+newIndex);
                    $("#operate_"+newIndex).attr("name","operate_"+newIndex);
                    $("#value_"+i).attr("id","value_"+newIndex);
                    $("#valueTd_"+i).attr("id","valueTd_"+newIndex);
                    $(".oc_tag span[exp='R"+i+"']").html('R'+newIndex).attr('exp', 'R'+newIndex);
                }
                $scope.baseRuleAdd.index--;

                $scope.baseRuleAdd.updateTranslationBaseRule();

                //cascadeTree.removeNode(cascadeTree.getNodesByParam("id", $(rowBtn).closest("tr").find("td:eq(1) input:first").val())[0], false);
            },
            /**
             * 获取后台数据到表格中显示
             * {
			 * base_rule_id
			 * dipls_name
			 * factor_id
			 * factor_name
			 * factor_order
			 * factor_value
			 * operate
			 * }
             * @param rowObj
             */
            addExistRow: function (rowObj) {
            	 alert(1);
                //第一行初始化的时候需要删除原来的第一行内容
                /*        if(this.index==1){
                            $("#factorTable").find("tr:eq(1)").remove();
                        }*/

                var row = "<tr id='row_"+this.index+"'>"
                    + "<td align='center' id='order_"+this.index+"'>"

                    + "<button type='button' class='btn btn-sm btn-default dropdown-toggle drag-item' ng-click='baseRuleAdd.addExp(this)'><span exp='R"+this.index+"'>R"+this.index+"</span></button>"
                    + "</td>"
                    + "<td>"
                    + "<select class='form-control' ng-model='factorName_"+this.index+"'  id='factorName_"+this.index+"' style='width: 180px;' name='factorName_"+this.index+"' ng-change='baseRuleAdd.doChangeFactorName(this.id)'>"
                    + $("#factorName_select").html()
                    + "</select></td>"
                    + "<td>"
                    + "<select class='form-control' ng-model='operate_"+this.index+"' id='operate_"+this.index+"' style='width: 180px;' name='operate_"+this.index+"'  ng-change='baseRuleAdd.updateTranslationBaseRule()'>"
                    + this.htmlSegment['LOGICAL']
                    + "</select></td>"
                    + "<td  id='valueTd_"+this.index+"'>"
                    + "<select class='form-control' ng-model='value_"+this.index+"' id='value_"+this.index+"' style='width: 180px;' name='value_"+this.index+"' ng-change='baseRuleAdd.updateTranslationBaseRule()'>"
                    + "<option value='\"whiteList\"'>白名单</option>"
                    + "<option value='\"grayList\"'>灰名单</option>"
                    + "<option value='\"blackList\"'>黑名单</option>"
                    + "</select>"
                    + "</td>"
                    + "<td>"
                    + "<button type=\"button\" class=\"btn btn-danger btn-icon ion-trash-a\" ng-click=\"baseRuleAdd.deleteRow(this)\">删除</button>"
                    + "<button type='button' class='close hide' ng-click='baseRuleAdd.addRow(this)'>"
                    + "<span class='glyphicon glyphicon-plus' aria-hidden='true'></span>"
                    + "</button>"
                    + "</td>"
                    + " </tr>";
                $(".hint").remove();
                $("#tbody").append(row);
                //修改因子名
                $("#factorName_"+this.index).val(rowObj.factor_id);
                //触发this.doChangeFactorName()
                this.doChangeFactorName("factorName_"+this.index);
                //修改操作符的值
                $("#operate_"+this.index).val(rowObj.operate);
                //修改因子的值
                $("#value_"+this.index).val(rowObj.factor_value);

                var factorSelect = $("#factorName_"+this.index);
                var factorOptChecked = factorSelect.find("option:selected");
                factorSelect.after("<input type='hidden' id='"+factorSelect.attr("id")+"' name='"+factorSelect.attr("name")+"' value='"+factorOptChecked.attr("value")+"' operateName='"+factorOptChecked.attr("name")+"' operateType='"+factorOptChecked.attr("operateType")+"' valueType='"+factorOptChecked.attr("valueType")+"' />"
                    + "<input type='text' class='form-control' value='"+$.trim(factorOptChecked.text())+"'  title='"+$.trim(factorOptChecked.text())+"' readonly />").remove();
                //$(".hint").remove();
                
                itemDragInit($("#factorTable .drag-item:last"));
                this.index++;
            },
            /**
             * 将用户配置的多条规则因子，添加到dropdown中
             * 1.校验因子配置是否正确
             * 2.生成dom添加到dropdown中
             */
            prepareRule_bak:function(){
                //需要添加规则校验
                $("#ruleList").html("");
                var factorName,operate,value,exp;
                for (var i = 1; i <= this.index; i++){
                    factorName = $("option[value='"+$("#factorName_"+i).val()+"']").attr("name")
                    operate = $("#operate_"+i).val();
                    value = $("#value_"+i).val();
                    exp = factorName + " " + operate + " " +  value;
                    var li = "<li><a href='javascript:void(0)' ng-click='baseRuleAdd.addExp(this)'><span exp='"+exp+"'>R"+i+"</span></a></li>";
                    $("#ruleList").append(li);
                }
            },
            /**
             * 将用户配置的多条规则因子，添加到dropdown中
             * 1.校验因子配置是否正确
             * 2.生成dom添加到dropdown中
             */
            prepareRule:function(){
                //需要添加规则校验
                $("#ruleList").html("");
                var exp;
                for (var i = 1; i <= this.index; i++){
                    exp = "R"+i;
                    var li = "<li><a href='javascript:void(0)' ng-click='baseRuleAdd.addExp(this)'><span exp='"+exp+"'>"+exp+"</span></a></li>";
                    $("#ruleList").append(li);
                }
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
                    new RegExp("(R\\d+)","gmi"),//因子
                    new RegExp("(\\()","gmi"),//左括号
                    new RegExp("(\\))","gmi"),//右括号
                    new RegExp("(\\&\\&)","gmi"),
                    new RegExp("(\\|\\|)","gmi")
                ]
                $.each(reg,function(i){
                    expression = expression.replace(reg[i],dom);
                    console.log(expression)
                })
                $(".oc_tags").html(expression);
                this.addHoverEffet($(".oc_tag"));
                this.addRemoveEffect($(".oc_tag_remove"))
            },
            /**
             * 编辑器增加规则表达式
             * @param obj
             */
            addExp:function(obj){


                var span = "";
                if (obj == "1") {
                    span = "<span exp=\"&&\">&&</span>"
                } else if (obj == "2") {
                    span = "<span exp=\"||\">||</span>"
                } else if (obj == "3") {
                    span = "<span exp=\"(\">(</span>"
                }  else if (obj == "4") {
                    span = "<span exp=\")\">)</span>"
                }
                // var $span = $compile(span)($scope);

                var expStr = "<div class='oc_tag'>"
                    + span
                    + "<div class='oc_tag_remove'>X</div>"
                    + "<div style='clear: both;'></div>"
                    + "</div>";

                var $expStr = $compile(expStr)($scope);
                $(".oc_tags").append($expStr);
                $scope.baseRuleAdd.addHoverEffet($(".oc_tag"));
                $scope.baseRuleAdd.addRemoveEffect($(".oc_tag_remove"));

                $scope.baseRuleAdd.updateTranslationBaseRule();
            },
            /**
             * 增加鼠标滑过效果
             * @param obj
             */
            addHoverEffet:function(obj){
                obj.unbind();
                obj.hover(function(){
                    $(this).find(".oc_tag_remove").show();
                },function(){
                    $(this).find(".oc_tag_remove").hide();
                });
            },
            /**
             * 增加鼠标点击关闭效果
             * @param obj
             */
            addRemoveEffect:function(obj){
                obj.unbind();
                obj.bind("click",function(){
                    $(this).parent().remove();
                    $scope.baseRuleAdd.updateTranslationBaseRule();
                });
            },
            /**
             * 校验规则配置是否合法
             * 1、获取因子集合
             * 2、构建规则表达式
             * 3、发送到后台通过drools的build方法
             */
            checkExp:function(index){
                var result = false;//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                //1 获取因子集合
                var factorArr = [];
                for (var i = 1; i < index; i++) {
                    factorArr.push({
                        "factorOrder":$.trim($("#order_" + i).text()),
                        "factorId": $("#factorName_" + i).val(),
                        "operate": $("#operate_" + i).val(),
                        "factorValue": $("#value_" + i).val()
                    })
                }
                var factors = JSON.stringify(factorArr);//因子集合转换为字符串


                //2 拼装表达式
                var expAll = "";
                $.each($(".oc_tags").children(),function(i,obj){
                    expAll += $(obj).children().first().attr("exp")+" ";
                })
                console.log(expAll);

                if($.trim(expAll)==""){
                    // layer.alert('规则不能为空！',{icon: 2});
                    Alert.error('规则不能为空.')
                    return;
                }

                //3 请求后台，校验规则
                var opts = {};
                opts.url = '/crm/manage/engine/compileBaseRule';
                opts.method = 'GET';
                opts.params = {expression : expAll};
                opts.data = factorArr;
                HttpService.linkHttp(opts).then(function(response) {
                    Alert.success("请求成功");
                    if (response.data=="1"){
                        result = true;
                    }
                });
                return result;
            },
            //  提交按钮事件
            add: function() {
                //加载等待层，可防止重复提交
                // layer.load();
                //校验
                // if(!$("#addFrom").valid()){
                //     layer.closeAll();
                //     return;
                // };

                var ruleName = $.trim($("#ruleName").val());
                if(ruleName==""){
                    // layer.closeAll();
                    // parent.layer.alert('规则名称不能为空！',{icon: 2});
                    Alert.error('请输入基本规则名称.')
                    return;
                }

                var ruleName = $.trim($("#ruleName").val());
                var ruleId = $.trim($("#baseRuleId").val());

                var opts = {};
                opts.url = '/crm/manage/engine/checkName';
                opts.method = 'GET';
                opts.params = {'ruleName':ruleName,'ruleId':ruleId};
                HttpService.linkHttp(opts).then(function(response) {
                    console.log(response.data);
                    if(response.data != "0"){// 校验名称是否重复
                        Alert.error('规则名称已存在.');
                        return;
                    } else {
                        //校验规则内容
                        //1 获取因子集合
                        var factorArr = [];
                        for (var i = 1; i < $scope.baseRuleAdd.index; i++) {
                            factorArr.push({
                                "factor_order":$.trim($("#order_" + i).text()),
                                "factor_id": $("#factorName_" + i).val(),
                                "operate": $("#operate_" + i).val(),
                                "factor_value": $("#value_" + i).val()
                            })
                        }

                        //2 拼装表达式
                        var expAll = "";
                        $.each($(".oc_tags").children(),function(i,obj){
                            expAll += $(obj).children().first().attr("exp")+" ";
                        })
                        console.log(expAll);

                        if($.trim(expAll)==""){
                            Alert.error('规则不能为空.')
                            return;
                        }

                        //3 请求后台，校验规则
                        var opts = {};
                        opts.url = '/crm/manage/engine/compileBaseRule';
                        opts.method = 'POST';
                        opts.params = {expression : expAll};
                        opts.data = factorArr;
                        HttpService.linkHttp(opts).then(function(response) {
                            // Alert.success("请求成功");
                            if (response.data=="0"){
                                Alert.error('校验规则失败.')
                                return ;
                            } else {

                                //获取页面参数
                                var ruleName = $.trim($("#ruleName").val());//规则名

                                //获取因子集合
                                var factorArr = [];
                                for (var i = 1; i < $scope.baseRuleAdd.index; i++) {
                                    if($(".oc_tags span:contains('R1')")[0] == undefined){
                                        // layer.closeAll();
                                        // layer.alert('规则【R'+i+'】未被使用！',{icon: 2});
                                        Alert.error('规则【R'+i+'】未被使用！')
                                        return;
                                    }
                                    factorArr.push({
                                        "factorOrder":$.trim($("#order_" + i).text()),
                                        "factorId": $("#factorName_" + i).val(),
                                        "operate": $("#operate_" + i).val(),
                                        "factorValue": $("#value_" + i).val()
                                    })
                                }

                                //获取表达式内容
                                var expression = "";
                                $.each($(".oc_tags").children(), function (i, obj) {
                                    expression += $(obj).children().first().attr("exp") + " ";
                                });
                                //提交按钮同时添加（）
                                expression = $scope.baseRuleAdd.addBracket(expression);

                                if(!$.trim(expression)){
                                    //关闭等待层，返回
                                    Alert.error('请输入表达式内容.')
                                    return;
                                }

                                //校验所选因子是否全部应用到表达式中
                                var baseRuleObj = new Object();
                                baseRuleObj.ruleName = ruleName;
                                baseRuleObj.expression = expression;
                                baseRuleObj.remark = $("#remark").val();

                                var opts = {};
                                opts.url = '/crm/manage/engine/saveRule';
                                opts.method = 'PUT';
                                opts.params = baseRuleObj;
                                opts.data = factorArr;
                                HttpService.linkHttp(opts).then(function(response) {
                                    // Alert.success("请求成功");
                                    angular.extend(toastrConfig, $scope.options);
                                    toastr[$scope.options.type]('保存成功!', '');

                                    $state.go('mgrcenter.engineManage.baserule',{});
                                });

                            }
                        });
                    }
                });
                // 请求后台，提交数据
                // $.post($ROOT+"rule_base_rule/saveRule",{
                //     "ruleName":ruleName,
                //     "factors":JSON.stringify(factorArr),
                //     "expression":expression,
                //     "remark":$("#remark").val()
                // },function (data) {
                //     if (data.rst=="SUCCESS"){
                //         layer.msg('保存成功',{
                //             time: 2000
                //         }, function(){
                //             // $.linkTo("/rule/baserule/base_rule_list");
                //             // $scope.baseRuleAdd.closeWin();
                //         });
                //     }else{
                //         // layer.closeAll();
                //         layer.msg(data.content);
                //     }
                // },"json");
            },
            /**
             * 修改
             */
            update: function() {
                //加载等待层，可防止重复提交
                layer.load();
                //校验
                if(!$("#addFrom").valid()){
                    layer.closeAll();
                    return;
                };
                var ruleName = $.trim($("#ruleName").val());
                if(ruleName==""){
                    layer.closeAll();
                    parent.layer.alert('规则名称不能为空！',{icon: 2});
                    return;
                }

                //校验名称是否重复
                if(!this.checkName()){
                    layer.closeAll();
                    layer.alert('规则名称已经存在！',{icon: 2});
                    return;
                }
                //校验规则内容
                if(!this.checkExp(this.index)){
                    layer.closeAll();
                    layer.alert('规则校验失败！',{icon: 2});
                    return;
                }

                //获取页面参数
                var id = $("#baseRuleId").val();
                var ruleName = $.trim($("#ruleName").val());//规则名

                //获取因子集合
                var factorArr = [];
                for (var i = 1; i < this.index; i++) {
                    if(!$(".oc_tags span:contains('R"+i+"')").size()){
                        layer.closeAll();
                        layer.alert('规则【R'+i+'】未被使用！',{icon: 2});
                        return;
                    }
                    factorArr.push({
                        "factor_order":$.trim($("#order_" + i).text()),
                        "factor_id": $("#factorName_" + i).val(),
                        "operate": $("#operate_" + i).val(),
                        "factor_value": $("#value_" + i).val()
                    })
                }
                var factors = JSON.stringify(factorArr);//因子集合

                //获取表达式内容
                var expression = "";
                $.each($(".oc_tags").children(), function (i, obj) {
                    expression += $(obj).children().first().attr("exp") + " ";
                });

                expression = baseRuleAdd.addBracket(expression);


                // expression="<span>(</span><div class='oc_tag_remove'>X</div>"
                //               +expression+"<span>)</span><div class='oc_tag_remove'>X</div>";



                if(!$.trim(expression)){
                    //关闭等待层，返回
                    layer.closeAll();
                    layer.alert('请输入表达式内容！',{icon: 2});
                    return;
                }

                //请求后台，提交数据
                $.post($ROOT+"rule_base_rule/updateRule",{
                    "id":id,
                    "ruleName":ruleName,
                    "factors":factors,
                    "expression":expression,
                    "remark":$("#remark").val()
                },function (data) {
                    if (data.rst=="SUCCESS"){
                        layer.msg('保存成功',{
                            time: 2000
                        }, function(){
                            $.linkTo("/rule/baserule/base_rule_list");
                            baseRuleAdd.closeWin();
                        });
                    }else{
                        layer.msg('保存失败');
                    }
                },"json")
            },
            addBracket: function(expression) {
                expression = $.trim(expression);
                if(expression.substring(0, 1) != '(' || expression.substring(expression.length-1, expression.length) != ')'){
                    expression = '(' + expression + ')';
                }

                $scope.baseRuleAdd.compileExp(expression);
                $scope.baseRuleAdd.updateTranslationBaseRule();

                return  expression;
            },
            check: function () {
                //校验
                $("#addFrom").validate({
                    rules: {
                        ruleName: {
                            required: true,
                            minlength: 2,
                            maxlength: 100
                        }
                    },
                    messages: {
                        ruleName: {
                            required: "请输入规则名称",
                            minlength: "名称不能少于两个字符",
                            maxlength: "名称不能多余100个字符"
                        }
                    },
                    errorElement: "em",
                    errorPlacement: function (error, element) {
                        error.addClass("text-danger");
                        if (element.prop("type") === "checkbox") {
                            error.insertAfter(element.parent("label"));
                        } else {
                            error.insertAfter(element);
                        }
                    }
                });
            },
            checkName: function () {
                var result = false;
                var ruleName = $.trim($("#ruleName").val());
                var ruleId = $.trim($("#baseRuleId").val());

                var opts = {};
                opts.url = '/crm/manage/engine/checkName';
                opts.method = 'GET';
                opts.params = {'ruleName':ruleName,'ruleId':ruleId};
                HttpService.linkHttp(opts).then(function(response) {
                    console.log(response.data);
                    result = response.data;
                    if(response.data == "0"){
                        result =  true;
                    }
                    return result;
                });
            },
            //关闭窗口
            closeWin:function(){
                var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
                parent.layer.close(index);
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
            /**
             * 更新因子表达式的译文
             */
            updateTranslationBaseRule:function() {
                $("#remark").val("");
                $(".sortable > *").each(function(){
                    var exp = $(this).find("[exp]").attr("exp");
                    var factor = $("#factorTable td:contains('"+exp+"')").next().find("input:last").val();
                    var opereate = $("#factorTable td:contains('"+exp+"')").next().next().find("option:selected").html();
                    var value = $("#factorTable td:contains('"+exp+"')").next().next().next().find("option:selected").html();
                    value = value||$("#factorTable td:contains('"+exp+"')").next().next().next().find("input").val();

                    var translation = factor + opereate + value;
                    translation = (translation||"").replace(/\&lt;/g, '<').replace(/\&gt;/g, '>') || exp;
                    $("#remark").val($("#remark").val() +" "+ translation);
                });
            },
            keyDown:function(e) {
                var ev= window.event||e;
                if (ev.keyCode == 13) {
                    e.preventDefault();
                }
            }
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
        /////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////   新页面 代码     ///////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////

        //////////////////////////////// tree start ////////////////////////////////////////////
        var setting = {
            view: {
                showIcon: false, //是否在树中各个节点旁边显示图标
                fontCss : {"font-weight": "bold",color:"#6a6a6a"}
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
            // alert(treeNode.pId);
            // // alert(selected.node.id + ' ==> ' + selected.node.text);
            // console.log(treeNode);
            if (treeNode.pId != "#" && treeNode.pId != null) {
                var success = $scope.baseRuleAdd.addRow($("#factorTable tr:last > td:last > button:last"), treeNode.id);
                if (success) {
                    itemDragInit($("#factorTable .drag-item:last"));
                }
                return false;
            } else {
                return true;
            }
        }

        var ztreeDefaultData = [
            {id: "n1", pId: "#", name: "基础因子",open:true},
            {id: "n2", pId: "#", name: "复杂因子",open:true}
        ];

        //////////////////////////////// tree start ////////////////////////////////////////////
        $scope.basicConfig = {
            core: {
                multiple : false,
                animation: true,
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
            'plugins': ['types'],
            'version': 1
        };

        $scope.treeEventsObj = {
            'ready': readyCB,
            'select_node': selectNodeCB,
            'create_node': createNodeCB
        }

        function readyCB() {
            $log.info('readyCB called');
        };

        function selectNodeCB(event,selected) {
            // alert(selected.node.id + ' ==> ' + selected.node.text);
            console.log(selected);

            if (selected.node.parent != "#") {
                var success = $scope.baseRuleAdd.addRow($("#factorTable tr:last > td:last > button:last"), selected.node.id);
                if (success) {
                    itemDragInit($("#factorTable .drag-item:last"));
                }
                return false;
            } else {
                return true;
            }
        };

        function createNodeCB(e,item) {
            $log.info('createNodeCB called');
        };

        $scope.applyModelChanges = function() {
            return true;
        };

        function getDefaultData() {
            return [
                {
                    "id": "n1",
                    "parent": "#",
                    "type": "folder",
                    "text": "基础因子",
                    "state": {
                        "opened": true
                    }
                },
                {
                    "id": "n2",
                    "parent": "#",
                    "type": "folder",
                    "text": "复杂因子",
                    "state": {
                        "opened": true
                    }
                }

            ]
        }
        //////////////////////////////// tree end ////////////////////////////////////////////

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
            $state.go('mgrcenter.engineManage.baserule',{});
            // $location.path('/portrayal/perCusPortrayal').search({'custNo':custNo});
        }

        /////////////////////////////////////////////////////////////////////////////////////////
        // do
        $scope.baseRuleAdd.init();

    }
})();