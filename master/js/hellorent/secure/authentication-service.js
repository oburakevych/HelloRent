//Authentication

helloRentApp.factory('authenticationService', ['$rootScope', '$state', 'firebaseReference', '$firebaseAuth', '$firebase',
  function($rootScope, $state, firebaseReference, $firebaseAuth, $firebase) {
    console.log("AuthenticationService");
    return {
      authenticate: function() {
        console.log("authenticate");
        if (!$rootScope.auth) {
          $rootScope.auth = $firebaseAuth(firebaseReference);
        }

        $rootScope.auth.$onAuth(function(authData) {
          if (authData) {
            console.log("Logged in as:", authData.uid);
            $rootScope.authUser = $firebase(firebaseReference
                                              .child("users")
                                              .child(authData.uid)
                                              ).$asObject();
          } else {
            $rootScope.authUser = {}; // clear up on logout
          }
        });

        var authUserObj = $rootScope.auth.$getAuth(); // actual authentication
        // redirect to the login page if unsuccessfull
        if (!authUserObj) {
          $state.go('secure/login');
        }
      }
    }
  }
]);