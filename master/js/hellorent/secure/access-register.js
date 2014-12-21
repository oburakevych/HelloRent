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
      return accessService.login("password", $scope.account);
    }).then(function(authData) {
        $log.debug("New user logged in as:", authData.uid);
        
        $scope.createUser(authData, $scope.account.email, $scope.account.firstName);
      }).catch(function(error) {
        $log.warn("Registration failed: ", error);
        $scope.authMsg = "Registration failed: " + error.message;
      });
  }

  $scope.registerWith = function(provider) {
    $scope.authMsg = ''; // clear up a possible existing message
    
    accessService.login(provider).then(function(authData) {
      $scope.createUser(authData);
    }).catch(function(error) {
        $log.warn("Registration failed:", error);
        $scope.authMsg = "Registration failed: " + error.message;
    });
  }

  $scope.createUser = function(authData, email, name) {
    var uid = authData.uid;

    var userRef = firebaseReference.child("users").child(uid);

    $log.debug(userRef);

    if (!email && authData[authData.provider] && authData[authData.provider].email) {
      email = authData[authData.provider].email;
    }

    if (!name && authData[authData.provider].displayName) {
      name = authData[authData.provider].displayName;
    }

    var usersRef = $firebase(firebaseReference.child("users"));
    var newUser = new HelloRentUser(uid, email, name);
    
    usersRef.$set(uid, newUser).then(function() {
      $rootScope.$state.go('app.properties');
    });
  }
}]);
