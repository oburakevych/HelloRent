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

  var LOGIN_PROVIDER = "password";

  $scope.login = function() {
    $scope.authMsg = ''; // clear up a possible existing message

    accessService.login(LOGIN_PROVIDER, $scope.account)
      .then(function(authData) {
        $log.debug("Logged in as:", authData.uid);
        $log.debug(authData);

        if (authData[LOGIN_PROVIDER] && authData[LOGIN_PROVIDER].isTemporaryPassword) {
          $log.warn("User logged in with temporary password. Requesting password change.");
          $rootScope.tmpAccount = $scope.account; // temporary store account data for the next step - password change
          $state.go('secure.changePassword');
        } else {
          $state.go('app.applications');
        }
      }).catch(function(error) {
        $log.error("Authentication failed:", error);
        $scope.authMsg = "Authentication failed";
      });
  }
}]);
