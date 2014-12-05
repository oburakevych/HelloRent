/**=========================================================
 * Module: notifications.js
 * Initializes the notifications system
 =========================================================*/
helloRentApp.controller('ApplicationsController', ['$scope', '$rootScope', '$log', '$firebase', "$timeout", 'applicationService', 
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
  }
}]);

helloRentApp.controller('ApplicationController', ['$scope', '$rootScope', '$log', 'firebaseReference', '$stateParams', '$firebase', function($scope, $rootScope, $log, firebaseReference, $stateParams, $firebase) {
  //$log.debug($stateParams);

  $scope.getAllApplications = function() {
    //$log.debug($rootScope.authUser);
    $rootScope.applications = [];

    var propertyIds = $rootScope.authUser.properties;
    if (propertyIds) {
      angular.forEach(propertyIds, function(propertyId) {
        $rootScope.applications = applicationService.get(propertyId);
      });

      $timeout(function() {
        $scope.getApplication($stateParams.tenantId, $stateParams.applicationId);
      }, 3000);
    }
  }

  $scope.getApplication = function(tenantId, applicationId) {
    $scope.application = $rootScope.applications[tenantId][applicationId];
      
    $scope.CREDIT_SCORE.$loaded().then(function() {
      $scope.getCreditReport($scope.application.creditScore);
    });
  }

  $scope.CREDIT_SCORE = $firebase(firebaseReference.child("creditScore")).$asObject();

  $scope.getCreditReport = function(score) {
  	angular.forEach($scope.CREDIT_SCORE, function(report, key) {
      if (report.min <= score && report.max >= score) {
  			$scope.report = report;
  		}
  	});
  }

  if (!$rootScope.applications) {
    $rootScope.authUser.$loaded()
      .then(function() {
        $scope.getAllApplications();
      });
  } else {
    $scope.getApplication($stateParams.tenantId, $stateParams.applicationId);
  }
}]);