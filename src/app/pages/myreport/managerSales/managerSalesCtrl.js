(function() {
	'use strict';

	angular.module('BlurAdmin.pages.myreport.managerSales').controller(
			'managerSalesCtrl', managerSalesCtrl);
	/** @ngInject */
	function managerSalesCtrl($scope, $filter, $uibModal, editableOptions,
			editableThemes) {

		$scope.saleData = [ {
			"managerName" : "客户经理姓名1",// 客户经理姓名
			"affilTeam" : "所属部门1",// 所属部门
			"signBillCount" : "签单数1",// 签单数
			"contractVolume" : "签约额1",// 签约额
			"returnAmount" : "回款额1",// 回款额
			"distrBusiOppo" : "分配商机数1",// 分配商机数
			"newAddBusiOppo" : "新增商机数1",// 新增商机数
			"newAddCust" : "新增客户数1",// 新增客户数
			"newAddContact" : "新增联系人数1",// 新增联系人数
			"followRecord" : "客户跟进记录1"// 客户跟进记录
		}, {
			"managerName" : "客户经理姓名1",// 客户经理姓名
			"affilTeam" : "所属部门1",// 所属部门
			"signBillCount" : "签单数1",// 签单数
			"contractVolume" : "签约额1",// 签约额
			"returnAmount" : "回款额1",// 回款额
			"distrBusiOppo" : "分配商机数1",// 分配商机数
			"newAddBusiOppo" : "新增商机数1",// 新增商机数
			"newAddCust" : "新增客户数1",// 新增客户数
			"newAddContact" : "新增联系人数1",// 新增联系人数
			"followRecord" : "客户跟进记录1"// 客户跟进记录
		}, {
			"managerName" : "客户经理姓名1",// 客户经理姓名
			"affilTeam" : "所属部门1",// 所属部门
			"signBillCount" : "签单数1",// 签单数
			"contractVolume" : "签约额1",// 签约额
			"returnAmount" : "回款额1",// 回款额
			"distrBusiOppo" : "分配商机数1",// 分配商机数
			"newAddBusiOppo" : "新增商机数1",// 新增商机数
			"newAddCust" : "新增客户数1",// 新增客户数
			"newAddContact" : "新增联系人数1",// 新增联系人数
			"followRecord" : "客户跟进记录1"// 客户跟进记录
		}, {
			"managerName" : "客户经理姓名1",// 客户经理姓名
			"affilTeam" : "所属部门1",// 所属部门
			"signBillCount" : "签单数1",// 签单数
			"contractVolume" : "签约额1",// 签约额
			"returnAmount" : "回款额1",// 回款额
			"distrBusiOppo" : "分配商机数1",// 分配商机数
			"newAddBusiOppo" : "新增商机数1",// 新增商机数
			"newAddCust" : "新增客户数1",// 新增客户数
			"newAddContact" : "新增联系人数1",// 新增联系人数
			"followRecord" : "客户跟进记录1"// 客户跟进记录
		}, {
			"managerName" : "客户经理姓名1",// 客户经理姓名
			"affilTeam" : "所属部门1",// 所属部门
			"signBillCount" : "签单数1",// 签单数
			"contractVolume" : "签约额1",// 签约额
			"returnAmount" : "回款额1",// 回款额
			"distrBusiOppo" : "分配商机数1",// 分配商机数
			"newAddBusiOppo" : "新增商机数1",// 新增商机数
			"newAddCust" : "新增客户数1",// 新增客户数
			"newAddContact" : "新增联系人数1",// 新增联系人数
			"followRecord" : "客户跟进记录1"// 客户跟进记录
		}, {
			"managerName" : "客户经理姓名1",// 客户经理姓名
			"affilTeam" : "所属部门1",// 所属部门
			"signBillCount" : "签单数1",// 签单数
			"contractVolume" : "签约额1",// 签约额
			"returnAmount" : "回款额1",// 回款额
			"distrBusiOppo" : "分配商机数1",// 分配商机数
			"newAddBusiOppo" : "新增商机数1",// 新增商机数
			"newAddCust" : "新增客户数1",// 新增客户数
			"newAddContact" : "新增联系人数1",// 新增联系人数
			"followRecord" : "客户跟进记录1"// 客户跟进记录
		} ];

		$scope.addUser = function() {

			$uibModal
					.open({
						animation : true,
						templateUrl : 'app/pages/mgrcenter/paramManage/popupPages/addParam.html',
						size : 'lg',
						controller : 'addParamCtrl',
						scope : $scope,
						resolve : {}
					});
		};

		$scope.smartTablePageSize = 10;

	}

})();
