/**=========================================================
 * Module: access-register.js
 * Register account api
 =========================================================*/

helloRentApp.controller('RegisterFormController', ['$rootScope', '$scope', '$log', '$state', 'accessService', 'firebaseReference', '$firebase',
                           function($rootScope, $scope, $log, $state, accessService, firebaseReference, $firebase) {

  $log.debug("RegisterFormController");
  // bind here all data from the form
  $scope.account = {};
  // place the message if something goes wrong
  $scope.authMsg = '';

  $scope.register = function() {
    $scope.authMsg = ''; // clear up a possible existing message
    accessService.register($scope.account).then(function() {
      $log.debug("User created successfully!");
      return accessService.login($scope.account);
    }).then(function(authData) {
        $log.debug("New user logged in as:", authData.uid);

        var newUser = new HelloRentUser(authData.uid, $scope.account.email, $scope.account.firstName);
        var usersRef = $firebase(firebaseReference.child("users"));
        usersRef.$set(authData.uid, newUser).then(function(userRef) {
          $rootScope.authUser = $firebase(userRef);
          $state.go('app.applications');
        });
      }).catch(function(error) {
        $log.error("Registration failed:", error);
        $scope.authMsg = "Registration failed";
      });
  }
}]);
