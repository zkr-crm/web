(function () {
    'use strict';

    angular.module('BlurAdmin.pages.portrayal.perCusPortrayal')
        .controller('PerCusPortrayalCtrl', PerCusPortrayalCtrl);

    /** @ngInject */
    function PerCusPortrayalCtrl($scope,$state,$http,$stateParams,$uibModal, HttpService, EnumType,$filter, Alert,$sce, $rootScope, $compile) {
        var userId = $rootScope.global.user;
        var custNo = $stateParams.custNo;
        var custAgentList;
        if (localStorage.getItem('custAgentList')) {
            custAgentList = JSON.parse(localStorage.getItem('custAgentList'));
        } else {
            custAgentList = [];
            var initOpts = {};
            initOpts.url = '/crm/manage/auth/getRoleDateAuth';
            initOpts.method = 'GET';
            initOpts.params = {
                userCode : $rootScope.global.user,
                tableCode : "T001"
            };
            HttpService.linkHttp(initOpts).then(function(result) {
                if(!(result.data===undefined)){
                    angular.forEach(result.data, function(i) {
                        if(i.employeeId!==undefined){
                            custAgentList.push(i.employeeId);
                        }
                    });
                    localStorage.setItem('custAgentList',JSON.stringify(custAgentList))
                }
            });
        }
        $scope.dyncTrackTel = {};
        $scope.dyncTrackVis = {};
        $scope.dyncTrackSms = {};
        $scope.TrackSubType  = EnumType.TrackSubType;
        $scope.YesNoFlg  = EnumType.YesNoFlg;
        $scope.writCount = 200;
        $scope.trackEnum = [];
        angular.forEach(
            $scope.TrackSubType,
            function(item) {
                if (item.value == '41' || item.value == '42' ) {
                    $scope.trackEnum.push(item);
                }
            });

        // $scope.nextFpOpen = nextFpOpen;
        $scope.nextFpOpen = {
            opened:false
        }


        //电话 短信 拜访选项卡
        // $scope.c = 0;
        $scope.show=function(e){
            $scope.c=e;
            $scope.True = false ;
        }
        $scope.information=[
            '电话','短信','拜访'
        ]
        $scope.True = true ;
        $scope.z_show=function(){
            $scope.True=!$scope.True;
            if($scope.True == true){
                $scope.c = 4;
            }else{
                $scope.c = 0;
            }
        }

        //查看客户画像
        $scope.openDetail = function (custNo) {
            $state.go('portrayal.perCusPortrayal',{'custNo':custNo});
            // $location.path('/portrayal/perCusPortrayal').search({'custNo':custNo});
        }


        // 打开日期控件
        $scope.nextFpOpen = function() {
            $scope.nextFpOpen.opened = !$scope.nextFpOpen.opened;
        }

        $scope.nextFpVisOpened = {
            opened:false
        }

        // 打开日期控件
        $scope.nextFpVisOpen = function(){
            $scope.nextFpVisOpened.opened = !$scope.nextFpVisOpened.opened;
        }
        $scope.back = function(){
            // $state.go('myHome',{'tabOpen':'cust'});
            window.history.go(-1);
        };

        if (custNo == undefined) {
            window.history.go(-1);
            return
        }

        var refreshBaseInfo =function(){
            var opts = {};
            opts.url = 'crm/ecif/cust/mng/perCustInfo';
            opts.method = 'GET';
            opts.params = {'custNo': custNo};
            HttpService.linkHttp(opts).then(function (response) {
                if (response == undefined || response.data == undefined) {
                    return;
                }
                response.data.custSource = EnumType.DataSource.getLabelByValue(response.data.custSource);
                response.data.sex = EnumType.Sex.getLabelByValue(response.data.sex);
                response.data.trade = EnumType.BusinessType.getLabelByValue(response.data.trade);
                response.data.eduDegree = EnumType.Degree.getLabelByValue(response.data.eduDegree);
                response.data.nation = EnumType.Nation.getLabelByValue(response.data.nation)
                response.data.certTyp = EnumType.IdType.getLabelByValue(response.data.certTyp)
                response.data.marrigeSts = EnumType.Marriage.getEnumByValue(response.data.marrigeSts).label;
                $scope.addressYesNoFlg = response.data.addrList&&response.data.addrList.length>0;
                response.data.politSts = EnumType.PoliticalStatus.getEnumByValue(response.data.politSts).label;
                $scope.custom = response.data;
                var birthDate = response.data.birthDate? new Date(response.data.birthDate):'';
                var certDate = response.data.certDate?new Date(response.data.certDate):'';
                $scope.custom.birthDate = birthDate? $filter('date')(birthDate, 'yyyy-MM-dd'):'';
                $scope.custom.certDate = certDate?$filter('date')(certDate, 'yyyy-MM-dd'):'';
                $scope.custom.age =birthDate? parseInt((new Date().getTime() - new Date($scope.custom.birthDate).getTime())/(60*60*24*365*1000)):'';
                $scope.perIconImg = $scope.custom.perIconSmlBlob;
                $scope.custom.phoneList.forEach(function(item,index){
                    if (!item.phoneNo) {
                        $scope.custom.phoneList.splice(index,1)
                    }
                    item.custSource = item.custSource?EnumType.DataSource.getEnumByValue(item.custSource).label:'';
                    return item
                })
                $scope.custom.phoneArr = []
                $scope.custom.phoneList.forEach(function(item,index){
                    if (!item.custSource) {
                        $scope.custom.phoneArr.push(item)
                    }else{
                        $scope.custom.phoneArr.unshift(item)
                    }
                    return item
                })
                // 轨迹发送对象和电话赋值
                $scope.dyncTrackTel.contacts = $scope.custom.custName;
                $scope.dyncTrackTel.phoneNo = $scope.custom.phoneNumber;
                $scope.dyncTrackSms.contacts = $scope.custom.custName;
                $scope.dyncTrackVis.contacts = $scope.custom.custName;
                $scope.dyncTrackSms.phoneNo = $scope.custom.phoneNumber;
            });
        };

        refreshBaseInfo();



        $scope.cusDetail = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/portrayal/custDetail/custDetail.html',
                controller: 'CustDetailCtrl',
                size: 'midle-1200',
                backdrop:'static',
                resolve: {
                    'custNo': function () {
                        return custNo;
                    }
                }
            });
            modalInstance.result.then(function(){
                refreshBaseInfo();
                initTrackInfo(custNo);
                initCustTagList(custNo);
            });
        };

        //----------标签开始------------
        var tagDataCopy = [];
        $scope.tagAdded = function(tag) {
            console.log(tag);
            HttpService.linkHttp({
                url: 'crm/ecif/cust/addCustTag',
                method: 'PUT',
                params: {'custNo': custNo,'tagCd':tag.tagId,'tagNam':tag.tagName}
            }).then(function (response) {
                initTrackInfo(custNo);
            });
        };

        $scope.tagRemoved = function(tag) {

            console.log(tag);
            HttpService.linkHttp({
                url: 'crm/ecif/cust/delCustTag',
                method: 'PUT',
                params: {'custNo': custNo,'tagCd':tag.tagId,'tagNam':tag.tagName}
            }).then(function (response) {
                initTrackInfo(custNo);
            });
        };

        var loadData = {};
        $scope.tagDetails={};
        var initCustTagList = function(custNo) {
            HttpService.linkHttp({
                url: 'crm/manage/tagmng/tagDetials',
                method: 'GET',
                params: {
                    sys:{
                        pageNum:'1',
                        pageSize:'99999'
                    }
                }
            }).then(function (response) {
                if (response == undefined || response.data == undefined) {
                    return;
                }
                loadData = angular.copy(response.data.list);
                $scope.tagDetails=angular.copy(loadData);
            });

            HttpService.linkHttp({
                url: 'crm/ecif/cust/custTagList',
                method: 'GET',
                params: {'custNo': custNo}
            }).then(function (response) {
                if (response == undefined || response.data == undefined) {
                    return;
                }
                $scope.tagData = response.data.map(function (item) {
                    return item;
                });
            });
        }
        initCustTagList(custNo);

        $scope.loadDatas = function (query) {
            /*
            HttpService.linkHttp({
                url: 'crm/manage/tagmng/tagDetials',
                method: 'GET',
                params: {}
            }).then(function (response) {
            	if (response == undefined || response.data == undefined) {
            		return;
            	}
                loadData = angular.copy(response.data);
            });*/
            loadData=$scope.tagDetails.filter(function(x){
                return x.tagName.indexOf(query.trim())>-1;
            });
            return loadData;
        };
        //----------------标签结束-----------------


        //------时间轴开始------------

        var initTrackInfo = function(custNo) {
            HttpService.linkHttp({
                url: 'crm/ecif/cust/dyncTrackList',
                method: 'GET',
                params: {'custNo': custNo}
            }).then(function (response) {
                for (var index in response.data) {
                    if (response.data[index].trackTyp == '01') {
                        response.data[index].isContShow = false;
                        response.data[index].isNextShow = false;
                    } else {
                        response.data[index].isContShow = true;
                        if (response.data[index].trackTyp == '05' || response.data[index].trackTyp == '03') {
                            response.data[index].isNextShow = false;
                        } else {
                            response.data[index].isNextShow = true;
                        }
                    }
                    response.data[index].trackTyp = EnumType.TrackType.getLabelByValue(response.data[index].trackTyp);
                    response.data[index].trackSubTypNam = EnumType.TrackSubType.getLabelByValue(response.data[index].trackSubTyp);
                    response.data[index].comtFlg = EnumType.YesNoFlg.getLabelByValue(response.data[index].comtFlg);
                    var nextFollowUpTm = new Date(response.data[index].nextFollowUpTm);
                    response.data[index].nextFollowUpTm = $filter('date')(nextFollowUpTm, 'yyyy-MM-dd');
                }
                $scope.timelineCollection = response.data;
            });
        }

        initTrackInfo(custNo);

        var timelineBlocks = $('.cd-timeline-block'),
            offset = 0.8;

        //hide timeline blocks which are outside the viewport
        hideBlocks(timelineBlocks, offset);

        //on scolling, show/animate timeline blocks when enter the viewport
        $(window).on('scroll', function () {
            if (!window.requestAnimationFrame) {
                setTimeout(function () {
                    showBlocks(timelineBlocks, offset);
                }, 100);
            } else {
                window.requestAnimationFrame(function () {
                    showBlocks(timelineBlocks, offset);
                });
            }
        });

        function hideBlocks(blocks, offset) {
            blocks.each(function () {
                ($(this).offset().top > $(window).scrollTop() + $(window).height() * offset) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
            });
        }

        function showBlocks(blocks, offset) {
            blocks.each(function () {
                ($(this).offset().top <= $(window).scrollTop() + $(window).height() * offset && $(this).find('.cd-timeline-img').hasClass('is-hidden')) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
            });
        }
        //-------------时间轴结束--------------
        //-------------投诉建议开始--------------
        // 投诉信息
        $scope.searchCustComplainObj = {
            'complainNo' : '',
            'custNo' : custNo
        };

        $scope.clearCustComplainSearch = function() {
            $scope.searchCustComplainObj = {
                'complainNo' : '',
                'custNo' : custNo
            };

            $scope.searchCustComplain();
        }
        // 查询事件
        $scope.searchCustComplain = function() {
            var opts = {};
            opts.url = 'crm/ecif/cust/custComplainList';
            opts.method = 'GET';
            opts.params =  $scope.searchCustComplainObj;
            HttpService.linkHttp(opts).then(function(response) {
                console.log("请求成功");
                console.log(response);
                $scope.custComplainList = response.data.map(function (item) {
                    // 案件类型
                    item.caseTyp = EnumType.CaseType.getLabelByValue(item.caseTyp);
                    // 案件状态
                    item.caseSts = EnumType.CaseStatus.getLabelByValue(item.caseSts);
                    // 投诉类型
                    item.complainTyp = EnumType.ComplainType.getLabelByValue(item.complainTyp);
                    // 投诉状态
                    item.complainSts = EnumType.ComplainStatus.getLabelByValue(item.complainSts);
                    return item;
                });
            });
        }

        // 接触
        $scope.searchCustTouchObj = {
            'contactNo' : '',
            'dealPerson' : '',
            'custNo' : custNo
        };

        $scope.clearCustTouchSearch = function() {
            $scope.searchCustTouchObj = {
                'contactNo' : '',
                'dealPerson' : '',
                'custNo' : custNo
            };

            $scope.searchCustTouch();
        }
        //getCustTouch(item.custNo,item.contactNo)
        // 查询事件
        $scope.searchCustTouch = function() {
            var opts = {};
            opts.url = 'crm/ecif/cust/custTouchList';
            opts.method = 'GET';
            opts.params =  $scope.searchCustTouchObj;
            HttpService.linkHttp(opts).then(function(response) {
                console.log("请求成功");
                console.log(response);
                $scope.custTouchList = response.data.map(function (item) {
                    // 交互方式
                    item.interacMode = EnumType.InteracMode.getLabelByValue(item.interacMode);
                    // 无效标识
                    item.invalidFlg = EnumType.ValidFlg.getLabelByValue(item.invalidFlg);
                    // 交互状态(忽略)
                    // 反馈类型
                    item.feedbackTyp = EnumType.FeedbackType.getLabelByValue(item.feedbackTyp);
                    // 客户交互信息标识（客户号）
                    item.custInteracTypeNam = EnumType.InteractionType.getLabelByValue(item.custInteracType);
                    return item;
                });
            });
        }
        //-------------投诉建议结束--------------
        //-------------业务信息开始--------------
        // 保全
        $scope.searchCustEndorseObj = {
            'complainNo' : '',
            'custNo' : custNo
        };

        $scope.clearCustEndorseSearch = function() {
            $scope.searchCustEndorseObj = {
                'complainNo' : '',
                'custNo' : custNo
            };

            $scope.searchCustEndorse();
        }
        // getCustEndorse(item.custNo, item.endorApplyNo)
        // 查询事件
        $scope.searchCustEndorse = function() {
            var opts = {};
            opts.url = 'crm/ecif/cust/custEndorseList';
            opts.method = 'GET';
            opts.params =  $scope.searchCustEndorseObj;
            HttpService.linkHttp(opts).then(function(response) {
                console.log("请求成功");
                console.log(response);
                $scope.custEndorseList = response.data.map(function (item) {
                    item.endorSts = EnumType.EndorsementStatus.getLabelByValue(item.endorSts);
                    item.endorReasonNo = EnumType.EndorsementReasonNo.getLabelByValue(item.endorReasonNo);
                    return item;
                });
            });
        }
        // 保单
        $scope.searchCustProposalObj = {
            'custNo' : custNo
        };

        $scope.clearCustProposalSearch = function() {
            $scope.searchPolicyObj = {
                'applyOrderNo' : '',
                'custNo' : custNo
            };

        }
        // getCustProposal(item.custNo, item.applyOrderNo)
        // 查询事件
        $scope.searchCustProposal = function() {
            var opts = {};
            opts.url = 'crm/ecif/cust/custProposalList';
            opts.method = 'GET';
            opts.params =  $scope.searchCustProposalObj;
            HttpService.linkHttp(opts).then(function(response) {
                console.log("请求成功");
                console.log(response);
                $scope.custProposalList = response.data.map(function (item) {
                    item.payCycle = EnumType.PayIntv.getLabelByValue(item.payCycle);
                    item.indenTyp = EnumType.ContType.getLabelByValue(item.indenTyp);
                    item.operateDate = item.operateDate?item.operateDate.substr(0,10):'';

                    return item;
                });
            });
        }

        // 理赔
        $scope.searchCustClaimObj = {
            'claimNo' : '',
            'insureKindNam' : '',
            'custNo' : custNo
        };

        $scope.clearCustClaimSearch = function() {
            $scope.searchCustClaimObj = {
                'claimNo' : '',
                'insureKindNam' : '',
                'custNo' : custNo
            };

            $scope.searchCustClaim();
        }
        //getCustClaim(item.custNo, item.claimNo)
        // 查询事件
        $scope.searchCustClaim = function() {
            var opts = {};
            opts.url = 'crm/ecif/cust/custClaimList';
            opts.method = 'GET';
            opts.params =  $scope.searchCustClaimObj;
            HttpService.linkHttp(opts).then(function(response) {
                console.log("请求成功");
                console.log(response);
                $scope.custClaimList = response.data.map(function (item) {
                    item.whtClaim = EnumType.YesNoFlg.getLabelByValue(item.whtClaim);
                    item.claimTyp = EnumType.ClaimType.getLabelByValue(item.claimTyp);
                    item.claimSts = EnumType.ClmState.getLabelByValue(item.claimSts);
                    return item;
                });
            });
        }
        //-------------业务信息结束--------------
        //-------------积分开始--------------
        $scope.searchIntegralObj = {
            'productNam' : '',
            'integNam' : '',
            'custNo' : custNo
        };

        $scope.clearIntegSearch = function() {
            $scope.searchIntegralObj = {
                'productNam' : '',
                'integNam' : '',
                'custNo' : custNo
            };
            $scope.searchCustIntegral();
        }

        // 查询事件
        $scope.searchCustIntegral = function() {
            var opts = {};
            opts.url = 'crm/ecif/cust/custIntegralList';
            opts.method = 'GET';
            opts.params =  $scope.searchIntegralObj;
            HttpService.linkHttp(opts).then(function(response) {
                console.log("请求成功");
                console.log(response);
                $scope.custIntegralCollection = response.data.map(function (item) {
                    item.integChgTyp = EnumType.IntegralChgType.getLabelByValue(item.integChgTyp);
                    return item;
                });
            });
        }
        //-------------积分结束--------------
        //-------------代理人开始--------------

        $scope.searchAgentObj = {
            'origSysAgentNo' : '',
            'custNo' : custNo
        };

        $scope.Relation = EnumType.Relation;

        $scope.clearAgentSearch = function() {
            $scope.searchAgentObj = {
                'origSysAgentNo' : '',
                'custNo' : custNo
            };
            $scope.searchCustAgent();
        }

        // 查询事件
        $scope.searchCustAgent = function() {
            var opts = {};
            opts.url = 'crm/ecif/cust/custAgentList';
            opts.method = 'GET';
            opts.params =  $scope.searchAgentObj;
            HttpService.linkHttp(opts).then(function(response) {
                console.log("请求成功");
                console.log(response);
                $scope.custAgentList = response.data.map(function (item) {
                    item.perfGrade = EnumType.Rating.getLabelByValue(item.perfGrade);
                    item.creditGrade = EnumType.Rating.getLabelByValue(item.creditGrade);
                    item.agentSts = EnumType.AgentStat.getLabelByValue(item.agentSts);
                    item.agentKind = EnumType.AgentKind.getLabelByValue(item.agentKind);
                    item.blnChnl = EnumType.BelongChannel.getLabelByValue(item.blnChnl);
                    item.positGrade = EnumType.PositionGrade.getLabelByValue(item.positGrade);

                    return item;
                });
            });
        }

        /** 查询客户事件（单条） */
        $scope.getCustAgent = function(custNo, origSysAgentNo){
            console.log("portrayal custNo=" + custNo);
            console.log("portrayal origSysAgentNo=" + origSysAgentNo);

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/portrayal/popupPages/uptCustAgent.html',
                controller: 'uptCustAgentCtrl',
                size: 'midle-900', //
                backdrop:'static',
                resolve: {
                    'custNo': function () {
                        return custNo;
                    }, 'origSysAgentNo': function () {
                        return origSysAgentNo;
                    }
                }
            });
            modalInstance.result.then(function(){
                $scope.searchCustAgent();
            });
        };

        // 新增客户事件
        $scope.addCustAgent = function(){
            $scope.custNo = custNo;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/portrayal/popupPages/addCustAgent.html',
                controller: 'addCustAgentCtrl',
                size: 'midle-900',
                backdrop:'static',
                scope:$scope,
                resolve: {
                    'custNo': function () {
                        return custNo;
                    }
                }
            });
            modalInstance.result.then(function(){
                $scope.searchCustAgent();
            });
        };

        // 逻辑删除事件（单行删除）
        $scope.delCustAgent = function(custNo, origSysAgentNo) {
            console.log("portrayal custNo=" + custNo);
            console.log("portrayal origSysAgentNo=" + origSysAgentNo);

            Alert.confirm("确定删除？").then(function() {
                var opts = {};
                opts.url = '/crm/ecif/cust/delCustAgent';
                opts.method = 'PUT';
                opts.params = {
                    custNo : custNo,
                    origSysAgentNo : origSysAgentNo
                };
                HttpService.linkHttp(opts).then(function(response) {
                    console.log("请求成功");
                    console.log(response);
                    // 执行查询
                    $scope.searchCustAgent();
                });
            });

        };
        //-------------代理人结束--------------

        //-------------客户关系开始--------------

        $scope.searchRelObj = {
            'relationTyp' : '',
            'custNo' : custNo
        };

        $scope.Relation = EnumType.Relation;

        $scope.clearCustRelationSearch = function() {
            $scope.searchRelObj = {
                'relationTyp' : '',
                'custNo' : custNo
            };
            $scope.searchCustRelation();
        }

        // 查询事件
        $scope.searchCustRelation = function() {
            var opts = {};
            opts.url = 'crm/ecif/cust/custRelList';
            opts.method = 'GET';
            opts.params ={
                'custNo': $scope.searchRelObj.custNo,
                'relationTyp': $scope.searchRelObj.relationTyp.value
            };
            HttpService.linkHttp(opts).then(function(response) {
                console.log("请求成功");
                console.log(response);
                $scope.custRelCollection = response.data.list.map(function (item) {
                    item.relationTypNam = EnumType.Relation.getLabelByValue(item.relationTyp);
                    return item;
                });
            });
        }
        /** 查询客户事件（单条） */
        $scope.getCustRelation = function(custNo, relationTyp, refCustNo){
            console.log("portrayal custNo=" + custNo);
            console.log("portrayal relationTyp=" + relationTyp);
            console.log("portrayal refCustNo=" + refCustNo);

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/portrayal/popupPages/uptCustRelation.html',
                controller: 'uptCustRelationCtrl',
                size: 'midle-900', //
                backdrop:'static',
                resolve: {
                    'custNo': function () {
                        return custNo;
                    }, 'relationTyp': function () {
                        return relationTyp;
                    }, 'refCustNo': function () {
                        return refCustNo;
                    }
                }
            });
            modalInstance.result.then(function(){
                $scope.searchCustRelation();
            });
        };

        // 新增客户事件
        $scope.addCustRelation = function(){
            if($scope.custom.sex == '男' || $scope.custom.sex == '女' ){
                $scope.custNo = custNo;
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'app/pages/portrayal/popupPages/addCustRelation.html',
                    controller: 'addCustRelationCtrl',
                    size: 'midle-900',
                    backdrop:'static',
                    scope:$scope,
                    resolve: {
                        'custNo': function () {
                            return custNo;
                        }
                    }
                });
                modalInstance.result.then(function(){
                    $scope.searchCustRelation();
                    $scope.load();
                });
            }else {
                Alert.error('客户性别未知，请先修改');
            }
        };

        // 逻辑删除事件（单行删除）
        $scope.delCustRelation = function(custNo, relationTyp, refCustNo) {
            console.log("portrayal custNo=" + custNo);
            console.log("portrayal relationTyp=" + relationTyp);
            console.log("portrayal refCustNo=" + refCustNo);

            Alert.confirm("确定删除？").then(function() {
                var opts = {};
                opts.url = '/crm/ecif/cust/delCustRel';
                opts.method = 'PUT';
                opts.params = {
                    custNo : custNo,
                    relationTyp : relationTyp,
                    refCustNo : refCustNo,
                };
                HttpService.linkHttp(opts).then(function(response) {
                    console.log("请求成功");
                    console.log(response);
                    // 执行查询
                    $scope.searchCustRelation();
                    $scope.load();
                });
            });

        };
        //-------------客户关系结束--------------

        //-------------事件信息开始--------------
        $scope.searchEventObj = {
            'eventType' : '',
            'eventDesc' : '',
            'custNo' : custNo
        };

        $scope.EventType = EnumType.EventType;

        $scope.clearEventSearch = function() {
            $scope.searchEventObj = {
                'eventType' : '',
                'eventDesc' : '',
                'custNo' : custNo
            };
        }

        // 查询事件
        $scope.searchEvent = function() {
            var opts = {};
            opts.url = 'crm/ecif/cust/custEventList';
            opts.method = 'GET';
            opts.params ={
                'custNo': $scope.searchEventObj.custNo,
                'eventType': $scope.searchEventObj.eventType.value,
                'eventDesc': $scope.searchEventObj.eventDesc
            };
            HttpService.linkHttp(opts).then(function(response) {
                console.log("请求成功");
                console.log(response);
                $scope.custEventList = response.data.map(function (item) {
                    item.eventTypeNam = EnumType.EventType.getLabelByValue(item.eventType);
                    return item;
                });
            });
        }
        /** 查询客户事件（单条） */
        $scope.getCustEvent = function(custNo, eventType, eventDate){
            console.log("portrayal custNo=" + custNo);
            console.log("portrayal eventDate=" + eventDate);
            console.log("portrayal eventType=" + eventType);

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/portrayal/popupPages/uptEvent.html',
                controller: 'uptEventCtrl',
                size: 'midle-900', //
                backdrop:'static',
                resolve: {
                    'custNo': function () {
                        return custNo;
                    }, 'eventType': function () {
                        return eventType;
                    }, 'eventDate': function () {
                        return eventDate;
                    }
                }
            });
            modalInstance.result.then(function(){
                $scope.searchEvent();
            });
        };

        // 新增客户事件
        $scope.addCustEvent = function(){
            $scope.custNo = custNo;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/portrayal/popupPages/addEvent.html',
                controller: 'addEventCtrl',
                size: 'midle-900',
                backdrop:'static',
                scope:$scope,
                resolve: {
                    'custNo': function () {
                        return custNo;
                    }
                }
            });
            modalInstance.result.then(function(){
                $scope.searchEvent();
            });
        };

        // 逻辑删除事件（单行删除）
        $scope.delCustEvent = function(custNo, eventType, eventDate) {
            console.log("portrayal custNo=" + custNo);
            console.log("portrayal eventDate=" + eventDate);
            console.log("portrayal eventType=" + eventType);

            Alert.confirm("确定删除？").then(function() {
                var opts = {};
                opts.url = '/crm/ecif/cust/delCustEvent';
                opts.method = 'PUT';
                opts.params = {
                    custNo : custNo,
                    eventType : eventType,
                    eventDate : eventDate,
                };
                HttpService.linkHttp(opts).then(function(response) {
                    console.log("请求成功");
                    console.log(response);
                    // 执行查询
                    $scope.searchEvent();
                });
            });

        };
        //-------------事件信息结束--------------

        //-------------财务信息开始--------------

        // 缴费信息
        $scope.searchFinacePayObj = {
            'policyNo' : '',
            'payer' : '',
            'custNo' : custNo
        };

        $scope.clearPaySearch = function() {
            $scope.searchFinacePayObj = {
                'policyNo' : '',
                'payer' : '',
                'custNo' : custNo
            };
            $scope.searchFinacePay();
        }

        // 查询事件
        $scope.searchFinacePay = function() {
            var opts = {};
            opts.url = 'crm/ecif/cust/custFinacePayoList';
            opts.method = 'GET';
            opts.params = $scope.searchFinacePayObj;
            HttpService.linkHttp(opts).then(function(response) {
                console.log("请求成功");
                console.log(response);
                $scope.custFinacePayoList = response.data.map(function (item) {
                    item.payMode = EnumType.PayMode.getLabelByValue(item.payMode);
                    return item;
                });
            });
        }

        // 理赔信息
        $scope.searchFinaceClaimObj = {
            'policyNo' : '',
            'beneficiary' : '',
            'custNo' : custNo
        };

        $scope.clearClaimSearch = function() {
            $scope.searchFinaceClaimObj = {
                'policyNo' : '',
                'beneficiary' : '',
                'custNo' : custNo
            };
            $scope.searchFinaceClaim();
        }

        // 查询事件
        $scope.searchFinaceClaim = function() {
            var opts = {};
            opts.url = 'crm/ecif/cust/custFinaceClaimList';
            opts.method = 'GET';
            opts.params = $scope.searchFinaceClaimObj;
            HttpService.linkHttp(opts).then(function(response) {
                console.log("请求成功");
                console.log(response);
                $scope.custFinaceClaimList = response.data.map(function (item) {
                    item.claimType = EnumType.ClaimType.getLabelByValue(item.claimType);
                    item.claimSts = EnumType.ClmState.getLabelByValue(item.claimSts);
                    return item;
                });
            });
        }
        //-------------财务信息结束--------------
        //-------------资产开始--------------
        /** 查询 */
        $scope.searchAssetsObj = {
            'assetsNam' : '',
            'principal' : '',
            'custNo' : custNo
        };

        $scope.clearAssetsSearch = function() {
            $scope.searchAssetsObj = {
                'assetsNam' : '',
                'principal' : '',
                'custNo' : custNo
            };
            $scope.searchPerAssets();
        }
        // 查询事件
        $scope.searchPerAssets = function() {
            var opts = {};
            opts.url = 'crm/ecif/cust/perCustAssetsList';
            opts.method = 'GET';
            opts.params = $scope.searchAssetsObj;
            HttpService.linkHttp(opts).then(function(response) {
                console.log("请求成功");
                console.log(response);
                $scope.perCustAssetsList = response.data.map(function (item) {
                    item.assetsTyp = EnumType.AssetsTyp.getLabelByValue(item.assetsTyp);
                    var obtainTime = new Date(item.obtainTime);
                    item.obtainTime = $filter('date')(obtainTime, 'yyyy-MM-dd');
                    if (item.expireTime == null || item.expireTime == undefined) {
                        item.expireTime = '永久有效';
                    } else {
                        var expireTime = new Date(item.expireTime);
                        item.expireTime = $filter('date')(expireTime, 'yyyy-MM-dd');
                    }
                    return item;
                });
            });
        }

        /** 查询客户资产（单条） */
        $scope.getPerAssets = function(custNo, seqNo){
            console.log("portrayal custNo=" + custNo);
            console.log("portrayal seqNo=" + seqNo);
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/portrayal/popupPages/uptPerAssets.html',
                controller: 'uptPerAssetsCtrl',
                size: 'midle-900', //
                backdrop:'static',
                resolve: {
                    'custNo': function () {
                        return custNo;
                    }, 'seqNo': function () {
                        return seqNo;
                    }
                }
            });
            modalInstance.result.then(function(){
                $scope.searchPerAssets();
            });
        };

        // 新增事件
        $scope.addPerAssets = function(){
            $scope.custNo = custNo;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/portrayal/popupPages/addPerAssets.html',
                controller: 'addPerAssetsCtrl',
                size: 'midle-900',
                backdrop:'static',
                scope:$scope,
                resolve: {
                    'custNo': function () {
                        return custNo;
                    }
                }
            });
            modalInstance.result.then(function(){
                $scope.searchPerAssets();
            });
        };

        // 逻辑删除事件（单行删除）
        $scope.delPerAssets = function(custNo, seqNo) {

            Alert.confirm("确定删除？").then(function() {
                var opts = {};
                opts.url = '/crm/ecif/cust/delPerCustAssets';
                opts.method = 'PUT';
                opts.params = {
                    custNo : custNo,
                    seqNo : seqNo,
                };
                HttpService.linkHttp(opts).then(function(response) {
                    console.log("请求成功");
                    console.log(response);
                    // 执行查询
                    $scope.searchPerAssets();
                });
            });

        };
        //-------------资产结束--------------

        //-------------健康档案开始--------------
        $scope.searchHealthFileObj = {
            'chkNo' : '',
            'chekContent' : '',
            'custNo' : custNo
        };
        $scope.FileType = EnumType.FileType;

        $scope.clearHealthFileSearch = function() {
            $scope.searchHealthFileObj = {
                'chkNo' : '',
                'chekContent' : '',
                'custNo' : custNo
            };
            $scope.searchHealthFile();
        }
        // 查询事件
        $scope.searchHealthFile = function() {
            var opts = {};
            opts.url = 'crm/ecif/cust/custHealthFileList';
            opts.method = 'GET';
            opts.params = $scope.searchHealthFileObj;
            HttpService.linkHttp(opts).then(function(response) {
                console.log("请求成功");
                console.log(response);
                $scope.custHealthFileList = response.data.map(function (item) {
                    item.fileTyp = EnumType.FileType.getLabelByValue(item.fileTyp);
                    return item;
                });
            });
        }
        //-------------健康档案结束--------------

        //-------------视频/音频开始--------------
        $scope.searchAudioVideoObj = {
            'fileNam' : '',
            'principal' : '',
            'custNo' : custNo
        };
        $scope.clearVudioVideoSearch = function() {
            $scope.searchAudioVideoObj = {
                'fileNam' : '',
                'principal' : '',
                'custNo' : custNo
            };
            $scope.searchAudioVideo();
        }
        // 查询事件
        $scope.searchAudioVideo = function() {
            var opts = {};
            opts.url = 'crm/ecif/cust/custAudioVideoList';
            opts.method = 'GET';
            opts.params = $scope.searchAudioVideoObj;
            HttpService.linkHttp(opts).then(function(response) {
                console.log("请求成功");
                console.log(response);
                $scope.custAudioVideoList = response.data.map(function (item) {
                    item.contentTyp = EnumType.ContentType.getLabelByValue(item.contentTyp);
                    return item;
                });
            });
        }
        //-------------视频/音频结束--------------
        // -------------证件信息开始--------------
        $scope.getCustCertList = function(custNo) {
            if (custNo == undefined) {
                Alert.error("客户号不能为空");
                return;
            }
            $scope.custNo = custNo;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/portrayal/popupPages/custCert/custCertMnt.html',
                controller: 'custCertMntCtrl',
                size: 'midle-1200',
                backdrop:'static',
                scope:$scope,
                resolve: {
                    'custNo': function () {
                        return custNo;
                    }
                }
            });
            modalInstance.result.then(function(){
                refreshBaseInfo();
            });
        };

        //doVideoPlayer(item.custNo)
        $scope.doVideoPlayer  = function(audioVideoCd, fileTyp, fileUrl) {
            if (custNo == undefined) {
                Alert.error("客户号不能为空");
                return;
            }
            $scope.custNo = custNo;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/portrayal/popupPages/videogular/openVideoPlayer.html',
                controller: 'openVideoPlayerCtrl',
                size: 'midle-900',
                backdrop:'static',
                scope:$scope,
                resolve: {
                    'fileUrl': function () {
                        return fileUrl;
                    }, 'fileTyp': function () {
                        return fileTyp;
                    }, 'audioVideoCd': function () {
                        return audioVideoCd;
                    }
                }
            });
            modalInstance.result.then(function(){});
        }
        // -------------证件信息结束--------------
        // -------------学历信息开始--------------
        $scope.getCustEduList = function(custNo) {
            if (custNo == undefined) {
                Alert.error("客户号不能为空");
                return;
            }
            $scope.custNo = custNo;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/portrayal/popupPages/custEdu/custEduMnt.html',
                controller: 'custEduMntCtrl',
                size: 'midle-1000',
                backdrop:'static',
                scope:$scope,
                resolve: {
                    'custNo': function () {
                        return custNo;
                    }
                }
            });
            modalInstance.result.then(function(){
                refreshBaseInfo();
            });
        };
        // -------------学历信息结束--------------
        // -------------职业信息开始--------------
        $scope.getCustCareerList = function(custNo) {
            if (custNo == undefined) {
                Alert.error("客户号不能为空");
                return;
            }
            $scope.custNo = custNo;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/portrayal/popupPages/custCareer/custCareerMnt.html',
                controller: 'custCareerMntCtrl',
                size: 'midle-1200',
                backdrop:'static',
                scope:$scope,
                resolve: {
                    'custNo': function () {
                        return custNo;
                    }
                }
            });
            modalInstance.result.then(function(){
                refreshBaseInfo();
            });
        };
        // -------------职业信息结束--------------
        // -------------联系方式信息开始--------------
        $scope.getContactWayList = function(custNo) {
            if (custNo == undefined) {
                Alert.error("客户号不能为空");
                return;
            }
            $scope.custNo = custNo;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/portrayal/popupPages/contactWay/uptContactWay.html',
                controller: 'uptContactWayCtrl',
                size: 'midle-1000',
                backdrop:'static',
                scope:$scope,
                resolve: {
                    'phoneList': function () {
                        return $scope.custom.phoneArr;
                    }, 'contactSqn': function () {
                        return '-1';
                    }

                }
            });
            modalInstance.result.then(function(){
                refreshBaseInfo();
            });
        };
        // -------------联系方式信息结束--------------
        // -------------联系地址信息开始--------------
        $scope.getContactAddrList = function(custNo) {
            if (custNo == undefined) {
                Alert.error("客户号不能为空");
                return;
            }
            $scope.custNo = custNo;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/portrayal/popupPages/contactAddr/contactAddrMnt.html',
                controller: 'contactAddrMntCtrl',
                size: 'midle-1000',
                backdrop:'static',
                scope:$scope,
                resolve: {
                    'addrList': function () {
                        return $scope.custom.addrList;
                    }
                }
            });
            modalInstance.result.then(function(){
                refreshBaseInfo();
            });
        };
        // -------------联系地址信息结束--------------
        // -------------轨迹信息开始--------------
        //-------------电话开始--------------

        $scope.resetTrackTel  = function() {
            $scope.dyncTrackTel.nextFollowUpTm = "";
            $scope.dyncTrackTel.trackContent = "";
            $scope.dyncTrackTel.trackSubTyp = "";
            $scope.dyncTrackTel.whtThrough = "";
        }

        $scope.addTrackTel = function() {
            var trackTelObj = angular.copy($scope.dyncTrackTel);
            if (trackTelObj == undefined) {
                Alert.error("参数不能为空");
                return;
            }
            if (custNo == undefined || custNo == '') {
                Alert.error("客户号不能为空");
                return;
            }
            if (trackTelObj.nextFollowUpTm == undefined || trackTelObj.nextFollowUpTm == '') {
                Alert.error("下次跟进日期不能为空");
                return;
            }
            if (trackTelObj.contacts == undefined || trackTelObj.contacts == '') {
                Alert.error("联系人不能为空");
                return;
            }
            if (trackTelObj.trackContent == undefined || trackTelObj.trackContent == '') {
                Alert.error("内容不能为空");
                return;
            }
            if (trackTelObj.trackSubTyp == undefined || trackTelObj.trackSubTyp == '') {
                Alert.error("记录内容不能为空");
                return;
            }
            if (trackTelObj.whtThrough == undefined || trackTelObj.whtThrough == '') {
                Alert.error("请选择是否接通");
                return;
            }
            var nextFollowUpTm = new Date($scope.dyncTrackTel.nextFollowUpTm);
            var curDate = new Date();
            if(nextFollowUpTm < curDate){
                Alert.error("下次跟进日期必须在当前时间之后")
                return
            }
            trackTelObj.nextFollowUpTm = $filter('date')(nextFollowUpTm, 'yyyy-MM-dd HH:mm:ss');
            trackTelObj.custNo = custNo;
            trackTelObj.trackSubTyp = trackTelObj.trackSubTyp.value;
            trackTelObj.whtThrough = trackTelObj.whtThrough.value;
            console.log(trackTelObj);
            HttpService.linkHttp({
                url: 'crm/ecif/cust/addDyncTrackTel',
                method: 'PUT',
                params: trackTelObj
            }).then(function (response) {
                initTrackInfo(custNo);
                $scope.resetTrackTel();
                reflashLastFollowUp();
            });
        }

        //-------------电话结束--------------
        //-------------短信开始--------------


        $scope.resetTrackSms  = function() {
            $scope.dyncTrackSms.trackContent = "";
            $scope.writCount = 200;
        }
        $scope.addTrackSms = function() {
            var trackSmsObj = angular.copy($scope.dyncTrackSms);
            if (trackSmsObj == undefined) {
                Alert.error("参数不能为空");
                return;
            }
            if (custNo == undefined || custNo == '') {
                Alert.error("客户号不能为空");
                return;
            }
            if (trackSmsObj.contacts == undefined || trackSmsObj.contacts == '') {
                Alert.error("发送对象不能为空");
                return;
            }
            if (trackSmsObj.phoneNo == undefined || trackSmsObj.phoneNo == '') {
                Alert.error("发送号码不能为空");
                return;
            }
            if (trackSmsObj.trackContent == undefined || trackSmsObj.trackContent == '') {
                Alert.error("发送内容不能为空");
                return;
            }
            trackSmsObj.custNo = custNo;
            console.log(trackSmsObj);
            HttpService.linkHttp({
                url: 'crm/ecif/cust/addDyncTrackSms',
                method: 'PUT',
                params: trackSmsObj
            }).then(function (response) {
                $scope.resetTrackSms();
                initTrackInfo(custNo);
                reflashLastFollowUp();
            });
        }

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
                $scope.dyncTrackSms.trackContent = result.tplCont;		//模板内容
                $scope.tolCount();
                console.log(result); //result关闭是回传的值
            }, function (reason) {
                console.log(reason);//点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel
            });

        }
        $scope.tolCount = function (detailMsg) {
            //console.log($scope.dyncTrackSms.trackContent.length);
            $scope.writCount = 200 - detailMsg.length;
        };


        //-------------短信结束--------------
        //-------------拜访开始--------------

        $scope.resetTrackVis  = function() {
            $scope.dyncTrackVis.nextFollowUpTm = "";
            $scope.dyncTrackVis.trackContent = "";
            $scope.dyncTrackVis.location = "";
        }
        $scope.addTrackVis = function() {
            var trackVisObj = angular.copy($scope.dyncTrackVis);
            if (trackVisObj == undefined) {
                Alert.error("参数不能为空");
                return;
            }
            if (custNo == undefined || custNo == '') {
                Alert.error("客户号不能为空");
                return;
            }
            if (trackVisObj.nextFollowUpTm == undefined || trackVisObj.nextFollowUpTm == '') {
                Alert.error("下次跟进日期不能为空");
                return;
            }
            if (trackVisObj.contacts == undefined || trackVisObj.contacts == '') {
                Alert.error("联系人不能为空");
                return;
            }
            if (trackVisObj.location == undefined || trackVisObj.location == '') {
                Alert.error("拜访地点不能为空");
                return;
            }
            if (trackVisObj.trackContent == undefined || trackVisObj.trackContent == '') {
                Alert.error("内容不能为空");
                return;
            }

            var nextFollowUpTm = new Date($scope.dyncTrackVis.nextFollowUpTm);
            var curDate = new Date();
            if(nextFollowUpTm < curDate){
                Alert.error("下次跟进日期必须在当前时间之后");
                return;
            }
            trackVisObj.nextFollowUpTm = $filter('date')(nextFollowUpTm, 'yyyy-MM-dd HH:mm:ss');
            trackVisObj.custNo = custNo;
            console.log(trackVisObj);
            HttpService.linkHttp({
                url: 'crm/ecif/cust/addDyncTrackVis',
                method: 'PUT',
                params: trackVisObj
            }).then(function (response) {
                $scope.resetTrackVis();
                initTrackInfo(custNo);
                reflashLastFollowUp();
            });
        }

        //-------------拜访结束--------------

        // -------------轨迹筛选结束--------------
        $scope.searchDyncTrackObj = {
            'trackTyp' : '',
            'custNo' : custNo
        };

        $scope.clearDyncTrackSearch = function() {
            $scope.searchDyncTrackObj = {
                'trackTyp' : '',
                'custNo' : custNo
            };

            $scope.searchDyncTrack();
        }
        // 查询事件
        $scope.searchDyncTrack = function() {
            var opts = {};
            opts.url = 'crm/ecif/cust/dyncTrackList';
            opts.method = 'GET';
            opts.params =  $scope.searchDyncTrackObj;
            HttpService.linkHttp(opts).then(function(response) {
                console.log("请求成功");
                console.log(response);
                for (var index in response.data) {
                    if (response.data[index].trackTyp == '01') {
                        response.data[index].isContShow = false;
                        response.data[index].isNextShow = false;
                    }  else {
                        response.data[index].isContShow = true;
                        if (response.data[index].trackTyp == '05' || response.data[index].trackTyp == '03'|| response.data[index].trackTyp == '02') {
                            response.data[index].isNextShow = false;
                        } else {
                            response.data[index].isNextShow = true;
                        }
                    }
                    response.data[index].trackTyp = EnumType.TrackType.getLabelByValue(response.data[index].trackTyp);
                    response.data[index].trackSubTypNam = EnumType.TrackSubType.getLabelByValue(response.data[index].trackSubTyp);
                    response.data[index].comtFlg = EnumType.YesNoFlg.getLabelByValue(response.data[index].comtFlg);
                    var nextFollowUpTm = new Date(response.data[index].nextFollowUpTm);
                    response.data[index].nextFollowUpTm = $filter('date')(nextFollowUpTm, 'yyyy-MM-dd');
                }
                $scope.timelineCollection = response.data;

            });
        }
        // -------------轨迹筛选结束--------------
        // -------------轨迹信息结束--------------
        //openRelGraph()
        // -------------关系图谱开始--------------
        $scope.openRelGraph = function() {
            if (custNo == undefined) {
                Alert.error("客户号不能为空");
                return;
            }
            $scope.custNo = custNo;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl : 'app/pages/portrayal/popupPages/openRelGraph.html',
                controller: 'openRelGraphCtrl',
                size: 'midle-1200',
                backdrop:'static',
                scope:$scope,
                resolve: {
                    'custNo': function () {
                        return custNo;
                    }
                }
            });
            modalInstance.result.then(function(){

            });
        };

        var custGraphChange = function (newCustNo) {
            custNo = newCustNo;
            $scope.load();
        }

        $scope.custGraph = {};
        $scope.load = function() {
            $scope.isFinsh = false;

            var myChart = echarts.init(document.getElementById('graphEcharts'));
            var option = {};
            var opts = {};
            opts.url = 'crm/ecif/cust/custGraph';
            opts.method = 'GET';
            opts.params = {'custNo': custNo};
            HttpService.linkHttp(opts).then(function (response) {
                if (response == undefined || response.data == undefined) {
                    return;
                }
                //console.log("graph data" + angular.toJson(response.data));
                // console.log(response);
                // $scope.custGraph = response.data;
                $scope.isFinsh = true;
                $scope.custGraph = []
                response.data.data.forEach(function(item,index){
                    if($scope.custGraph.length>0 ){
                        var tmp=$scope.custGraph.filter(function(x){return x.name==item.name});
                        if(tmp.length>0){
                            item.name = item.name+'['+index+']';
                        }
                    }
                    item.x=item.y=null;
                    $scope.custGraph.push(item);
                })
                $scope.custRelLinks = []
                response.data.links.forEach(function(item,index){
                    $scope.custGraph.forEach(function(item1,index1){
                        if (item.sourceCustNo == item1.custNo) {
                            item.source = item1.name
                        }
                        if (item.targetCustNo == item1.custNo) {
                            item.target = item1.name
                        }
                    })
                    $scope.custRelLinks.push(item)
                })
                option = {
//                    tooltip: {
//                        formatter: function (x) {
//                            return x.data.des;
//                        },
//		                trigger: 'item',           // 触发类型，默认数据触发，见下图，可选为：'item' ¦ 'axis'
//		                showDelay: 20,             // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
//		                hideDelay: 100,            // 隐藏延迟，单位ms
//		                transitionDuration : 0.4,  // 动画变换时间，单位s
//		                backgroundColor: 'rgba(0,0,0,0.7)',     // 提示背景颜色，默认为透明度为0.7的黑色
//		                borderColor: '#333',       // 提示边框颜色
//		                borderRadius: 4,           // 提示边框圆角，单位px，默认为4
//		                borderWidth: 0,            // 提示边框线宽，单位px，默认为0（无边框）
//		                padding: 5,                // 提示内边距，单位px，默认各方向内边距为5，
//		                                           // 接受数组分别设定上右下左边距，同css
//		                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
//		                    type : 'line',         // 默认为直线，可选为：'line' | 'shadow'
//		                    lineStyle : {          // 直线指示器样式设置
//		                        color: '#48b',
//		                        width: 2,
//		                        type: 'solid'
//		                    },
//		                    shadowStyle : {                       // 阴影指示器样式设置
//		                        width: 4,                   // 阴影大小
//		                        color: 'rgba(150,150,150,0.3)'  // 阴影颜色
//		                    }
//		                },
//		                textStyle: {
//		                    color: '#fff'
//		                }
//                    },
                    tooltip:{
                        formatter: function(x){
                            var tooltipStr="";
                            if(x.dataType=='node'){
                                tooltipStr=x.data.custNo;
                            }else{
                                tooltipStr=x.data.target+"是"+x.data.source+"的"+x.data.name;
                            }
                            return tooltipStr;
                        }
                    },
                    series: [
                        {
                            type: 'graph',
                            layout: 'force',
                            symbolSize: 80,
                            zoom:0.8,
                            roam: true,
                            edgeSymbol: ['circle', 'arrow'],
                            edgeSymbolSize: [4, 10],
                            force: {
                                repulsion: 2500,
                                edgeLength: 180,////边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
                                gravity : 0.3,//节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
                                layoutAnimation : true
                            },
                            draggable: true,
                            itemStyle: {
                                normal: {
                                    color: '#b5b5b6'
                                }
                            },
                            lineStyle: {
                                normal: {
                                    //curveness : 0.3,
                                    width: 2,
                                    color: '#ccc',
                                }
                            },
                            edgeLabel: {
                                normal: {
                                    show: true,
                                    formatter: function (x) {
                                        return x.data.name;
                                    }
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    textStyle: {}
                                }
                            },
                            data: $scope.custGraph,
                            links: $scope.custRelLinks
                        }
                    ]
                };

                myChart.setOption(option);
                function openOrFold(params) {  //该事件会提示节点间关系
                    var newCustNo = params.data.custNo;
                    if (!newCustNo||newCustNo == custNo) {
                        return;
                    }
                    if ($scope.isFinsh) {
                        custGraphChange(newCustNo);
                    }
                }
                myChart.on('click', openOrFold);
            });

        }
        // -------------关系图谱结束--------------
        // -------------pdf结束--------------
        $scope.openHealthFile  = function(custNo) {
            if (custNo == undefined) {
                Alert.error("客户号不能为空");
                return;
            }
            $scope.custNo = custNo;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/portrayal/popupPages/pdfviewer/pdfviewer.html',
                controller: 'pdfviewerCtrl',
                size: 'midle-1000',
                backdrop:'static',
                scope:$scope,
                resolve: {
                    'custNo': function () {
                        return custNo;
                    }
                }
            });
            modalInstance.result.then(function(){});
        }
        // -------------pdf结束--------------
        // -------------客户联系人开始--------------
        console.log("cust cntr custNo= " + custNo);
        // 对象
        $scope.custContract = {};
        // 对象数据集
        $scope.RowCollection = [];
        // 查询条件对象
        $scope.searchCustCntrObj = {
            'mobile' : '',
            'contractName' : '',
            'blnCustNo' : custNo
        };
        $scope.delCustCntr = function (item){
            Alert.confirm("确定删除？").then(function() {
                var opts = {};
                opts.url = '/crm/ocrm/CustContractmng/delCustContract';
                opts.method = 'DELETE';
                opts.params = {
                    'contractNo' : item.contractNo
                };
                HttpService.linkHttp(opts).then(function(response) {
                    console.log("请求成功");
                    console.log(response);
                    // 执行查询
                    $scope.searchCustCntr();
                });
            });


        }
        $scope.uptCustCntr = function (item){
            $scope.custContract.contractNo = item.contractNo;
            $uibModal
                .open({
                    animation : true,
                    templateUrl : 'app/pages/customer/custContract/popupPages/selCntrDlg/uptCntr.html',
                    size: 'midle-900',
                    backdrop:'static',
                    controller : 'uptCntrCtrl',
                    scope : $scope,
                    resolve : {
                        'custNo': function () {
                            return custNo;
                        }
                    }
                });
        }

        $scope.queryCntrOptions = {};
        $scope.queryCntrOptions.url = '/crm/ocrm/CustContractmng/getAllCustContracts';
        $scope.queryCntrOptions.method = 'GET';
        $scope.queryCntrOptions.params = $scope.searchCustCntrObj;
        $scope.queryCntrOptions.success = function successCallback(response) {
            console.log("请求成功");
            for (var index in response.data) {
                response.data[index].custRelation = EnumType.Relation.getLabelByValue(response.data[index].custRelation);
            }
            $scope.RowCollection = response.data;
        };

        $scope.searchCustCntr = function() {
            $scope.queryCntrOptions.params = $scope.searchCustCntrObj;
            this.queryPage(1);
        };

        $scope.resetCustCntr = function () {
            $scope.searchCustCntrObj = {
                'mobile' : '',
                'contractName' : '',
                'blnCustNo' : custNo
            };
            $scope.searchCustCntr();
        }

        // 新增
        $scope.addCustCntr = function() {
            $uibModal
                .open({
                    animation : true,
                    templateUrl : 'app/pages/customer/custContract/popupPages/selCntrDlg/addCntr.html',
                    size: 'midle-900',
                    backdrop:'static',
                    controller : 'addCntrCtrl',
                    scope : $scope,
                    resolve : {
                        'custNo': function () {
                            return custNo;
                        }
                    }
                });
        };
        // -------------客户联系人结束--------------

        // -------------协作人信息开始--------------
        HttpService.linkHttp({
            url: '/crm/ecif/cust/custCollaboratorList',
            method: 'GET',
            params: {'custNo': custNo}
        }).then(function (response) {
            $scope.custCollaboratorList = response.data.map(function (item) {
                item.userStatNam = EnumType.UserStat.getLabelByValue(item.userStat);
                return item;
            });
        });

        $scope.searchCollaboratorObj = {
            'collrNam' : '',
            'custNo': custNo
        }


        $scope.searchCustCollaborator = function() {
            HttpService.linkHttp({
                url: '/crm/ecif/cust/custCollaboratorList',
                method: 'GET',
                params: $scope.searchCollaboratorObj
            }).then(function (response) {
                $scope.custCollaboratorList = response.data.map(function (item) {
                    item.userStatNam = EnumType.UserStat.getLabelByValue(item.userStat);
                    return item;
                });
            });

        }

        $scope.clearCustCollaboratorSearch = function() {
            $scope.searchCollaboratorObj = {
                'collrNam' : '',
                'custNo': custNo
            }
            $scope.searchCustCollaborator();
        }

        $scope.userIdList = [];
        $scope.addCustCollaborator = function() {

            var modalInstance = $uibModal
                .open({
                    animation : true,
                    backdrop : 'static',
                    templateUrl : 'app/pages/mgrcenter/usermanagement/popupPages/getuserlist.html',
                    size : 'midle-900',
                    controller : 'getuserlistCtrl',
                    scope : $scope,
                    resolve : {
                        items : function() {
                            return $scope.items;
                        }
                    }
                });
            modalInstance.result.then(function(result) {
                console.log(result); // result关闭是回传的值
                angular.forEach(result, function(i) {
                    $scope.userIdList.push(i.userId);
                });
                HttpService.linkHttp({
                    url: '/crm/ecif/cust/addCustCollaborator',
                    method: 'PUT',
                    params: {
                        'custNo' : custNo,
                        'userIdList' : $scope.userIdList
                    }
                }).then(function (response) {
                    $scope.clearCustCollaboratorSearch();
                    $scope.searchCustCollaborator();
                });
            }, function(reason) {
                console.log(reason);// 点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel
            });

        }
        //delBusiCollr(item)"
        //----------------删除开始-----------------
        $scope.delCustiCollr = function(item) {
            console.log("delBusiCollr custNo=" + item.custNo);
            console.log("delBusiCollr collaborator=" + item.collaborator);

            if (item.custNo  == undefined || item.custNo  == '') {
                Alert.error('商机编码不能为空');
                return;
            }
            if (item.collaborator  == undefined || item.collaborator  == '') {
                Alert.error('商机协作人ID不能为空');
                return;
            }
            Alert.confirm("确定删除？").then(function() {
                var opts = {};
                opts.url = 'crm/ecif/cust/delCustCollaborator';
                opts.method = 'PUT';
                opts.params = {
                    custNo : item.custNo,
                    collaborator : item.collaborator
                };
                HttpService.linkHttp(opts).then(function(response) {
                    console.log("请求成功");
                    console.log(response);
                    // 执行查询
                    $scope.clearCustCollaboratorSearch();
                    $scope.searchCustCollaborator();
                });
            });

        };
        //----------------删除结束-----------------
        // -------------协作人信息结束--------------

        // -------------商机开始--------------
        // 初始化
        var initBusiOpp = function() {
            HttpService.linkHttp({
                url: '/crm/ocrm/busiOpp/busiOppList',
                method: 'GET',
                params: {'custNo': custNo}

            }).then(function (response) {
                if(response == undefined || response == null) {
                    return;
                }
                $scope.busiOppList = response.data.map(function (item) {

                    item.busiOppType = EnumType.ProductType.getLabelByValue(item.busiOppType);
                    item.custType = EnumType.CustType.getLabelByValue(item.custType);
                    item.busiOppSrc = EnumType.BusiOppSrc.getLabelByValue(item.busiOppSrc);
                    item.busiOppStageNam = EnumType.BusiOppStage.getLabelByValue(item.busiOppStage);
                    item.custSource = EnumType.DataSource.getLabelByValue(item.custSource);
                    return item;
                });
            });
        }

        // initBusiOpp();

        $scope.openBusiOppDetail = function(item){
            $state.go('busiopp.busiOppDetail', {
                'busiOppNo' : item.busiOppNo,
                'busiOppStage' : item.busiOppStage,
                'custNo' : item.custNo
            });
        }

        $scope.searchObj = {
            'busiOppName' : '',
            'custAgent' : '',
            'custNo' : custNo,
            'busiOppStage' : ''
        };

        $scope.selectBusiOppByStage = function(busiOppStage) {
            $scope.searchObj.busiOppStage = busiOppStage;
            $scope.selectBusiOpp();
        }

        $scope.selectBusiOppList = function() {
            $scope.searchObj.custAgent = '';
            $scope.searchObj.collaborator = '';
            $scope.selectBusiOpp();
        }

        $scope.selectBusiOpp = function() {
            var opts = {};
            opts.url = 'crm/ocrm/busiOpp/busiOppList';
            opts.method = 'GET';
            opts.params =  $scope.searchObj;
            HttpService.linkHttp(opts).then(function(response) {
                console.log("请求成功");
                console.log(response);
                $scope.busiOppList = response.data.map(function (item) {
                    item.busiOppType = EnumType.ProductType.getLabelByValue(item.busiOppType);
                    item.custType = EnumType.CustType.getLabelByValue(item.custType);
                    item.busiOppSrc = EnumType.BusiOppSrc.getLabelByValue(item.busiOppSrc);
                    item.busiOppStageNam = EnumType.BusiOppStage.getLabelByValue(item.busiOppStage);
                    item.custSource = EnumType.DataSource.getLabelByValue(item.custSource);
                    return item;
                });
            });
        }
        //----------------查询结束-----------------
        //----------------重置开始-----------------

        $scope.resetSelectBusiOpp = function(){
            $scope.searchObj = {
                'busiOppName' : '',
                'custAgent' : '',
                'custNo' : custNo,
                'busiOppStage' : ''
            };
            $scope.selectBusiOpp();
        }
        //----------------重置结束-----------------

        //----------------添加开始-----------------
        $scope.addBusiOpp = function(){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/busiopp/popupPages/addBusiOpp.html',
                controller: 'addBusiOppCtrl',
                size: 'midle-900',
                backdrop:'static',
                scope:$scope,
                resolve: {
                    'optTyp': function () {
                        return 'prtl';
                    },'custNo': function () {
                        return custNo;
                    }
                }
            });
            modalInstance.result.then(function(){
                $scope.selectBusiOpp();
            });
        };
        //----------------添加结束-----------------

        //----------------修改开始-----------------
        $scope.uptBusiOpp = function(item){
            console.log("uptBusiOpp busiOppNo=" + item.busiOppNo);
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/busiopp/popupPages/uptBusiOpp.html',
                controller: 'uptBusiOppCtrl',
                size: 'midle-900', //
                backdrop:'static',
                resolve: {
                    'busiOppNo': function () {
                        return item.busiOppNo;
                    }
                }
            });
            modalInstance.result.then(function(){
                $scope.selectBusiOpp();
            });
        };
        //----------------修改结束-----------------

        //----------------删除开始-----------------
        $scope.delBusiOpp = function(item) {
            console.log("delBusiOpp busiOppNo=" + item.busiOppNo);
            if (item.busiOppStage != '01') {
                Alert.error('删除商机时，商机阶段状态必须为[意向]。商机编码：' + item.busiOppNo);
                return;
            }
            if (item.createUser != userId) {
                Alert.error('只能删除本人创建的商机，并且商机阶段状态为[意向]');
                return;
            }
            Alert.confirm("确定删除？").then(function() {
                var opts = {};
                opts.url = 'crm/ocrm/busiOpp/delBusiOpp';
                opts.method = 'PUT';
                opts.params = {
                    busiOppNo : item.busiOppNo
                };
                HttpService.linkHttp(opts).then(function(response) {
                    console.log("请求成功");
                    console.log(response);
                    // 执行查询
                    initBusiOpp();
                });
            });

        };
        //----------------删除结束-----------------
        // -------------商机结束--------------

        // -------------任务信息开始--------------
        // 信息发送定义对象
        $scope.msg = {};
        // 查询条件对象
        $scope.searchTaskObj = {
            'taskName' : '',
            'custId' : custNo
        };
        // 信息发送定义对象数据集
        $scope.custTaskList = [];

        // 重置
        $scope.clearCustTaskSearch = function() {
            $scope.searchTaskObj = {
                'taskName' : '',
                'custId' : custNo
            };
        }
        // 查询事件
        $scope.searchTask = function() {

            var opts = {};
            opts.url = '/crm/ocrm/task/getMulti';
            opts.method = 'GET';
            opts.params = $scope.searchTaskObj;
            HttpService.linkHttp(opts).then(function(response) {
                angular.forEach(response.data.list, function(item) {
                    item.taskStat = EnumType.TaskStat.getLabelByValue(item.taskStat);
                })
                $scope.custTaskList = response.data.list;
            });
        }
        // 页面初始化查询
        $scope.searchTask();

        // 新增事件
        $scope.addCustTask = function() {
            $scope.saveTask = {};
            $scope.isUpd = "false";
            var custom  =  angular.copy($scope.custom)
            var modalInstance = $uibModal.open({
                animation : true,
                backdrop : 'static',
                templateUrl : 'app/pages/taskService/popupPages/taskModal.html',
                size : 'midle-900',
                controller : 'taskTaskModalCtrl',
                scope : $scope,
                resolve: {
                    'taskId': function () {
                        return '';
                    }, 'custNo': function () {
                        return custom;
                    }
                }
            });
            modalInstance.result.then(function(){
                $scope.clearCustTaskSearch();
            });
        }

        $scope.uptCustTask = function(item) {
            var taskEndDate = new Date(item.taskEndDate);
            var optsForUpd = {};
            optsForUpd.url = '/crm/ocrm/task/getOne';
            optsForUpd.method = 'GET';
            optsForUpd.params = {
                "id":item.id,
                "taskName":item.taskName,
                "taskType":item.taskType,
                "taskStat":item.taskStat,
                "taskEndDate":taskEndDate,
                "custName":item.custName,
                "oppertName":item.oppertName,
                "oppertId":item.oppertId,
                "contactName":item.contactName,
                "responsName":item.responsName,
                "responsId":item.responsId,
                "taskDesc":item.taskDesc
            };
            angular.forEach(EnumType.TaskStat, function(eItem) {
                if(eItem.label == item.taskStat || eItem.value == item.taskStat ){
                    optsForUpd.params.taskStat = eItem.value;
                }
            })
            HttpService.linkHttp(optsForUpd).then(function(response) {
                $scope.saveTask = {};
                $scope.saveTask = response.data;
                $scope.isUpd = "true";

                var modalInstance = $uibModal.open({
                    animation : true,
                    backdrop : 'static',
                    templateUrl : 'app/pages/taskService/popupPages/uptTask.html',
                    size : 'midle-900',
                    controller : 'taskTaskModalCtrl',
                    scope : $scope,
                    resolve: {
                        'taskId': function () {
                            return item.id;
                        }, 'custNo': function () {
                            return '';
                        }
                    }
                });
                modalInstance.result.then(function(){
                    $scope.clearCustTaskSearch();
                });
            });
        }
        $scope.getCustTask = function(item) {
            var modalInstance = $uibModal
                .open({
                    animation : true,
                    backdrop : 'static',
                    templateUrl : 'app/pages/taskService/popupPages/getTask.html',
                    size : 'midle-900',
                    controller : 'taskTaskModalCtrl',
                    scope : $scope,
                    resolve: {
                        'taskId': function () {
                            return item.id;
                        }, 'custNo': function () {
                            return '';
                        }
                    }
                });
//	            modalInstance.result.then(function(){
//	                $scope.clearCustTaskSearch();
//	            });
        }

        // 物理删除事件（单行删除）
        $scope.delCustTask = function(item) {

            Alert.confirm("确定删除？").then(function() {
                var opts = {};
                opts.url = '/crm/ocrm/task/deleteOne';
                opts.method = 'DELETE';
                opts.params = {
                    id : item.id
                };
                HttpService.linkHttp(opts).then(function(response) {
                    console.log("请求成功");
                    console.log(response);
                    // 执行查询
                    $scope.searchTask();
                });

            });
        };
        // -------------任务信息结束--------------
        // -------------接触开始--------------
        // 回访详情
        $scope.getRetVisit = function(item) {
            console.log("cusService.custRetVisit.custRetVisitDet");
            $state.go('cusService.custRetVisit.custRetVisitDet', {
                'touchItem' : item
            });
        };
        // 咨询详情
        $scope.getConsult = function(item) {
            console.log("cusService.custConsult.custConsultDet");
            $state.go('cusService.custConsult.custConsultDet', {
                'touchItem' : item
            });
        };
        //getComplt(item)
        $scope.getComplt = function(item) {
            console.log("cusService.custComplt.custCompltDet");
            $state.go('cusService.custComplt.custCompltDet', {
                'touchItem' : item
            });
        };
        $scope.retVisitData = {};
        $http.get('/app/pages/cusService/custRetVisit/json/retVisitAllotData.json').success(function(data) {
            $scope.retVisitData = data.map(function (item) {
                // 案件类型
                item.caseTypNam = EnumType.CaseType.getLabelByValue(item.caseTyp);
                // 案件状态
                item.caseStsNam = EnumType.CaseStatus.getLabelByValue(item.caseSts);
                // 投诉类型
                item.retVisitTypNam = EnumType.retVisitType.getLabelByValue(item.retVisitTyp);
                // 投诉状态
                item.retVisitStsNam = EnumType.retVisitSts.getLabelByValue(item.retVisitSts);
                return item;
            });
        });

        $scope.compltData = {};
        $http.get('/app/pages/cusService/custComplt/json/compltAllotData.json').success(function(data) {
            $scope.compltData = data.map(function (item) {
                // 案件类型
                item.caseTypNam = EnumType.CaseType.getLabelByValue(item.caseTyp);
                // 案件状态
                item.caseStsNam = EnumType.CaseStatus.getLabelByValue(item.caseSts);
                // 投诉类型
                item.complainTypNam = EnumType.ComplainType.getLabelByValue(item.complainTyp);
                // 投诉状态
                item.complainStsNam = EnumType.ComplainStatus.getLabelByValue(item.complainSts);
                return item;
            });
        });

        $scope.consultData = {};
        $http.get('/app/pages/cusService/custConsult/json/consultAllotData.json').success(function(data) {
            $scope.consultData = data.map(function (item) {
                // 案件类型
                item.caseTypNam = EnumType.CaseType.getLabelByValue(item.caseTyp);
                // 案件状态
                item.caseStsNam = EnumType.CaseStatus.getLabelByValue(item.caseSts);
                // 咨询类型
                item.consultTypNam = EnumType.consultType.getLabelByValue(item.consultTyp);
                // 咨询状态
                item.consultStsNam = EnumType.consultSts.getLabelByValue(item.consultSts);
                return item;
            });
        });

        $scope.getTouch = function(item) {
            if (item.custInteracType == EnumType.InteractionType.return_visits.value) {
                var temp = {};
                angular.forEach($scope.retVisitData, function(i) {
                    if (item.contactNo == i.retVisitNo) {
                        temp = i;
                    }
                });
                $scope.getRetVisit(temp);
            } else if (item.custInteracType == EnumType.InteractionType.complain.value) {
                var temp = {};
                angular.forEach($scope.compltData, function(i) {
                    if (item.contactNo == i.complainNo) {
                        temp = i;
                    }
                });
                $scope.getComplt(temp);
            } else if (item.custInteracType == EnumType.InteractionType.consult.value) {
                var temp = {};
                angular.forEach($scope.consultData, function(i) {
                    if (item.contactNo == i.consultNo) {
                        temp = i;
                    }
                });
                $scope.getConsult(temp);
            }
        };

        // 新增客户事件
        $scope.addCustTouch = function(){
            $scope.custNo = custNo;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/portrayal/popupPages/custTouch/addCustTouch.html',
                controller: 'addCustTouchCtrl',
                size: 'midle-900',
                backdrop:'static',
                scope:$scope,
                resolve: {
                    'optTyp': function () {
                        return 'prtl';
                    },'custNo': function () {
                        return custNo;
                    }
                }
            });
            modalInstance.result.then(function(){
                $scope.searchCustAgent();
            });
        };

        // 逻辑删除事件（单行删除）
        $scope.delCustTouch = function(item) {
            console.log("portrayal custNo=" + item.custNo);
            console.log("portrayal touchNo=" + item.touchNo);
            if (item.dataSource != '01' ) {
                Alert.error('只能删除本地创建信息');
                return;
            } else {
                //非回访
                if (item.custInteracType == '0') {
                    Alert.error('不能删除回访信息');
                    return;
                }
            }
            Alert.confirm("确定删除？").then(function() {

            });

        };
        /** 查询客户事件（单条） */
        $scope.uptCustTouch = function(item){
            console.log("portrayal custNo=" + item.custNo);
            console.log("portrayal touchNo=" + item.contactNo);

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/portrayal/popupPages/custTouch/uptCustTouch.html',
                controller: 'uptCustTouchCtrl',
                size: 'midle-900', //
                backdrop:'static',
                resolve: {
                    'optTyp': function () {
                        return 'prtl';
                    },'custNo': function () {
                        return item.custNo;
                    }
                }
            });
            modalInstance.result.then(function(){
                $scope.searchCustAgent();
            });
        };
        // -------------接触结束--------------
        // crm 一期新增代码
        //查询
        $scope.search = function(page){
            // console.log(this)
            // page=page||1;
            // //$scope.queryPage(page);
            // if($scope.pageFlag=='queryPolicyList'){
            //     $scope.queryList["queryPolicyList"](page);
            // }else if ($scope.pageFlag=="queryRelationOpts"){
            //     $scope.queryList["queryRelationOpts"](page);
            // }else if ($scope,pageFlag) {}
            $scope.queryList[this.optsType](page)
        }
        //tab切换
        $scope.changeFlag = function (pageFlag) {
            $scope.pageFlag = pageFlag;
            // $scope.pagination.pageSize = $scope[$scope.pageFlag].pageSize || '10';
            // $scope.pagination.totalItems = $scope[$scope.pageFlag].totalItems;
            // $scope.pagination.pageIndex = $scope[$scope.pageFlag].pageIndex || '1';
        }
        // 打开保单详情弹窗
        $scope.policyDetail = function (item) {
            var policyNo=item.policyNo;
            var riskCode=item.riskCode;
            var subPolicyNo=item.subPolicyNo;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/portrayal/popupPages/policyDetail/policyDetail.html',
                controller: 'policyDetailCtrl',
                size: 'midle-1200',
                backdrop:'static',
                scope:$scope,
                resolve: {
                    'policyNo': function () {
                        return policyNo;
                    },
                    'custNo':function () {
                        return custNo
                    },
                    'riskCode':function () {
                        return riskCode
                    },
                    'subPolicyNo':function () {
                        return subPolicyNo
                    }
                }
            });
            modalInstance.result.then(function(){
                // $scope.searchUser();
                console.log(11111)
            });
        }
        // 打开工单详情弹窗
        $scope.workOrderDetail = function (policyNo) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/portrayal/popupPages/workOrderDetail/workOrder.html',
                controller: 'workOrderDetailCtrl',
                size: 'midle-900',
                backdrop:'static',
                resolve: {
                    // 'custNo': function () {
                    //     return custNo;
                    // }
                }
            });
            modalInstance.result.then(function(){
                // $scope.searchUser();
                console.log(11111)
            });
        }
        var reflashLastFollowUp = function(){
            HttpService.linkHttp({
                url: 'crm/ecif/cust/sumz/lastFollowUp',
                method: 'GET',
                params: {'custNo': custNo}
            }).then(function (response) {
                if (response == undefined || response.data == undefined) {
                    return;
                }
                var followUpDate = new Date(response.data.followUpDate);
                response.data.followUpDate = $filter('date')(followUpDate, 'yyyy-MM-dd');
                $scope.custLastFollowUp = response.data;
            });
        }
        //客户画像中各个险类保额查询
        var queryInsuranceAmount = function(){
            HttpService.linkHttp({
                url: '/crm/query/custquery/queryInsuranceAmountByCustNo',
                method: 'POST',
                data:{custNo:custNo}
            }).then(function (response) {
                if (response == undefined || response.data == undefined) {
                    return;
                }
                $scope.custSumzTotal = {
                    carAmount: 0,//车险保额
                    carPremium: 0, //车险保费
                    carPremiumCI:0, //交强保费
                    carPremiumBI:0, //商业保费
                    carPremiumBC:0, //组合保费
                    accidentAmount: 0,//意外险保额
                    healthAmount: 0,//健康险保额
                    medicalAmount: 0,//医疗险保额
                    othersAmount: 0//其他险保额
                };
                angular.forEach(response.data, function(x) {
                    if (x.RISKCLASS === '08' || x.RISKCLASS === '13') {//车险
                        $scope.custSumzTotal.carAmount += x.SUMAMOUNT;
                        $scope.custSumzTotal.carPremium +=x.SUMPREMIUM;
                        if(x.RISKCLASS === '13'){
                            $scope.custSumzTotal.carPremiumBC +=x.SUMPREMIUM;
                        }else if(x.RISKCODE=='0801'){
                            $scope.custSumzTotal.carPremiumCI +=x.SUMPREMIUM;
                        }else{
                            $scope.custSumzTotal.carPremiumBI +=x.SUMPREMIUM;
                        }
                    } else if (x.RISKCLASS === '11') {//意外险
                        $scope.custSumzTotal.accidentAmount += x.SUMAMOUNT;
                    } else if (['1005','1012','1013','1016','1028'].indexOf(x.RISKCODE)>-1) {
                        // 疾病保险
                        // 附加疾病身故保险、团体重大疾病保险（A款）、一年期个人重大疾病保险、女性特定恶性肿瘤保险。
                        $scope.custSumzTotal.healthAmount += x.SUMAMOUNT;
                    } else if (['1011','1029','1027'].indexOf(x.RISKCODE)>-1) {
                        //医疗保险
                        // 团体补充医疗保险、个人综合医疗费用保险、附加意外医疗保险条款、未成年人门急诊医疗费用保险；
                        $scope.custSumzTotal.medicalAmount += x.SUMAMOUNT;
                    } else {//其他险
                        $scope.custSumzTotal.othersAmount += x.SUMAMOUNT;
                    }
                });
            });
        }
        $scope.showOrder = function(e){


            if ($('.callLog tbody tr').eq(e+1).hasClass('order')) {//点击关闭
                $('.none').slideUp(500)
                setTimeout(function(){
                    $('.order').remove()
                },500)
                return
            }else{
                $('.order').remove()
                var detailTr = '<tr class="order"><td colspan="7">\
                    <div class="none" style="padding:15px">\
                        <table class="table table-bordered table-hover table-condensed" st-table="custTouch" st-safe-src="custTouchList">\
                            <thead>\
                                <th class="text-center">主题</th>\
                                <th class="text-center">状态</th>\
                                <th class="text-center">优先级</th>\
                                <th class="text-center">渠道</th>\
                                <th class="text-center">客户</th>\
                                <th class="text-center">受理客服组</th>\
                                <th class="text-center">受理客服</th>\
                            </thead>\
                            <tbody>\
                                <tr ng-click="workOrderDetail(item)" ng-repeat="item in custTouch">\
                                    <td ng-bind="item.contactNo">\
                                    <td ng-bind="item.contactNo">\
                                    <td ng-bind="item.contactNo">\
                                    <td ng-bind="item.contactNo">\
                                    <td ng-bind="item.contactNo">\
                                    <td ng-bind="item.contactNo">\
                                    <td ng-bind="item.contactNo">\
                                </tr>\
                            </tbody>\
                        </table>\
                    </div></td></tr>';
                var $detailTr = $compile(detailTr)($scope);
                $('.callLog tbody tr').eq(e).after($detailTr)
                $('.none').slideDown(500)
            }

        }
        $scope.queryList=[];
        // 初始化
        var init = function () {
            // $scope.pagination = {
            //     pageSize:'10',
            //     pageIndex:1,
            //     maxText:5
            // }
            // 通话记录查询
            // $scope.queryCallLog = {
            //     url:'/crm/query/custquery/getCallLogsByCustNo',
            //     method:'POST',
            //     data:{
            //         customerNumber:custNo
            //     }
            // }
            // 工单查询
            // $scope.queryWorkOrder = {
            //     url:'/crm/query/custquery/getOrderListByCustId',
            //     method:'POST',
            //     data:{
            //         userId:custNo
            //     },
            //     success:function successCallback(response){

            //     }
            // }
            // $scope.searchPolicyObj = {} //条件
            // $scope.queryPolicyList = {} // 保单列表查询
            // $scope.queryEventsList = {} // 事件列表查询
            // $scope.queryTasksList = {} // 任务列表查询
            // $scope.queryPolicyList.pagination = {
            //     pageSize:'10',
            //     pageIndex:1,
            //     maxText:5
            // }
            // $scope.custNo = []
            // $scope.custNo.push(custNo)
            // $scope.queryPolicyList.url = '/crm/query/custquery/getPolicyListByCustNo';
            // $scope.queryPolicyList.method = 'POST';
            // $scope.queryPolicyList.params = $scope.searchCustProposalObj;
            // $scope.queryPolicyList.data = {custNo:custNo}
            // $scope.queryPolicyList.success = function successCallback (response) {
            //     if (response.status === '1') {
            //         $scope.custProposalList = response.data.list;
            // $scope.custCollection = response.data.list.map(function (item) {
            //     item.custTypNam = EnumType.CustType.getLabelByValue(item.custTyp);
            //     item.custSourceNam = EnumType.DataSource.getLabelByValue(item.custSource);
            //     item.certTypNam = EnumType.IdType.getLabelByValue(item.certTyp);
            //     return item;
            // });
            //     }

            // }
            //
            // 判断是否有查看保单详情权限
            $scope.$on('queryPage',function(event,queryPage){
                var optsType=event.targetScope.optsType
                $scope.queryList[optsType]=queryPage;
            });
            // 保单
            $scope.queryPolicyList = {
                pagination:{
                    pageSize:'10',
                    pageIndex:1,
                    maxText:5
                },
                url:'/crm/query/custquery/getPolicyListByCustNo',
                method:'POST',
                data:{custNo:custNo},
                success:function(response){
                    if (response == undefined || response.data == undefined) {
                        return;
                    }
                    $scope.custProposalList = response.data.list;
                    $scope.custProposalList.forEach(function(item){
                        item.operateDate = item.operateDate?item.operateDate.substr(0,10):'';
                        if (custAgentList.length == 0) {
                            item.isDisabled = false;
                        } else if (custAgentList.indexOf(item.salesmanCode)>-1) {
                            item.isDisabled = false;
                        } else  {
                            item.isDisabled = true;
                        }
                        return item
                    })
                    console.log($scope.custProposalList)
                }
            }
            // 客户关系
            $scope.queryRelationOpts = {
                pagination:{
                    pageSize:'10',
                    pageIndex:1,
                    maxText:5
                },
                url:'crm/ecif/cust/custRelList',
                method:'GET',
                params:{custNo:custNo,relationTyp:$scope.searchRelObj.relationTyp.value},
                success:function(response){
                    if (response == undefined || response.data == undefined) {
                        return;
                    }
                    $scope.custRelCollection = response.data.list.map(function (item) {
                        item.relationTypNam = EnumType.Relation.getLabelByValue(item.relationTyp);
                        return item;
                    })
                }
            }

            // // 保单列表
            // $scope.queryPolicyList = {
            //     pagination:{
            //         pageSize:'10',
            //         pageIndex:1,
            //         maxText:5
            //     },
            //     url:'/crm/query/custquery/getPolicyListByCustNo',
            //     method:'GET',
            //     params:$scope.custNo,
            //     success:function(response){
            //         if (response == undefined || response.data == undefined) {
            //             return;
            //         }
            //         $scope.custProposalList = response.data.list;
            //     }
            // }


            //获取末次跟进人
            reflashLastFollowUp();
            $scope.searchEvent();
            queryInsuranceAmount();
        }
        init()
    }

})();
