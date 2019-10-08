(function() {
    'use strict';

    angular.module('BlurAdmin.pages.mgrcenter.msgManage').controller('msgSendSetCtrl', msgSendSetCtrl);
    /** @ngInject */
    function msgSendSetCtrl($scope, $state, $filter,HttpService,EnumType,Alert,$uibModal) {

        $scope.msgSendDefDts = {};
        $scope.msgSendDefDts.msgType ="" ;  //信息类型
        $scope.msgSendDefDts.msgCode ="" ;  //信息编码
        $scope.msgSendDefDts.msgTopic = "";  //信息主题
        $scope.msgSendDefDts.templateCode = "";		//模板代码
        $scope.msgSendDefDts.templateContent = "";		//模板内容
        $scope.msgSendDefDts.sendObj = ""; //发送对象
        $scope.msgSendDefDts.cc ="";  //抄送
        $scope.msgSendDefDts.sendChannel = ""; //发送渠道
        $scope.msgSendDefDts.sendWay = ""; //发送方式
        $scope.msgSendDefDts.fixTime = ""; //定时时间
        $scope.msgSendDefDts.fixDay = ""; //定时年月日
        $scope.msgSendDefDts.fixHour = ""; //定时分钟
        $scope.msgSendDefDts.loopFlag = ""; //循环发送类型
        $scope.msgSendDefDts.loopType ="";  //循环类型
        $scope.msgSendDefDts.msgOrder="";  //消息优先级
        $scope.msgSendDefDts.resendTimes = ""; //失败重发次数
        $scope.msgSendDefDts.msgStat  = ""; //生效状态
        $scope.options = {};
        $scope.options.duanxin="";
        $scope.options.weixin="";
        $scope.options.youjian="";
        $scope.options.zhanneixin="";
        $scope.options.app="";
        //发送方式
        $scope.radioOptions = {};
        $scope.radioOptions.select="";
        //发送类型
        $scope.radioSendTyp = {};
        $scope.radioSendTyp.select="";
        //信息类型
        $scope.msgTypes  = EnumType.msgType;
        $scope.loopTypes  = EnumType.loopType;
        $scope.msgOrders =  EnumType.msg_order;
        //设置默认的选中，发送渠道
        $scope.options.duanxin = true;
        $scope.options.weixin = true;
        $scope.options.youjian = true;
        $scope.options.zhanneixin = true;
        $scope.options.app = true;
        //
        $scope.radioOptions.select = "frequency";
        $scope.radioSendTyp.select = "norecycle";

        //控件隐藏或显示设置  定时时间、循环类型
        $scope.showtime = false;
        $scope.showrecycletyp = false;

        // 日期控件
        $scope.open2 = open2;
        // 打开日期控件
        function open2() {
            $scope.opened2 = true;
        }

        $scope.msgSendDefDts.msgMinute  = ""; //分钟
        $scope.msgSendDefDts.msgHour  = ""; //小时

        $scope.hours =
            [
                { id: 1, type: "Work" , name: "0时" },
                { id: 2, type: "Work" , name: "1时" },
                { id: 3, type: "Work" , name: "Fixing bugs" },
                { id: 4, type: "Play" , name: "Dancing" }
            ];
        $scope.minutes =
            [
                { id: 1, type: "Work" , name: "00分" },
                { id: 2, type: "Work" , name: "01分" },
                { id: 3, type: "Work" , name: "Fixing bugs" },
                { id: 4, type: "Play" , name: "Dancing" }
            ];

        $scope.engineer = {
            name: "Dani" ,
            currentActivity: {
                id: 3,
                type: "Work" ,
                name: "Fixing bugs"
            }
        };

        // 用户信息对象
        $scope.userInfo = {};

        //模板选择
        $scope.selectTemplate = function() {
            var modalInstance = $uibModal.open({
                animation : true,
                backdrop : 'static',
                templateUrl : 'app/pages/mgrcenter/msgManage/msgSendAdd/selectOneMsgTmpt.html',
                size : 'midle-900',
                controller : 'ProfileModalCtrl',
                scope : $scope,
                resolve : {
                    items: function () {
                        return $scope.items;
                    }

                }
            });
            modalInstance.result.then(function (result) {
                $scope.msgSendDefDts.templateCode = result.tplNo;		//模板代码
                $scope.msgSendDefDts.templateContent = result.tplCont;		//模板内容

                console.log(result); //result关闭是回传的值
            }, function (reason) {
                console.log(reason);//点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel

            });

        }

        $scope.getSelectSend = function(inputtyp) {
            //直接发送
            if (inputtyp == '0') {
                $scope.showtime = false;
            }else if (inputtyp == '1') {
                //定时返送
                $scope.showtime = true;
            }
        }
        $scope.getSelectRecycleTyp = function(inputtyp) {
            //不循环
            if (inputtyp == '0') {
                $scope.showrecycletyp = false;
            }else if (inputtyp == '1') {
                //循环
                $scope.showrecycletyp = true;
            }
        }


        /**
         *
         * @returns {{restrict: string, link: link}}
         */
        function tagInput() {
            return {
                restrict: 'A',
                link: function( $scope, elem, attr) {
                    $(elem).tagsinput({
                        tagClass:  'label label-' + attr.tagInput
                    });
                }
            };
        }
        // // 岗位选中事件
        // $scope.selectPosi = function(selected) {
        //
        //     $scope.userInfo.posiCode = selected.posiCode;
        //     $scope.userInfo.posiName = selected.posiName;
        // }
        //----------标签开始------------
        // var tagDataCopy = [];
        // var custNo = "";
        // $scope.tagAdded = function(tag) {
        //     tagDataCopy.push(tag.text);
        //     HttpService.linkHttp({
        //         url: 'crm/ecif/cust/setCustTag',
        //         method: 'PUT',
        //         params: {'custNo': custNo,'tagList':tagDataCopy}
        //     }).then(function (response) {
        //     });
        // };
        //
        // $scope.tagRemoved = function(tag) {
        //     var index = tagDataCopy.indexOf(tag.text);
        //     if (index !== -1) {
        //         tagDataCopy.splice(index, 1);
        //     }
        //     HttpService.linkHttp({
        //         url: 'crm/ecif/cust/setCustTag',
        //         method: 'PUT',
        //         params: {'custNo': custNo,'tagList': tagDataCopy}
        //     }).then(function (response) {
        //     });
        // };
        //
        // HttpService.linkHttp({
        //     url: 'crm/ecif/cust/custTagList',
        //     method: 'GET',
        //     params: {'custNo': custNo}
        // }).then(function (response) {
        //     $scope.tagData = response.data.map(function (item) {
        //         return item.custTagNam;
        //     });
        //     tagDataCopy = angular.copy($scope.tagData);
        // });
        //
        // $scope.loadDatas = function (query) {
        //     // An arrays of strings here will also be converted into an
        //     // array of objects
        //     return [
        //         "1级客户",
        //         "2级客户",
        //         "3级客户",
        //         "高价值客户",
        //         "高频次客户",
        //         "高风险客户",
        //         "VIP客户",
        //     ];
        // };
        //----------------标签结束-----------------

        //生效信息
        $scope.validValue = function(isValid) {
            $scope.msgSendDefDts.msgStat  = "1"; //生效
            genSetParm();

        }

        /**
         *
         */
        function genSetParm() {
            //**设置校验/
            //信息类型
            if($scope.msgSendDefDts.msgType == null || $scope.msgSendDefDts.msgType == ""){
                Alert.error('请录入信息类型！');
                return;
            }
            //信息编码
            if($scope.msgSendDefDts.msgCode == null || $scope.msgSendDefDts.msgCode == ""){
                Alert.error('请录入信息编码！');
                return;
            }
            //信息主题
            if($scope.msgSendDefDts.msgTopic == null || $scope.msgSendDefDts.msgTopic == ""){
                Alert.error('请录入信息主题！');
                return;
            }
            //模板代码
            if($scope.msgSendDefDts.templateCode == null || $scope.msgSendDefDts.templateCode == ""){
                Alert.error('请选择模板！');
                return;
            }
            //发送对象
            if($scope.msgSendDefDts.sendObj == null || $scope.msgSendDefDts.sendObj == ""){
                Alert.error('请录入发送对象！');
                return;
            }
            //抄送
            if($scope.msgSendDefDts.cc == null || $scope.msgSendDefDts.cc == ""){
                Alert.error('请录入抄送信息！');
                return;
            }


            //checkbox发送渠道  begin
            if($scope.options.duanxin == true){
                //alert("options.duanxin"); 短信
                if($scope.msgSendDefDts.sendChannel == ""){
                    $scope.msgSendDefDts.sendChannel = "01";
                }else{
                    $scope.msgSendDefDts.sendChannel = $scope.msgSendDefDts.sendChannel + "|" + "01";
                }

            }
            if($scope.options.weixin ==true){
                //alert("options.weixin"); 0"微信"
                if($scope.msgSendDefDts.sendChannel == ""){
                    $scope.msgSendDefDts.sendChannel = "02";
                }else{
                    $scope.msgSendDefDts.sendChannel = $scope.msgSendDefDts.sendChannel + "|" + "02";
                }
            }
            if($scope.options.youjian ==true){
                //alert("options.youjian");03"邮件"
                if($scope.msgSendDefDts.sendChannel == ""){
                    $scope.msgSendDefDts.sendChannel = "03";
                }else{
                    $scope.msgSendDefDts.sendChannel = $scope.msgSendDefDts.sendChannel + "|" + "03";
                }
            }
            if($scope.options.zhanneixin ==true){
                //alert("options.zhanneixin");"站内信"
                if($scope.msgSendDefDts.sendChannel == ""){
                    $scope.msgSendDefDts.sendChannel = "05";
                }else{
                    $scope.msgSendDefDts.sendChannel = $scope.msgSendDefDts.sendChannel + "|" + "05";
                }
            }
            if($scope.options.app ==true){
                //alert("options.app"); 06 站内提醒
                if($scope.msgSendDefDts.sendChannel == ""){
                    $scope.msgSendDefDts.sendChannel = "06";
                }else{
                    $scope.msgSendDefDts.sendChannel = $scope.msgSendDefDts.sendChannel + "|" + "06";
                }
            }
            //end 渠道
            //发送渠道
            if($scope.msgSendDefDts.sendChannel == null || $scope.msgSendDefDts.sendChannel == ""){
                Alert.error('请录入发送渠道信息！');
                return;
            }

            //radio 发送方式 直接、定时
            if($scope.radioOptions.select == "frequency"){
                //alert("radioOptions.direct");
                $scope.msgSendDefDts.sendWay = "0";
            }
            if($scope.radioOptions.select == "direct"){
                //alert("radioOptions.frequency");\
                //如果选择定时发送，发送时间必须是设置
                if($scope.msgSendDefDts.fixDay ==null || $scope.msgSendDefDts.fixDay ==''){
                    Alert.error("定时发送需要设置定时时间！");
                    return;
                }else{
                    var startDate = new Date($scope.msgSendDefDts.fixDay);
                    $scope.msgSendDefDts.fixTime = $filter('date')(startDate, 'yyyy-MM-dd');
                }

                if($scope.msgSendDefDts.fixHour ==null || $scope.msgSendDefDts.fixHour ==''){
                    Alert.error("定时发送需要设置定时时间！");
                    return;
                }else{
                    // var startDate = new Date($scope.msgSendDefDts.fixDay);
                    // $scope.msgSendDefDts.fixTime = $filter('date')(startDate, 'yyyyMMdd');
                    //yyyy-MM-dd HH:mm:ss
                    $scope.msgSendDefDts.fixTime =  $scope.msgSendDefDts.fixTime + " " +$scope.msgSendDefDts.fixHour + ":00";
                }

                $scope.msgSendDefDts.sendWay = "1";
            }

            //radio 发送类型
            if($scope.radioSendTyp.select == "norecycle"){
                $scope.msgSendDefDts.loopFlag ="0";
            }
            if($scope.radioSendTyp.select == "isrecycle"){
                //alert("radioSendTyp.isrecycle");
                if($scope.msgSendDefDts.loopType == ""){
                    Alert.error("循环发送需要设置循环类型！");
                    return;
                }
                $scope.msgSendDefDts.loopFlag ="1";
            }
            //消息优先级
            if($scope.msgSendDefDts.msgOrder == null || $scope.msgSendDefDts.msgOrder == ""){
                Alert.error('请录入消息优先级！');
                return;
            }
            //消息优先级
            if($scope.msgSendDefDts.resendTimes == null || $scope.msgSendDefDts.resendTimes == ""){
                Alert.error('请录入失败重发次数！');
                return;
            }
            //抄送
            //     $scope.msgSendDefDts.cc = tagDataCopy;

            // if (!isValid) {
            // 	return;
            // }
            $scope.msgSendDefDts.msgType = $scope.msgSendDefDts.msgType.value;
            $scope.msgSendDefDts.loopType = $scope.msgSendDefDts.loopType.value;
            $scope.msgSendDefDts.msgOrder = $scope.msgSendDefDts.msgOrder.value;
            //   $scope.msgSendDefDts.msgStat  = "0"; //生效

            //实体对象ZcmMsgSendDef
            var opts = {};
            opts.url = '/crm/manage/msgmng/addMsg';
            opts.method = 'POST';
            //opts.params = $scope.userInfo;
            opts.params = $scope.msgSendDefDts
            HttpService.linkHttp(opts).then(function(response) {
                console.log("请求成功");
                console.log(response);
                Alert.success("请求成功");
                $scope.$parent.$dismiss();
                //刷新主页面
                $scope.searchMsg();
            });
        }
        // 保存用户信息
        $scope.saveValue = function(isValid) {
            $scope.msgSendDefDts.msgStat  = "0"; //保存
            genSetParm();
            $scope.msgSendDefDts.sendChannel = "";

        }

        // 关闭新增页面
        $scope.closePage = function() {

            $scope.$parent.$dismiss();
        }

    }

})();
