(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.msgManage').controller(
			'msgSendAddCtrl', msgSendAddCtrl);
	/** @ngInject */
	function msgSendAddCtrl($scope, $filter, $uibModal, $timeout, HttpService,
			toastr, EnumType, Alert) {
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

        // 日期控件
        $scope.open2 = open2;
        // 打开日期控件
        function open2() {
            $scope.opened2 = true;
        }

        // var vm = this;
        // vm.selectWithSearchItems = [
        //     { label: 'Hot Dog, Fries and a Soda', value: 1 },
        //     { label: 'Burger, Shake and a Smile', value: 2 },
        //     { label: 'Sugar, Spice and all things nice', value: 3 },
        //     { label: 'Baby Back Ribs', value: 4 },
        // ];
		// 用户信息对象
		$scope.userInfo = {};

		// 性别列表
		$scope.sexList = EnumType.Sex;

		// 机构列表对象
		$scope.enterList = [];
		// 部门列表对象
		$scope.deptList = [];
		// 岗位列表对象
		$scope.posiList = [];
        //模板选择
        $scope.selectTemplate = function() {
            var modalInstance = $uibModal.open({
                animation : true,
                backdrop : 'static',
                templateUrl : 'app/pages/mgrcenter/msgManage/msgSendAdd/selectOneMsgTmpt.html',
                size : 'midle-1200',
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

		// 获取机构列表
		$scope.getEnterList = function() {

			var opts = {};

			opts.url = '/crm/manage/getAllEntersOnOrder';
			opts.method = 'GET';
			opts.params = {};
			HttpService.linkHttp(opts).then(function(response) {

				console.log(response);

				if (response.data !== undefined) {

					// 机构列表临时变量

					angular.forEach(response.data, function(i) {
						var temp = {};
						temp = i;
						temp.show = i.enterCode + '|' + i.enterName
						$scope.enterList.push(temp);
					});
				}
			});
		}
		$scope.getEnterList();

		// 性别选中事件
		$scope.selectSex = function(selectedSex) {
			$scope.userInfo.sex = selectedSex.value;
		}

		// 部门选中事件
		$scope.selectDept = function(selected) {

			$scope.userInfo.deptCode = selected.deptCode;
			$scope.userInfo.deptName = selected.deptName;

			var opts = {};
			opts.url = '/crm/manage/getPosiByDept';
			opts.method = 'GET';
			opts.params = {
				deptCode : selected.deptCode
			};
			HttpService.linkHttp(opts).then(function(response) {

				console.log(response);

				if (response.data !== undefined) {

					$scope.posiList = [];

					angular.forEach(response.data, function(i) {
						var temp = {};
						temp = i;
						temp.show = i.posiCode + '|' + i.posiName
						$scope.posiList.push(temp);
					});
				}
			});
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
		// 岗位选中事件
		$scope.selectPosi = function(selected) {

			$scope.userInfo.posiCode = selected.posiCode;
			$scope.userInfo.posiName = selected.posiName;
		}
        //----------标签开始------------
        var tagDataCopy = [];
		var custNo = "";
        $scope.tagAdded = function(tag) {
            tagDataCopy.push(tag.text);
            HttpService.linkHttp({
                url: 'crm/ecif/cust/setCustTag',
                method: 'PUT',
                params: {'custNo': custNo,'tagList':tagDataCopy}
            }).then(function (response) {
            });
        };

        $scope.tagRemoved = function(tag) {
            var index = tagDataCopy.indexOf(tag.text);
            if (index !== -1) {
                tagDataCopy.splice(index, 1);
            }
            HttpService.linkHttp({
                url: 'crm/ecif/cust/setCustTag',
                method: 'PUT',
                params: {'custNo': custNo,'tagList': tagDataCopy}
            }).then(function (response) {
            });
        };

        HttpService.linkHttp({
            url: 'crm/ecif/cust/custTagList',
            method: 'GET',
            params: {'custNo': custNo}
        }).then(function (response) {
            $scope.tagData = response.data.map(function (item) {
                return item.custTagNam;
            });
            tagDataCopy = angular.copy($scope.tagData);
        });

        $scope.loadDatas = function (query) {
            // An arrays of strings here will also be converted into an
            // array of objects
            return [
                "1级客户",
                "2级客户",
                "3级客户",
                "高价值客户",
                "高频次客户",
                "高风险客户",
                "VIP客户",
            ];
        };
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

            if($scope.msgSendDefDts.fixTime !=null && $scope.msgSendDefDts.fixTime!=''){
                var startDate = new Date($scope.msgSendDefDts.fixTime);
                $scope.msgSendDefDts.fixTime = $filter('date')(startDate, 'yyyyMMdd');
            }
            //checkbox发送渠道  begin
            if($scope.options.duanxin == true){
                //alert("options.duanxin");
                if($scope.msgSendDefDts.sendChannel == ""){
                    $scope.msgSendDefDts.sendChannel = "dx";
                }else{
                    $scope.msgSendDefDts.sendChannel = $scope.msgSendDefDts.sendChannel + "|" + "dx";
                }

            }
            if($scope.options.weixin ==true){
                //alert("options.weixin");
                if($scope.msgSendDefDts.sendChannel == ""){
                    $scope.msgSendDefDts.sendChannel = "wx";
                }else{
                    $scope.msgSendDefDts.sendChannel = $scope.msgSendDefDts.sendChannel + "|" + "wx";
                }
            }
            if($scope.options.youjian ==true){
                //alert("options.youjian");
                if($scope.msgSendDefDts.sendChannel == ""){
                    $scope.msgSendDefDts.sendChannel = "yj";
                }else{
                    $scope.msgSendDefDts.sendChannel = $scope.msgSendDefDts.sendChannel + "|" + "yj";
                }
            }
            if($scope.options.zhanneixin ==true){
                //alert("options.zhanneixin");
                if($scope.msgSendDefDts.sendChannel == ""){
                    $scope.msgSendDefDts.sendChannel = "znx";
                }else{
                    $scope.msgSendDefDts.sendChannel = $scope.msgSendDefDts.sendChannel + "|" + "znx";
                }
            }
            if($scope.options.app ==true){
                //alert("options.app");
                if($scope.msgSendDefDts.sendChannel == ""){
                    $scope.msgSendDefDts.sendChannel = "app";
                }else{
                    $scope.msgSendDefDts.sendChannel = $scope.msgSendDefDts.sendChannel + "|" + "app";
                }
            }
            //end 渠道
            //radio 发送方式 直接、定时
            if($scope.radioOptions.select == "direct"){
                //alert("radioOptions.direct");
                $scope.msgSendDefDts.sendWay = "0";
                if($scope.msgSendDefDts.fixTime != ""){

                }
            }
            if($scope.radioOptions.select == "frequency"){
                //alert("radioOptions.frequency");\
                //如果选择定时发送，发送时间必须是设置
                if($scope.msgSendDefDts.fixTime == ""){
                    alert("定时发送需要设置定时时间！")
                    return;
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
                    alert("循环发送需要设置循环类型！")
                    return;
                }
                $scope.msgSendDefDts.loopFlag ="1";
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
                //$scope.$parent.$dismiss();
            });
        }
		// 保存用户信息
		 $scope.saveValue = function(isValid) {
             $scope.msgSendDefDts.msgStat  = "0"; //保存
             genSetParm();

		}

		// 关闭新增页面
		$scope.closePage = function() {

			$scope.$parent.$dismiss();
		}

	}

})();
