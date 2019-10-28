(function() {
	'use strict';

	angular.module('BlurAdmin.theme.components').controller('BaSidebarCtrl', BaSidebarCtrl);

	/** @ngInject */
	function BaSidebarCtrl($scope, baSidebarService, $state,$rootScope, HttpService) {

		// $scope.menuItems = baSidebarService.getMenuItems();

		// $scope.defaultSidebarState = $scope.menuItems[0].stateRef;

		$scope.hoverItem = function($event) {
			$scope.showHoverElem = true;
			$scope.hoverElemHeight = $event.currentTarget.clientHeight;
			var menuTopValue = 66;
			$scope.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - menuTopValue;
		};

		$scope.$on('$stateChangeSuccess', function() {
			if (baSidebarService.canSidebarBeHidden()) {
				baSidebarService.setMenuCollapsed(true);
			}
		});

		/* 初始化菜单表数据 */
		$scope.initMenu = function() {
			var menus = baSidebarService.getAllMenuItems();
			var menuList = [];
			var menuList2 = [];
			var count = 0;
			angular.forEach(menus, function(i) {
				var obj = {};
				obj.menuId = count;
				obj.menuName = i.name;
				obj.menuIcon = i.icon;
				obj.menuLevel = i.level;
				obj.menuOrder = i.order;
				// obj.name = i.permissionExcept;
				obj.menuPermissionOnly = i.permissionOnly;
				obj.menuStateRef = i.stateRef;
				obj.menuTitle = i.title;
				menuList.push(obj);
				count++;
			});
			var menuItems = menuList.filter(function(item) {
				return item.menuLevel == 0;
			});

			menuItems.forEach(function(item) {
				item.menuPareid = "";
				menuList2.push(item);
				var children = menuList.filter(function(child) {
					return child.menuLevel == 1 && child.menuName.indexOf(item.menuName) === 0;
				});
				children.forEach(function(i) {
					i.menuPareid = item.menuId
					menuList2.push(i);
				});
				item.subMenu = children.length ? children : null;
				// -------三级目录--------
				if (item.subMenu) {
					item.subMenu.forEach(function(item2) {
						var thirdChildren = menuList.filter(function(child) {
							return child.menuLevel == 2 && child.menuName.indexOf(item2.menuName) === 0;
						});
						thirdChildren.forEach(function(i) {
							i.menuPareid = item2.menuId;
							menuList2.push(i);
						});
					});
				}
				// ---------------------
			});
			var menuStr = JSON.stringify(menuList2);// 集合转换为json字符串

			var opts = {};
			opts.url = '/crm/manage/modAllMenu';
			opts.method = 'PUT';
			opts.params = {};
			opts.data = menuStr;
			HttpService.linkHttp(opts).then(function(response) {

			});
		}

		
		// 对对象数组按对象的属性排序，升序；prop为对象字段ID
		var compare = function(prop) {
			return function(obj1, obj2) {
				var val1 = parseFloat(obj1[prop]);
				var val2 = parseFloat(obj2[prop]);
				if (val1 > val2) {
					return 1;
				} else if (val1 < val2) {
					return -1;
				} else {
					return 0;
				}
			}
		}

		/* 获取所有菜单表数据 */
		$scope.getMenus = function() {
			var menus = [];
			
			var opts = {};
			opts.url = '/crm/manage/getAllMenu';
			opts.method = 'GET';
			opts.params = {};
			HttpService.linkHttp(opts).then(function(response) {
				var allMenuList = response.data;

				var opts2 = {};
				opts2.url = '/crm/manage/menuAuth';
				opts2.method = 'GET';
				opts2.params = {
					userId : $rootScope.global.user
				};
				HttpService.linkHttp(opts2).then(function(response) {
					var authMenuList = response.data;

					angular.forEach(authMenuList, function(x) {
						angular.forEach(allMenuList, function(y) {
							if (x === y.menuName && "1" == y.menuIsshow) {
								// 判断菜单是否可显示
								var obj = {};
								obj.menuId=y.menuId;
								obj.name = y.menuName;
								obj.icon = y.menuIcon;
								obj.level = y.menuLevel;
								obj.order = y.menuOrder;
								// obj.name = y.permissionExcept;
								obj.permissionOnly = y.menuPermissiononly;
								obj.stateRef = y.menuStateref;
								obj.title = y.menuTitle;
								menus.push(obj);
							}
						});
					});
					
					$scope.menuItems = baSidebarService.getMenuItems(menus);
					// 数据排序，按value升序
					$scope.menuItems.sort(compare("menuId"));
					$scope.defaultSidebarState = $scope.menuItems[0].stateRef;
				});
			});
		}

		$scope.getMenus();
	}
})();