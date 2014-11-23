/**=========================================================
 * Module: notifications.js
 * Initializes the notifications system
 =========================================================*/
App.controller('ApplicationsController', ['$scope', '$rootScope', '$firebase', function($scope, $rootScope, $firebase){

   $scope.applications = App.applications;
   console.log("testit");
   console.log($firebase);

}]);












App.controller('ApplicationController', ['$scope', '$rootScope', '$stateParams', function($scope, $rootScope, $stateParams){
  console.log($stateParams);
  var application = App.applications[$stateParams.id];

  $scope.application = application;

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