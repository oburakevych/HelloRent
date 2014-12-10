/**=========================================================
 * Module: access-register.js
 * Register account api
 =========================================================*/

helloRentApp.controller('ChangePasswordFormController', ['$rootScope', '$scope', '$log', '$timeout', 'accessService', 'firebaseReference', '$firebase',
                           function($rootScope, $scope, $log, $timeout, accessService, firebaseReference, $firebase) {

  $log.debug("ChangePasswordFormController");

  $scope.init = function() {
      // bind here all data from the form
    $scope.account = {};
    $scope.account.oldPassword = $scope.getCurrentPassword();
    // place the message if something goes wrong
    $scope.authMsg = '';    
  }

  $scope.changePassword = function(noRedirect) {
    $scope.authMsg = ''; // clear up a possible existing message
    $scope.account.email = $scope.getEmail(); // load email later to give time authUser to load if required

    accessService.changePassword($scope.account.email, $scope.account.oldPassword, 
                                  $scope.account.password).then(function() {
      $log.debug("Password changed successfully!");
      $scope.isSuccessful = true;
      $scope.authMsg = "Password changed successfully";

      return accessService.login("password", $scope.account);
    }).then(function(authData) {
        $log.debug("User logged in as:", authData.uid);
        // Redirect to the dashboard if not defined by function param otherwise
        if (!noRedirect) {
          $timeout(function() {
            $rootScope.$state.go('app.applications');
          }, 1000);
        }
    }).catch(function(error) {
        $log.warn("Login with new password failed", error);
        $scope.isSuccessful = false;
        $scope.authMsg = "Password change failed: " + error.message;
    });
  }

  $scope.getEmail = function() {
    if ($rootScope.authUser && $rootScope.authUser.email) {
      return $rootScope.authUser.email;
    }

    if ($rootScope.tmpAccount && $rootScope.tmpAccount.email) {
      return $rootScope.tmpAccount.email;
    }

    return null;
  }

  $scope.getCurrentPassword = function() {
    if ($rootScope.tmpAccount) {
      return $rootScope.tmpAccount.password;
    }

    return null;
  }

  $scope.init();
}]);
