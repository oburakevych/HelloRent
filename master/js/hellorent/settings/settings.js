/**=========================================================
 * Module: settings.js
 * =========================================================*/
helloRentApp.controller('SettingsController', ['$scope', '$rootScope', '$log', '$firebase', "$timeout",
                  function($scope, $rootScope, $log, $firebase, $timeout){
  // Apply 3-way binding to the authUser to save all changes immediately.
  $scope.saveUser = function() {
    $log.debug("Saving data");
    $rootScope.authUser.$save();
  };

}]);