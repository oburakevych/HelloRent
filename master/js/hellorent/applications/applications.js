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
        $rootScope.applications = applicationService.getAll(propertyId);
      });  
    }
  }
}]);

helloRentApp.controller('ApplicationController', ['$scope', '$rootScope', '$log', 'firebaseReference', '$stateParams', '$firebase', '$timeout', 'applicationService', 'CreditReportService', 
                  function($scope, $rootScope, $log, firebaseReference, $stateParams, $firebase, $timeout, applicationService, CreditReportService) {
  $scope.getApplication = function(propertyId, tenantId, applicationId) {
    $log.debug("getApplication(" + tenantId + ", " + applicationId + ")");
    $scope.application = applicationService.get(propertyId, tenantId, applicationId);

    $timeout(function() {
      $log.debug($scope.application);
    }, 3000);
      
    $scope.application.$loaded().then(function() {
      $scope.getCreditReport($scope.application.creditScore);
    });
  }

  $scope.CREDIT_SCORE = CreditReportService.get();

  $scope.getCreditReport = function(score) {
  	angular.forEach($scope.CREDIT_SCORE, function(report, key) {
      if (report.min <= score && report.max >= score) {
  			$scope.report = report;
  		}
  	});
  }

  $rootScope.authUser.$loaded()
    .then(function() {
      $scope.getApplication($rootScope.authUser.properties[0], $stateParams.tenantId, $stateParams.applicationId);
    });

}]);