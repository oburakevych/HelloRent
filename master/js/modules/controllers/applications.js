/**=========================================================
 * Module: notifications.js
 * Initializes the notifications system
 =========================================================*/
App.controller('ApplicationsController', ['$scope', '$rootScope', '$firebase', "$timeout", function($scope, $rootScope, $firebase, $timeout){
  var ref = new Firebase("hello-rent.firebaseio.com");
  var sync = $firebase(ref.child("applications"));
  
  $rootScope.applications = sync.$asObject();
}]);


App.controller('ApplicationController', ['$scope', '$rootScope', '$stateParams', '$firebase', function($scope, $rootScope, $stateParams, $firebase) {
  console.log($stateParams);

  $scope.application = $rootScope.applications[$stateParams.id];
  
  var ref = new Firebase("hello-rent.firebaseio.com");
  $scope.CREDIT_SCORE = $firebase(ref.child("creditScore")).$asObject();

  $scope.getCreditReport = function(score) {
  	angular.forEach($scope.CREDIT_SCORE, function(report, key) {
      if (report.min <= score && report.max >= score) {
  			$scope.report = report;
  		}
  	});
  }

  $scope.CREDIT_SCORE.$loaded().then(function() {
    $scope.getCreditReport($scope.application.creditScore);
  });
}]);