/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

helloRentApp.controller('LogoutController', ['$rootScope', '$scope', '$log', '$state','accessService',
                 function($rootScope, $scope, $log, $state, accessService) {
  $log.debug("LogoutController");
  
  $scope.logout = function() {
    accessService.logout();
  }

  $scope.logout();
  $state.go("secure.login"); // regirect to login page
}]);
