﻿(function() {
	'use strict';

	angular.module('BlurAdmin.pages.knowledge.publicRepository').controller(
			'publicRepositoryCtrl', publicRepositoryCtrl);
	/** @ngInject */
	function publicRepositoryCtrl($scope, $uibModal, $timeout, HttpService,
			$state, Alert) {

		$scope.searchObj = {};
		$scope.searchObj.documentName = "";
		
		$scope.basicConfig = {
			core : {
				multiple : true,
				check_callback : true,
				worker : true
			},
			'types' : {
				'folder' : {
					'icon' : 'ion-folder'
				},
				'default' : {
					'icon' : 'ion-document-text'
				}
			},
			'version' : 1
		};

		$scope.roles = [ {
			"roleName" : "系统管理员"
		}, {
			"roleName" : "系统管理员"
		}, {
			"roleName" : "二级管理员"
		}, {
			"roleName" : "普通用户"
		} ];

		$scope.treeData = [ {
			"id" : "1",
			"text" : "产品文档"
		}, {
			"id" : "2",
			"text" : "售后文档",
			"state" : {
				opened : true
			}
		}, {
			"id" : "3",
			"text" : "产片销售技能"
		}, {
			"id" : "4",
			"text" : "培训资料"
		}, {
			"id" : "5",
			"text" : "服务职能"
		} ,{
			"id" : "6",
			"text" : "理赔相关"
		} ];

		$scope.knowledgeListAll = [ {
			"typeId":"6",
			"name" : '理赔流程.doc',
			"type" : '理赔相关',
			"downloadTimes" : '10',
			"size" : '257K',
			"createUser" : '系统管理员',
			"createTime" : '2018-06-15 10:00:00'
		},{
			"typeId":"6",
			"name" : '理赔材料说明文档.doc',
			"type" : '理赔相关',
			"downloadTimes" : '134',
			"size" : '257K',
			"createUser" : '系统管理员',
			"createTime" : '2018-06-15 10:00:00'
		}];
		
		// 根据选择的节点，刷新列表
		$scope.knowledgeList = [];
		
		
		$scope.addNode = function() {

			var modalInstance = $uibModal
				.open({
					animation : true,
					backdrop : 'static',
					templateUrl : 'app/pages/knowledge/publicRepository/pop/addKnowledgeType.html',
					size : 'midle-900',
					controller : 'addKnowledgeTypeCtrl',
					scope : $scope,
					resolve : {}
				});
			
			modalInstance.result.then(function(result) {
				if (result == undefined || result == '') {
					return;
				}
				// 回调
				$scope.treeData.push(result);
				$scope.basicConfig.version ++; // 控制树的刷新
			});
			};
			

		$scope.delNode = function() {
			$scope.delKnowledgeType = {};
			if($.isEmptyObject($scope.treeObj)){
				Alert.error("请选择要删除的节点！");
				return;
			}
			var selected = $scope.treeObj.get_selected()[0];
			$scope.delKnowledgeType.knowledgeTypeId = selected;

			Alert.confirm("确定删除该条记录？").then(function() {
				
			});
		};
		
		
		// 显示知识分类下的知识文档
		$scope.detShow = function() {
			$scope.knowledgeList = [];
			var nodeData = this.basicTree.jstree(true)._model.data;
			var selected = this.basicTree.jstree(true).get_selected()[0];
			var typeId = nodeData[selected].id;
			angular.forEach($scope.knowledgeListAll, function(item) {
				if(typeId == item.typeId ){
					$scope.knowledgeList.push(item);
				}
			});
			

		}
		
		// 文件搜索
		$scope.searchDoc = function() {
			$scope.knowledgeList = [];
			angular.forEach($scope.knowledgeListAll, function(item) {
				if($scope.searchObj.documentName != "" &&　item.name.indexOf($scope.searchObj.documentName) != -1 ){
					$scope.knowledgeList.push(item);
				}
			});
			
		}
		
		// 文件上传
		$scope.addDocument = function() {
			
		}
		
		$scope.download = function() {
			a = document.createElement('a');
		    a.href = 'app/pages/product/uploadProduct/产品导入模板.xls';
		    a.click();
		}
		
	}

})();
