helloRentApp.controller('NewPropertyController', ['$scope', '$rootScope', '$log', '$firebase', "$timeout", 'propertiesService', 'countryService',
                  function($scope, $rootScope, $log, $firebase, $timeout, propertiesService, countryService){
  $log.debug("NewPropertyController");

  $scope.property = {};

  $scope.init = function() {
    $scope.countries = countryService.query();
    $scope.propertyTypeList = [
            {name: 'House', code: 'HOUSE'},
            {name: 'Apartment & Unit', code: 'APARTMENT'},
            {name: 'Townhouse', code: 'TOWNHOUSE'}];
    $scope.petsList = [
            {name: 'No', code: "NO"},
            {name: 'Dogs', code: "DOGS"},
            {name: 'Cats', code: "CATS"},
            {name: 'Fishes', code: "FISHES"},
            {name: 'Birds', code: "BIRDS"},
            {name: 'All OK', code: "ALL"}];
    $scope.selectedPets = $scope.petsList[0]; // 'NO' as default

    $rootScope.authUser.$loaded()
      .then(function() {
        $scope.property = new Property($rootScope.authUser.id);
      }
    );
  }

  $scope.addNewProperty = function() {
    $log.debug("Adding a new property");

    $scope.message = ""; // crear up any previous message
    
    $scope.setPets();
    $scope.validate($scope.property);

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
            $scope.isSuccessful = true;
            $scope.message = "Property has been added";

            $timeout(function() {
              $rootScope.$state.go("app.properties");
            }, 3000);
          }).catch(function(error) {
            // TODO: make sure you remove property if this push fails
            $log.warn("Failed to create a new property " + error.message);
            $scope.isSuccessful = false;
            $scope.message = "Error eddind property: " + error.message;
          });
        });
      }
    }).catch(function(error) {
      $log.warn("Cannot add a new Property");
      $log.warn(error);
      $scope.isSuccessful = false;
      $scope.message = "Error eddind property: " + error.message;
    });
  }

  $scope.setPets = function() {
    if ($scope.selectedPets) {
      // When using Select HTML element with directives chosen='', multiple='', it creates
      // $$hashKey in the object. However, '$' is not supported in Firebase as a key.
      // angula.copy will copy the object without its private keys (starting with $$).
      angular.copy($scope.selectedPets, $scope.property.pets);
    }
  }

  $scope.validate = function(property) {
    if (!property) {
      return false;
    }

    return true;
  }

  $scope.init();
}]);