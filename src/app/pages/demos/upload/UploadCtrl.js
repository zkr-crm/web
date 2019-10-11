(function () {
    'use strict';

    angular.module('BlurAdmin.pages.demos.upload')
        .controller('UploadCtrl', UploadCtrl);

    /** @ngInject */
    function UploadCtrl($scope, Upload, HttpService) {
        $scope.data = {
            file: null
        };
        $scope.upload = function () {
            if (!$scope.data.file) {
                return;
            }

            var url = $scope.params.url;  //params是model传的参数，图片上传接口的url
            var data = angular.copy($scope.params.data || {}); // 接口需要的额外参数，比如指定所上传的图片属于哪个用户: { UserId: 78 }
            data.file = $scope.data.file;

            Upload.upload({
                url: url,
                data: data
            }).success(function (data) {
                $scope.hide(data);
            }).error(function () {
                logger.log('error');
            });
        };

        ///////////////////////////////////////////////////


        $scope.uploadFiles = function (file, errFiles) {
            if(!file){
                return;
            }
            var fd = new FormData();
            fd.append('file', file);

            HttpService.linkHttp({
                url: 'crm/ecif/picture',
                method: 'POST',
                headers: {'Content-Type': undefined},
                data: fd
            }).then(function (response) {
                $scope.myImg = response.data;

            });

            /*$scope.f = file;
             $scope.errFile = errFiles && errFiles[0];
             if (file) {
                 file.upload = Upload.upload({
                     url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                     data: {file: file}
                 });

                 file.upload.then(function (response) {
                     $timeout(function () {
                         file.result = response.data;
                     });
                 }, function (response) {
                     if (response.status > 0)
                         $scope.errorMsg = response.status + ': ' + response.data;
                 }, function (evt) {
                     file.progress = Math.min(100, parseInt(100.0 *
                                              evt.loaded / evt.total));
                 });
             }  */
        }



    }

})();
