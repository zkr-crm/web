(function () {
  'use strict';

  angular.module('BlurAdmin.pages.product.uploadProduct')
      .controller('uploadProductCtrl', uploadProductCtrl);
  /** @ngInject */
  function uploadProductCtrl($scope, $uibModal, $filter, $timeout, $http,
			HttpService, EnumType, Alert) {
	  //
      $scope.pagination = {
          pageSize: '10',
          pageIndex: 1,
          maxText: 5
      }
	  $scope.ShowImportSts = function(item) {
			var typeLabel="";
			angular.forEach(EnumType.importSts, function(i) {
				if (item.importSts == i.value) {
					typeLabel=i.label;
				}
			});
			return typeLabel;
		};
		$scope.ShowImportObjType = function(item) {
			var typeLabel="";
			angular.forEach(EnumType.ImportObjType, function(i) {
				if (item.importObjTyp == i.value) {
					typeLabel=i.label;
				}
			});
			return typeLabel;
		};
	  // 下载产品导入模板
	  // 选择文件
	  // 上传文件
      $scope.uploadFiles = function (file, errFiles) {
          if(!file){
              return;
          }
          var fd = new FormData();
          fd.append('file', file);
          fd.append('fileName', file.name);
          HttpService.linkHttp({
              url: '/crm/ecif/productmng/upload',
              method: 'POST',
              headers: {'Content-Type': undefined},
              data: fd
          }).then(function (response) {
              //$scope.myImg = response.data;
        	  $scope.search();
          });
      }
		$scope.search = function(page) {
		     /* $scope.queryProductOptions.url = '/crm/ecif/productmng/importLogByEntity';
		      $scope.queryProductOptions.method = 'GET';
		      $scope.queryProductOptions.params = {"importObjTyp" : "2"};*/
		      // page=page||1;
          if (this.queryPage) {
            this.queryPage(page)
          } else {
            this.$$childHead.$$childHead.queryPage(page)
          }
		      //$scope.time = response.data[0].importTime;
		}
	  
	  // 查询导入日志
	  $scope.smartTablePageSize = 4;
	  $scope.rowCollection = [];
	  $scope.queryProductOptions = $scope.pagination;
      $scope.queryProductOptions.url = '/crm/ecif/productmng/importLogByEntity';
      $scope.queryProductOptions.method = 'GET';
      $scope.queryProductOptions.params = {"importObjTyp" : "2"};
      $scope.queryProductOptions.success = function successCallback(response) {
          $scope.rowCollection = response.data.list;
          $scope.time = response.data.list[0].importTime;
      };
      
    	// 物理删除事件（单行删除）
  		$scope.delPrdLog = function(item) {
  			Alert.confirm("确定删除？").then(function() {
  				var opts = {};
  				opts.url = '/crm/ecif/productmng/deleteLog';
  				opts.method = 'DELETE';
  				opts.params = {
					importCd:item.importCd
  				};
  				HttpService.linkHttp(opts).then(function(response) {
  					// 执行查询
  					$scope.search();
  				});
  			});
  		};
  		
  		$scope.download = function (item) {
  			
  			$http({
  				method : "GET",
  				url : "/crm/ecif/productmng/accountFile",
  				params:{
  					importCd : item.importCd,
					fileNam : item.fileNam},
  				responseType: "blob"   //注意此参数

  				}).success(function(response){
  				var blob = new Blob([response], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});  
  				
  				var fileName = item.fileNam;
  				var a = document.createElement("a");
  				document.body.appendChild(a);
  				a.download = fileName;
  				a.href = URL.createObjectURL(blob);
  				a.click();
  				
  				});		
  			
//  			var opts = {};
//				opts.url = '/crm/ecif/productmng/accountFile';
//				opts.method = 'GET';
//				opts.params = {
//						importCd : item.importCd,
//						importSts : '2',
//						fileNam : item.fileNam
//				};
//				opts.responseType: "blob";
//				HttpService.linkHttp(opts).then(function(response) {
//					console.log("请求成功");
//					var blob = new Blob([response], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});  
//	                 var fileName = item.fileNam;  
//	                 var a = document.createElement("a");  
//	                 document.body.appendChild(a);  
//	                 a.download = fileName;  
//	                 a.href = URL.createObjectURL(blob);  
//	                 a.click();
//				});
//				
//				$http.get("/crm/ecif/productmng/accountFile",{  
//				    params: {  
//				    	importCd : item.importCd,
//						importSts : '2',
//						fileNam : item.fileNam  
//				    }  
//				})  
//				.success(function(response, status, headers, config){  
//				      
//				})
 			
//             $http.post("/crm/ecif/productmng/accountFile", {  
//                 importCd:item.importCd,
//                 importSts: '2'  
//             }, {responseType: "blob"}).success(function (data) {  
//                 var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});  
//                 var fileName = item.fileNam;  
//                 var a = document.createElement("a");  
//                 document.body.appendChild(a);  
//                 a.download = fileName;  
//                 a.href = URL.createObjectURL(blob);  
//                 a.click();  
//             })  
         }
  		$scope.downloadErr = function (item) {
  			
  			$http({
  				method : "GET",
  				url : "/crm/ecif/productmng/accountFile",
  				params:{
  					importCd : item.importCd,
  					importDetsSts : '0',
					fileNam : item.fileNam,
					},
  				responseType: "blob"   //注意此参数

  				}).success(function(response){
  				var blob = new Blob([response], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});  
  				
  				var fileName = item.fileNam;
  				var a = document.createElement("a");
  				document.body.appendChild(a);
  				a.download = fileName;
  				a.href = URL.createObjectURL(blob);
  				a.click();
  				
  				});		  
         }
	  
  }
  
})();
