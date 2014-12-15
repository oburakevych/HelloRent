helloRentApp.controller('PropertiesController', ['$scope', '$rootScope', '$log', '$firebase', "$timeout", 'propertiesService', 
                  function($scope, $rootScope, $log, $firebase, $timeout, propertiesService){
  $log.debug("PropertiesController");

  $scope.properties = [];

  $scope.getProperties = function() {
    if ($rootScope.authUser.properties) {
    	angular.forEach($rootScope.authUser.properties, function(propertyId){
    		var property = propertiesService.get(propertyId);
    		$scope.properties.push(property);
    	});
    }

    $timeout(function() {
    	$log.debug($scope.properties);
    }, 3000);
  }

  $scope.init = function() {
  	$rootScope.authUser.$loaded()
  		.then(function() {
  		  $scope.getProperties();
  		});
  }

  $scope.init();
}]);