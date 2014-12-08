/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

helloRentApp.controller('ResetFormController', ['$rootScope', '$scope', '$log', '$state', 'accessService',
                 function($rootScope, $scope, $log, $state, accessService) {
  $log.debug("ResetFormController");
  // bind here all data from the form
  $scope.account = {};
  // place the message if something goes wrong
  $scope.authMsg = '';

  $scope.reset = function() {
    $scope.authMsg = ''; // clear up a possible existing message

    accessService.sendResetPasswordEmail($scope.account.email)
      .then(function() {
        $log.debug("Reset password email sent");
        $scope.isPasswordSentSuccessfully = true;
      }).catch(function(error) {
        $log.error("Reset password email sending error: ", error);
        $scope.authMsg = "Reset password failed: " + error.message;
      });
  }
}]);
