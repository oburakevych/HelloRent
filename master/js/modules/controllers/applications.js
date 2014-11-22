/**=========================================================
 * Module: notifications.js
 * Initializes the notifications system
 =========================================================*/
App.controller('ApplicationsController', ['$scope', '$rootScope', function($scope, $rootScope){

   $scope.applications = App.applications;

}]);












App.controller('ApplicationController', ['$scope', '$rootScope', '$stateParams', function($scope, $rootScope, $stateParams){

  console.log($stateParams);

    var application = App.applications[$stateParams.id];

    $scope.application = application;

    console.log(application);

}]);