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

    // Landlord
    var propertyIds = $rootScope.authUser.properties;
     // Tenant
    var appliedPropertyIds = $rootScope.authUser.applied ? $rootScope.authUser.applied.properties : null;

    if (propertyIds) {
      angular.forEach(propertyIds, function(propertyId) {
        $rootScope.applications = applicationService.getAll(propertyId);
      });
    }

    if (appliedPropertyIds) {
      angular.forEach(appliedPropertyIds, function(propertyId) {
        $rootScope.myApplications = applicationService.getAllForTenant(propertyId, $rootScope.authUser.id);
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
      $log.debug($scope.report);
    }, 3000);
      
    $scope.application.$loaded().then(function() {
      $log.debug("LOADING REPORT");
      $scope.getCreditReport($scope.application.creditScore);
    });
  }

  $scope.CREDIT_SCORE = CreditReportService.get();

  $scope.getCreditReport = function(score) {
    $scope.CREDIT_SCORE.$promise.then(function() {
      angular.forEach($scope.CREDIT_SCORE, function(report, key) {
        if (report.min <= score && report.max >= score) {
          $log.debug("Repport assigned");
          $log.debug($scope.report);
          $scope.report = report;
        }
      });      
    });
  }

  $rootScope.authUser.$loaded()
    .then(function() {
      // Landlord
      var propertyIds = $rootScope.authUser.properties;

      if (!propertyIds) {
        // Tenant
        propertyIds = $rootScope.authUser.applied ? $rootScope.authUser.applied.properties : null;
      }
      
      if (propertyIds) {
        $scope.getApplication(propertyIds[0], $stateParams.tenantId, $stateParams.applicationId);
      }
    });
}]);