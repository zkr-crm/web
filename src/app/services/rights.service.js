(function () {
    'use strict';

    angular.module('BlurAdmin').factory('RightsService', RightsService);

    /* @ngInject*/
    function RightsService($http, $q, $state, $rootScope, Constant, PermRoleStore, PermPermissionStore) {
        var service = {};
        service.permissions = [];

        service.loadRoles = function () {
            var deferred = $q.defer();
            $http.get(Constant.server_host + '/api/' + Constant.merchantId + '/roles').then(function (resp) {
                resp.data.forEach(function (item) {
                    item.state = {'opened': true};
                    item.text = item.name;
                    item.parent = "#";
                    item.type = 'node';
                });
                deferred.resolve(resp.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        service.getRole = function (roleId) {
            var deferred = $q.defer();
            $http.get(Constant.server_host + '/api/' + Constant.merchantId + '/role/' + roleId).then(function (resp) {
                deferred.resolve(resp.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        service.createRole = function (formData) {
            var deferred = $q.defer();
            $http.post(Constant.server_host + '/api/' + Constant.merchantId + '/role/add', formData).then(function (resp) {
                deferred.resolve(resp.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        service.modifyRole = function (roleId, formData) {
            var deferred = $q.defer();
            $http.post(Constant.server_host + '/api/' + Constant.merchantId + '/role/' + roleId + '/update', formData).then(function (resp) {
                deferred.resolve(resp.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        service.deleteRole = function (roleId) {
            var deferred = $q.defer();
            $http.post(Constant.server_host + '/api/' + Constant.merchantId + '/role/' + roleId + '/delete', {}).then(function (resp) {
                deferred.resolve(resp.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        service.queryRoles = function () {
            var deferred = $q.defer();
            $http.get(Constant.server_host + '/api/' + Constant.merchantId + '/roles').then(function (resp) {
                deferred.resolve(resp.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        service.assignPermissions = function (permissions) {
            PermPermissionStore.defineManyPermissions(permissions, function (permissionName, params) {
                if ($rootScope.global.user == "dev" || $rootScope.global.user == "crm") {
                    return true;
                }
                var match = service.permissions.indexOf(permissionName) >= 0;
                return match;
            });
        }

        service.loadPermissions = function (userId) {
            var deferred = $q.defer();

            $http.get('/crm/manage/menuAuth?userId='+userId).then(function (resp) {
                service.permissions = resp.data.data;

                var permissions = $state.get()
                    .filter(function (s) {
                        return s.sidebarMeta;
                    }).map(function (s) {
                        return s.name;
                    });
                service.assignPermissions(permissions)

                deferred.resolve();
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        service.loadSaticMenus = function () {
            var deferred = $q.defer();
            $http.get(Constant.server_host + '/api/role/menus').then(function (resp) {
                resp.data.forEach(function (item) {
                    item.state = {'opened': true};
                    if (item.parent == '#') item.type = 'node';
                });
                deferred.resolve(resp.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        service.getUserRoles = function (staticRoles, selects) {
            var data = [];
            staticRoles.forEach(function (item) {
                var tmp = {
                    id: item.id,
                    text: item.name || item.text,
                    parent: '#',
                    type: 'node',
                    state: {'opened': true}
                };
                selects.forEach(function (select) {
                    if (item.name == select) tmp.state.selected = true;
                });
                data.push(tmp)
            });
            return data;
        }
        service.getRoleMenus = function (staticMenus, selects) {
            staticMenus.forEach(function (item) {
                selects.forEach(function (select) {
                    if (item.key == select.key) item.state.selected = true;
                });
            });
            return staticMenus;
        }

        service.getRoleMenuKeys = function (staticRoles, selectIds) {
            var data = [];
            staticRoles.forEach(function (item) {
                selectIds.indexOf(item.id) >= 0 && data.push(item.key);
            });
            return data;
        }

        return service;
    }

})();