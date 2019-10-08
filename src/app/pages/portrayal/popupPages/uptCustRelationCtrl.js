(function () {
    'use strict';

    angular.module('BlurAdmin.pages.portrayal.perCusPortrayal')
        .controller('uptCustRelationCtrl', uptCustRelationCtrl);

    /** @ngInject */
    function uptCustRelationCtrl($scope, HttpService, EnumType, $uibModalInstance, $filter, Alert, $uibModal, custNo, relationTyp, refCustNo) {
        console.log("uptCustRelationCtrl custNo=" + custNo);
        console.log("uptCustRelationCtrl relationTyp=" + relationTyp);
        console.log("uptCustRelationCtrl refCustNo=" + refCustNo);

        $scope.Relation = EnumType.Relation;

        $scope.selectRelationTyp = function(selectRelationTyp) {
			console.log(selectRelationTyp);
			$scope.custRel.relationTyp = selectRelationTyp;
		}

        //-------------查询回显开始--------------
        var initRelInfo = function() {
            HttpService.linkHttp({
                url: 'crm/ecif/cust/getCustRel',
                method: 'GET',
                params: {'custNo': custNo, 'relationTyp': relationTyp, 'refCustNo': refCustNo}
            }).then(function (response) {
            	if (response == undefined || response.data == undefined) {
            		Alert.error("客户关系信息不存在或已删除");
            		return;
            	}
                response.data.relationTyp = EnumType.Relation.getEnumByValue(response.data.relationTyp);
                $scope.custRel = response.data;

            });
        }

        $scope.reset = function() {
        	initRelInfo();
        }
        initRelInfo();
        //-------------查询回显结束--------------
        // 选择关联客户
        $scope.selectRelCust = function() {
            var modalInstance = $uibModal.open({
                animation : true,
                backdrop : 'static',
                templateUrl : 'app/pages/customer/custMnt/popupPages/selectCustDlg.html',
                size : 'midle-900',
                controller : 'selectCustDlgCtrl',
                scope : $scope,
                resolve : {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
            modalInstance.result.then(function (result) {
                console.log(result); //result关闭是回传的值
                if (result == undefined) {
                	return;
                }
                $scope.custRel.refCustNo = result.custNo;
                $scope.custRel.refCustNam = result.custName;
            }, function (reason) {
                console.log(reason);//点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel
            });
        }
        //-------------修改开始--------------
		$scope.uptRel = function() {
			if ($scope.custRel == null) {
				Alert.error("客户关系参数信息不能为空");
				return;
			}
			if ($scope.custRel.custNo == null || $scope.custRel.custNo == '') {
				Alert.error("客户号不能为空");
				return;
			}
			if ($scope.custRel.relationTyp == null || $scope.custRel.relationTyp == '') {
				Alert.error("关系类型不能为空");
				return;
			}
			if ($scope.custRel.refCustNo == null || $scope.custRel.refCustNo == '') {
				Alert.error("关联客户号不能为空");
				return;
			}
			var custRelObj = angular.copy($scope.custRel);
			custRelObj.relationTyp = $scope.custRel.relationTyp.value;

			console.log(custRelObj);
            HttpService.linkHttp({
                url: 'crm/ecif/cust/uptCustRel',
                method: 'PUT',
                params: custRelObj
            }).then(function (response) {
                $uibModalInstance.close();
            });
		}
        //-------------修改结束--------------
    }
})();
