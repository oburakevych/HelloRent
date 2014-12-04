/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

helloRentApp.controller('LoginFormController', ['$rootScope', '$scope', '$log', '$state', 'accessService',
                 function($rootScope, $scope, $log, $state, accessService) {
  $log.debug("LoginFormController");
  // bind here all data from the form
  $scope.account = {};
  // place the message if something goes wrong
  $scope.authMsg = '';

  $scope.login = function() {
    $scope.authMsg = ''; // clear up a possible existing message

    accessService.login({
      email: $scope.account.email,
      password: $scope.account.password
    }).then(function(authData) {
      $log.debug("Logged in as:", authData.uid);
      $state.go('app.applications');
    }).catch(function(error) {
      $log.error("Authentication failed:", error);
      $scope.authMsg = "Authentication failed";
    });
  }
}]);
