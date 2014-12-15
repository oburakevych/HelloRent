helloRentApp.controller('NewPropertyController', ['$scope', '$rootScope', '$log', '$firebase', "$timeout", 'propertiesService', 
                  function($scope, $rootScope, $log, $firebase, $timeout, propertiesService){
  $log.debug("NewPropertyController");

  $scope.property = {};

  $scope.init = function() {
    $rootScope.authUser.$loaded()
      .then(function() {
        $scope.property = new Property($rootScope.authUser.id);
      }
    );
  }

  $scope.addNewProperty = function() {
    $log.debug("Adding a new property");

    propertiesService.getNextId().then(function(propertyId) {
      if (propertyId) {
        propertiesService.add(propertyId, $scope.property).then(function(propertyRef) {
          $log.debug("Added property ID: " + propertyRef.key());
          if (angular.isUndefined($rootScope.authUser.properties)) {
            $rootScope.authUser.properties = [];
          }

          $rootScope.authUser.properties.push(propertyRef.key());
          
          $rootScope.authUser.$save().then(function() {
            $log.debug("User has a new property!");
          }).catch(function(error) {
            // TODO: make sure you remove property if this push fails
            $log.warn("Failed to create a new property " + error.message);
          });
        });
      }
    }).catch(function(error) {
      $log.warn("Cannot add a new Property");
      $log.warn(error);
    });
  }

  $scope.init();
}]);