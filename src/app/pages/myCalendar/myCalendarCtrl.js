(function() {
	'use strict';

	angular.module('BlurAdmin.pages.myCalendar').controller('myCalendarCtrl', myCalendarCtrl);

	/** @ngInject */
	function myCalendarCtrl($scope, $state, $stateParams, $rootScope, $uibModal, EnumType, HttpService, Alert) {
		
		$scope.loadCalendar = function() {
	        var initialLangCode = 'zh-cn';
	        $('#calendar').fullCalendar({
	            header: {
	                left:  'prev,next',  //右边显示的按钮  
	                center: 'title',
	                right: 'today month,agendaWeek,agendaDay'
	            },
				monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],  
	            monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],  
	            dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],  
	            dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],  
	            today: ["今天"], 
	            defaultView: 'month',
				timeFormat: 'H:mm',
	            weekends: true,
	            allDayText: '全天',
	            firstDay: 0,  
                views: {
                    basic: {
                        titleFormat:'YYYY年MM月', // options apply to basicWeek and basicDay views
                    },
                    agenda: {
                        titleFormat:'YYYY年MM月',// options apply to agendaWeek and agendaDay views
                    },
                    week: {
                        titleFormat:'YYYY年MM月',// options apply to basicWeek and agendaWeek views
                    },
                    day: {
                        titleFormat:'YYYY年MM月dd日',// options apply to basicDay and agendaDay views
                    }
             },
	            buttonText: {  
		            today: '今天',  
		            month: '月',  
		            week: '周',  
		            day: '日',  
//		            prev: '上一月',  
//		            next: '下一月'  
	            },  
	            businessHours: true,
	            defaultEventMinutes: 120,
	            eventLimit: true,
	            dayClick : function( date ) {
	                //do something here...
	                console.log('dayClick触发的时间为：', date.format());
	                // ...
	            },
	            //设置是否可被单击或者拖动选择
	            selectable: true,
	            //点击或者拖动选择时，是否显示时间范围的提示信息，该属性只在agenda视图里可用
	            selectHelper: true,
	            //点击或者拖动选中之后，点击日历外的空白区域是否取消选中状态 true为取消 false为不取消，只有重新选择时才会取消
	            unselectAuto: true,
				select: function(start, end) {
					var startd = start.format('YYYY-MM-DD');
//					var currd = new Date().tostring();
//					if (new Date(startd) <= ) {
//						return;
//					}
	                console.log('select触发的开始时间为：', start.format());
	                var id = 0;
	                var eventData;
	                var modalInstance = $uibModal.open({
	                    animation: true,
	                    templateUrl: 'app/pages/myCalendar/popupPages/addCalendar.html',
	                    controller: 'addCalendarCtrl',
	                    size: 'midle-900',
	                    backdrop:'static',
	                    scope:$scope,
	                    resolve: {
		                    'startDate': function () {
		                        return start.format();
		                    }
	                    }
	                });
	                modalInstance.result.then(function(result){
	                	if (result && result.calendarTitle) {
							eventData = {
								id: id+1,
								title: result.calendarTitle,
								start: result.startDate,
								end: result.endDate,
								className: 'doing',
							};
							$('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
	                	}

	                });
	            
					$('#calendar').fullCalendar('unselect');
	                console.log('select触发的结束时间为：', end.format());
				},
	            eventClick : function( event ){
	                //do something here...
	                console.log('eventClick中选中Event的id属性值为：', event.id);
	                console.log('eventClick中选中Event的title属性值为：', event.title);
	                console.log('eventClick中选中Event的start属性值为：', event.start.format('YYYY-MM-DD HH:mm'));
	                console.log('eventClick中选中Event的end属性值为：', event.end==null?'无':event.end.format('YYYY-MM-DD HH:mm'));
	                console.log('eventClick中选中Event的color属性值为：', event.color);
	                console.log('eventClick中选中Event的className属性值为：', event.className);

	                var endDate = event.end==undefined?'无':event.end.format('YYYY-MM-DD HH:mm');
	                var startDate = event.start.format('YYYY-MM-DD HH:mm');
					var eventData = {
							id: event.id,
							title: event.title,
							start: startDate,
							end: endDate,
							className: event.className
						};
	                var modalInstance = $uibModal.open({
	                    animation: true,
	                    templateUrl: 'app/pages/myCalendar/popupPages/getCalendar.html',
	                    controller: 'getCalendarCtrl',
	                    size: 'midle-900',
	                    backdrop:'static',
	                    scope:$scope,
	                    resolve: {
		                    'eventData': function () {
		                        return eventData;
		                    }
	                    }
	                });
	                modalInstance.result.then(function(result){
	                	if (result.optFlg == 'upt') {
		                	if (result && result.calendarTitle) {
								event.title = result.calendarTitle;
								event.start = result.startDate;
								event.end = result.endDate;
								event.className = result.calSts.code_name;
								if (event.className == 'done') {
									event.backgroundColor='gray';
								} else {
									event.backgroundColor='';

								}
				                $('#calendar').fullCalendar('updateEvent', event);
		                	}
	                	} else if (result.optFlg == 'del') {
	    					$('#calendar').fullCalendar('removeEvents', result.id); // stick? = true
	                	}
	                });
	            },
	            // tooltip
	            eventMouseover : function( event ) {
	                //do something here...
	                console.log('鼠标经过 ...');
	                console.log('eventMouseover被执行，选中Event的title属性值为：', event.title);
	            },
	            eventMouseout : function( event ) {
	                //do something here...
	                console.log('eventMouseout被执行，选中Event的title属性值为：', event.title);
	                console.log('鼠标离开 ...');
	            },
	            //Event是否可被拖动或者拖拽
	            editable: true,
	            //Event被拖动时的不透明度
	            dragOpacity: 0.5,
	            eventDrop : function( event, dayDelta, revertFunc ) {
	                //do something here...
	                console.log('eventDrop --- start ---');
	                console.log('eventDrop被执行，Event的title属性值为：', event.title);
	                if(dayDelta._days != 0){
	                    console.log('eventDrop被执行，Event的start和end时间改变了：', dayDelta._days+'天！');
	                }else if(dayDelta._milliseconds != 0){
	                    console.log('eventDrop被执行，Event的start和end时间改变了：', dayDelta._milliseconds/1000+'秒！');
	                }else{
	                    console.log('eventDrop被执行，Event的start和end时间没有改变！');
	                }
	                console.log('eventDrop --- end ---');
	            },
	            eventResize : function( event, dayDelta, revertFunc ) {
	                //do something here...
	                console.log(' --- start --- eventResize');
	                console.log('eventResize被执行，Event的title属性值为：', event.title);
	                if(dayDelta._days != 0){
	                    console.log('eventResize被执行，Event的start和end时间改变了：', dayDelta._days+'天！');
	                }else if(dayDelta._milliseconds != 0){
	                    console.log('eventResize被执行，Event的start和end时间改变了：', dayDelta._milliseconds/1000+'秒！');
	                }else{
	                    console.log('eventResize被执行，Event的start和end时间没有改变！');
	                }
	                console.log('--- end --- eventResize');
	            },
	            events: [
	                {
	                    id: 1,
	                    title: '这是一个all-day数据',
	                    allDay: true,
	                    start: '2018-05-01 08:00',
	                    className: 'done',
	                    backgroundColor: 'gray',

	                },
	                {
	                    id: 2,
	                    title: '开始时间为12PM',
	                    start: '2018-06-02 12:00',
	                    className: 'done',
	                    backgroundColor: 'gray',
	                },
	                {
	                    id: 3,
	                    title: '给一点颜色',
	                    start: '2018-07-04 12:00',
	                    className: 'done',
	                    backgroundColor: 'gray',
	                },
	                {
	                    id: 4,
	                    title: '使用className:done',
	                    start: '2018-05-27 09:00',
	                    end: '2016-07-11 18:00',
	                    className: 'done',
	                    backgroundColor: 'gray',

	                },
	                {
	                    id: 5,
	                    title: '使用className:doing',
	                    start: '2018-06-10 09:00',
	                    end: '2018-06-12 18:00',
	                    className: 'doing'

	                },
	                {
	                    id: 6,
	                    title: '使用URL和字体颜色',
	                    start: '2018-07-05 14:00',
	                    className: 'doing',
	                },
	                {
	                    id: 7,
	                    title: '使用backgroundColor和borderColor',
	                    start: '2018-06-24 09:00',
	                    end: '2018-06-26 18:00',
	                    backgroundColor: 'gray',
	                    className: 'done'

	                },
						{
	                	id: 9,
							title: 'All Day Event',
							start: '2018-05-08 11:00',
		                    className: 'done',
		                    backgroundColor: 'gray',
						},
						{
							id: 8,
							title: 'Long Event',
							start: '2018-06-18 10:50',
							end: '2018-06-18 19:50',
		                    className: 'doing'
						},
						{
							id: 10,
							title: 'Repeating Event',
							start: '2018-07-09 T16:40:00',
		                    className: 'done',
		                    backgroundColor: 'gray',
						},
						{
							id: 11,
							title: 'Repeating Event',
							start: '2018-05-16 16:30:00',
		                    className: 'doing'
						},
						{
							id: 12,
							title: 'Conference',
							start: '2018-06-15 10:30:00',
							end: '2018-06-18 08:30:00',
		                    className: 'done',
		                    backgroundColor: 'gray',
						},
						{
							id: 13,
							title: 'Meeting',
							start: '2018-06-13 10:30:00',
							end: '2018-06-13 12:20:00',
		                    className: 'done',
		                    backgroundColor: 'gray',
						},
						{
							title: 'Lunch',
							start: '2018-07-12 12:00:00',
		                    className: 'doing'
						},
						{
							id: 14,
							title: 'Meeting',
							start: '2018-06-07 14:30:00',
		                    className: 'done',
		                    backgroundColor: 'gray',
						},
						{
							id: 15,
							title: 'Happy Hour',
							start: '2018-05-12 17:30:00',
		                    className: 'doing'
						},
						{
							id: 16,
							title: 'Dinner',
							start: '2018-06-04 20:10:00',
		                    className: 'done',
		                    backgroundColor: 'gray',
						},
						{
							id: 17,
							title: 'Birthday Party',
							start: '2018-076-13 07:30:00',
		                    className: 'doing'
						},
						{
							id: 18,
							title: 'Click for Google',
							start: '2018-06-20 18:00:00',
		                    className: 'done'
						}
					]
	        });

	        //初始化语言选择的下拉菜单值
	        $.each($.fullCalendar.langs, function(langCode) {
                $('#calendar').fullCalendar('option', 'lang', initialLangCode);
	        });

	        //当选择一种语言时触发
	        $('#lang-selector').on('change', function() {
	            if (this.value) {
	                $('#calendar').fullCalendar('option', 'lang', this.value);
	            }
	        });
	    
		}
	}

})();
