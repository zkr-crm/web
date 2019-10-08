(function() {
	'use strict';

	angular.module('BlurAdmin.pages.mgrcenter.menumanagement').controller(
			'MenumanagementCtrl', MenumanagementCtrl);
	/** @ngInject */
	function MenumanagementCtrl($scope, $uibModal, $timeout, HttpService,
			$state, Alert) {

		$scope.defaultMenus = [];
		$scope.pareMenus = [];
		$scope.treeData = getDefaultData();
		$scope.menuLvOrin = {};


	    $scope.move = function(e,item){
	    	
	    	/*console.log("node_move begins!");
	    	console.log(item);
	    	console.log(item.parent);103
	    	console.log(item.position);0
	    	console.log(item.node.id);1021
	    	console.log(item.node.text);*/
			var opts = {};
			opts.url = '/crm/manage/dragUpdMenu';
			opts.method = 'PUT';
			opts.params = {
					menuId : item.node.id,
					newPare : item.parent,
					newOrder : item.position
				};
			HttpService.linkHttp(opts).then(
					function(response) {
						$scope.refresh();

					});
	    }
	    
		/*$scope.menuLvs = [ {
			label : "1级",
			value : 1
		}, {
			label : "2级",
			value : 2
		}, {
			label : "3级",
			value : 3
		}, {
			label : "4级",
			value : 4
		}, {
			label : "5级",
			value : 5
		} ];*/

		$scope.basicConfig = {
			core : {
				multiple : false,
				check_callback : true,
				worker : false
			},
			'types' : {
				'folder' : {
					'icon' : 'ion-ios-folder'
				},
				'default' : {
					'icon' : 'ion-document-text'
				}
			},
			'plugins' : ['dnd', 'types' ],
			'version' : 1
		};

		$scope.menuState = {};
		$scope.menuState.addDis = true;
		$scope.menuState.delDis = true;
		$scope.menuState.modConfShow = false;
		$scope.menuState.menuCodeDis = false;
		$scope.menuState.pareCodeDis = false;
		$scope.menuState.pareNameDis = false;
		$scope.menuState.pareNameReq = false;
		$scope.menuState.pareCodeReq = false;

		$scope.modMenu = {};
		$scope.modMenu.menuId = "";
		$scope.modMenu.menuTitle = "";
		$scope.modMenu.menuLv = "";
		$scope.modMenu.menuStateref = "";
		$scope.modMenu.pareMenuCode = "";
		$scope.modMenu.pareMenu = "";
		$scope.modMenu.menuOrder = "";
		$scope.modMenu.menuDesc = "";

		$scope.saveMenu = {};
		$scope.saveMenu.menuId = "";
		$scope.saveMenu.menuTitle = "";
		$scope.saveMenu.menuLv = "";
		$scope.saveMenu.menuStateref = "";
		$scope.saveMenu.pareMenuCode = "";
		$scope.saveMenu.pareMenu = "";
		$scope.saveMenu.menuOrder = "";
		$scope.saveMenu.menuDesc = "";

		$scope.changeSearch = {};
		$scope.changeSearch.menuId = "";
		$scope.changeSearch.menuTitle = "";
		$scope.changeSearch.menuLv = "";
		$scope.changeSearch.menuStateref = "";
		$scope.changeSearch.pareMenuCode = "";
		$scope.changeSearch.pareMenu = "";
		$scope.changeSearch.menuOrder = "";
		$scope.changeSearch.menuDesc = "";

		$scope.searchMenu = {};
		$scope.searchMenu.menuId = {};

		$scope.delMenu = {};
		$scope.delMenu.menuId = {};

		$scope.pareMenuCodes = [];

		$scope.treeObj = {};

		$scope.detShow = function() {
			$scope.menuState.modConfShow = true;
			$scope.menuState.addDis = false;
			$scope.menuState.delDis = false;
			$scope.menuState.modButtShow = true;
			$scope.menuState.addButtShow = false;
			$scope.menuState.menuCodeDis = true;
			$scope.menuState.pareCodeDis = false;
			$scope.menuState.pareNameDis = true;
			$scope.menuState.pareNameReq = false;
			$scope.menuState.pareCodeReq = false;
			$scope.treeObj = this.basicTree.jstree(true);
			var selected = this.basicTree.jstree(true).get_selected()[0];
			$scope.searchMenu.menuId = selected;

			var opts = {};
			opts.url = '/crm/manage/getOneMenu';
			opts.method = 'GET';
			opts.params = $scope.searchMenu;
			HttpService.linkHttp(opts).then(
					function(response) {
						$scope.modMenu = response.data;
						$scope.menuLvOrin = response.data.menuLevel;

						// $scope.modMenu.pareMenuCode = {
						// 	label : response.data.menuParename,
						// 	value : response.data.menuPareid
						// };
						// if (response.data.menuLevel == 1) {
						// 	$scope.modMenu.menuPareid = {};
						// 	$scope.modMenu.pareMenu = "";
						// } else {
						// }
					});

		}

		$scope.addNode = function() {

			$scope.modMenu.menuId = "";
			$scope.modMenu.menuTitle = "";
			$scope.modMenu.menuLv = "";
			$scope.modMenu.pareMenuCode = "";
			$scope.modMenu.pareMenu = "";
			$scope.modMenu.menuOrder = "";
			$scope.modMenu.menuDesc = "";
			$scope.modMenu.menuStateref = "";


			$scope.menuState.modButtShow = false;
			$scope.menuState.addButtShow = true;
			$scope.menuState.menuCodeDis = false;
			$scope.menuState.pareCodeDis = false;
			$scope.menuState.pareNameDis = true;
			$scope.menuState.pareNameReq = true;
			$scope.menuState.pareCodeReq = true;

			$scope.menuState.modConfShow = true;
			$scope.menuState.addDis = false;
			$scope.menuState.delDis = false;

			$scope.treeObj = this.basicTree.jstree(true);
			// var selected = this.basicTree.jstree(true).get_selected()[0];
			var selected = $scope.treeObj.get_selected()[0];
			if(selected){
				$scope.searchMenu.menuId = selected;
				var opts = {};
				opts.url = '/crm/manage/getOneMenu';
				opts.method = 'GET';
				opts.params = $scope.searchMenu;
				HttpService.linkHttp(opts).then(
					function(response) {
						$scope.modMenu.menuPareid = response.data.menuId;
						$scope.modMenu.menuParename = response.data.menuTitle;
						$scope.modMenu.menuLevel = parseInt(response.data.menuLevel) + 1;
					});
			}else{
				$scope.modMenu.menuLevel = 0;
			}

		}

		$scope.closeDiv = function() {
			$scope.modMenu.menuId = "";
			$scope.modMenu.menuTitle = "";
			$scope.modMenu.menuLevelv = "";
			$scope.modMenu.menuPareid = "";
			$scope.modMenu.menuParename = "";
			$scope.modMenu.menuOrder = "";
			$scope.modMenu.menuDesc = "";
			$scope.menuState.modConfShow = false;
			$scope.menuState.addDis = true;
			$scope.menuState.delDis = true;
			$scope.refresh();
		}

		$scope.refresh = function() {
			$scope.treeData = getDefaultData();
			$scope.basicConfig.version++;
		};

		$scope.applyModelChanges = function() {
			return true;
		};

		function getDefaultData() {
			$scope.defaultMenus.splice(0, $scope.defaultMenus.length);
			var opts = {};
			opts.url = '/crm/manage/getAllMenus';
			opts.method = 'GET';
			HttpService.linkHttp(opts).then(
					function(response) {
						var menuList = response.data;
						angular.forEach(menuList, function(menu) {
							// $scope.defaultMenus.push({
							// 	"id" : menu.menuCode,
							// 	"parent" : (menu.pareMenuCode == "" || menu.pareMenuCode==null)? "#"
							// 			: menu.pareMenuCode,
							// 	"type" : "folder",
							// 	"text" : menu.menuTitle,
							// 	"state" : {
							// 		"opened" : true
							// 	}
							// });
							$scope.defaultMenus.push({
								"id" : menu.menuId,
								"parent" : (menu.menuPareid == "" || menu.menuPareid==null)? "#"
										: menu.menuPareid,
								"type" : "folder",
								"text" : menu.menuTitle,
								"state" : {
									"opened" : true
								}
							});
						})

					});
			return $scope.defaultMenus;
		}

		$scope.delNode = function() {
			var selected = $scope.treeObj.get_selected()[0];
			$scope.searchMenu.menuId = selected;
			$scope.delMenu.menuId = selected;

			Alert.confirm("确定删除该菜单？").then(function() {
				var opts = {};
				opts.url = '/crm/manage/delModMenu';
				opts.method = 'PUT';
				opts.params = {
					menuId : selected
				};
				HttpService.linkHttp(opts).then(function(response) {
					$scope.closeDiv();
				});
			});
		}

		$scope.modConfirm = function(isValid) {
			if (!isValid) {
				return;
			}
			$scope.urlCheck();

			$scope.saveMenu = $scope.modMenu;
			//$scope.saveMenu.menuLv = $scope.modMenu.menuLv.value;
			$scope.saveMenu.pareMenuCode = $scope.modMenu.pareMenuCode.value;
			$scope.saveMenu.pareMenu = $scope.modMenu.pareMenuCode.label;
			var opts = {};
			opts.url = '/crm/manage/modMenu';
			opts.method = 'PUT';
			opts.params = $scope.saveMenu;
			HttpService.linkHttp(opts).then(function(response) {
				$scope.closeDiv();
			});
		}

		$scope.addConfirm = function(isValid) {
			if (!isValid) {
				return;
			}
			$scope.urlCheck();
			$scope.saveMenu = $scope.modMenu;
			var opts = {};
			opts.url = '/crm/manage/addMenu';
			opts.method = 'POST';
			opts.params = $scope.saveMenu;
			HttpService.linkHttp(opts).then(function(response) {
				$scope.closeDiv();
			});
		};

/*		$scope.menuLvChange = function() {

			var menuLv = $scope.modMenu.menuLv.value;
			var pareMenuLv = $scope.modMenu.menuLv.value - 1;
			if (menuLv != $scope.menuLvOrin) {
				var menuMsg = "";
				if ($scope.modMenu.menuName == ""
						&& $scope.menuState.addButtShow) {
					menuMsg = "**菜单新增操作**";
				} else {
					menuMsg = $scope.modMenu.menuName;
				}

				Alert
						.confirm(
								"确定将菜单[" + menuMsg + "]由[" + $scope.menuLvOrin
										+ "级]调整为[" + menuLv + "级]？")
						.then(
								function() {

									$scope.modMenu.pareMenuCode = {
										label : "请选择父级菜单",
										value : ""
									};
									$scope.modMenu.pareMenu = "";
									$scope.pareMenuCodes.splice(0,
											$scope.pareMenuCodes.length);
									$scope.menuLvOrin = menuLv;
									$scope.modMenu.pareMenu = "";
									$scope.changeSearch.menuLv = pareMenuLv;
									var opts = {};
									opts.url = '/crm/manage/getMenusByEntity';
									opts.method = 'GET';
									opts.params = $scope.changeSearch;
									HttpService
											.linkHttp(opts)
											.then(
													function(response) {
														angular
																.forEach(
																		response.data,
																		function(
																				item) {
																			$scope.pareMenuCodes
																					.push({
																						label : item.menuName
																								+ "|"
																								+ item.menuCode,
																						value : item.menuCode
																					});
																		})

														if (menuLv == 1) {
															$scope.menuState.pareCodeDis = true;
															$scope.menuState.pareNameReq = false;
															$scope.menuState.pareCodeReq = false;
															$scope.modMenu.pareMenuCode = {};
															$scope.modMenu.pareMenu = "";
														} else {
															$scope.menuState.pareCodeDis = false;
															$scope.menuState.pareNameReq = true;
															$scope.menuState.pareCodeReq = true;
														}
													});
								}, function() {
									$scope.modMenu.menuLv = {
										label : $scope.menuLvOrin + "级",
										value : $scope.menuLvOrin
									};

								});
			}

		};*/

		/*$scope.pareCodeChange = function() {

			var pName = $scope.modMenu.pareMenuCode.label.split("|")[0];
			$scope.modMenu.pareMenu = pName;

		};*/

		$scope.urlCheck = function() {
			var s = $scope.modMenu.menuStateref;
			var checkP1 = s.indexOf("/");
			var checkP2 = s.indexOf("\\");
			var checkP3 = s.indexOf(".");
			var checkP4 = s.indexOf("。");
			var checkP5 = s.indexOf("、");
			var checkP6 = s.indexOf("，");
			var checkP7 = s.indexOf(",");
			var errorMsg = "";
			var flag = 0;
			if (checkP1 > -1) {
				errorMsg = "斜线[“/”]作为路径使用！";
				flag = 1;
			}
			if (checkP2 > -1) {
				errorMsg = "反斜线[“\\”]作为路径使用！";
				flag = 1;
			}
			if (checkP3 == 0 || checkP3 == s.length - 1) {
				errorMsg = "点[“.”]作为路径起始或终结符号使用！";
				flag = 1;
			}
			if (checkP4 > -1) {
				errorMsg = "中文句号[“。”]作为路径使用！";
				flag = 1;
			}
			if (checkP5 > -1) {
				errorMsg = "中文顿号[“、”]作为路径使用！";
				flag = 1;
			}
			if (checkP6 > -1) {
				errorMsg = "中文逗号[“，”]作为路径使用！";
				flag = 1;
			}
			if (checkP7 > -1) {
				errorMsg = "英文逗号[“,”]作为路径使用！";
				flag = 1;
			}

			if (flag == 1) {
				Alert.error("菜单路径中不可以使用" + errorMsg).then(function() {
					document.getElementById("menuStateref").focus();
				});
			}

		}

	}

})();
