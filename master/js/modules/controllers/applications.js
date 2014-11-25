/**=========================================================
 * Module: notifications.js
 * Initializes the notifications system
 =========================================================*/
App.controller('ApplicationsController', ['$scope', '$rootScope', '$firebase', "$timeout", function($scope, $rootScope, $firebase, $timeout){
  var ref = new Firebase("hello-rent.firebaseio.com");
  var sync = $firebase(ref.child("applications").child("-Jbb-UeW00OMOezdohqY"));

  $rootScope.applications = sync.$asObject();
}]);


App.controller('ApplicationController', ['$scope', '$rootScope', '$stateParams', function($scope, $rootScope, $stateParams){
  console.log($stateParams);

  $scope.application = $rootScope.applications[$stateParams.id];

  $scope.getCreditReport = function(score) {
  	angular.forEach(App.creditReport, function(report, key) {
  		if (report.min <= score && report.max >= score) {
  			$scope.report = report;
  		}
  	});
  }

  if ($scope.application) {
  	$scope.getCreditReport($scope.application.creditScore);
  }
}]);