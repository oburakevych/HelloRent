/**=========================================================
 * Module: notifications.js
 * Initializes the notifications system
 =========================================================*/
App.controller('ApplicationsController', ['$scope', '$rootScope', '$log', '$firebase', "$timeout", 'applicationService', 
                  function($scope, $rootScope, $log, $firebase, $timeout, applicationService){

  $rootScope.authUser.$loaded()
    .then(function() {
      $scope.getAllApplications();
    });

  $scope.getAllApplications = function() {
    $log.debug($rootScope.authUser);
    $rootScope.applications = [];

    var propertyIds = $rootScope.authUser.properties;
    if (propertyIds) {
      angular.forEach(propertyIds, function(propertyId) {
        $rootScope.applications = applicationService.get(propertyId);
      });  
    }
    $timeout(function() {
      $log.debug($rootScope.applications);
    }, 3000);
  }
}]);

App.controller('ApplicationController', ['$scope', '$rootScope', '$stateParams', '$firebase', function($scope, $rootScope, $stateParams, $firebase) {
  console.log($stateParams);

  $scope.application = $rootScope.applications[$stateParams.tenantId][$stateParams.applicationId];
  
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