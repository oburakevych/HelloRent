helloRentApp.controller('FileUploadController', ['$scope', '$log', function($scope, $log) {
  'use strict';

  $log.debug("FileUploadController");
  
  $scope.fileUploadList = [];

  $scope.removeFile = function(index) {
    $scope.fileUploadList.splice(index, 1);
  };

  $scope.creds = {
    bucket: 'hellorent-property-images',
    access_key: 'AKIAIRR3OD3RELGT5V6Q',
    secret_key: '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'
  }
  
  $scope.upload = function() {
    // Configure The S3 Object
    AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
    AWS.config.region = 'ap-southeast-2';
    var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });
   
    if($scope.file) {
      var params = { Key: $scope.file.name, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };
   
      bucket.putObject(params, function(err, data) {
        if(err) {
          // There Was An Error With Your S3 Config
          alert(err.message);
          return false;
        }
        else {
          // Success!
          alert('Upload Done');
        }
      })
      .on('httpUploadProgress',function(progress) {
            // Log Progress Information
            console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
          });
    }
    else {
      // No File Selected
      alert('No File Selected');
    }
  }


  angular.element(document).ready(function() {

    var progressbar = $('#progressbar'),
        bar         = progressbar.find('.progress-bar'),
        settings    = {

            action: 'server/upload.php', // upload url

            allow : '*.(jpg|jpeg|gif|png)', // allow only images

            param: 'upfile',

            loadstart: function() {
                bar.css('width', '0%').text('0%');
                progressbar.removeClass('hidden');
                $log.debug("load start");
            },

            progress: function(percent) {
                percent = Math.ceil(percent);
                bar.css('width', percent+'%').text(percent+'%');
                $log.debug("progress: " +  percent);
            },

            allcomplete: function(response) {
                $log.debug("allcomplete");
                var data = response && angular.fromJson(response);
                bar.css('width', '100%').text('100%');

                setTimeout(function(){
                    progressbar.addClass('hidden');
                }, 250);

                // Upload Completed
                if(data && data.file) {
                    $scope.$apply(function() {
                        $scope.fileUploadList.push(data);
                    });
                }
            }
        };

    var select = new $.upload.select($('#upload-select'), settings),
        drop   = new $.upload.drop($('#upload-drop'), settings);
  });

}]);