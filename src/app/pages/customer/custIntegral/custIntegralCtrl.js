(function() {
	'use strict';

				angular.module('BlurAdmin.pages.customer').controller('custIntegralCtrl', custIntegralCtrl);
				/** @ngInject */
				function custIntegralCtrl($scope, $filter, $uibModal, editableOptions, editableThemes) {

					$scope.custIntegralDts = [ {
						"id" : 1,
						"customerNo" : "100500752",
						"customerName" : '张三',
						"integralChangeQuo" : 20,
						"integralName" : "保单积分",
						"integralChangeTime" : "2017-06-01 09:42:25",
						"productName" : "XXX健康险",
						"policyNo" : "A00000000000252214",
						"integralChangeType" : "增加",
						"remark" : ""
					}, {
						"id" : 2,
						"customerNo" : "100500752",
						"customerName" : '张三',
						"integralChangeQuo" : 20,
						"integralName" : "保单积分",
						"integralChangeTime" : "2017-07-05 09:42:25",
						"productName" : "XXX健康险",
						"policyNo" : "A00000000000252004",
						"integralChangeType" : "减少",
						"remark" : ""
					},{
						"id" : 3,
						"customerNo" : "100500752",
						"customerName" : '张三',
						"integralChangeQuo" : 20,
						"integralName" : "保单积分",
						"integralChangeTime" : "2017-12-07 09:42:25",
						"productName" : "XXX健康险",
						"policyNo" : "A00000000000052214",
						"integralChangeType" : "减少",
						"remark" : ""
					}, {
						"id" : 4,
						"customerNo" : "100500752",
						"customerName" : '张三',
						"integralChangeQuo" : 20,
						"integralName" : "保单积分",
						"integralChangeTime" : "2017-06-12 09:42:25",
						"productName" : "XXX健康险",
						"policyNo" : "A00000000000252200",
						"integralChangeType" : "增加",
						"remark" : ""
					},{
						"id" : 5,
						"customerNo" : "100500752",
						"customerName" : '张三',
						"integralChangeQuo" : 20,
						"integralName" : "保单积分",
						"integralChangeTime" : "2017-12-12 09:42:25",
						"productName" : "XXX健康险",
						"policyNo" : "A00000000000252214",
						"integralChangeType" : "增加",
						"remark" : ""
					}, {
						"id" : 6,
						"customerNo" : "100500752",
						"customerName" : '张三',
						"integralChangeQuo" : 200,
						"integralName" : "保单积分",
						"integralChangeTime" : "2017-12-10 09:43:25",
						"productName" : "XXX健康险",
						"policyNo" : "A00000000000252213",
						"integralChangeType" : "减少",
						"remark" : ""
					} ];

				}

			})();
